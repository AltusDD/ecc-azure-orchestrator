const df = require("durable-functions");

module.exports = async function (context, req) {
  const client = df.getClient(context);
  const input = (req && req.body) || { entities: ["properties","units","tenants","leases","lease_tenants","financials"] };

  const instanceId = await client.startNew("orchestratorSyncAll", undefined, input);
  context.log(`Started orchestration with ID = ${instanceId}`);

  const response = client.createCheckStatusResponse(context.bindingData, instanceId);
  response.status = 202;
  context.res = response;
}