# Grasp it!

> **Create your own training plan.**

A high-fidelity, interactive mobile prototype for a CrossFit programming app.
A user picks a training goal, dials in how many sessions they want, flags the
movements they love and the ones to leave out — and gets a structured,
progressive plan back. Every session details a warm-up, a skill/strength
block, a conditioning WOD (with benchmark scores for the famous ones), and a
cool-down. Plans export to a clean, print-ready PDF.

Built as a single-page React prototype (inline JSX via Babel) inside an iOS
device frame. Apple-grade visual language — flat surfaces, generous radii,
DM Mono for all data — with a goal-themed accent system.

---

## Running it

Open **`Grasp it.html`** in a browser. No build step, no server — it loads
React, ReactDOM and Babel from CDN and transpiles the `.jsx` files in place.
An internet connection is needed for the CDN scripts and the Google Font.

For an **offline / shareable** copy, use **`Grasp it - Standalone.html`** — a
single self-contained file (~1.4 MB) with all fonts, libraries and app code
inlined. It runs with no internet connection. It is a *compiled output*: don't
edit it by hand — edit the source files and re-bundle.

---

## The flow

1. **Builder** (the centerpiece) — a 4-step wizard:
   - **Goal** — Strength, Aerobic endurance, or Gymnastics. The whole UI
     re-themes to the goal's accent colour.
   - **Volume** — numeric stepper + slider, 3–24 sessions, with presets.
   - **Priorities** — selectable chips + a free-form field for custom entries.
   - **Limits** — exclusions, same UI, styled as "avoid".
2. **Generating** — a brief animated building state.
3. **Plan** — accent hero (goal, volume, stats), your priority/exclusion tags,
   and the sessions grouped into 4 progressive phases (Base → Threshold →
   Intervals → Peak). Each card shows duration + a 5-dot intensity meter.
4. **Session detail** — all four blocks: Warm-up, Skill/Strength primer (with
   YouTube demo links on key moves), the Conditioning WOD (format, structure,
   RX, cap, coaching note), and Cool-down. Prev/next navigation.
5. **Benchmark WOD detail** — full structure plus Elite / Intermediate /
   Amateur score tiers, rendered as gold/silver/bronze medal chips.
6. **Save as PDF** — exports the full plan (every session detailed, with
   benchmark tables) as a print-ready A4 document via the browser print dialog.

---

## Files

| File | Role |
| --- | --- |
| `Grasp it.html` | **Main entry.** Design tokens (CSS), print styles, root `App` (routing + state), and the Tweaks panel wiring. |
| `Grasp it - Standalone.html` | Compiled single-file offline build. Generated — do not hand-edit. |
| `app-data.js` | All mock content: goals, preference/dislike chips, the 16-session Aerobic Endurance plan, famous WODs + benchmark tiers, phase definitions. Plain JS → `window.GRASP`. |
| `icons.jsx` | Stroke icon set + shared primitives (`Icon`, `TopBar`, `RankBadge`). |
| `builder.jsx` | The 4-step builder flow (`BuilderFlow`, stepper, slider, chip fields). |
| `plan.jsx` | Generating state, plan overview, session detail (`Generating`, `PlanScreen`, `SessionDetail`). |
| `wod.jsx` | Famous benchmark WOD detail screen (`WodDetail`). |
| `print.jsx` | The printable plan document (`PrintDoc`), rendered on-demand during export. |
| `ios-frame.jsx` | iOS device frame (starter component). |
| `tweaks-panel.jsx` | Tweaks panel shell + `useTweaks` (starter component). |
| `shots/` | Working screenshots from development. |

Each `.jsx` file exports its components to `window` at the end, so they're
shared across the separately-transpiled Babel scripts.

---

## Tweaks

Toggle the **Tweaks** panel from the toolbar to adjust live:

- **Session card style** — stacked / timeline / compact
- **Density** — compact / regular / comfy
- **Accent** — blue / red / purple / teal (also follows the selected goal)
- **Dark mode**

---

## Notes & conventions

- **Goals vs. content.** The authored plan content is the Aerobic Endurance
  block. Selecting Strength or Gymnastics re-themes the UI and accent but keeps
  the aerobic sessions — authored content for those goals is a future addition.
- **Volume.** Choosing fewer than 16 sessions trims the plan to the first N
  authored sessions; the phase grouping and week estimate update accordingly.
- **Type & colour.** Hanken Grotesk (display) + DM Mono (all data: timings,
  %1RM, scores). Goal-themed accent drives every highlight. No emoji — the
  benchmark tiers use medal chips, per the Apple-clean direction.
- **No backend.** Everything is hand-authored mock data, structured so a real
  generation engine could plug in later.

---

## Editing

Edit the source `.jsx` / `.js` / `Grasp it.html` files directly. Component
scope is shared via `window`, so give any module-scope objects unique names.
After changing the source, re-bundle to refresh the standalone build.
