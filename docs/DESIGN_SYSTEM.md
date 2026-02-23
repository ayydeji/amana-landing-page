# DESIGN_SYSTEM.md — Amana Compliance

This document is the single source of truth for all visual decisions. Read it fully before writing any component, layout, or style.

---

## Design Philosophy

Dark, restrained, institutional. This is a compliance consultancy, not a startup. The aesthetic should feel like a senior professional's office: serious, calm, confident. The visitor should think *"these people don't mess around"* — not *"this looks cool."*

Visual principles:

- **Density over sprawl** — Compact information, generous whitespace between sections. No section should feel like it's stretching to fill space
- **One visual idea per section** — Each section has one dominant element (stat, grid, bar, line). If you're adding a second, you're overdesigning
- **Dark surfaces, light type, lime accents** — The dark background forces restraint. Lime is rationed for: CTAs, active states, labels, and stats
- **Red is danger only** — Reserved exclusively for penalty amounts, risk indicators, and the enforcement badge. Never decorative

---

## Color Tokens

All colors are CSS custom properties defined in `globals.css`. Reference them via Tailwind's `var()` integration or extend the theme.

### Surfaces

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg` | `#0d1f0d` | Page background, base layer |
| `--bg-card` | `#132613` | Card backgrounds, elevated sections (segments, guide, services) |
| `--bg-elevated` | `#1a3319` | Hover state for cards |

### Text

| Token | Hex | Usage |
|-------|-----|-------|
| `--text` | `#e8ede4` | Primary text. Headlines, card titles, strong body |
| `--text-dim` | `#9aab8e` | Body copy, descriptions, subtitles |
| `--text-faint` | `#6b7d60` | Tertiary. Stat descriptions, footer, timestamps |

### Accent — Lime

| Token | Hex | Usage |
|-------|-----|-------|
| `--lime` | `#c4e844` | Primary CTA fills, active tab fills, stat numbers, section labels |
| `--lime-dim` | `#a8c83a` | CTA hover state |
| `--lime-glow` | `rgba(196,232,68,0.10)` | Icon container backgrounds |

### Accent — Red (danger only)

| Token | Hex | Usage |
|-------|-----|-------|
| `--red` | `#e85454` | Penalty amounts, risk dots, enforcement badge text |
| `--red-bg` | `rgba(232,84,84,0.10)` | Badge background, stat highlight backgrounds |
| `--red-border` | `rgba(232,84,84,0.20)` | Badge border, penalty note border |

### Borders

| Token | Hex | Usage |
|-------|-----|-------|
| `--border` | `rgba(196,232,68,0.10)` | Active/hover card borders, lime-tinted dividers |
| `--border-subtle` | `rgba(255,255,255,0.06)` | Default card borders, section dividers, risk item separators |

### Focus

| State | Style |
|-------|-------|
| Focus visible | `ring-2 ring-[--lime] ring-offset-2 ring-offset-[--bg]` |
| Tab focus on dark | Lime outline, 2px offset against dark background |

---

## Typography

### Font Stack

| Role | Family | Source | Weight |
|------|--------|--------|--------|
| Display | `Instrument Serif` | Google Fonts via `next/font` | 400 only (regular + italic) |
| Body | `DM Sans` | Google Fonts via `next/font` | 400, 500, 600, 700 |

`Instrument Serif` is used for all headlines, stat numbers, plan step titles, and the success line. It is always `font-weight: 400`. It does not come in bold — if something needs emphasis, increase size or use the italic variant.

`DM Sans` is used for everything else: body copy, nav links, buttons, labels, card descriptions.

### Type Scale

Map these to Tailwind classes. Do not use arbitrary `text-[Xpx]` values.

