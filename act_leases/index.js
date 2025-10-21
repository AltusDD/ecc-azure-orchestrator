import { dlCollect, sbUpsert } from "../shared/http.js";

export default async function (context) {
  const since = context.bindings.context?.since;
  const data = await dlCollect("leases", { since });
  const rows = data.map(l => ({
    doorloop_id: String(l.id),
    unit_doorloop_id: l.unit_id ? String(l.unit_id) : null,
    status: l.status || null,
    start_date: l.start_date || l.starts_on || null,
    end_date: l.end_date || l.ends_on || null
  }));
  if (rows.length > 0) {
    await sbUpsert("leases", rows, { onConflict: "doorloop_id" });
  }
  return { count: rows.length };
}
