"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

export default function Navigation() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "#o-filipu", label: t("about") },
    { href: "#srecanja", label: t("encounters") },
    { href: "#galerija", label: t("gallery") },
    { href: "#glasba", label: t("music") },
    { href: "#studio", label: t("studio") },
    { href: "#zbirke", label: t("collections") },
    { href: "#kontakt", label: t("contact") },
  ];

  const switchLocale = () => {
    const newLocale = locale === "sl" ? "en" : "sl";
    const pathWithoutLocale = pathname.replace(/^\/(sl|en)/, "") || "/";
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

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
      aria-label={t("mainNav")}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-[#141618]/90 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-4">

          {/* Logo */}
          <a href="#" className="relative flex-shrink-0" aria-label="Filip Jagodič">
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(212, 64, 64, 0.4) 0%, transparent 70%)",
                filter: "blur(8px)",
              }}
              aria-hidden="true"
            />
            <Image
              src="https://res.cloudinary.com/dewf3zos0/image/upload/v1771410536/filip-fav2_copy_pdav4v.png"
              alt="FJ"
              width={40}
              height={40}
              className="relative w-10 h-10"
            />
          </a>

          {/* Right side */}
          <div className="flex items-center gap-4">

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

          {/* Language switcher */}
          <button
            onClick={switchLocale}
            className="text-xs font-bold tracking-wider uppercase px-3 py-1.5 rounded-full border border-white/20 text-white/60 hover:text-white hover:border-accent/50 transition-all duration-300"
            aria-label={locale === "sl" ? "Switch to English" : "Preklopi na slovenščino"}
          >
            {locale === "sl" ? "EN" : "SI"}
          </button>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? t("closeMenu") : t("openMenu")}
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