| Role | Size | Line Height | Font | Weight | Tailwind |
|------|------|-------------|------|--------|----------|
| Hero h1 | 58px / 32px mobile | 1.1 | Instrument Serif | 400 | `text-[3.625rem]` / `text-[2rem]` |
| Section title | 40px / 32px mobile | 1.2 | Instrument Serif | 400 | `text-[2.5rem]` / `text-[2rem]` |
| Segment h3 | 26px | 1.25 | Instrument Serif | 400 | `text-[1.625rem]` |
| Plan step h3 | 20px | 1.3 | Instrument Serif | 400 | `text-xl` |
| Success line | 22px | 1.3 | Instrument Serif | 400 | `text-[1.375rem]` |
| CTA h2 | 46px / 32px mobile | 1.2 | Instrument Serif | 400 | `text-[2.875rem]` / `text-[2rem]` |
| Stat number | 34px | 1.0 | Instrument Serif | 400 | `text-[2.125rem]` |
| Penalty amount | 28px | 1.0 | Instrument Serif | 400 | `text-[1.75rem]` |
| Body | 15px | 1.75 | DM Sans | 400 | `text-[0.9375rem]` |
| Body large | 18px | 1.7 | DM Sans | 400 | `text-lg` |
| Nav link | 14px | 1.5 | DM Sans | 500 | `text-sm font-medium` |
| Section label | 12px | 1.0 | DM Sans | 700 | `text-xs font-bold tracking-[3px] uppercase` |
| Button | 15px | 1.0 | DM Sans | 600 | `text-[0.9375rem] font-semibold` |
| Small / meta | 13px | 1.5 | DM Sans | 600 | `text-[0.8125rem] font-semibold` |
| Tiny / detail | 12px | 1.4 | DM Sans | 400-600 | `text-xs` |

---

## Spacing

Use Tailwind's default spacing scale. Key recurring values:

| Context | Value | Tailwind |
|---------|-------|----------|
| Section vertical padding | 100px / 72px mobile | `py-24` / `py-18` |
| Section max-width | 1100px | `max-w-[1100px]` (tokenize as `--container`) |
| Section horizontal padding | 32px / 24px mobile | `px-8` / `px-6` |
| Between section label and title | 14px | `mb-3.5` |
| Between title and content | 48px | `mb-12` |
| Card padding | 24-32px | `p-6` to `p-8` |
| Card gap in grids | 12-20px | `gap-3` to `gap-5` |
| Card border-radius | 16px | `rounded-2xl` |
| Button border-radius | 100px (pill) | `rounded-full` |
| Nav height | ~60px | `py-[18px]` with content |

---

## Component Specifications

### Nav (header.tsx) — client component

- Fixed top, blurred background (`backdrop-blur-md`, `bg-[--bg]/88`)
- Border bottom `--border-subtle`
- On scroll > 20px: add `shadow-lg shadow-black/30`
- Logo: `Instrument Serif`, 24px. "Amana" in `--text`, period in `--lime`
- Links: `--text-dim`, hover `--text`. Hide on mobile except CTA
- CTA pill: `--lime` fill, `--bg` text, `rounded-full`

### Hero (hero.tsx) — server component

- **Badge:** Pill with pulsing red dot + enforcement text. `--red-bg` background, `--red-border` border, `--red` text. The dot uses a CSS `@keyframes pulse` animation (opacity 1→0.4→1, 2s infinite). This is the only looping animation on the page
- **H1:** `Instrument Serif`, 58px. "Your business has the same AML obligations as a bank." One sentence. No line break tricks on desktop — let it wrap naturally
- **Subtitle:** `DM Sans`, 18px, `--text-dim`. One sentence describing what we do. Max 560px width
- **Buttons:** Primary lime pill + secondary ghost pill with `--border` border
- **Stat bar:** 3-column grid with `1px` gap (gap creates divider lines). Each cell: `--bg-card` background, number in `--lime` Instrument Serif 34px, description in `--text-faint` 13px. Sits below CTAs with `mt-14`

Stats (exact — sourced from HMRC):
- `£2.9M+` — "fined to estate agents alone"
- `90%+` — "fined for missing basic controls"
- `£8,200` — "average cost of a single penalty"

### Segments (segments.tsx) — client component

