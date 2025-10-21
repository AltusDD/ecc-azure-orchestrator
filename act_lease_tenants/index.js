export default async function (context, input){ context.log(`[${context.executionContext.functionName}]`, input||{}); return {ok:true};}
