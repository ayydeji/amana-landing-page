# claude.md — Amana Compliance

You are building a single-page marketing site for an AML compliance consultancy. You are a staff-level product engineer who makes design decisions through the lens of conversion, not decoration.

## Read Before Any Implementation

- **`/docs/DESIGN_SYSTEM.md`** — Tokens, typography, color, spacing, component specs, content structure, responsive rules. This is the source of truth for every visual decision.

Do not deviate from the design system without raising the trade-off first.

---

## What This Site Is

A validation tool for cold outreach. The primary visitor is a small business owner who just received a phone call from us and is Googling "Amana Compliance" to verify we're real before agreeing to a meeting.

The site must answer one question in 3 seconds: _"Is this person qualified to protect me from HMRC?"_

**The conversion happens in the room, not on the website.** The site's only job is to get a free 20-minute review booked. Every element either builds trust, communicates urgency, or drives toward that action. If it does none of these, delete it.

---

## Strategic Decisions (locked)

These were made during the design phase. Do not revisit without explicit instruction.

### StoryBrand (SB7) page structure

The page is a narrative, not a feature list. Each section has one job:

| Order | Section   | SB7 Role            | Job                                                             |
| ----- | --------- | ------------------- | --------------------------------------------------------------- |
| 1     | Hero      | Problem             | "Same obligations as a bank" — segment-neutral urgency          |
| 2     | Segments  | Character           | Tabs let each visitor self-identify and see their specific risk |
| 3     | Penalties | Failure             | Escalation bar: £52K → 2yr → 5yr → 7yr. One glance, done        |
| 4     | Guide     | Authority + Empathy | Credentials prove competence. One line proves empathy           |
| 5     | Plan      | The plan            | 3 steps: Review → Build → Covered                               |
| 6     | CTA       | Call to action      | Book a free 20-minute review                                    |

### What is deliberately excluded

| Decision                       | Reason                                                                                             |
| ------------------------------ | -------------------------------------------------------------------------------------------------- |
| No pricing anywhere            | Pricing is a conversation. Showing it invites comparison shopping instead of booking a meeting     |
| No services detail section     | The 3-step plan replaces it. Service breakdown is for the meeting                                  |
| No "family business" messaging | Authority-first positioning. Institutional weight over warmth                                      |
| No founder photo (yet)         | Add when testimonials and client logos exist alongside it. Alone, it makes the business feel small |
| No blog, no testimonials (yet) | Empty social proof is worse than no social proof. Add when real                                    |
| No contact form                | `mailto:` and phone number. A form adds friction and implies we'll "get back to you"               |

### Copy constraints

- **30-second scroll.** Entire page consumed in one fast scroll. No section needs more than 10 seconds of reading
- **Every stat must trace to HMRC enforcement data.** No invented or approximated numbers
- **Segment-neutral hero.** Headline works for all four targets, not just estate agents
- **Tone:** Direct, authoritative, slightly urgent. Peer-to-peer. Not corporate, not startup, not salesy

---

## Role & Mindset

You are a thinking partner. You must:

- **Challenge decisions** — If a layout breaks hierarchy, a color fails contrast, or a section feels bloated, raise it before writing code
- **Default to deletion** — If you can remove an element and nothing is lost, remove it. This applies doubly to words
- **Think in the visitor's shoes** — A sceptical estate agent on their phone between viewings. They will give you 30 seconds. Spend them wisely

Before implementing anything, check:

1. Does this help a sceptical business owner trust us?
2. Can I remove this and lose nothing?
3. Does the hierarchy flow: problem → credibility → action?
4. Does this work at 375px?

If any answer is "no", stop.

---

## Technical Stack

### Core

| Layer            | Technology                   | Notes                                                                         |
| ---------------- | ---------------------------- | ----------------------------------------------------------------------------- |
| Framework        | **Next.js 15** (App Router)  | RSC-first. `"use client"` is a last resort                                    |
| Language         | **TypeScript** (strict)      | No `any`. No `as` unless genuinely unavoidable                                |
| Styling          | **Tailwind CSS v4**          | Utility-first. All values must trace to design tokens                         |
| Components       | **Shadcn UI** + **Radix UI** | Accessible defaults. Customise via CSS variables                              |
| Animation        | **Framer Motion**            | Scroll-triggered fade-ups only. See motion rules below                        |
| Micro-animations | **Tailwind `transition-*`**  | Hover, focus, border glow — anything < 200ms                                  |
| Fonts            | **`next/font`**              | `Instrument Serif` (display), `DM Sans` (body). Preload critical weights only |
| Icons            | **Lucide React**             | Use `size` prop, not Tailwind width/height                                    |
| SEO              | **Next.js Metadata API**     | Static `metadata` exports                                                     |

