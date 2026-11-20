# Content model

All public copy lives in `src/content/journey` as typed, bilingual data. Every
user-visible string is a localized value `{ en, ko }`, so the English and Korean
versions are saved statically and cannot drift apart.

## Shape

```text
Module  -> id, accent, title, tagline, art image, stages[4]
Stage   -> id, title, summary, visual, keyPoints[], decision, limitations[], evidence[]
Visual  -> one of: flow, hub, layers, cycle, matrix, spectrum, compare,
           bars, steps, stats, tiles, code
```

Each module has exactly four stages. A stage has at least three key points, at
most one highlighted (`key`) point, one decision and three evidence captures.

## Files

| File | Contains |
| --- | --- |
| `types.ts` | `L` (localized text), module, stage and visual types |
| `module1.ts` .. `module4.ts` | The four modules and their sixteen stages |
| `site.ts` | Identity, cover, overview, playbook goals, and the closing and notes copy |
| `iconNames.ts` | Registered icon names; `icons.tsx` maps them to Fluent icons |
| `imageSizes.json` | Pixel size per capture, used to reserve layout space |
| `index.ts` | Aggregates content and derives the slide list and ids |

UI strings (buttons, labels, aria text) live in `src/i18n/ui.ts`.

## Enforced invariants

`src/content/journey/content.test.ts` and `src/app/App.test.tsx` fail the build
when:

- Any text lacks an English or Korean value, or contains a question mark.
- Private planning context appears (attempt scores, countdowns, exam framing).
- A secret pattern appears: real resource names or hosts, GUIDs, key fragments.
- A slide id is duplicated, or a stage breaks the structure above.
- A referenced icon is not registered, or an image file is missing.
- The deck stops opening on the cover, switching language, navigating by
  button, keyboard and hash, or opening the capture lightbox.

## Adding or changing content

1. Edit the stage in the matching `moduleN.ts`; give every text both `en` and
   `ko`. Keep technical terms in English in the Korean text.
2. Add a masked capture to `public/img/foundry`, a WebP copy to `thumb/`, and
   its size to `imageSizes.json`. Never place a real key, endpoint or tenant id
   in a text or image.
3. Run `npm run lint`, `npm test` and `npm run build:dev`.

## Tone

Proposal style: short, specific and declarative. State what Microsoft Foundry
enables and how it is built. Highlight a point with colour only when it is a
real decision or constraint. Region, billing-tier and preview constraints are
listed as limitations instead of being worked around in the content.
