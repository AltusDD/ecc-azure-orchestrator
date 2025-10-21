# ECC Azure Orchestrator (Durable Functions, Node 20 / Flex)

**App Name (staging):** `empirecommandcenter-altus-node-staging`  
**Entry HTTP:** `/api/syncall` → starts a durable orchestration (`orchestratorSyncAll`) which fans out to activity functions.

This repo is the **single source of truth** for the ECC Orchestrator. Replace existing contents with these files.

## Functions
- `syncall` (HTTP Trigger) → starts orchestration
- `orchestratorSyncAll` (Durable Orchestrator) → calls activities
- Activities:
  - `act_properties`
  - `act_units`
  - `act_tenants`
  - `act_leases`
  - `act_lease_tenants`
  - `act_financials`

## Local Dev
```bash
npm i -g azure-functions-core-tools@4 --unsafe-perm true
npm install
func start
# GET http://localhost:7071/api/syncall
```

## Azure (expected response)
- `GET/POST /api/syncall` → `202 Accepted` with `statusQueryGetUri` in response.

## CI/CD
GitHub Actions deploy via OIDC and Flex remote build.
