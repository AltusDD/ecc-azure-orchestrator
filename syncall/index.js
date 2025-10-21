import df from "durable-functions";
<<<<<<< HEAD

export default async function (context, req) {
  const client = df.getClient(context);
  const input = {
    since: process.env.DEFAULT_SINCE || null,
    throttleMs: Number(process.env.THROTTLE_MS || 200)
  };

  const instanceId = await client.startNew("orchestratorSyncAll", undefined, input);
  context.log(`Started orchestration with ID = '${instanceId}'.`);

  const location = client.createCheckStatusResponse(req, instanceId);
  return {
    status: 202,
    headers: { "Content-Type": "application/json" },
    body: {
      message: "syncall started",
      instanceId,
      statusQueryGetUri: location.headers["Location"]
    }
  };
}
=======
export default async function (context, req) { const client = df.getClient(context); const input = { since: process.env.DEFAULT_SINCE||null, throttleMs: Number(process.env.THROTTLE_MS||200)}; const id = await client.startNew("orchestratorSyncAll", undefined, input); return client.createCheckStatusResponse(req, id);}
>>>>>>> 5e7f44317567773cddf703c3b33650a11240aeb2
