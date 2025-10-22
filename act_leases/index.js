module.exports = async function (context) {
  const payload = context.bindings.context || context;
  context.log("[act_leases] invoked", payload);
  return { activity: "act_leases", status: "ok", at: new Date().toISOString() };
};
