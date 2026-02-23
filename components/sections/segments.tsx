"use client";

import { useEffect, useRef, useState } from "react";
import { Square } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

function BorderBeam() {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return null;
  }

  return (
    <div className="pointer-events-none absolute -inset-[1px] z-0 overflow-hidden rounded-xl">
      {/* Rotating conic gradient */}
      <motion.div
        className="absolute -inset-[100%] origin-center"
        style={{
          background: `conic-gradient(from 0deg, transparent 0%, transparent 85%, rgba(196, 232, 68, 0.6) 90%, rgba(196, 232, 68, 1) 95%, rgba(196, 232, 68, 0.6) 100%)`,
        }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}

interface Segment {
  id: string;
  label: string;
  stat: string;
  headline: string;
  description: string;
  checks: string[];
}

const segments: Segment[] = [
  {
    id: "estate",
    label: "Estate Agents",
    stat: "57%",
    headline: "of all HMRC fines go to estate agents.",
    description:
      "194 agents fined over £1M in a single quarter. Most had no idea they were non-compliant. HMRC doesn't warn you first — they inspect, fine, and publish your name.",
    checks: [
      "AML registration",
      "Bespoke risk assessment",
      "Source of funds procedures",
      "Sanctions screening",
      "Staff training records",
    ],
  },
  {
    id: "accountants",
    label: "Accountants",
    stat: "134",
    headline: "accountancy firms fined last period.",
    description:
      "£513,930 in penalties to small practices. You handle client money, file returns, and form companies — HMRC considers that high-risk.",
    checks: [
      "ASP registration",
      "Ongoing monitoring procedures",
      "Source of funds verification",
      "SAR reporting process",
      "Documented training programme",
    ],
  },
  {
    id: "letting",
    label: "Letting Agents",
    stat: "NEW",
    headline: "All letting agents now covered — most don't know yet.",
    description:
      "Since May 2025, every letting agent must screen landlords, tenants and guarantors against the UK sanctions list. Criminal offence — up to 7 years.",
    checks: [
      "Sanctions screening (all clients)",
      "Landlord due diligence",
      "OFSI reporting process",
      "Third-party payment procedures",
      "Staff sanctions awareness",
    ],
  },
  {
    id: "hvd",
    label: "High-Value Dealers",
    stat: "€10K",
    headline: "Cash payments at this threshold trigger full AML obligations.",
    description:
      "Jewellers, car dealers, antique dealers, auction houses. Linked transactions aggregate — two payments that cross the threshold count.",
    checks: [
      "HVD/AMP registration",
      "Transaction aggregation",
      "CDD on all parties",
      "Structuring red flags",
      "5-year record retention",
    ],
  },
];

export function Segments() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionRefs.current.forEach((ref, index) => {
      if (!ref) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveIndex(index);
            }
          });
        },
        {
          rootMargin: "-40% 0px -40% 0px",
          threshold: 0,
        },
      );

      observer.observe(ref);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const activeSegment = segments[activeIndex];

  return (
    <section id="segments" className="bg-bg">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
        {/* Header */}
        <div
          ref={headerRef}
          className="pb-8 lg:pb-16"
        >
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-lime">
            Who this is for
          </p>
          <h2 className="max-w-3xl font-(family-name:--font-display) text-3xl leading-[1.1] text-text sm:text-4xl lg:text-5xl xl:text-6xl">
            HMRC-supervised businesses that need to get compliant.
          </h2>
        </div>

        {/* Two column layout */}
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
          {/* Left: Scrolling segments */}
          <div className="space-y-32 pt-8 lg:space-y-48 lg:max-w-md">
            {segments.map((segment, index) => (
              <div
                key={segment.id}
                ref={(el) => {
                  sectionRefs.current[index] = el;
                }}
                className={`scroll-mt-48 transition-all duration-500 origin-left ${
                  activeIndex === index
                    ? "opacity-100 lg:scale-100"
                    : "lg:opacity-30 lg:scale-95"
                }`}
              >
                {/* Segment indicator */}
                <div className="mb-6 flex items-center gap-3">
                  <span
                    className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                      activeIndex === index ? "bg-lime" : "bg-text-faint"
                    }`}
                  />
                  <span
                    className={`text-sm font-medium transition-colors duration-300 ${
                      activeIndex === index ? "text-lime" : "text-text-dim"
                    }`}
                  >
                    {segment.label}
                  </span>
                </div>

                {/* Stat */}
                <p className="mb-2 font-(family-name:--font-display) text-5xl text-lime lg:text-6xl">
                  {segment.stat}
                </p>

                {/* Headline */}
                <h3 className="mb-4 font-(family-name:--font-display) text-2xl text-text lg:text-3xl">
                  {segment.headline}
                </h3>

                {/* Description */}
                <p className="text-base leading-relaxed text-text-dim lg:text-lg">
                  {segment.description}
                </p>

                {/* Mobile: Show card inline */}
                <div className="mt-8 rotate-2 rounded-2xl bg-white p-6 shadow-lg lg:hidden">
                  <p className="mb-4 text-sm font-medium uppercase tracking-wider text-neutral-500">
                    HMRC checks for
                  </p>
                  <div className="space-y-3">
                    {segment.checks.map((check) => (
                      <div
                        key={check}
                        className="flex items-start gap-3 text-neutral-700"
                      >
                        <Square size={16} className="mt-0.5 shrink-0" />
                        <span className="text-sm">{check}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Sticky card (desktop only) */}
          <div className="hidden lg:flex lg:items-start lg:justify-end">
            <div className="sticky top-1/2 w-full max-w-sm -translate-y-1/2 rotate-3">
              <div className="relative rounded-xl shadow-[0_35px_60px_-10px_rgba(0,0,0,0.7)]">
                <BorderBeam />
                {/* Card content with background */}
                <div className="relative z-10 rounded-xl bg-white p-6">
                  <p className="mb-5 text-sm font-medium uppercase tracking-wider text-neutral-500">
                    HMRC checks for
                  </p>
                  <div className="min-h-[220px]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeSegment.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4"
                      >
                        {activeSegment.checks.map((check) => (
                          <div
                            key={check}
                            className="flex items-start gap-3 text-neutral-700"
                          >
                            <Square size={18} className="mt-0.5 shrink-0" />
                            <span>{check}</span>
                          </div>
                        ))}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
