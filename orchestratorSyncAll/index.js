import df from "durable-functions";
const orchestrator = df.orchestrator(function* (context){ const input=context.df.getInput()||{}; yield context.df.callActivity("act_properties", input); yield context.df.callActivity("act_units", input); yield context.df.callActivity("act_tenants", input); yield context.df.callActivity("act_leases", input); yield context.df.callActivity("act_lease_tenants", input); yield context.df.callActivity("act_financials", input); return {ok:true};});
export default orchestrator;
