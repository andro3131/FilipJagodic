"use client";

import ScrollReveal from "./ScrollReveal";
import { useTranslations } from "next-intl";

export default function Contact() {
  const t = useTranslations("contact");

  return (
    <section
      id="kontakt"
      aria-labelledby="contact-heading"
      className="relative py-24 md:py-32 px-6"
    >
      <div className="mx-auto max-w-3xl text-center">
        <ScrollReveal>
          <p className="text-accent text-sm font-medium tracking-[0.3em] uppercase mb-4">
            {t("supra")}
          </p>
          <h2
            id="contact-heading"
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            {t("heading")}
          </h2>
          <div className="w-20 h-0.5 bg-accent mx-auto mb-8" />
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-white/60 text-lg mb-12 max-w-xl mx-auto">
            {t("subtitle")}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <a
            href="mailto:kontakt@filipjagodic.si"
            className="inline-flex items-center gap-3 px-10 py-5 bg-accent text-white font-semibold text-lg rounded-full hover:bg-accent-light transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-[#141618]"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            {t("emailCta")}
          </a>
        </ScrollReveal>

        <ScrollReveal delay={0.4} className="mt-12">
          <div className="flex flex-col sm:flex-row gap-8 justify-center text-white/40">
            <div>
              <p className="font-semibold text-white/60 mb-1">{t("performances")}</p>
              <p className="text-sm">{t("performancesDesc")}</p>
            </div>
            <div className="hidden sm:block w-px bg-border" aria-hidden="true" />
            <div>
              <p className="font-semibold text-white/60 mb-1">{t("media")}</p>
              <p className="text-sm">{t("mediaDesc")}</p>
            </div>
            <div className="hidden sm:block w-px bg-border" aria-hidden="true" />
            <div>
              <p className="font-semibold text-white/60 mb-1">{t("collaborations")}</p>
              <p className="text-sm">{t("collaborationsDesc")}</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Social links */}
        <ScrollReveal delay={0.5} className="mt-12">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://www.youtube.com/@rokvolfand6462"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-border hover:border-accent/30 bg-surface hover:bg-accent/5 transition-all duration-300 group"
            >
              <svg className="w-5 h-5 text-[#FF0000]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              <span className="text-white/70 group-hover:text-white text-sm font-medium transition-colors">
                {t("youtubeChannel")}
              </span>
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=100008212027574"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-border hover:border-accent/30 bg-surface hover:bg-accent/5 transition-all duration-300 group"
            >
              <svg className="w-5 h-5 text-[#1877F2]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span className="text-white/70 group-hover:text-white text-sm font-medium transition-colors">
                {t("facebookProfile")}
              </span>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
