import df from "durable-functions";

export default df.orchestrator(function* (context) {
  const input = context.df.getInput() || {};
  const since = input.since || process.env.DEFAULT_SINCE;

  // Core entities first (order matters for FKs)
  yield context.df.callActivity("act_properties", { since });
  yield context.df.callActivity("act_units", { since });
  yield context.df.callActivity("act_tenants", { since });
  yield context.df.callActivity("act_leases", { since });

  // Junctions depend on both leases & tenants
  yield context.df.callActivity("act_lease_tenants", { since });

  // Financials (payments, charges, credits)
  yield context.df.callActivity("act_financials", { since });

  return { ok: true, since, ts: new Date().toISOString() };
});
