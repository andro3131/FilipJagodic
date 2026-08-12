"use client";

import { useTranslations, useLocale } from "next-intl";
import contactData from "../../content/contact.json";

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();
  const year = new Date().getFullYear();

  const footerLinks = [
    { href: `/${locale}/#o-filipu`, label: t("about") },
    { href: `/${locale}/#glasba`, label: t("music") },
    { href: `/${locale}/#zbirke`, label: t("collections") },
    { href: `/${locale}/#kontakt`, label: t("contact") },
  ];

  return (
    <footer className="py-12 px-6 border-t border-border" role="contentinfo">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="font-heading text-lg font-bold text-accent tracking-wider">
              FILIP JAGODIČ
            </p>
            <p className="text-white/30 text-sm mt-1">{t("tagline")}</p>
          </div>

          <nav
            aria-label={t("footerNav")}
            className="flex flex-wrap gap-6 justify-center"
          >
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white/40 hover:text-accent text-sm transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="text-center md:text-right space-y-1.5">
            <p className="text-white/30 text-sm">
              &copy; {year} Filip Jagodič. {t("rights")}
            </p>
            <p className="text-white/25 text-xs">
              {t("contactLabel")}{" "}
              <a
                href={`/${locale}/#kontakt`}
                className="text-white/40 hover:text-accent transition-colors"
              >
                {t("contactName")}
              </a>
              {" · "}
              <a
                href={contactData.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-accent transition-colors"
              >
                Facebook
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
