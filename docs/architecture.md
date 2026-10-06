# Architecture

## Today

```text
Browser
  -> Cloudflare -> Caddy (production)
       -> ailab-web container (Nginx, static React build)
            /           SPA
            /healthz    200 ok
            /api/*      404 — no AiLab backend exists yet
```

Local binding is `127.0.0.1:2050 -> 80`. Nothing is published on `0.0.0.0`.

## When live Foundry features are added

```text
Browser
  -> ailab-web (Nginx)
       -> /api/v1/ailab/* proxied to core-server:3100
            -> Core-Server src/ailab module
                 -> DefaultAzureCredential / managed identity
                      -> Microsoft Foundry project
                           -> model deployments, agents, search, speech, vision
```

Rules that do not change:

- There is no separate AiLab backend repository or container.
- Only `/api/v1/ailab/*` is proxied; any other `/api/` path stays a 404.
- Azure credentials live on the server side. The browser bundle never contains
  a key, token, connection string, subscription id or tenant id.

## Frontend

A single static page assembled from typed content:

```text
src/content/*.ts        data and its invariants
src/components/*.tsx    one component per public section
src/app/App.tsx         shell: header, main, footer
src/main.tsx            FluentProvider + React root
```

Section order is fixed by `navigation` in `src/content/site.ts` and asserted in
tests, because the information architecture is a requirement rather than a
layout preference:

1. Professional identity (hero)
2. Core expertise
3. Learning modules and labs
4. Embedded playground
5. AI transformation playbook
6. About the lab

## Build-time SEO

`vite.config.ts` contains a small plugin that:

- injects `canonical` and `og:url` from `VITE_SITE_URL`,
- injects `robots` `index, follow` only for a `prod` build on an `https` origin,
- emits `sitemap.xml` and a matching `robots.txt`.

This keeps the published origin in one place and prevents a preview build from
being indexed.

## Accessibility

- A skip link precedes the header and targets `#main`.
- `header`, `nav[aria-label]`, `main`, `section[aria-labelledby]` and `footer`
  landmarks are used throughout.
- Headings run `h1` once, then `h2` per section and `h3` per item.
- Layout uses `rem` units and `auto-fit` grids so 200% zoom and narrow
  viewports reflow instead of clipping.
- `prefers-reduced-motion` disables smooth scrolling and animation.
- Focus is always visible through `:focus-visible`.

## Security headers

Set by Nginx (see `nginx.conf`, and the Compose-mounted copy in
`Core-DevOps/docker/nginx/ailab.conf`):

| Header | Value |
| --- | --- |
| Content-Security-Policy | `default-src 'self'` with `style-src 'self' 'unsafe-inline'` for Griffel's runtime styles |
| X-Content-Type-Options | `nosniff` |
| X-Frame-Options | `DENY` |
| Referrer-Policy | `strict-origin-when-cross-origin` |
| Permissions-Policy | `camera=(), microphone=(), geolocation=()` |

`server_tokens` is off. Access logs are structured JSON on stdout, errors on
stderr, rotated by Docker's `local` logging driver.

Note: `script-src 'self'` blocks inline scripts, so no inline JSON-LD block is
used. If structured data is added later it needs a hash in the CSP rather than
a relaxed policy.
