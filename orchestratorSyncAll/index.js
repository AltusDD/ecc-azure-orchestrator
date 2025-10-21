import df from "durable-functions";
<<<<<<< HEAD

const orchestrator = df.orchestrator(function* (context) {
  const input = context.df.getInput() || {};
  const throttleMs = input.throttleMs || 200;

  // Run activities in order (you can make these parallel later if needed)
  yield context.df.callActivity("act_properties", input);
  yield context.df.callActivity("act_units", input);
  yield context.df.callActivity("act_tenants", input);
  yield context.df.callActivity("act_leases", input);
  yield context.df.callActivity("act_lease_tenants", input);
  yield context.df.callActivity("act_financials", input);

  // small pacing pause (optional)
  yield context.df.createTimer(new Date(context.df.currentUtcDateTime.getTime() + throttleMs));

  return { ok: true, ran: ["properties","units","tenants","leases","lease_tenants","financials"] };
});

=======
const orchestrator = df.orchestrator(function* (context){ const input=context.df.getInput()||{}; yield context.df.callActivity("act_properties", input); yield context.df.callActivity("act_units", input); yield context.df.callActivity("act_tenants", input); yield context.df.callActivity("act_leases", input); yield context.df.callActivity("act_lease_tenants", input); yield context.df.callActivity("act_financials", input); return {ok:true};});
>>>>>>> 5e7f44317567773cddf703c3b33650a11240aeb2
export default orchestrator;
