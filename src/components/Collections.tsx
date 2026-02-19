"use client";

import { useState } from "react";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import Modal from "./Modal";
import { useTranslations } from "next-intl";

type Category = "keyboards" | "dictaphones";

const categoryImages: Record<Category, string[]> = {
  keyboards: [
    "https://res.cloudinary.com/dewf3zos0/image/upload/v1771444110/klaviature_do_2020_llmar5.jpg",
  ],
  dictaphones: [
    "https://res.cloudinary.com/dewf3zos0/image/upload/v1771444128/zbrika2_2021_lnshyb.jpg",
    "https://res.cloudinary.com/dewf3zos0/image/upload/v1771444073/delc%CC%8Cek_zbirke_h2cwuw.jpg",
    "https://res.cloudinary.com/dewf3zos0/image/upload/v1771490962/568265414_3164906537019448_8619112095800451186_n_fi0amz.jpg",
    "https://res.cloudinary.com/dewf3zos0/image/upload/v1771490872/474636910_2883279178515520_2740116039688518909_n_yzescg.jpg",
    "https://res.cloudinary.com/dewf3zos0/image/upload/v1771490850/126998423_1712118665631583_3046801342967229634_n_sqxgej.jpg",
  ],
};

const categoryItems: Record<Category, string[]> = {
  keyboards: ["yamaha", "korg"],
  dictaphones: ["sony", "olympus"],
};

const categoryCovers: Record<Category, string> = {
  keyboards: categoryImages.keyboards[0],
  dictaphones: categoryImages.dictaphones[0],
};

export default function Collections() {
  const t = useTranslations("collections");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [activeImage, setActiveImage] = useState(0);

  const images = selectedCategory ? categoryImages[selectedCategory] : [];
  const items = selectedCategory ? categoryItems[selectedCategory] : [];

  const openCategory = (cat: Category) => {
    setSelectedCategory(cat);
    setActiveImage(0);
  };

  return (
    <>
      <section
        id="zbirke"
        aria-labelledby="collections-heading"
        className="relative py-24 md:py-32 px-6 bg-surface"
      >
        <div className="mx-auto max-w-5xl">
          {/* Section header */}
          <ScrollReveal className="text-center mb-16 md:mb-24">
            <p className="text-accent text-sm font-medium tracking-[0.3em] uppercase mb-4">
              {t("supra")}
            </p>
            <h2
              id="collections-heading"
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            >
              {t("heading")}
            </h2>
            <div className="w-20 h-0.5 bg-accent mx-auto mb-6" />
            <p className="text-white/50 max-w-2xl mx-auto">
              {t("subtitle")}
            </p>
          </ScrollReveal>

          {/* Two category cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {(["keyboards", "dictaphones"] as const).map((cat, index) => (
              <ScrollReveal key={cat} delay={0.15 * index}>
                <button
                  onClick={() => openCategory(cat)}
                  className="w-full text-left group rounded-2xl bg-surface border border-border hover:border-accent/30 transition-all duration-500 overflow-hidden cursor-pointer"
                >
                  {/* Cover image */}
                  <div className="relative w-full aspect-[16/10] bg-[#141618]">
                    <Image
                      src={categoryCovers[cat]}
                      alt={t(cat === "keyboards" ? "keyboardsTitle" : "dictaphonesTitle")}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>

                  {/* Info */}
                  <div className="p-6">
                    <h3 className="font-heading text-2xl md:text-3xl font-bold text-white group-hover:text-accent transition-colors mb-2">
                      {t(cat === "keyboards" ? "keyboardsTitle" : "dictaphonesTitle")}
                    </h3>
                    <p className="text-white/40 text-sm mb-4">
                      {t(cat === "keyboards" ? "keyboardsDesc" : "dictaphonesDesc")}
                    </p>
                    <span className="inline-flex items-center gap-2 text-accent/60 text-sm group-hover:text-accent transition-colors">
                      {t("openCollection")} <span className="group-hover:translate-x-1 transition-transform duration-300">&rarr;</span>
                    </span>
                  </div>
                </button>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Category detail modal */}
      <Modal
        isOpen={!!selectedCategory}
        onClose={() => setSelectedCategory(null)}
        maxWidth="max-w-3xl"
      >
        {selectedCategory && (
          <div>
            {/* Gallery — main image */}
            <div className="relative w-full aspect-[4/3] bg-black">
              <Image
                src={images[activeImage]}
                alt={`${t(selectedCategory === "keyboards" ? "keyboardsTitle" : "dictaphonesTitle")} — ${activeImage + 1}`}
                fill
                className="object-contain"
              />

              {images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImage((activeImage - 1 + images.length) % images.length);
                    }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white/70 hover:text-white hover:bg-black/70 flex items-center justify-center transition-colors"
                    aria-label={t("prevImage")}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImage((activeImage + 1) % images.length);
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white/70 hover:text-white hover:bg-black/70 flex items-center justify-center transition-colors"
                    aria-label={t("nextImage")}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail strip */}
            {images.length > 1 && (
              <div className="flex gap-2 p-4 overflow-x-auto">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                      i === activeImage
                        ? "border-accent"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Title + counter */}
            <div className="px-6 pt-4 pb-2">
              <h3 className="font-heading text-xl md:text-2xl font-bold text-white">
                {t(selectedCategory === "keyboards" ? "keyboardsTitle" : "dictaphonesTitle")}
              </h3>
              {images.length > 1 && (
                <p className="text-white/30 text-sm mt-1">
                  {activeImage + 1} / {images.length}
                </p>
              )}
            </div>

            {/* Device list */}
            <div className="px-6 pb-6">
              <p className="text-accent text-xs font-medium tracking-[0.2em] uppercase mb-3">
                {t("deviceList")}
              </p>
              <div className="space-y-3">
                {items.map((key) => (
                  <div key={key} className="flex items-start gap-3 p-3 rounded-xl bg-white/5">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                    <div>
                      <p className="text-white font-medium text-sm">
                        {t(`items.${key}.name`)}
                      </p>
                      <p className="text-white/40 text-xs mt-0.5">
                        {t(`items.${key}.description`)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
