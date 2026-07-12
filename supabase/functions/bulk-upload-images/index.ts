import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'
import { createClient } from 'npm:@supabase/supabase-js@2'

const ALLOWED_BUCKETS = new Set(['hotel-images', 'offer-files', 'review-media', 'resort-documents'])
const ALLOWED_SOURCE_HOSTS = new Set([
  'images.unsplash.com',
  'plus.unsplash.com',
  'cdn.pixabay.com',
  'images.pexels.com',
  'aomxtrfmsvfetlxcknsh.supabase.co',
])

function isAllowedSourceUrl(raw: string): boolean {
  try {
    const u = new URL(raw)
    if (u.protocol !== 'https:') return false
    return ALLOWED_SOURCE_HOSTS.has(u.hostname)
  } catch {
    return false
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }
    const token = authHeader.replace('Bearer ', '')

    const authedClient = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    )
    const { data: claimsData, error: claimsError } = await authedClient.auth.getClaims(token)
    if (claimsError || !claimsData?.claims?.sub) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }
    const userId = claimsData.claims.sub as string

    const admin = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)
    const { data: isAdmin, error: roleError } = await admin.rpc('has_role', { _user_id: userId, _role: 'admin' })
    if (roleError || !isAdmin) {
      return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    const { bucket, files } = await req.json()
    if (!bucket || !Array.isArray(files)) {
      return new Response(JSON.stringify({ error: 'bucket and files[] required' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }
    if (!ALLOWED_BUCKETS.has(bucket)) {
      return new Response(JSON.stringify({ error: 'bucket not allowed' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }
    if (files.length > 50) {
      return new Response(JSON.stringify({ error: 'too many files (max 50)' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    const results: any[] = []
    for (const f of files) {
      try {
        if (typeof f?.sourceUrl !== 'string' || typeof f?.path !== 'string') {
          results.push({ path: f?.path, ok: false, error: 'invalid entry' }); continue
        }
        if (!isAllowedSourceUrl(f.sourceUrl)) {
          results.push({ path: f.path, ok: false, error: 'source host not allowed' }); continue
        }
        const r = await fetch(f.sourceUrl, { redirect: 'follow' })
        if (!r.ok) { results.push({ path: f.path, ok: false, error: `fetch ${r.status}` }); continue }
        const buf = new Uint8Array(await r.arrayBuffer())
        if (buf.length > 15 * 1024 * 1024) {
          results.push({ path: f.path, ok: false, error: 'file too large' }); continue
        }
        const { error } = await admin.storage.from(bucket).upload(f.path, buf, {
          contentType: f.contentType || 'image/jpeg', upsert: true,
        })
        results.push({ path: f.path, ok: !error, error: error?.message, size: buf.length })
      } catch (e) {
        results.push({ path: f?.path, ok: false, error: String(e) })
      }
    }
    return new Response(JSON.stringify({ results }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
  } catch (_e) {
    return new Response(JSON.stringify({ error: 'Internal error' }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
  }
})
