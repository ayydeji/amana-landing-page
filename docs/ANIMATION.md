# ANIMATION.md — Motion Design Spec

## Motion Philosophy

Motion on this site has one job: **pace the narrative**. The page tells a story — problem, identification, consequences, credibility, solution, action — and motion controls how fast the visitor moves through that story. It's a reading speed governor, not decoration.

The emotional register is **composed confidence**. This is a compliance consultancy. The founder spent a decade at Deutsche Bank and NatWest. The motion should feel like that person: measured, deliberate, no wasted movement. If this site were a person walking into a room, they wouldn't dance in — they'd enter calmly, make eye contact, and sit down.

Every animation must pass one test: **does removing it make the page harder to read?** If the answer is no, the animation doesn't belong. Motion that exists to look good is motion that slows down a busy person checking if we're legitimate on their phone between meetings.

---

## The Only Animation Pattern: Scroll Reveal

This site uses exactly one animation pattern. Elements fade up into position as the visitor scrolls them into view. That's it.

Why this pattern and nothing else:

- **It rewards scrolling.** Each section feels like it arrives when the visitor is ready for it, rather than being dumped on screen all at once
- **It creates hierarchy within sections.** Staggered reveals tell the eye what to read first
- **It's invisible when done right.** The visitor doesn't notice the animation — they notice the content appearing at the right moment
- **It's cheap.** Opacity + translateY is GPU-composited. No layout recalculations, no paint thrashing

### Reveal Spec

| Property | Value | Reasoning |
|----------|-------|-----------|
| Start state | `opacity: 0`, `translateY: 20px` | 20px is enough to create a sense of upward arrival without looking like the element is jumping. Larger values (30-40px) feel bouncy and playful — wrong register for compliance |
| End state | `opacity: 1`, `translateY: 0` | |
| Duration | `500ms` | Fast enough that it doesn't block reading. Slow enough that it's perceptible. Under 400ms feels mechanical. Over 600ms feels sluggish on a page designed for 30-second consumption |
| Easing | `cubic-bezier(0, 0, 0.2, 1)` | Aggressive ease-out. Starts at full speed, decelerates into resting position. This feels like something settling into place with weight — not bouncing, not floating, settling. It matches the tone: arrival with authority |
| Trigger | Viewport intersection, 8% visibility | Element starts animating when 8% of it is visible. This means content reveals just as it enters the viewport edge — the visitor never sees a blank gap. Lower thresholds (1-3%) fire too early and the visitor misses the motion. Higher thresholds (20%+) leave visible blank space before content appears |
| Fire once | `true` | Elements reveal once and stay. Scroll back up and they're already visible. Re-triggering animations on scroll up is disorienting and suggests the page is fragile |

### Stagger

When multiple sibling elements reveal together (stat cells, authority cards, plan steps), they stagger sequentially:

| Property | Value | Reasoning |
|----------|-------|-----------|
| Stagger delay | `80ms` between siblings | Creates a left-to-right or top-to-bottom reading cadence. 80ms is fast enough to feel like a unified group arriving together, slow enough that the eye can follow the sequence. Under 50ms is indistinguishable from simultaneous. Over 120ms makes a 4-item group take nearly 500ms to fully appear, which feels slow |
| Max stagger depth | `4 items` | Never stagger more than 4 items. If a grid has 5+ children, group them and stagger the groups, not each individual. A 6-item stagger at 80ms takes 480ms for the last item — the visitor has already started reading the first item and the last one is still invisible |

### Implementation (Framer Motion)

