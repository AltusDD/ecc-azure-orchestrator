import { dlCollect, sbUpsert } from "../shared/http.js";

function txMap(items, type, leaseId) {
  return items.map(x => ({
    source_api: "doorloop",
    source_id: String(x.id),
    type,
    amount_cents: Math.round((x.amount || 0) * 100),
    posted_at: x.posted_at || x.date || x.created_at || null,
    lease_doorloop_id: leaseId
  }));
}

export default async function (context) {
  const since = context.bindings.context?.since;

  const leases = await dlCollect("leases", { since });
  let rows = [];
  for (const l of leases) {
    const lid = String(l.id);
    const payments  = await dlCollect(`leases/${lid}/payments`,           { since });
    const charges   = await dlCollect(`leases/${lid}/charges`,            { since });
    const credits   = await dlCollect(`leases/${lid}/credits`,            { since });
    const retPays   = await dlCollect(`leases/${lid}/returned-payments`,  { since });

    rows.push(...txMap(payments,  "Payment",         lid));
    rows.push(...txMap(charges,   "Charge",          lid));
    rows.push(...txMap(credits,   "Credit",          lid));
    rows.push(...txMap(retPays,   "ReturnedPayment", lid));
  }
  if (rows.length > 0) {
    await sbUpsert("transactions", rows, { onConflict: "source_id" });
  }
  return { count: rows.length };
}
