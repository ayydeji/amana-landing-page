"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const companies = [
  { name: "UBP", logo: "/logos/ubp.svg" },
  { name: "Starling Bank", logo: "/logos/starling.svg" },
  { name: "Nationwide", logo: "/logos/nationwide.png" },
  { name: "NatWest", logo: "/logos/natwest.svg" },
  { name: "Handelsbanken", logo: "/logos/handelsbanken.svg" },
  { name: "Ebury", logo: "/logos/ebury.svg" },
  { name: "Deutsche Bank", logo: "/logos/deutsche.svg" },
  { name: "SMBC Nikko", logo: "/logos/smbc.png" },
];

function LogoCell({
  company,
  index,
  totalItems,
}: {
  company: { name: string; logo: string };
  index: number;
  totalItems: number;
}) {
  // Mobile: 2 columns (4 rows), Tablet: 4 columns (2 rows)
  // Mobile borders
  const mobileColumns = 2;
  const mobileIsLeftEdge = index % mobileColumns === 0;
  const mobileIsLastRow = index >= totalItems - mobileColumns;

  // Desktop borders (4 columns)
  const desktopColumns = 4;
  const desktopIsTopRow = index < desktopColumns;
  const desktopIsLeftEdge = index % desktopColumns === 0;

  return (
    <div
      className={`group flex aspect-[3/2] items-center justify-center border-border/50 p-6 transition-all duration-300 sm:p-8 lg:p-12
        ${!mobileIsLastRow ? "border-b sm:border-b-0" : ""}
        ${!mobileIsLeftEdge ? "border-l" : ""}
        ${desktopIsTopRow ? "sm:border-b" : ""}
        ${!desktopIsLeftEdge ? "sm:border-l" : ""}
      `}
    >
      <Image
        src={company.logo}
        alt={company.name}
        width={180}
        height={60}
        className={`h-10 w-auto max-w-[140px] object-contain transition-all duration-300 lg:h-14 lg:max-w-[180px] ${
          company.logo.endsWith(".png") || company.logo.includes("ubp")
            ? "opacity-50 grayscale group-hover:opacity-100 group-hover:grayscale-0"
            : "opacity-50 brightness-0 invert group-hover:opacity-100 group-hover:brightness-100 group-hover:invert-0"
        }`}
      />
    </div>
  );
}

export function Guide() {
  const gridRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(gridRef, { once: false, amount: 0.2, margin: "-50px" });

  return (
    <section id="guide" className="bg-bg">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
        {/* Centered header */}
        <div className="mx-auto max-w-5xl text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-lime">
            Why Amana
          </p>
          <h2 className="font-(family-name:--font-display) text-3xl leading-[1.1] text-text sm:text-4xl lg:text-5xl xl:text-6xl">
            10+ years at tier-1 financial institutions. Now building that
            standard for your business.
          </h2>
        </div>

        {/* Logo grid */}
        <div className="mx-auto mt-16 max-w-5xl lg:mt-24">
          {/* 4x2 grid with cell borders */}
          <motion.div
            ref={gridRef}
            className="grid grid-cols-2 sm:grid-cols-4"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={
              isInView
                ? { scale: 1, opacity: 1 }
                : { scale: 0.85, opacity: 0 }
            }
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {companies.map((company, index) => (
              <LogoCell key={company.name} company={company} index={index} totalItems={companies.length} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
