import df from "durable-functions";

export default async function (context, req) {
  const client = df.getClient(context);
  const since = req.query?.since || (typeof req.body === "object" && req.body?.since) || process.env.DEFAULT_SINCE;

  const instanceId = await client.startNew("orchestratorSyncAll", undefined, { since });
  context.log(`Started orchestration: ${instanceId}`);

  const res = client.createCheckStatusResponse(req, instanceId);
  // Add a friendly message
  res.body = { started: true, instanceId, since };
  context.res = res;
}
