import { dlCollect, sbUpsert } from "../shared/http.js";

export default async function (context) {
  const since = context.bindings.context?.since;
  const data = await dlCollect("properties", { since });
  // Minimal mapping: keep DoorLoop ID & useful fields
  const rows = data.map(p => ({
    doorloop_id: String(p.id),
    name: p.name || p.address_line_1 || null,
    address: p.address_line_1 || null
  }));
  if (rows.length > 0) {
    await sbUpsert("properties", rows, { onConflict: "doorloop_id" });
  }
  return { count: rows.length };
}
