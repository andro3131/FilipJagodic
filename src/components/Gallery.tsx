"use client";

import { useState } from "react";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import Modal from "./Modal";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";

const photoKeys = ["keyboards", "performance", "bocelli", "studio", "mom", "dictaphone"] as const;

const photoSrcs: Record<string, string> = {
  keyboards: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771098561/14232370_632665486910245_786561684551610605_n_lrymzy.jpg",
  performance: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771098693/11019010_402268379949958_4207790944302076286_n_eor5pu.jpg",
  bocelli: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771098529/andrea_bocelli_qwksga.jpg",
  studio: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771098609/20250520_175129_uvgigs.jpg",
  mom: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771098651/21761758_833699250140200_3605137899429653888_n_jqsvoi.jpg",
  dictaphone: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771098757/21752222_833699213473537_373850975019071424_n_ijhcv2.jpg",
};

const photoPositions: Record<string, string> = {
  studio: "top",
};

export default function Gallery() {
  const t = useTranslations("gallery");
  const locale = useLocale();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const navigate = (dir: -1 | 1) => {
    if (selectedIndex === null) return;
    const newIndex = (selectedIndex + dir + photoKeys.length) % photoKeys.length;
    setSelectedIndex(newIndex);
  };

  const selectedKey = selectedIndex !== null ? photoKeys[selectedIndex] : null;

  return (
    <>
      <section
        id="galerija"
        aria-labelledby="gallery-heading"
        className="relative py-24 md:py-32 px-6"
      >
        <div className="mx-auto max-w-7xl">
          {/* Section header */}
          <ScrollReveal className="text-center mb-16 md:mb-24">
            <p className="text-accent text-sm font-medium tracking-[0.3em] uppercase mb-4">
              {t("supra")}
            </p>
            <h2
              id="gallery-heading"
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            >
              {t("heading")}
            </h2>
            <div className="w-20 h-0.5 bg-accent mx-auto" />
          </ScrollReveal>

          {/* Photo grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {photoKeys.map((key, index) => (
              <ScrollReveal key={key} delay={0.08 * index}>
                <button
                  onClick={() => setSelectedIndex(index)}
                  className="group relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-surface-lighter cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent"
                  aria-label={t("openPhoto", { alt: t(`photos.${key}.alt`) })}
                >
                  <Image
                    src={photoSrcs[key]}
                    alt={t(`photos.${key}.alt`)}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    style={photoPositions[key] ? { objectPosition: photoPositions[key] } : undefined}
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end p-3">
                    <p className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      {t(`photos.${key}.caption`)}
                    </p>
                  </div>
                </button>
              </ScrollReveal>
            ))}
          </div>

          {/* View all link */}
          <ScrollReveal delay={0.3} className="text-center mt-12">
            <Link
              href={`/${locale}/galerija`}
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

      {/* Lightbox modal */}
      <Modal
        isOpen={selectedIndex !== null}
        onClose={() => setSelectedIndex(null)}
        maxWidth="max-w-5xl"
      >
        {selectedKey && (
          <div className="relative">
            <div className="relative w-full aspect-[16/10] bg-black">
              <Image
                src={photoSrcs[selectedKey]}
                alt={t(`photos.${selectedKey}.alt`)}
                fill
                className="object-contain"
              />

              {/* Navigation arrows */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(-1);
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white/70 hover:text-white hover:bg-black/70 flex items-center justify-center transition-colors"
                aria-label={t("prevPhoto")}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(1);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white/70 hover:text-white hover:bg-black/70 flex items-center justify-center transition-colors"
                aria-label={t("nextPhoto")}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Caption */}
            <div className="p-4 md:p-6 text-center">
              <p className="text-white/80 font-medium">{t(`photos.${selectedKey}.caption`)}</p>
              <p className="text-white/30 text-sm mt-1">
                {(selectedIndex ?? 0) + 1} / {photoKeys.length}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
