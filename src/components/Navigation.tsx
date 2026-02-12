"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "#o-filipu", label: "O Filipu" },
  { href: "#glasba", label: "Glasba" },
  { href: "#zbirke", label: "Zbirke" },
  { href: "#povezave", label: "Povezave" },
  { href: "#kontakt", label: "Kontakt" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      role="navigation"
      aria-label="Glavna navigacija"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-[#141618]/90 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <a
            href="#"
            className="font-heading text-xl font-bold tracking-wider text-accent"
            aria-label="Filip Jagodič — domov"
          >
            FILIP JAGODIČ
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-white/60 transition-colors duration-300 hover:text-accent focus:text-accent focus:outline-none focus:underline"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Zapri meni" : "Odpri meni"}
            aria-expanded={isMobileMenuOpen}
          >
            <motion.span
              className="block h-0.5 w-6 bg-white"
              animate={
                isMobileMenuOpen
                  ? { rotate: 45, y: 8 }
                  : { rotate: 0, y: 0 }
              }
            />
            <motion.span
              className="block h-0.5 w-6 bg-white"
              animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            />
            <motion.span
              className="block h-0.5 w-6 bg-white"
              animate={
                isMobileMenuOpen
                  ? { rotate: -45, y: -8 }
                  : { rotate: 0, y: 0 }
              }
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden bg-[#141618]/95 backdrop-blur-xl border-b border-border"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-lg text-white/70 hover:text-accent transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
