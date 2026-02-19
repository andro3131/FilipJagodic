"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
export default function Navigation() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { hash: "o-filipu", label: t("about") },
    { hash: "srecanja", label: t("encounters") },
    { hash: "galerija", label: t("gallery") },
    { hash: "glasba", label: t("music") },
    { hash: "studio", label: t("studio") },
    { hash: "zbirke", label: t("collections") },
    { hash: "kontakt", label: t("contact") },
  ];

  const isMainPage = pathname === `/${locale}` || pathname === `/${locale}/`;

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    if (isMainPage) {
      e.preventDefault();
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
    // On subpages, let the default <a> navigation happen
  };

  const goToLocale = (newLocale: string) => {
    if (newLocale === locale) return;
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
        <div className="flex h-20 items-center justify-end gap-4">

          {/* Right side */}
          <div className="flex items-center gap-4">

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href={`/${locale}/`}
              onClick={(e) => {
                if (isMainPage) {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="text-sm font-medium text-white/60 transition-colors duration-300 hover:text-accent focus:text-accent focus:outline-none focus:underline"
            >
              {t("home")}
            </a>
            {navLinks.map((link) => (
              <a
                key={link.hash}
                href={`/${locale}/#${link.hash}`}
                onClick={(e) => handleNavClick(e, link.hash)}
                className="text-sm font-medium text-white/60 transition-colors duration-300 hover:text-accent focus:text-accent focus:outline-none focus:underline"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Language switcher */}
          <div className="flex items-center gap-0 text-xs font-bold tracking-wider uppercase ml-4">
            <button
              onClick={() => goToLocale("sl")}
              className={`px-1 py-1 rounded-full transition-all duration-300 ${
                locale === "sl"
                  ? "text-accent"
                  : "text-white/40 hover:text-white"
              }`}
              aria-label="Slovenščina"
            >
              SL
            </button>
            <span className="text-white/20">|</span>
            <button
              onClick={() => goToLocale("en")}
              className={`px-1 py-1 rounded-full transition-all duration-300 ${
                locale === "en"
                  ? "text-accent"
                  : "text-white/40 hover:text-white"
              }`}
              aria-label="English"
            >
              EN
            </button>
          </div>

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
              <a
                href={`/${locale}/`}
                className="text-lg text-white/70 hover:text-accent transition-colors"
                onClick={(e) => {
                  setIsMobileMenuOpen(false);
                  if (isMainPage) {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
              >
                {t("home")}
              </a>
              {navLinks.map((link) => (
                <a
                  key={link.hash}
                  href={`/${locale}/#${link.hash}`}
                  className="text-lg text-white/70 hover:text-accent transition-colors"
                  onClick={(e) => {
                    setIsMobileMenuOpen(false);
                    handleNavClick(e, link.hash);
                  }}
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
