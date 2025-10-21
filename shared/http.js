import fetch from "node-fetch";
import { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, DOORLOOP_API_KEY, THROTTLE_MS } from "./env.js";

// DoorLoop fetcher (paginates with ?page & ?limit, supports updated_at >= DEFAULT_SINCE)
export async function dlCollect(endpoint, { since, limit=100 } = {}) {
  if (!DOORLOOP_API_KEY) return [];
  const out = [];
  let page = 1;
  let keep = true;
  while (keep) {
    const url = new URL(`https://api.doorloop.com/v1/${endpoint}`);
    url.searchParams.set("limit", String(limit));
    if (since) url.searchParams.set("updated_at[gte]", since);
    if (page > 1) url.searchParams.set("page", String(page));
    const res = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${DOORLOOP_API_KEY}`, Accept: "application/json" }
    });
    if (!res.ok) {
      const txt = await res.text();
      throw new Error(`[DoorLoop ${endpoint}] ${res.status}: ${txt.slice(0,400)}`);
    }
    const arr = await res.json();
    if (!Array.isArray(arr) || arr.length === 0) keep = false;
    else {
      out.push(...arr);
      page++;
      await new Promise(r => setTimeout(r, THROTTLE_MS));
    }
  }
  return out;
}

// Supabase REST upsert (bulk). on_conflict=<col> to merge.
export async function sbUpsert(table, rows, { onConflict } = {}) {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) return { inserted:0, updated:0, total:0 };

  const url = new URL(`${SUPABASE_URL}/rest/v1/${table}`);
  if (onConflict) url.searchParams.set("on_conflict", onConflict);

  const res = await fetch(url.toString(), {
    method: "POST",
    headers: {
      apikey: SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates,return=representation"
    },
    body: JSON.stringify(rows)
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`[Supabase ${table} upsert] ${res.status}: ${txt.slice(0,400)}`);
  }
  const body = await res.json();
  return { total: Array.isArray(body) ? body.length : 0 };
}
