# Lab 01 — Foundry project, keyless access and cost control

> Documentation verified against Microsoft Learn on: 2026-10-06
> Preview features used: none

## Measured skill

Plan and manage an Azure AI solution: create a Microsoft Foundry resource and
project, authenticate without keys, assign the narrowest role that works, and
make the cost of the environment visible and reversible before any other lab
is built on top of it.

## Architecture

```text
local developer (az login)
  -> DefaultAzureCredential
    -> Microsoft Foundry resource (Azure AI Services, kind=AIServices)
      -> Foundry project
```

- Authentication: `DefaultAzureCredential` locally; managed identity in Azure.
- Role assigned: **Foundry User** — the minimum role for building and testing
  against a project. Because the Foundry roles were renamed recently, the role
  definition ID is used instead of the display name.

| Role | Role definition ID |
| --- | --- |
| Foundry User | `53ca6127-db72-4b80-b1b0-d745d6d5456d` |
| Foundry Project Manager | `eadc314b-1a2d-4efa-be10-5d325db5065e` |
| Foundry Owner | `c883944f-8b7b-4483-af10-35834be79c4a` |
| Foundry Account Owner | `e47c6f54-e4a2-4754-9501-8e0985b135e1` |

## Prerequisites

- An Azure subscription where you can create resources and role assignments.
- Azure CLI signed in: `az login`
- Python 3.11 or newer.

## Setup

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
```

Edit `.env` with your own values. `FOUNDRY_RESOURCE_NAME` must be globally
unique because it becomes the custom domain. `.env` is ignored by Git.

## Provision

```powershell
.\scripts\provision.ps1
```

The script creates the resource group, the Foundry resource with a managed
identity and project management enabled, the project, a subscription budget
with an alert, and prints the project endpoint. The key flags:

| Flag | Why it is required |
| --- | --- |
| `--kind AIServices --sku S0` | Foundry resource type used by projects. |
| `--assign-identity` | Project management fails without a managed identity. |
| `--allow-project-management true` | Cannot be changed after creation. |
| `--custom-domain` | Must be globally unique, or creation fails with `CustomDomainInUse`. |

## Run

```powershell
python verify.py
```

`verify.py` proves three things without printing anything sensitive:

1. A token can be acquired through `DefaultAzureCredential` — keyless auth works.
2. The project endpoint answers through the `azure-ai-projects` client.
3. No API key is present in the environment, so nothing can silently fall back
   to key-based authentication.

## Verification checklist

- [ ] `az cognitiveservices account show --query properties.provisioningState`
      returns `Succeeded`.
- [ ] `az cognitiveservices account project show` returns the project.
- [ ] `python verify.py` reports a successful keyless token acquisition.
- [ ] `az role assignment list --scope $PROJECT_ID` shows only the roles you
      intended, scoped to the project rather than the subscription.
- [ ] A budget with an alert exists before any sustained use.
- [ ] Every resource carries `project=ailab`, `purpose=ai103-study` and an
      `expiry` tag.
- [ ] No key, token or connection string was written into the repository.

## Failure scenario

Run this deliberately and record what happens:

```powershell
az logout
python verify.py
```

Expected: `DefaultAzureCredential` fails to find a credential and the script
exits with a clear message rather than a stack trace. Sign in again with
`az login` and confirm it recovers.

A second useful failure: create the resource without `--assign-identity` and
observe that project creation fails because the managed identity is missing.

## Exam-style decision points

| Question | Choice | Why |
| --- | --- | --- |
| Key or Entra ID authentication? | Entra ID with `DefaultAzureCredential` | No secret to rotate, store or leak; works unchanged with managed identity in Azure. |
| Which role for a developer who only builds and tests? | Foundry User | Owner-level rights are not needed to call a project; least privilege is the exam-correct answer. |
| Where should the role be scoped? | The project resource ID | Subscription-wide assignment grants far more than the task requires. |
| Does an idle Foundry project cost money? | Not by itself | Charges come from what you attach: model deployments, Search, storage, managed compute. |

## Cost

| Item | Billing meter | Charged when idle? | Notes |
| --- | --- | --- | --- |
| Foundry resource (AIServices, S0) | Pay-as-you-go per API call | No | No charge without calls or deployments. |
| Foundry project | None directly | No | Organisational container. |
| Model deployment (added in lab 02) | Tokens for standard/serverless | No | Managed compute instead bills per hour while running. |
| Azure AI Search (added in the RAG lab) | Service tier, hourly | **Yes** | Delete it when the lab is finished. |
| Storage / monitoring attachments | Per GB and per ingested GB | **Yes** | Small, but it does not stop on its own. |

- Budget and alert: created by `provision.ps1` before anything else is added.
- Tags: `project=ailab`, `purpose=ai103-study`, `expiry=<date>`.
- Record the actual cost in Cost Management after the lab, by resource and meter.

## Teardown

```powershell
.\scripts\teardown.ps1
```

Then confirm nothing survived:

```powershell
az resource list --tag purpose=ai103-study --output table
az cognitiveservices account list --output table
```

Deleted Azure AI Services accounts are soft-deleted and keep the name reserved.
If you need to reuse the name immediately, purge it:

```powershell
az cognitiveservices account purge `
  --name $env:FOUNDRY_RESOURCE_NAME `
  --resource-group $env:AZURE_RESOURCE_GROUP `
  --location $env:AZURE_LOCATION
```

## References

- Create a project for Microsoft Foundry —
  <https://learn.microsoft.com/azure/ai-foundry/how-to/create-projects>
- Role-based access control for Microsoft Foundry —
  <https://learn.microsoft.com/azure/ai-foundry/concepts/rbac-foundry>
