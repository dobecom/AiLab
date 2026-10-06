# AiLab

**AI Apps and Agents Developer — a public Microsoft Foundry engineering lab.**

AiLab is three things at once:

1. A professional portfolio for building generative AI applications and agents.
2. A public playground where Microsoft Foundry models and agents can be tried
   directly rather than described.
3. A long-lived reference for taking AI from a first experiment to something an
   organisation can run safely.

Public site: <https://ailab.dobecom.me> (local: <http://127.0.0.1:2050>)

## The content contract

Every published item is added as one set:

| Stage | What it means |
| --- | --- |
| Theory | The concept, the service selection criteria and the decisions that matter |
| Foundry build | The idea implemented in a Microsoft Foundry project |
| Result | Real model or agent output, traces, token usage, latency and scores |
| Evidence | Architecture, code, configuration, failures, fixes, security and cost |

Items are labelled **Planned**, **Building** or **Published**. A placeholder is
never shown as a live model result. Tests in `src/content/content.test.ts`
enforce this and keep private context off the public page.

## Stack

- React 19, TypeScript, Vite, Fluent UI React Components
- Nginx in a container, behind Caddy and Cloudflare in production
- Python first for the labs under `labs/`
- No AiLab backend: live Foundry features will be served by the shared
  Core-Server module at `/api/v1/ailab/*`

## Repository layout

```text
src/content/    typed content model and its safety tests
src/components/ page sections
src/app/        application shell and its tests
labs/           Python labs, one directory each, with teardown and cost notes
docs/           architecture, content model, cost and cleanup notes
nginx.conf      standalone container config (Compose mounts its own copy)
```

## Local development

```powershell
Set-Location D:\Projects\AiLab
npm ci
npm run lint
npm test
npm run build:dev
npm run build:prod
npm run dev          # http://127.0.0.1:2050
```

`npm run build:prod` needs the public origin:

```powershell
$env:VITE_SITE_URL = 'https://ailab.dobecom.me'
npm run build:prod
```

Only `prod` builds with an `https://` origin are marked indexable; every other
build emits `robots.txt` with `Disallow: /`.

## Container

The `ailab-web` service lives in the shared `core` Compose project:

```powershell
Set-Location D:\Projects\Core-DevOps
.\docker\validate.ps1
.\docker\create.ps1
.\docker\status.ps1
```

Verify:

```text
http://127.0.0.1:2050/
http://127.0.0.1:2050/healthz   -> 200 ok
http://127.0.0.1:2050/api/x     -> 404 (no backend yet)
```

The port is bound to loopback only. Public traffic reaches the site through
Cloudflare and Caddy, never through a directly exposed port.

## Labs

See [labs/README.md](labs/README.md). Every lab states its billing meters, the
smallest SKU that demonstrates the skill, the tags it applies, a teardown
command and a post-deletion check.

## Secrets

Nothing secret belongs in this repository: no API key, connection string,
subscription or tenant identifier, token, private endpoint or personal data.
`.env.example` holds placeholders only. Authentication is keyless —
`DefaultAzureCredential` locally, managed identity in Azure — and the browser
never receives an Azure or Foundry credential.

## Documentation

- [docs/architecture.md](docs/architecture.md)
- [docs/content-model.md](docs/content-model.md)
- [docs/cost-and-cleanup.md](docs/cost-and-cleanup.md)
