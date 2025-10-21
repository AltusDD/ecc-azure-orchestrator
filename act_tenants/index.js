module.exports = async function (context) {
  const payload = context.bindings.context || context;
  context.log("[act_tenants] invoked", payload);
  return { activity: "act_tenants", status: "ok", at: new Date().toISOString() };
}