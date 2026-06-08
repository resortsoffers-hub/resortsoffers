import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'
import { createClient } from 'npm:@supabase/supabase-js@2'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  try {
    const { bucket, files } = await req.json()
    if (!bucket || !Array.isArray(files)) {
      return new Response(JSON.stringify({ error: 'bucket and files[] required' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }
    const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)
    const results: any[] = []
    for (const f of files) {
      try {
        const r = await fetch(f.sourceUrl)
        if (!r.ok) { results.push({ path: f.path, ok: false, error: `fetch ${r.status}` }); continue }
        const buf = new Uint8Array(await r.arrayBuffer())
        const { error } = await supabase.storage.from(bucket).upload(f.path, buf, {
          contentType: f.contentType || 'image/jpeg', upsert: true,
        })
        results.push({ path: f.path, ok: !error, error: error?.message, size: buf.length })
      } catch (e) {
        results.push({ path: f.path, ok: false, error: String(e) })
      }
    }
    return new Response(JSON.stringify({ results }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
  }
})
