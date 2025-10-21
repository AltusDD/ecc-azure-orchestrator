export const SUPABASE_URL = process.env.SUPABASE_URL;
export const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
export const DOORLOOP_API_KEY = process.env.DOORLOOP_API_KEY;
export const DEFAULT_SINCE = process.env.DEFAULT_SINCE || "2025-01-01T00:00:00Z";
export const THROTTLE_MS = Number(process.env.THROTTLE_MS || "200");

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.warn("[WARN] SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not set.");
}
if (!DOORLOOP_API_KEY) {
  console.warn("[WARN] DOORLOOP_API_KEY not set (financials & some entities will fail).");
}
