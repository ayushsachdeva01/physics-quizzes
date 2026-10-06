# Physora

Physora is a study-first Physics revision app built from the ChemistryRecall project architecture, adapted for **Class XI + Class XII Physics**.

## What is included

- Chapter-wise Physics formula library
- **401 formula entries** across 29 XI/XII chapters plus a constants/reference chapter
- MathJax rendering for clean equations
- Search by formula name, chapter, topic, or TeX content
- Class XI / Class XII filtering
- Chapter filtering
- One-click formula copying
- Formula active-recall sessions with self-grading
- Daily formula mission
- XP, levels, streaks, combos, achievements, recent activity, and local persistence
- Original **CCF v1 renderer** retained for rich content/custom quiz compatibility

## Formula data: one file

The entire formula library lives here:

`data/physics_formulas.json`

The application does not hard-code the Physics formula list into the UI.

Each chapter has this structure:

```json
{
  "grade": "XI",
  "id": "motion-straight-line",
  "name": "Motion in a Straight Line",
  "number": 2,
  "formulas": [
    {
      "id": "motion-straight-line-001",
      "name": "Uniform acceleration",
      "formula": "$v=u+at$",
      "notes": "",
      "topic": "Core"
    }
  ]
}
```

### Add a formula

Add another object to the chapter's `formulas` array:

```json
{
  "id": "motion-straight-line-014",
  "name": "Your formula name",
  "formula": "$v^2=u^2+2as$",
  "notes": "Optional condition, shortcut, or reminder.",
  "topic": "Kinematics"
}
```

### Add a chapter

Add another chapter object to `chapters` with its own unique `id`, `number`, and `formulas` array. The UI discovers it automatically.

## MathJax

Formula strings use standard MathJax/LaTeX syntax:

- Inline: `$v=u+at$`
- Fractions: `$\\frac{a}{b}$`
- Vectors: `$\\vec F=m\\vec a$`
- Integrals: `$\\int F\\,dx$`
- Greek symbols: `$\\omega,\\lambda,\\epsilon_0$`

MathJax is loaded from jsDelivr in `index.html`.

## CCF

CCF v1 remains available in `ccf-renderer.js`. It is intentionally isolated from the formula engine, so formula changes do not require touching the renderer.

This means the project can later support richer Physics cards such as:

- Free-body diagrams
- Ray diagrams
- Circuit diagrams
- Graphs
- Derivations
- Annotated equations
- Multi-step formula sheets

without changing the formula database format.

## Physics coverage

### Class XI

1. Units & Measurements
2. Motion in a Straight Line
3. Motion in a Plane
4. Laws of Motion
5. Work, Energy & Power
6. System of Particles & COM
7. Rotational Motion
8. Gravitation
9. Mechanical Properties of Solids
10. Mechanical Properties of Fluids
11. Thermal Properties of Matter
12. Thermodynamics
13. Kinetic Theory
14. Oscillations
15. Waves

### Class XII

16. Electric Charges & Fields
17. Electrostatic Potential & Capacitance
18. Current Electricity
19. Moving Charges & Magnetism
20. Magnetism & Matter
21. Electromagnetic Induction
22. Alternating Current
23. Electromagnetic Waves
24. Ray Optics & Optical Instruments
25. Wave Optics
26. Dual Nature of Radiation & Matter
27. Atoms
28. Nuclei
29. Semiconductor Electronics

The final reference chapter contains important constants and conversions used throughout both classes.

## Architecture

```text
index.html
    ↓
script.js
    ├── Physics formula browser
    ├── MathJax rendering
    ├── Formula recall
    ├── Daily mission
    ├── XP / levels / streaks
    └── Existing CCF/custom-quiz infrastructure

 data/physics_formulas.json
    └── All Physics content

 ccf-renderer.js
    └── CCF v1 rich-content renderer
```

The important design rule is: **content is data, not UI code**.

So changing a formula should normally require editing only `data/physics_formulas.json`.


## Physora formula modes (v3)

- **View formulas**: complete chapter-wise formula library. Each formula has one action: mark it important/unimportant.
- **Revise formulas**: choose a session length and explicitly select chapters (none are selected by default).
- Revision grading has exactly three choices: **I knew it**, **I need another look**, **I forgot**.
- Unimportant formulas are excluded from revision sessions.
- Formula source remains `data/physics_formulas.json`. Formulas may be written as `$...$`; the app normalizes those delimiters before MathJax rendering.
