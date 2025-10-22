module.exports = async function (context) {
  const payload = context.bindings.context || context;
  context.log("[act_units] invoked", payload);
  return { activity: "act_units", status: "ok", at: new Date().toISOString() };
};
