# ECC Azure Orchestrator (Node 20 / Flex)

**Function App:** `empirecommandcenter-altus-node-staging`  
**HTTP Entry:** `GET/POST /api/syncall` → starts durable orchestration `orchestratorSyncAll` that fans out to activities.

## Verify after deploy
- Azure Portal shows 8 functions.
- `GET https://<app>.azurewebsites.net/api/syncall` → **202** with `statusQueryGetUri`.