```tsx
// shared/fade-up.tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

interface FadeUpProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function FadeUp({ children, delay = 0, className }: FadeUpProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: reduced ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{
        duration: reduced ? 0.2 : 0.5,
        delay,
        ease: [0, 0, 0.2, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

For staggered groups, apply incremental delays:

```tsx
<FadeUp>Section label</FadeUp>
<FadeUp delay={0.08}>Section title</FadeUp>
<FadeUp delay={0.16}>Content block</FadeUp>
```

For grids where children stagger:

```tsx
{cards.map((card, i) => (
  <FadeUp key={card.id} delay={i * 0.08}>
    <Card {...card} />
  </FadeUp>
))}
```

---

## Section-by-Section Motion Choreography

Each section has a specific reveal order. This isn't arbitrary — it follows the eye's reading priority within that section. The most important element reveals first. Supporting elements follow.

### Hero

| Order | Element | Delay | Notes |
|-------|---------|-------|-------|
| 1 | Badge | `0ms` | Appears first. Red pulsing dot catches peripheral attention while the headline loads |
| 2 | H1 | `100ms` | Headline is the primary content. Arrives immediately after badge establishes urgency |
| 3 | Subtitle | `180ms` | |
| 4 | Button group | `260ms` | CTAs arrive last — after the visitor has read what this is about |
| 5 | Stat bar | `260ms` | Same delay as buttons. These are supporting proof, not the focus. They arrive alongside the CTAs as a unified "base" of the hero |

The hero should feel like it assembles in about 400ms total. Not instant (that would lose the pacing) but fast (the visitor should never wait for content).

### Segments

| Order | Element | Delay |
|-------|---------|-------|
| 1 | Section label | `0ms` |
| 2 | Section title | `80ms` |
| 3 | Tab row | `160ms` |
| 4 | Panel content | `0ms` (separate viewport trigger) |

Tab switching has **no animation**. Content swaps instantly on tab click. Animated tab transitions (slide, fade, crossfade) are appropriate for product UIs where the user is exploring. Here, the visitor clicks one tab that matches their business and reads it. Transition animation on a single interaction adds latency to information retrieval.

### Penalties

| Order | Element | Delay |
|-------|---------|-------|
| 1 | Section label | `0ms` |
| 2 | Section title | `80ms` |
| 3 | Escalation bar | `160ms` as a single unit |
| 4 | Note line | `240ms` |

The escalation bar reveals as **one block**, not four staggered cells. The power of this element is the horizontal progression — £52K → 2yr → 5yr → 7yr read as a single escalating line. Staggering the cells would break that visual sentence into four words arriving separately, which loses the impact.

### Guide

| Order | Element | Delay |
|-------|---------|-------|
| 1 | Section label | `0ms` |
| 2 | Section title | `80ms` |
| 3 | Empathy line | `160ms` |
| 4 | Authority cards | `80ms` stagger across 4 cards |

The authority cards are the one place where stagger communicates meaning. Each card is a separate credential — separate institutions, separate qualifications. The stagger says "and another, and another, and another." It builds cumulative weight.

### Plan

| Order | Element | Delay |
|-------|---------|-------|
| 1 | Section label | `0ms` |
| 2 | Section title | `80ms` |
| 3 | Step cards | `80ms` stagger across 3 cards |
| 4 | Success line | `320ms` |

The success line arrives last and slightly later than the stagger rhythm would suggest. This creates a micro-pause — a beat — between the plan steps and the outcome. The plan steps say "here's what we do." The pause says "and here's the result." The beat between them gives the result line more weight.

### CTA

| Order | Element | Delay |
|-------|---------|-------|
| 1 | H2 | `0ms` |
| 2 | Subtitle | `100ms` |
| 3 | Button | `180ms` |
| 4 | Phone + reassurance | `260ms` |

The CTA section reveals faster than other sections. By the time the visitor reaches here, they've read the case. The motion should get out of the way and let them act. No theatrical build-up.

---

## The Pulse: The Only Exception

The red dot in the hero badge is the only looping animation on the site. Everything else fires once.

```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