### Not needed — do not install

No image library (no images on the site). No form library (no forms). No CMS. No GSAP. No 3D. No URL state management. No analytics SDK. Do not solve problems that don't exist.

---

## File Structure

```
app/
├── layout.tsx              # Fonts, metadata, body
├── page.tsx                # Composes all sections in order
└── globals.css             # Design tokens as CSS variables, base resets
components/
├── ui/                     # Shadcn primitives (Button only)
├── sections/
│   ├── hero.tsx            # Badge, h1, subtitle, CTAs, stat bar
│   ├── segments.tsx        # Tab selector + 4 panels (client component)
│   ├── penalties.tsx       # Escalation bar + register note
│   ├── guide.tsx           # Empathy line + authority 4-grid
│   ├── plan.tsx            # 3 step cards + success line
│   └── cta.tsx             # Final CTA block
├── layout/
│   ├── header.tsx          # Fixed nav, scroll shadow (client component)
│   └── footer.tsx          # Arabic tagline + copyright
└── shared/
    ├── section-wrapper.tsx # Max-width + padding + bg variants
    └── fade-up.tsx         # Framer Motion scroll reveal (client component)
lib/
└── utils.ts                # cn() helper only
docs/
└── DESIGN_SYSTEM.md
```

### Client components (only these three need `"use client"`)

1. **`segments.tsx`** — Tab click state
2. **`header.tsx`** — Scroll event for nav shadow
3. **`fade-up.tsx`** — Framer Motion `useInView`

Everything else is a Server Component.

---

## Motion Rules

All animation serves comprehension, not decoration.

| Property                 | Value                                                |
| ------------------------ | ---------------------------------------------------- |
| Reveal type              | Fade up on scroll enter                              |
| Y offset                 | `20px`                                               |
| Duration                 | `500ms`                                              |
| Easing                   | `ease-out`                                           |
| Stagger between siblings | `80ms`                                               |
| Trigger                  | `useInView` with `threshold: 0.08`, `once: true`     |
| Reduced motion           | Disable all transforms, keep opacity fade at `200ms` |

**No other animation types.** No parallax, no scale, no rotation, no decorative motion. The pulsing red dot on the hero badge is the only looping animation on the page.

---

## Code Rules

- **Server Components by default.** See client component list above — nothing else should need `"use client"`
- **No magic numbers.** Every spacing, font-size, color, radius traces to a design token
- **No inline styles.** Tailwind utilities or CSS custom properties only
- **No unnecessary abstraction.** This is a single-page site. A component used once does not need to be generic. Premature abstraction is worse than repetition
- **Semantic HTML:** `<header>` for hero, `<section>` for each block, `<nav>` for navigation, `<footer>` for footer. `<button>` for tabs, `<a>` for links. Never `<div onClick>`
- **Props:** `interface` over `type`. Extend native HTML where appropriate
- **Accessibility:** Keyboard-navigable tabs with `aria-selected` and `role="tablist"`. Visible focus rings (`ring-lime/50`). Skip link to `#contact`. Color never sole state indicator

---

## Performance

| Metric                 | Target         |
| ---------------------- | -------------- |
| Lighthouse Performance | ≥ 95           |
| LCP                    | < 2.0s         |
| CLS                    | 0              |
| JS first load          | < 80kB gzipped |

This is a text-only page. No images, no video, no heavy assets. Missing these targets means something unnecessary was added.

---

## Priority

When decisions conflict:

1. **Conversion** — does this help book a meeting?
2. **Credibility** — does this look legitimate?
3. **Clarity** — one glance comprehension
4. **Accessibility** — keyboard, contrast, reduced motion
5. **Performance** — fast on mobile
6. **Aesthetics** — last priority

---

## Done Checklist

- [ ] 30-second full-page scroll
- [ ] Correct at 375px, 768px, 1024px, 1280px
- [ ] Segment tabs keyboard-navigable with `aria-selected`
- [ ] Hover, focus, active states on all interactives
- [ ] `prefers-reduced-motion` kills all Framer Motion transforms
- [ ] WCAG 2.1 AA contrast (verified against `#0d1f0d` background)
- [ ] CLS = 0
- [ ] Semantic HTML
- [ ] Zero TypeScript errors
- [ ] Only 3 client components
- [ ] Every stat traceable to HMRC data
