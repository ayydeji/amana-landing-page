"use client";

import { ShieldCheck } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function Guarantee() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"],
  });

  // Parallax: card moves up faster than scroll, creating overlay effect
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);

  return (
    <section
      ref={sectionRef}
      id="guarantee"
      className="relative z-10 -mt-16 bg-bg pt-16"
    >
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
        <motion.div
          style={{ y, scale, opacity }}
          className="rounded-2xl border border-lime/30 bg-bg-card px-6 py-12 shadow-2xl shadow-black/50 sm:px-8 sm:py-16 lg:px-16 lg:py-20"
        >
          <div className="mx-auto max-w-3xl text-center">
            {/* Icon */}
            <div className="mb-8 flex justify-center sm:mb-10">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-lime sm:h-20 sm:w-20">
                <ShieldCheck className="h-8 w-8 text-bg sm:h-10 sm:w-10" strokeWidth={1.5} />
              </div>
            </div>

            {/* Headline */}
            <h2 className="font-(family-name:--font-display) mb-6 text-3xl leading-[1.1] text-text sm:mb-8 sm:text-4xl lg:text-5xl">
              The Inspection-Ready Guarantee
            </h2>

            {/* Body */}
            <p className="mb-6 text-base leading-relaxed text-text-dim sm:mb-8 sm:text-lg lg:text-xl">
              If HMRC inspects your business{" "}
              <span className="text-text">within 12 months</span> of our build
              and identifies any deficiency in the compliance framework we
              delivered — any gap in the risk assessment, any missing policy, any
              documentation shortfall —{" "}
              <span className="text-text">
                we rebuild it at no additional cost
              </span>{" "}
              and provide{" "}
              <span className="text-text">a full day of our time</span> to
              remediate.
            </p>

            {/* Tagline */}
            <p className="text-base italic text-text-faint lg:text-lg">
              We built it. We stand behind it.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