.pulse-dot {
  animation: pulse 2s ease-in-out infinite;
}
```

| Property | Value | Reasoning |
|----------|-------|-----------|
| Duration | `2s` | Slow enough to not feel frantic. Fast enough to register as "live" — this is active, current, happening now |
| Easing | `ease-in-out` | Smooth breathing rhythm. Linear pulsing feels mechanical. Ease-in-out feels organic — like a warning light |
| Element | `6px` red circle | Small enough to be ambient. This is not the hero's primary attention-grab — the headline is. The dot creates a subtle sense of urgency without demanding focus |

This works because it's the only moving thing on the page until the visitor scrolls. A single point of ambient motion in a static layout creates tension. Multiple moving elements would create chaos.

---

## Micro-Interactions (CSS only)

These are not Framer Motion. They're Tailwind `transition-*` utilities. They respond to user action (hover, focus), not scroll position.

### Buttons

```
transition-all duration-200 ease-out
```

| State | Transform | Shadow | BG |
|-------|-----------|--------|----|
| Default | none | none | `--lime` |
| Hover | `translateY(-1px)` | `0 8px 30px rgba(196,232,68,0.2)` | `--lime-dim` |
| Active | `translateY(0)` | none | `--lime-dim` |

The `-1px` lift on hover is the only spatial micro-interaction. It should feel like the button is responding to your finger approaching — rising slightly to meet you. The shadow sells the lift. Without the shadow, the translate looks like a glitch.

Active state kills the transform and shadow immediately. The button presses down. This should feel instant — no transition on active. The 200ms transition only applies to hover-in and hover-out.

### Cards

```
transition-colors duration-200 ease-out
```

Cards only transition their border and background color on hover. No lift, no shadow, no scale. Cards are containers for information — they shouldn't compete with buttons for interactive attention. If cards feel "clickable," the visitor might try to click them and be confused when nothing happens.

### Tabs

Active tab transition is instant (no transition on background-color for active state). The swap between active/inactive should feel like a toggle — mechanical, not fluid. Fluid tab transitions imply a spectrum. Tabs are binary: selected or not.

Focus ring appearance: instant (no transition). Focus is a system state, not a design element. Animating focus rings delays accessibility feedback.

---

## Reduced Motion

When `prefers-reduced-motion: reduce` is set:

| Normal behaviour | Reduced behaviour |
|-----------------|-------------------|
| `translateY: 20px → 0` over 500ms | No transform. Opacity only: `0 → 1` over 200ms |
| Stagger delays (80ms between siblings) | No stagger. All siblings appear simultaneously |
| Pulse dot animation | Static dot. Full opacity, no animation |
| Hover translateY on buttons | No translate. Color change only |

The reduced motion experience should feel like a faster, simpler version of the same page — not a broken version with missing pieces. Content still fades in (opacity transitions are generally safe for motion-sensitive users). It just doesn't move spatially.

Implementation: Framer Motion's `useReducedMotion()` hook handles the reveal transforms. The pulse dot needs a CSS media query:

```css
@media (prefers-reduced-motion: reduce) {
  .pulse-dot {
    animation: none;
  }
}
```

Button hover transforms need Tailwind's `motion-reduce:` modifier:

```html
<button class="hover:-translate-y-px motion-reduce:hover:translate-y-0">
```

---

## Performance Constraints

| Rule | Reason |
|------|--------|
| Only animate `opacity` and `transform` | These are GPU-composited. Animating `width`, `height`, `padding`, `margin`, `top`, `left` triggers layout recalculation and jank |
| No `will-change` unless measured jank exists | `will-change` promotes elements to their own compositor layer. On a text-heavy page with 20+ animated elements, this wastes GPU memory for no benefit. Add it only if profiling shows dropped frames |
| Framer Motion `layout` animations are banned | Layout animations measure DOM positions. On a static page with no reflow, this is unnecessary overhead. Every animated element uses `initial` / `whileInView` only |
| No spring physics | Springs are delightful in product UI. On a marketing page for a compliance consultancy, they feel playful. `ease-out` with a steep deceleration curve communicates weight and finality — things arriving and staying |
| Max 6 elements animating simultaneously | If the viewport shows 6+ elements mid-reveal at the same time, stagger or group them. The frame budget on a mid-range Android phone doesn't accommodate 10 simultaneous opacity+transform animations without occasional drops |

---

## What Not To Animate

This list matters more than the specs above. The most common motion design mistake on marketing pages is animating things that should be static.

| Element | Why it stays static |
|---------|-------------------|
| Nav bar | It's a fixed utility. Animating it in on load delays access to navigation. The scroll shadow transition is `transition-shadow duration-300` — that's all |
| Tab panel content on switch | Tab switches are information retrieval. Adding a crossfade makes the visitor wait 200ms to read something they already asked for |
| The penalty escalation bar cells | They work as a single visual unit. Staggering them turns one sentence into four |
| Footer | Nobody scrolls to the footer to be delighted. It's there when you need it |
| Text content inside cards | The card reveals. The text inside it does not independently reveal. Nested animations create a matryoshka effect where the visitor watches things assembling instead of reading them |
| Anything on tab change | The content swaps. No fade, no slide, no collapse/expand. Instant. The visitor clicked a tab because they want to see different content now, not in 300ms |

---

## Summary

One pattern (fade-up). One exception (pulse dot). One easing curve (`cubic-bezier(0, 0, 0.2, 1)`). One duration (500ms). One stagger interval (80ms). Reduced motion degrades gracefully to opacity-only fades. Nothing springs, nothing bounces, nothing parallaxes. The motion is felt, not seen.
