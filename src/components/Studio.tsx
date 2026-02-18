"use client";

import { useState } from "react";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import Modal from "./Modal";
import { useTranslations } from "next-intl";

const albums = [
  {
    key: "album1",
    cover:
      "https://res.cloudinary.com/dewf3zos0/image/upload/v1771103655/listek_zunaj-FINAL_paujro.jpg",
    images: [
      "https://res.cloudinary.com/dewf3zos0/image/upload/v1771446527/zephyr-keep-the-photo-as-it-is-just-remove-horizontal-white-shadow-0_glsgmu.jpg",
      "https://res.cloudinary.com/dewf3zos0/image/upload/v1771103663/Inlay_zunaj_FINAL_FINAL_d6vjvw.jpg",
    ],
  },
  {
    key: "album2",
    cover:
      "https://res.cloudinary.com/dewf3zos0/image/upload/v1771103718/ovitek_noter_ZUNAJ_FINAL_eco11d.jpg",
    images: [
      "https://res.cloudinary.com/dewf3zos0/image/upload/v1771103978/ovitek_noter_NOTER_FINAL2_es9fg6.jpg",
      "https://res.cloudinary.com/dewf3zos0/image/upload/v1771103709/Inlay_zunaj_FINAL-FINAL_h3qt7b.jpg",
    ],
  },
  {
    key: "album3",
    cover:
      "https://res.cloudinary.com/dewf3zos0/image/upload/v1771103695/Screenshot_2026-02-14_at_22.14.48_zvzcdg.png",
    images: [
      "https://res.cloudinary.com/dewf3zos0/image/upload/v1771104182/Screenshot_2026-02-14_at_22.19.49_q2ffjk.png",
      "https://res.cloudinary.com/dewf3zos0/image/upload/v1771103675/Inlay_zunaj_Filip6-final_u4mt6k.jpg",
    ],
  },
];

export default function Studio() {
  const t = useTranslations("studio");
  const [selectedAlbum, setSelectedAlbum] = useState<
    (typeof albums)[0] | null
  >(null);
  const [activeImage, setActiveImage] = useState(0);

  const openAlbum = (album: (typeof albums)[0]) => {
    setSelectedAlbum(album);
    setActiveImage(0);
  };

  const allImages = selectedAlbum
    ? [selectedAlbum.cover, ...selectedAlbum.images]
    : [];

  return (
    <>
      <section
        id="studio"
        aria-labelledby="studio-heading"
        className="relative py-24 md:py-32 px-6 bg-surface"
      >
        <div className="mx-auto max-w-7xl">
          {/* Section header */}
          <ScrollReveal className="text-center mb-16 md:mb-24">
            <p className="text-accent text-sm font-medium tracking-[0.3em] uppercase mb-4">
              {t("supra")}
            </p>
            <h2
              id="studio-heading"
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            >
              {t("heading")}
            </h2>
            <div className="w-20 h-0.5 bg-accent mx-auto mb-6" />
            <p className="text-white/50 max-w-2xl mx-auto">
              {t("subtitle")}
            </p>
          </ScrollReveal>

          {/* Story */}
          <ScrollReveal
            className="max-w-3xl mx-auto mb-20 md:mb-28"
            delay={0.1}
          >
            <div className="space-y-5 text-white/60 leading-relaxed text-base md:text-lg text-center">
              <p>{t("storyP1")}</p>
              <p>{t("storyP2")}</p>
              <p>{t("storyP3")}</p>
            </div>
          </ScrollReveal>

          {/* Albums */}
          <div className="mb-20 md:mb-28">
            <ScrollReveal>
              <h3 className="font-heading text-2xl md:text-3xl font-semibold text-white mb-3 text-center">
                {t("albumsHeading")}
              </h3>
              <p className="text-white/40 text-center mb-10 max-w-xl mx-auto">
                {t("albumsSubtitle")}
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {albums.map((album, index) => (
                <ScrollReveal key={album.key} delay={0.1 * index}>
                  <button
                    onClick={() => openAlbum(album)}
                    className="group w-full rounded-2xl overflow-hidden bg-[#141618] border border-border hover:border-accent/30 transition-all duration-500 cursor-pointer text-left"
                  >
                    {/* Cover */}
                    <div className="relative aspect-square bg-surface-lighter overflow-hidden">
                      <Image
                        src={album.cover}
                        alt={t(album.key)}
                        fill
                        className={`object-cover transition-transform duration-500 group-hover:scale-110 ${
                          index === 0
                            ? "scale-[1.11]"
                            : index === 1
                              ? "scale-[1.08]"
                              : ""
                        }`}
                      />
                    </div>
                    {/* Info */}
                    <div className="p-4 text-center">
                      <h4 className="font-semibold text-white group-hover:text-accent transition-colors">
                        {t(album.key)}
                      </h4>
                      <p className="text-accent/50 text-xs mt-1 group-hover:text-accent/70 transition-colors">
                        {t("openGallery")} &rarr;
                      </p>
                    </div>
                  </button>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal delay={0.3} className="text-center mt-8">
              <a
                href="#kontakt"
                className="inline-flex items-center gap-2 px-6 py-3 border border-accent/30 text-accent rounded-full text-sm font-medium hover:bg-accent/10 hover:border-accent/50 transition-all duration-300"
              >
                {t("orderCd")}
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </a>
            </ScrollReveal>
          </div>

        </div>
      </section>

      {/* Album detail modal */}
      <Modal
        isOpen={!!selectedAlbum}
        onClose={() => setSelectedAlbum(null)}
        maxWidth="max-w-3xl"
      >
        {selectedAlbum && (
          <div>
            {/* Main image */}
            <div className="relative w-full aspect-square bg-black">
              <Image
                src={allImages[activeImage] || selectedAlbum.cover}
                alt={`${t(selectedAlbum.key)} — ${activeImage + 1}`}
                fill
                className="object-contain"
              />

              {allImages.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImage(
                        (activeImage - 1 + allImages.length) % allImages.length
                      );
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
                      setActiveImage((activeImage + 1) % allImages.length);
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

            {/* Thumbnails strip */}
            {allImages.length > 1 && (
              <div className="flex gap-2 p-4 overflow-x-auto">
                {allImages.map((img, i) => (
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

            {/* Info */}
            <div className="p-4 md:p-6 text-center">
              <h3 className="font-heading text-xl md:text-2xl font-bold text-white">
                {t(selectedAlbum.key)}
              </h3>
              {allImages.length > 1 && (
                <p className="text-white/30 text-sm mt-1">
                  {activeImage + 1} / {allImages.length}
                </p>
              )}
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
