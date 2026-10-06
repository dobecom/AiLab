# Content model

All public copy lives in `src/content` as typed data, so the page cannot drift
from the rules the lab is held to.

## Status

```ts
type DeliveryStatus = 'planned' | 'building' | 'published'
```

| Status | Meaning |
| --- | --- |
| `planned` | Scoped, not started. |
| `building` | In progress; no verified result published yet. |
| `published` | Implemented, verified and inspectable. |

`published` requires a real artifact. Static sample output must never be shown
as a live model or agent result.

## Files

| File | Contains |
| --- | --- |
| `site.ts` | Identity, tagline, focus list, honesty notice, section order |
| `expertise.ts` | The four core expertise areas |
| `modules.ts` | Learning modules with theory / build / evidence stages |
| `playground.ts` | Planned playground experiences and the credential notice |
| `playbook.ts` | Discover, Prove, Operationalize, Scale |
| `about.ts` | How the lab grows, standards, learning journey, engineering |
| `types.ts` | Shared types and the status roll-up helper |

## Enforced invariants

`src/content/content.test.ts` and `src/app/App.test.tsx` fail the build when:

- Private exam context appears in public copy (attempt scores, pass score,
  countdown wording, the exam code).
- A status outside the allowed set is used.
- A module claims published evidence while its build or theory is not published.
- Any playground experience claims `published` before a live result exists.
- The section order or the four expertise areas and four playbook stages change
  without the tests being updated deliberately.
- The playground notice stops stating that no credential reaches the browser.

## Adding a module

1. Add an entry to `learningModules` with `theory`, `build` and `evidence`
   stages, all starting at `planned`.
2. Create the matching lab under `labs/` from `labs/_template`.
3. Move each stage forward only when the work behind it actually exists.
4. When the result is real, link it from the module and move the playground
   experience that exposes it to `published`.

## Tone

Plain, specific, and quiet. No marketing superlatives, no score dashboards, no
badge walls, no gradients or animation for decoration. The evidence is the
argument.
