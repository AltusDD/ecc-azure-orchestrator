import { dlCollect, sbUpsert } from "../shared/http.js";

export default async function (context) {
  const since = context.bindings.context?.since;
  const data = await dlCollect("tenants", { since });
  const rows = data.map(t => ({
    doorloop_id: String(t.id),
    full_name: t.name || t.full_name || null,
    email: t.email || null,
    phone: t.phone || null
  }));
  if (rows.length > 0) {
    await sbUpsert("people", rows, { onConflict: "doorloop_id" });
  }
  return { count: rows.length };
}
