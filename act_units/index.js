import { dlCollect, sbUpsert } from "../shared/http.js";

export default async function (context) {
  const since = context.bindings.context?.since;
  const data = await dlCollect("units", { since });
  const rows = data.map(u => ({
    doorloop_id: String(u.id),
    property_doorloop_id: u.property_id ? String(u.property_id) : null,
    unit_number: u.unit_number || u.name || null
  }));
  if (rows.length > 0) {
    await sbUpsert("units", rows, { onConflict: "doorloop_id" });
  }
  return { count: rows.length };
}
