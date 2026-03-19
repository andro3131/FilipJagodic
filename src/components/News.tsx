"use client";

import { useTranslations } from "next-intl";
import ScrollReveal from "./ScrollReveal";
import newsData from "../../content/news.json";

export default function News() {
  const t = useTranslations("news");

  const item = newsData.items[0];
  if (!item) return null;

  const itemT = (key: string) =>
    t(`items.${item.key}.${key}` as Parameters<typeof t>[0]);

  const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;

  const renderTextWithEmails = (text: string) => {
    const parts = text.split(emailRegex);
    return parts.map((part, j) =>
      emailRegex.test(part) ? (
        <a
          key={j}
          href={`mailto:${part}`}
          className="text-accent font-bold hover:text-accent-light transition-colors"
        >
          {part}
        </a>
      ) : (
        <span key={j}>{part}</span>
      )
    );
  };

  return (
    <section
      id="novice"
      aria-labelledby="heading-novice"
      className="relative py-24 md:py-32 px-6"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <ScrollReveal className="text-center mb-16 md:mb-24">
          <p className="text-accent text-sm font-medium tracking-[0.3em] uppercase mb-4">
            {t("supra")}
          </p>
          <h2
            id="heading-novice"
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            {t("heading")}
          </h2>
          <div className="w-20 h-0.5 bg-accent mx-auto" />
        </ScrollReveal>

        {/* Single news — video left, text right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* Video */}
          <ScrollReveal>
            {item.video && (
              <div className="rounded-2xl overflow-hidden">
                <video
                  src={item.video}
                  controls
                  playsInline
                  preload="metadata"
                  className="w-full"
                />
              </div>
            )}
          </ScrollReveal>

          {/* Text */}
          <ScrollReveal delay={0.15}>
            {/* NOVO badge */}
            {item.pinned && (
              <span className="inline-flex items-center gap-1.5 mb-4">
                <span
                  className="inline-flex items-center justify-center px-2.5 py-1 bg-accent rounded text-xs font-bold text-white tracking-wider uppercase"
                  style={{ animation: "banner-pulse 2s ease-in-out infinite" }}
                >
                  NOVO
                </span>
              </span>
            )}

            <p className="text-white/40 text-sm mb-2">{itemT("date")}</p>
            <h3 className="font-heading text-2xl lg:text-3xl font-bold mb-6">
              {itemT("title")}!
            </h3>

            <div className="space-y-4">
              {itemT("body")
                .split("\n\n")
                .map((paragraph: string, i: number) => (
                  <p
                    key={i}
                    className="text-white/70 leading-relaxed"
                  >
                    {renderTextWithEmails(paragraph)}
                  </p>
                ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