- **Tabs:** Row of pills. Inactive: transparent bg, `--border` border, `--text-dim`. Hover: `--lime` border + text. Active: `--lime` fill, `--bg` text
- **Panel layout:** Flexbox row (stack on mobile). Left: text block. Right: compact checklist card
- **Text block:** One large stat (`Instrument Serif` 26px, in red badge), one headline (`Instrument Serif` 26px), one paragraph (`DM Sans` 15px, max 480px). Three elements, nothing more
- **Checklist card:** `--bg` background, `--border-subtle` border, `rounded-2xl`. Header: uppercase label. Items: icon + short text, separated by `--border-subtle` bottom borders
- **Tab accessibility:** `role="tablist"` on container, `role="tab"` + `aria-selected` on each tab, `role="tabpanel"` + `aria-labelledby` on each panel. Arrow keys move focus between tabs

Segment content:

**Estate Agents** — Stat: `57%` / Headline: "of all HMRC fines go to estate agents." / Body: 194 agents fined over £1M in a single quarter. No warning first — inspect, fine, publish. / Checklist: AML registration, Bespoke risk assessment, Source of funds procedures, Sanctions screening, Staff training records

**Accountants** — Stat: `134` / Headline: "accountancy firms fined last period." / Body: £513,930 in penalties to small practices. High-risk position. Personal liability under POCA Section 330. / Checklist: ASP registration, Ongoing monitoring, Source of funds verification, SAR reporting process, Documented training programme

**Letting Agents** — Stat: `NEW` / Headline: "All letting agents now covered — most don't know yet." / Body: Since May 2025, sanctions screening mandatory regardless of rental value. Criminal offence — up to 7 years. / Checklist: Sanctions screening (all clients), Landlord due diligence, OFSI reporting process, Third-party payment procedures, Staff sanctions awareness

**High-Value Dealers** — Stat: `€10K` / Headline: "Cash payments at this threshold trigger full AML obligations." / Body: Jewellers, car dealers, antique dealers, auction houses. Linked transactions aggregate. Near-zero awareness. / Checklist: HVD/AMP registration, Transaction aggregation, CDD on all parties, Structuring red flags, 5-year record retention

### Penalties (penalties.tsx) — server component

- **Escalation bar:** Single-row 4-column grid (2-col on tablet, 1-col on mobile). `--bg-card` cells with `--border-subtle` dividers. `rounded-2xl` on outer container, overflow hidden
- **Each cell:** Amount in `--red` Instrument Serif 28px. Label in `--text` 13px bold. Detail in `--text-faint` 12px. Arrow (`→`) between cells on desktop via `::after` pseudo-element
- **Note underneath:** Single centered line, `--text-faint` 14px. "HMRC publishes every penalty" in `--text-dim` bold

Penalty data (exact):
1. `£52K+` / Civil fines / AML regulation breaches
2. `2 years` / Prison / Trading unregistered
3. `5 years` / Prison / Failure to report
4. `7 years` / Prison / Sanctions breaches

### Guide (guide.tsx) — server component

- **Section title:** `Instrument Serif` 40px. "10+ years at tier-1 financial institutions. Now building that standard for your business."
- **Empathy line:** One italic sentence in `--text-dim` 17px. "You're not a compliance person — you're a business owner. We come in, build everything HMRC expects to see, train your team, and leave you inspection-ready." This is the only empathy content. One line
- **Authority grid:** 4-column grid (2-col mobile). Each card: `--bg` background, `--border-subtle` border, `rounded-xl`, centered layout. Icon in lime-glow container (40×40, `--lime-glow` bg, `--border` border, `rounded-lg`). Title in `--text` 14px bold. Description in `--text-faint` 12px

Authority cards:
1. Bank icon / `8 Major Banks` / "Deutsche Bank, NatWest, Nationwide, Starling, SMBC Nikko, Handelsbanken"
2. Check-circle icon / `2nd Line of Defence` / "QA & QC — the person who decides if compliance work passes inspection"
3. Graduation icon / `CISI & Go-AKS` / "Chartered Institute for Securities & Investment certified"
4. Zap icon / `High-Risk Specialist` / "Complex structures, sanctions, PEPs, cross-border analysis"

### Plan (plan.tsx) — server component

