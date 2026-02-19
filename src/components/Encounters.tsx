"use client";

import { useState } from "react";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import Modal from "./Modal";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";

const encounterKeys = ["bocelli", "sufit", "plestenjak", "pahor"] as const;

const encounterImages: Record<string, string> = {
  bocelli: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771096727/andrea_bocelli_jboluq.jpg",
  sufit: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771096728/klas%CC%8Ca_sufit_a92qqs.jpg",
  plestenjak: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771096729/plestenjak_vnjqg3.jpg",
  pahor: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771096727/borut_pahor_s8jwkb.jpg",
};

const encounterVideos: Record<string, string> = {
  plestenjak: "https://res.cloudinary.com/dewf3zos0/video/upload/v1771445309/19874134_107584786563726_526080777331408896_n_dahm5v.mp4",
  bocelli: "https://res.cloudinary.com/dewf3zos0/video/upload/v1771448046/filip_THE_KING_bocelli_2018_04_03_12_05_01_UTC_oka615.mp4",
  sufit: "https://res.cloudinary.com/dewf3zos0/video/upload/v1771448081/Klapa_S%CC%8Cufit_-_Zavezan_Filip_don_Filipo_mhjj6i.mp4",
};

const highlightKeys = new Set(["bocelli"]);

export default function Encounters() {
  const t = useTranslations("encounters");
  const locale = useLocale();
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [activeMedia, setActiveMedia] = useState(0);

  const openEncounter = (key: string) => {
    setSelectedKey(key);
    setActiveMedia(0);
  };

  const mediaItems = selectedKey
    ? [
        { type: "image" as const, src: encounterImages[selectedKey] },
        ...(encounterVideos[selectedKey]
          ? [{ type: "video" as const, src: encounterVideos[selectedKey] }]
          : []),
      ]
    : [];

  return (
    <>
      <section
        id="srecanja"
        aria-labelledby="encounters-heading"
        className="relative py-24 md:py-32 px-6 bg-surface"
      >
        <div className="mx-auto max-w-5xl">
          {/* Section header */}
          <ScrollReveal className="text-center mb-16 md:mb-24">
            <p className="text-accent text-sm font-medium tracking-[0.3em] uppercase mb-4">
              {t("supra")}
            </p>
            <h2
              id="encounters-heading"
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            >
              {t("heading")}
            </h2>
            <div className="w-20 h-0.5 bg-accent mx-auto mb-6" />
            <p className="text-white/50 max-w-2xl mx-auto">
              {t("subtitle")}
            </p>
          </ScrollReveal>

          {/* Encounters timeline */}
          <div className="relative">
            <div
              className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px"
              aria-hidden="true"
            />

            <div className="space-y-2 md:-space-y-2">
              {encounterKeys.map((key, index) => {
                const isLeft = index % 2 === 0;
                const isHighlight = highlightKeys.has(key);
                const image = encounterImages[key];
                return (
                  <ScrollReveal key={key} delay={0.15 * index}>
                    <div
                      className={`relative flex items-start gap-6 md:gap-0 ${
                        isLeft ? "md:flex-row" : "md:flex-row-reverse"
                      }`}
                    >
                      <div
                        className={`absolute left-6 md:left-1/2 w-3 h-3 rounded-full -translate-x-1/2 mt-2 z-10 ${
                          isHighlight
                            ? "bg-accent shadow-[0_0_12px_rgba(212,64,64,0.6)]"
                            : "bg-white/30"
                        }`}
                        aria-hidden="true"
                      />

                      <div className="w-6 flex-shrink-0 md:hidden" />

                      <div
                        className={`flex-1 md:w-[calc(50%-2rem)] ${
                          isLeft ? "md:pr-12" : "md:pl-12"
                        }`}
                      >
                        <button
                          onClick={() => openEncounter(key)}
                          className={`w-full text-left p-5 md:p-6 rounded-2xl border transition-all duration-500 cursor-pointer group ${
                            isHighlight
                              ? "bg-[#1A1618] border-accent/30 hover:border-accent/50"
                              : "bg-[#141618] border-border hover:border-accent/30"
                          }`}
                        >
                          <div className="flex gap-4 items-start">
                            <div
                              className={`relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden bg-surface-lighter ${
                                isHighlight ? "ring-2 ring-accent/30" : ""
                              }`}
                            >
                              <Image
                                src={image}
                                alt={t(`items.${key}.name`)}
                                fill
                                className="object-cover"
                              />
                            </div>

                            <div className="flex-1 min-w-0">
                              <p className="text-accent text-xs font-medium tracking-[0.2em] uppercase mb-1">
                                {t(`items.${key}.event`)}
                              </p>
                              <h3 className="font-heading text-lg md:text-xl font-semibold text-white group-hover:text-accent transition-colors mb-1">
                                {t(`items.${key}.name`)}
                              </h3>
                              <p className="text-white/40 text-sm mb-2">
                                {t(`items.${key}.role`)}
                              </p>
                              <p className="text-white/50 text-sm leading-relaxed line-clamp-2">
                                {t(`items.${key}.description`)}
                              </p>
                            </div>
                          </div>

                          <p className="text-accent/60 text-xs mt-3 group-hover:text-accent transition-colors text-right">
                            {t("readStory")} &rarr;
                          </p>
                        </button>
                      </div>

                      <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>

          {/* View all link */}
          <ScrollReveal delay={0.3} className="text-center mt-16">
            <Link
              href={`/${locale}/srecanja`}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-border hover:border-accent/40 bg-surface hover:bg-accent/5 transition-all duration-300 group"
            >
              <span className="text-white/70 group-hover:text-white font-medium transition-colors">
                {t("viewAll")}
              </span>
              <span className="text-accent group-hover:translate-x-1 transition-transform duration-300">&rarr;</span>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Detail modal */}
      <Modal isOpen={!!selectedKey} onClose={() => setSelectedKey(null)}>
        {selectedKey && (
          <div>
            {/* Main viewer */}
            <div className="relative w-full aspect-[16/10] bg-black">
              {mediaItems[activeMedia]?.type === "video" ? (
                <video
                  key={mediaItems[activeMedia].src}
                  src={mediaItems[activeMedia].src}
                  controls
                  className="w-full h-full object-contain"
                  preload="metadata"
                />
              ) : (
                <Image
                  src={mediaItems[activeMedia]?.src || encounterImages[selectedKey]}
                  alt={t(`items.${selectedKey}.name`)}
                  fill
                  className="object-cover"
                />
              )}

              {mediaItems.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveMedia((activeMedia - 1 + mediaItems.length) % mediaItems.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white/70 hover:text-white hover:bg-black/70 flex items-center justify-center transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setActiveMedia((activeMedia + 1) % mediaItems.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white/70 hover:text-white hover:bg-black/70 flex items-center justify-center transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail strip */}
            {mediaItems.length > 1 && (
              <div className="flex gap-2 p-4">
                {mediaItems.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveMedia(i)}
                    className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                      i === activeMedia
                        ? "border-accent"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    {item.type === "image" ? (
                      <Image src={item.src} alt={`Thumbnail ${i + 1}`} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full bg-surface-lighter flex items-center justify-center">
                        <svg className="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}

            <div className="p-6 md:p-8">
              <p className="text-accent text-xs font-medium tracking-[0.2em] uppercase mb-2">
                {t(`items.${selectedKey}.event`)}
              </p>
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-1">
                {t(`items.${selectedKey}.name`)}
              </h3>
              <p className="text-white/40 text-sm mb-4">{t(`items.${selectedKey}.role`)}</p>
              <p className="text-white/70 leading-relaxed text-base md:text-lg">
                {t(`items.${selectedKey}.fullStory`)}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
