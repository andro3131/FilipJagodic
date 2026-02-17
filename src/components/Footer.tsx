"use client";

import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="py-12 px-6 border-t border-border" role="contentinfo">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="font-heading text-lg font-bold text-accent tracking-wider">
              FILIP JAGODIČ
            </p>
            <p className="text-white/30 text-sm mt-1">
              {t("tagline")}
            </p>
          </div>

          <nav
            aria-label={t("footerNav")}
            className="flex flex-wrap gap-6 justify-center"
          >
            <a
              href="#o-filipu"
              className="text-white/40 hover:text-accent text-sm transition-colors"
            >
              {t("about")}
            </a>
            <a
              href="#glasba"
              className="text-white/40 hover:text-accent text-sm transition-colors"
            >
              {t("music")}
            </a>
            <a
              href="#zbirke"
              className="text-white/40 hover:text-accent text-sm transition-colors"
            >
              {t("collections")}
            </a>
            <a
              href="#kontakt"
              className="text-white/40 hover:text-accent text-sm transition-colors"
            >
              {t("contact")}
            </a>
          </nav>

          <p className="text-white/20 text-sm">
            &copy; {new Date().getFullYear()} Filip Jagodič
          </p>
        </div>
      </div>
    </footer>
  );
}
