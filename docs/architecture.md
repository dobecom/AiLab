# Architecture

## Today

```text
Browser
  -> Cloudflare -> Caddy (production)
       -> ailab-web container (Nginx, static React build)
            /           SPA (slide deck)
            /img/*      static captures and artwork, cached 7 days
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

A single static page presented as a horizontal slide deck:

```text
src/content/journey/            bilingual content and its invariants
src/components/journey/         Journey (deck), TopBar, Rail, slides, Lightbox
src/components/journey/visuals/ VisualRenderer plus SVG/CSS diagram and data visuals
src/i18n/                       LangProvider (en/ko, persisted) and UI strings
src/app/App.tsx                 shell: skip link, top bar, deck, rail
src/main.tsx                    FluentProvider (dark theme) + LangProvider + React root
```

Slide order is derived from the content: cover, overview, then for each module
a module slide and four stage slides, then two closing slides: `closing` (the
AI transformation playbook) and `notes` (expertise, standards, embedded
playground and environment notes). The active slide is
mirrored in the URL hash (`#cover`, `#m2`, `#m2-s3`), so every slide is a
shareable link and the back button works.

Visuals are data-driven: a stage declares a visual kind and its data, and
`VisualRenderer` draws it with SVG and CSS. There is no chart library and no
runtime network call, which keeps the CSP at `default-src 'self'`.

Static assets:

| Path | Content | Cache |
| --- | --- | --- |
| `/img/foundry/imgN.png` | Masked evidence captures | 7 days |
| `/img/foundry/thumb/imgN.webp` | Thumbnails used in the stage layout | 7 days |
| `/img/art/*.webp` | Cover and module artwork | 7 days |

Language is held in `LangProvider`, persisted in `localStorage` and reflected
in `<html lang>`. Only text switches; images and layout are shared.

## Build-time SEO

`vite.config.ts` contains a small plugin that:

- injects `canonical` and `og:url` from `VITE_SITE_URL`,
- injects `robots` `index, follow` only for a `prod` build on an `https` origin,
- emits `sitemap.xml` and a matching `robots.txt`.

This keeps the published origin in one place and prevents a preview build from
being indexed.

## Accessibility

- A skip link precedes the top bar and targets the deck.
- Inactive slides are `inert` and `aria-hidden`, so keyboard and screen reader
  users only reach the visible slide.
- Edge buttons, the rail and the arrow, Home and End keys move through the deck.
- The language button states its action in the current language.
- Captures open in a Fluent dialog with a caption, previous/next buttons and a
  close button.
- Layout uses container queries and `rem` units so 200% zoom and narrow
  viewports reflow instead of clipping.
- `prefers-reduced-motion` disables slide transitions and all animation.
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
