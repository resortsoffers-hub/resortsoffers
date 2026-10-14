#!/usr/bin/env bash
# Makes sure the Cloudflare Pages project for this site exists, creating it
# on the first deploy, and exports the account id for wrangler.
#
# Needs CLOUDFLARE_API_TOKEN. CLOUDFLARE_ACCOUNT_ID is optional when the token
# can only see one account.
set -euo pipefail

PROJECT="${PAGES_PROJECT:?PAGES_PROJECT is not set}"
API="https://api.cloudflare.com/client/v4"

: "${CLOUDFLARE_API_TOKEN:?CLOUDFLARE_API_TOKEN is not set}"

# A token pasted from a phone often carries a trailing newline or space.
CLOUDFLARE_API_TOKEN=$(printf '%s' "$CLOUDFLARE_API_TOKEN" | tr -d '[:space:]')
if [[ ! "$CLOUDFLARE_API_TOKEN" =~ ^[A-Za-z0-9_-]+$ ]]; then
  echo "::error::CLOUDFLARE_API_TOKEN (${#CLOUDFLARE_API_TOKEN} characters) is not a bare token; paste only the token value." >&2
  exit 1
fi
echo "Token length: ${#CLOUDFLARE_API_TOKEN} characters."

cf() {
  local method="$1" path="$2" body="${3:-}"
  if [[ -n "$body" ]]; then
    curl -sS -X "$method" "$API$path" -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
      -H "Content-Type: application/json" --data "$body"
  else
    curl -sS -X "$method" "$API$path" -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
  fi
}

ok() { jq -e '.success == true' >/dev/null <<<"$1"; }
errors() { jq -r '[.errors[]? | "\(.code): \(.message)", (.error_chain[]? | "\(.code): \(.message)")] | join("; ")' <<<"$1"; }

account_id() {
  if [[ -n "${CLOUDFLARE_ACCOUNT_ID:-}" ]]; then
    echo "$CLOUDFLARE_ACCOUNT_ID"
    return
  fi
  local res count
  res=$(cf GET "/accounts?per_page=50")
  ok "$res" || { echo "::error::Could not list accounts: $(errors "$res")" >&2; exit 1; }
  count=$(jq '.result | length' <<<"$res")
  if [[ "$count" != "1" ]]; then
    echo "::error::The token can see $count accounts; set the CLOUDFLARE_ACCOUNT_ID secret." >&2
    exit 1
  fi
  jq -r '.result[0].id' <<<"$res"
}

ACCOUNT=$(account_id)

pages_subdomain() {
  local res
  res=$(cf GET "/accounts/$ACCOUNT/pages/projects/$PROJECT")
  ok "$res" && jq -r '.result.subdomain' <<<"$res"
}

ensure_project() {
  if pages_subdomain >/dev/null; then
    echo "Pages project '$PROJECT' exists."
  else
    local res
    res=$(cf POST "/accounts/$ACCOUNT/pages/projects" \
      "$(jq -nc --arg n "$PROJECT" '{name: $n, production_branch: "main"}')")
    ok "$res" || { echo "::error::Could not create Pages project: $(errors "$res")" >&2; exit 1; }
    echo "Created Pages project '$PROJECT'."
  fi
  echo "Pages address: https://$(pages_subdomain)" | tee -a "${GITHUB_STEP_SUMMARY:-/dev/null}"
  if [[ -n "${GITHUB_ENV:-}" ]]; then
    echo "CLOUDFLARE_ACCOUNT_ID=$ACCOUNT" >>"$GITHUB_ENV"
    echo "::add-mask::$CLOUDFLARE_API_TOKEN"
    echo "CF_PAGES_TOKEN=$CLOUDFLARE_API_TOKEN" >>"$GITHUB_ENV"
  fi
}

ensure_project
