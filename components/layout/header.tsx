"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when clicking outside or on escape
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [mobileMenuOpen]);

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

        {/* Desktop nav */}
        <div className="hidden items-center gap-3 lg:flex">
          <Button asChild variant="ghost" size="default">
            <Link href="/compliance-checklist.pdf">Download Checklist</Link>
          </Button>
          <Button asChild size="default">
            <a href="mailto:info@amanacompliance.co.uk?subject=Free%20Gap%20Report%20Request">
              Get a Free Gap Report
            </a>
          </Button>
        </div>

        {/* Mobile burger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-text transition-colors hover:bg-white/10 lg:hidden"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          <AnimatePresence mode="wait" initial={false}>
            {mobileMenuOpen ? (
              <motion.div
                key="close"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden border-t border-border/50 bg-bg/95 backdrop-blur-md lg:hidden"
          >
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="flex flex-col gap-4 px-6 py-6"
            >
              <a
                href="mailto:info@amanacompliance.co.uk?subject=Free%20Gap%20Report%20Request"
                className="inline-flex items-center justify-center rounded-full bg-lime px-6 py-3 text-base font-semibold text-bg transition-all duration-200 hover:bg-lime-dim"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get a Free Gap Report
              </a>
              <Link
                href="/compliance-checklist.pdf"
                className="inline-flex items-center justify-center rounded-full border border-lime/50 px-6 py-3 text-base font-semibold text-lime transition-all duration-200 hover:border-lime hover:bg-lime/10"
                onClick={() => setMobileMenuOpen(false)}
              >
                Download Checklist
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