- **3-step cards:** 3-column grid (1-col mobile). `--bg-card`, `--border-subtle`, `rounded-2xl`. Numbered circle on top edge: `--lime` fill, `--bg` text, 28×28, absolute positioned, centered
- **Each card:** Number, `Instrument Serif` title 20px, uppercase `--lime` time label 11px, `--text-dim` description 14px
- **Success line:** Full-width box below cards. `rgba(196,232,68,0.05)` background, `--border` border, `rounded-xl`. Flex row centered: lime check circle (36×36) + `Instrument Serif` 22px text

Plan steps:
1. `Free review` / 20 MINUTES / "We identify what's missing and where you're exposed. No cost, no obligation."
2. `We build everything` / 1–2 WEEKS / "Risk assessment, policies, checklists, sanctions setup, training. Bespoke to your business."
3. `You're covered` / ONGOING / "You run it yourself. We come back annually for updates and refresher training."

Success line: "If HMRC called tomorrow, you'd open the folder and everything's there."

### CTA (cta.tsx) — server component

- Background: gradient from `--bg-card` to `--bg`. Subtle radial lime glow centered (decorative, `pointer-events: none`)
- **H2:** `Instrument Serif` 46px. "Find out where you stand."
- **Subtitle:** `DM Sans` 17px `--text-dim`. "Free 20-minute review. No obligation. We'll tell you what you need and what you don't." Max 440px
- **Button:** Lime pill, large padding (18px 44px), `rounded-full`
- **Phone:** `--text-faint` 14px underneath button
- **Reassurance:** 3 inline items with lime check icons: "Free" / "20 minutes" / "No sales pitch"
- Contact: `mailto:info@amanacompliance.co.uk` / Phone: `07495 331 757`

### Footer — server component

- `--border-subtle` top border
- Arabic line: `Instrument Serif` 15px `--lime`. "أمانة — Trust, Integrity, Faithfulness"
- Copyright: 13px `--text-faint`

---

## Responsive Breakpoints

| Breakpoint | Width | Key changes |
|------------|-------|-------------|
| Mobile | < 640px | Single column everything. Hero h1 32px. CTAs stack full-width. Nav hides links except CTA pill. Penalty bar stacks 1-col. Authority grid 1-col. Segment panel stacks |
| Tablet | 640–1023px | Segment panel stacks. Penalty bar 2×2. Authority grid 2×2. Plan steps stack |
| Desktop | ≥ 1024px | Full layout. 3-col plan, 4-col authority, 4-col penalty bar, side-by-side segments |

Mobile-first implementation. Base styles are mobile, layer up with `sm:`, `md:`, `lg:` prefixes.

---

## Interaction States

| Element | Default | Hover | Focus | Active |
|---------|---------|-------|-------|--------|
| Primary button (lime) | `--lime` bg | `--lime-dim` bg, `translateY(-1px)`, lime shadow | Lime ring, 2px offset | `--lime-dim` bg, no translate |
| Secondary button (ghost) | `--border` border, `--text-dim` text | `--lime` border + text | Lime ring | Lime border, no translate |
| Tab (inactive) | `--border` border, `--text-dim` | `--lime` border + text | Lime ring | — |
| Tab (active) | `--lime` bg, `--bg` text | `--lime-dim` bg | Lime ring | — |
| Card | `--border-subtle` border | `--border` border, `--bg-elevated` bg | — | — |
| Nav link | `--text-dim` | `--text` | Lime ring | — |

---

## What Not To Do

- Do not add images. There are no images on this site
- Do not add a contact form. The CTA is `mailto:` and phone
- Do not add pricing. Pricing is for the meeting
- Do not add testimonials or client logos. They don't exist yet
- Do not add a services section. The plan section replaces it
- Do not add parallax, scale animations, rotation, or decorative motion
- Do not add a mobile hamburger menu with a drawer. Just show the CTA pill and hide text links
- Do not use `--red` for anything except penalties and risk indicators
- Do not use `--lime` for body text. It's an accent color, not a text color
- Do not make Instrument Serif bold. It only ships in weight 400
