module.exports = async function (context) {
  const payload = context.bindings.context || context;
  context.log("[act_properties] invoked", payload);
  return { activity: "act_properties", status: "ok", at: new Date().toISOString() };
}