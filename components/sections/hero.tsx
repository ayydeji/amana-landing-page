"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface GridLightBeamProps {
  direction: "vertical" | "horizontal";
  reverse?: boolean;
  duration: number;
  delay?: number;
  gradient: string;
  backgroundSize: string;
}

function GridLightBeam({
  direction,
  reverse = false,
  duration,
  delay = 0,
  gradient,
  backgroundSize,
}: GridLightBeamProps) {
  const shouldReduceMotion = useReducedMotion();

  const isVertical = direction === "vertical";
  const from = reverse ? "100%" : "-100%";
  const to = reverse ? "-100%" : "100%";

  if (shouldReduceMotion) {
    return null;
  }

  return (
    <motion.div
      className={`absolute ${isVertical ? "inset-x-0 h-[200%]" : "inset-y-0 w-[200%]"}`}
      initial={{ [isVertical ? "y" : "x"]: from }}
      animate={{ [isVertical ? "y" : "x"]: to }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
        delay,
      }}
      style={{ backgroundImage: gradient, backgroundSize }}
    />
  );
}

const lightBeams: GridLightBeamProps[] = [
  // Vertical light 1 - on select lines only
  {
    direction: "vertical",
    duration: 12,
    gradient: `linear-gradient(to right,
      transparent 0px, transparent 159px,
      rgba(196, 232, 68, 0.35) 159px, rgba(196, 232, 68, 0.08) 160px,
      transparent 161px, transparent 319px,
      rgba(196, 232, 68, 0.3) 319px, rgba(196, 232, 68, 0.06) 320px,
      transparent 321px, transparent 559px,
      rgba(196, 232, 68, 0.25) 559px, rgba(196, 232, 68, 0.05) 560px,
      transparent 561px
    )`,
    backgroundSize: "640px 100%",
  },
  // Vertical light 2 - different lines, opposite direction
  {
    direction: "vertical",
    reverse: true,
    duration: 9,
    delay: 3,
    gradient: `linear-gradient(to right,
      transparent 0px, transparent 239px,
      rgba(196, 232, 68, 0.3) 239px, rgba(196, 232, 68, 0.06) 240px,
      transparent 241px, transparent 479px,
      rgba(196, 232, 68, 0.25) 479px, rgba(196, 232, 68, 0.05) 480px,
      transparent 481px
    )`,
    backgroundSize: "560px 100%",
  },
  // Vertical light 3 - sparse
  {
    direction: "vertical",
    duration: 15,
    delay: 7,
    gradient: `linear-gradient(to right,
      transparent 0px, transparent 399px,
      rgba(196, 232, 68, 0.2) 399px, rgba(196, 232, 68, 0.04) 400px,
      transparent 401px
    )`,
    backgroundSize: "480px 100%",
  },
  // Horizontal light 1
  {
    direction: "horizontal",
    duration: 14,
    delay: 2,
    gradient: `linear-gradient(to bottom,
      transparent 0px, transparent 159px,
      rgba(196, 232, 68, 0.3) 159px, rgba(196, 232, 68, 0.06) 160px,
      transparent 161px, transparent 399px,
      rgba(196, 232, 68, 0.25) 399px, rgba(196, 232, 68, 0.05) 400px,
      transparent 401px
    )`,
    backgroundSize: "100% 480px",
  },
  // Horizontal light 2 - opposite direction
  {
    direction: "horizontal",
    reverse: true,
    duration: 11,
    delay: 5,
    gradient: `linear-gradient(to bottom,
      transparent 0px, transparent 239px,
      rgba(196, 232, 68, 0.22) 239px, rgba(196, 232, 68, 0.04) 240px,
      transparent 241px, transparent 559px,
      rgba(196, 232, 68, 0.18) 559px, rgba(196, 232, 68, 0.03) 560px,
      transparent 561px
    )`,
    backgroundSize: "100% 640px",
  },
];

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-bg">
      {/* Faded grid background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--color-grid) 1px, transparent 1px),
            linear-gradient(to bottom, var(--color-grid) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 30%, black 0%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 50% 30%, black 0%, transparent 70%)",
        }}
      />

      {/* Animated light overlays - multiple beams at different speeds */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 30%, black 0%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 50% 30%, black 0%, transparent 70%)",
        }}
      >
        {lightBeams.map((beam, index) => (
          <GridLightBeam key={index} {...beam} />
        ))}
      </div>

      {/* Content */}
      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center px-6 pb-16 pt-24 text-center lg:px-12">
        {/* Spacer to push content to center */}
        <div className="flex-1" />

        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-border bg-red-bg px-4 py-2">
          <span className="pulse-dot h-2 w-2 rounded-full bg-red" />
          <span className="text-sm text-red">
            369 HMRC penalties in the last 6 months
          </span>
        </div>

        <h1 className="mb-4 max-w-5xl font-(family-name:--font-display) text-4xl leading-[1.1] text-text sm:text-5xl lg:text-7xl">
          We make your business <span className="text-lime">HMRC-proof</span>{" "}
          <span className="italic">in under a week.</span>
        </h1>

        <p className="mb-8 max-w-3xl text-base leading-[1.7] text-text-dim sm:text-lg">
          Bespoke AML compliance built by a{" "}
          <span className="text-text">former Deutsche Bank second line of defence</span>
          {" "}— with a <span className="text-text">12-month guarantee</span>. If
          anything we build fails an inspection,{" "}
          <span className="text-text">we fix it free</span>.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
          <Button asChild size="default">
            <a href="mailto:info@amanacompliance.co.uk?subject=Free%20Gap%20Report%20Request">
              Get a Free Gap Report
              <ArrowRight size={18} />
            </a>
          </Button>
          <Button asChild variant="ghost" size="default">
            <Link href="/compliance-checklist.pdf">Download Compliance Checklist</Link>
          </Button>
        </div>

        {/* Spacer to push stats bar down */}
        <div className="flex-1" />

        {/* Stats bar */}
        <div className="grid w-full max-w-4xl grid-cols-1 divide-y divide-border rounded-2xl border border-border bg-bg-card sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <div className="px-6 py-6 text-center sm:px-8 sm:py-8">
            <p className="font-(family-name:--font-display) text-3xl italic text-lime sm:text-4xl">
              £8,200
            </p>
            <p className="mt-2 text-xs text-text-dim sm:text-sm">
              average cost of a single penalty
            </p>
          </div>
          <div className="px-6 py-6 text-center sm:px-8 sm:py-8">
            <p className="font-(family-name:--font-display) text-3xl italic text-lime sm:text-4xl">
              90%+
            </p>
            <p className="mt-2 text-xs text-text-dim sm:text-sm">
              fined for missing basic controls
            </p>
          </div>
          <div className="px-6 py-6 text-center sm:px-8 sm:py-8">
            <p className="font-(family-name:--font-display) text-3xl italic text-lime sm:text-4xl">
              {"< 1 week"}
            </p>
            <p className="mt-2 text-xs text-text-dim sm:text-sm">
              to be fully inspection-ready
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
