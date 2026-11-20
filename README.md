# AiLab

**AI Apps and Agents Developer — a public Microsoft Foundry engineering lab.**

AiLab is three things at once:

1. A professional portfolio for building generative AI applications and agents.
2. A public playground where Microsoft Foundry models and agents can be tried
   directly rather than described.
3. A long-lived reference for taking AI from a first experiment to something an
   organisation can run safely.

Public site: <https://ailab.dobecom.me> (local: <http://127.0.0.1:2050>)

## The journey deck

The site is a proposal-style slide deck rather than a long page. Visitors move
horizontally through 24 slides: a cover, an overview map, four modules that
each open with a module slide followed by four stages, and two closing slides
(the AI transformation playbook, then expertise, standards and environment notes).

| Module | Scope |
| --- | --- |
| 1 · Generative AI Apps | Model selection, evaluation, build and optimisation of generative applications |
| 2 · Agentic Solutions | Agents, tools and knowledge, integration and automation, multi-agent orchestration |
| 3 · Language & Voice | Text analysis, speech to text, text to speech, Voice Live and translation |
| 4 · Vision & Documents | Image understanding and generation, Document Intelligence, Content Understanding and knowledge mining |

Each stage pairs a visual (flow, hub, layers, cycle, matrix, spectrum,
comparison, bars, steps, stats, tiles or code) with key points, a decision and
recorded evidence captures. Captures open in a lightbox. Items that depend on
region, billing tier or a preview feature are stated as **Limitations**.

Navigation: edge buttons, the journey rail, the keyboard (arrows, Home, End)
and the URL hash (`#m2-s3`) which makes every slide linkable.

## Languages

English is the default. The globe icon in the top bar switches the text to
Korean without reloading. The choice is stored in `localStorage` and the
`<html lang>` attribute follows it. Technical terms stay in English in both
languages. Both versions live statically in the same typed content files, so
nothing is translated at runtime.

## Stack

- React 19, TypeScript, Vite, Fluent UI React Components and icons
- Static SVG and CSS visuals; no chart library and no runtime network calls
- Nginx in a container, behind Caddy and Cloudflare in production
- Python first for the labs under `labs/`
- No AiLab backend: live Foundry features will be served by the shared
  Core-Server module at `/api/v1/ailab/*`

## Repository layout

```text
src/content/journey/        bilingual content (module1-4, site, types) and its tests
src/components/journey/     deck, slides, rail, lightbox
src/components/journey/visuals/  data-driven SVG and CSS visual renderers
src/i18n/                   language provider and UI strings
src/app/                    shell, CSS (base, slides, visuals) and its tests
public/img/foundry/         evidence captures (PNG) and thumb/ (WebP)
public/img/art/             cover and module artwork (WebP)
labs/                       Python labs, one directory each, with teardown and cost notes
docs/                       architecture, content model, cost and cleanup notes
nginx.conf                  standalone container config (Compose mounts its own copy)
```

## Evidence images and masking

The captures in `public/img/foundry` are served as static files under `/img/`
with a seven-day cache. Every capture is checked before publication, and keys,
endpoints, resource names and tenant identifiers are masked in the pixels.
Content text uses placeholders such as `<resource-name>`, `<project-name>`,
`<tenant-id>` and `<API-KEY>`. `content.test.ts` fails if a real host name,
GUID or key fragment appears in any text. Add a new capture only after masking
it, then register its size in `imageSizes.json`.

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
