module.exports = async function (context) {
  const payload = context.bindings.context || context;
  context.log("[act_financials] invoked", payload);
  return { activity: "act_financials", status: "ok", at: new Date().toISOString() };
};
