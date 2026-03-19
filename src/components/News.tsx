"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import ScrollReveal from "./ScrollReveal";
import Modal from "./Modal";
import newsData from "../../content/news.json";

export default function News() {
  const t = useTranslations("news");
  const locale = useLocale();
  const [openItem, setOpenItem] = useState<string | null>(null);

  const items = newsData.items.slice(0, 3);

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

        {/* News cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => {
            const itemT = (key: string) =>
              t(`items.${item.key}.${key}` as Parameters<typeof t>[0]);

            return (
              <ScrollReveal key={item.key} delay={index * 0.15}>
                <button
                  onClick={() => setOpenItem(item.key)}
                  className="group w-full text-left bg-surface border border-border rounded-2xl overflow-hidden transition-all duration-300 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5 hover:-translate-y-1"
                >
                  {/* Video/Image preview */}
                  {item.video && (
                    <div className="relative aspect-video bg-black overflow-hidden">
                      <video
                        src={item.video}
                        muted
                        playsInline
                        preload="metadata"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-accent/90 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                          <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="p-6">
                    {/* NOVO badge */}
                    {item.pinned && (
                      <span className="inline-flex items-center gap-1.5 mb-3">
                        <span
                          className="inline-flex items-center justify-center px-2 py-0.5 bg-accent rounded text-[10px] font-bold text-white tracking-wider uppercase"
                          style={{ animation: "banner-pulse 2s ease-in-out infinite" }}
                        >
                          NOVO
                        </span>
                      </span>
                    )}

                    <p className="text-white/40 text-xs mb-2">{itemT("date")}</p>
                    <h3 className="font-heading text-xl font-bold mb-3 group-hover:text-accent transition-colors">
                      {itemT("title")}!
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed mb-4">
                      {itemT("excerpt")}
                    </p>
                    <span className="text-accent text-sm font-medium inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                      {t("readMore")}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </button>
              </ScrollReveal>
            );
          })}
        </div>

        {/* View all link */}
        <ScrollReveal className="text-center mt-12">
          <a
            href={`/${locale}/novice`}
            className="inline-flex items-center gap-2 text-accent font-medium hover:text-accent-light transition-colors"
          >
            {t("viewAll")}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </ScrollReveal>
      </div>

      {/* News detail modal */}
      {items.map((item) => {
        const itemT = (key: string) =>
          t(`items.${item.key}.${key}` as Parameters<typeof t>[0]);

        return (
          <Modal
            key={item.key}
            isOpen={openItem === item.key}
            onClose={() => setOpenItem(null)}
            maxWidth="max-w-4xl"
          >
            <div className="p-6 md:p-8">
              {/* Title + date */}
              <h3 className="font-heading text-2xl md:text-3xl font-bold mb-2 pr-12">
                {itemT("title")}
              </h3>
              <p className="text-white/40 text-sm mb-6">{itemT("date")}</p>

              {/* Body text — emails rendered as red bold mailto links */}
              <div className="prose prose-invert max-w-none mb-8">
                {itemT("body")
                  .split("\n\n")
                  .map((paragraph: string, i: number) => {
                    const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
                    const parts = paragraph.split(emailRegex);
                    return (
                      <p
                        key={i}
                        className="text-white/70 leading-relaxed mb-4 last:mb-0"
                      >
                        {parts.map((part, j) =>
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
                        )}
                      </p>
                    );
                  })}
              </div>

              {/* Video */}
              {item.video && (
                <div className="rounded-xl overflow-hidden mb-6">
                  <video
                    src={item.video}
                    controls
                    playsInline
                    preload="metadata"
                    className="w-full"
                  />
                </div>
              )}

              {/* Gallery thumbnails */}
              {item.media && item.media.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {item.media.map((mediaUrl: string, i: number) => (
                    <div
                      key={i}
                      className="aspect-square rounded-lg overflow-hidden bg-black"
                    >
                      <img
                        src={mediaUrl}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}

            </div>
          </Modal>
        );
      })}
    </section>
  );
}
