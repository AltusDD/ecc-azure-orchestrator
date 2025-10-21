import { dlCollect, sbUpsert } from "../shared/http.js";

export default async function (context) {
  const since = context.bindings.context?.since;
  // DoorLoop: /v1/leases/{id}/tenants — we need lease list first
  const leases = await dlCollect("leases", { since });
  let rows = [];
  for (const l of leases) {
    const lid = String(l.id);
    const tns = await dlCollect(`leases/${lid}/tenants`, { since: null });
    rows.push(...tns.map(t => ({
      lease_doorloop_id: lid,
      tenant_doorloop_id: String(t.id)
    })));
  }
  if (rows.length > 0) {
    await sbUpsert("lease_tenants_dl", rows, { onConflict: "lease_doorloop_id,tenant_doorloop_id" });
  }
  return { count: rows.length };
}
