const df = require("durable-functions");

module.exports = df.orchestrator(function* (context) {
  const input = context.df.getInput() || { entities: [] };
  const entities = Array.isArray(input.entities) ? input.entities : [];
  const tasks = [];

  const map = {
    properties: "act_properties",
    units: "act_units",
    tenants: "act_tenants",
    leases: "act_leases",
    lease_tenants: "act_lease_tenants",
    financials: "act_financials"
  };

  for (const e of entities) {
    const fn = map[e];
    if (fn) {
      tasks.push(context.df.callActivity(fn, { entity: e, requestedAt: new Date().toISOString() }));
    }
  }

  const results = tasks.length ? (yield context.df.Task.all(tasks)) : [];
  return { ok: true, ran: entities, results };
});
