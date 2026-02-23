"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 bg-transparent backdrop-blur-sm
        ${scrolled ? "bg-bg/88 backdrop-blur-sm" : "bg-transparent"}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:py-6 lg:px-12 lg:py-8">
        <Link
          href="#"
          className="font-(family-name:--font-display) text-2xl text-text lg:text-4xl"
        >
          amana<span className="text-lime">.</span>compliance
        </Link>

        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" size="default" className="hidden lg:inline-flex">
            <Link href="/compliance-checklist.pdf">Download Checklist</Link>
          </Button>
          <Button asChild size="default">
            <a href="mailto:info@amanacompliance.co.uk?subject=Free%20Gap%20Report%20Request">
              Get a Free Gap Report
            </a>
          </Button>
        </div>
      </div>
    </nav>
  );
}
