"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";
import Modal from "./Modal";
import { useTranslations, useLocale } from "next-intl";

import galleryData from '../../content/gallery.json';

const photoKeys = galleryData.all;
const photoSrcs: Record<string, string> = galleryData.images;
const photoPositions: Record<string, string> = galleryData.positions;

// Cloudinary: insert transformation params for optimized thumbnails
function thumbUrl(src: string) {
  return src.replace("/upload/", "/upload/c_fill,w_600,h_450,q_auto,f_auto/");
}

function fullUrl(src: string) {
  return src.replace("/upload/", "/upload/q_auto,f_auto/");
}

// Preload a full-size image into the browser cache
const preloaded = new Set<string>();
function preloadImage(key: string) {
  const url = fullUrl(photoSrcs[key]);
  if (preloaded.has(url)) return;
  preloaded.add(url);
  const img = new window.Image();
  img.src = url;
}

export default function GalleryAll() {
  const t = useTranslations("gallery");
  const locale = useLocale();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const preloadStarted = useRef(false);

  // Background preload: after mount, gradually preload all full-size images
  useEffect(() => {
    if (preloadStarted.current) return;
    preloadStarted.current = true;
    let i = 0;
    const batchSize = 3;
    const interval = setInterval(() => {
      for (let j = 0; j < batchSize && i < photoKeys.length; j++, i++) {
        preloadImage(photoKeys[i]);
      }
      if (i >= photoKeys.length) clearInterval(interval);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // When lightbox is open, preload adjacent images
  useEffect(() => {
    if (selectedIndex === null) return;
    const prev = (selectedIndex - 1 + photoKeys.length) % photoKeys.length;
    const next = (selectedIndex + 1) % photoKeys.length;
    preloadImage(photoKeys[prev]);
    preloadImage(photoKeys[next]);
  }, [selectedIndex]);

  const handleHover = useCallback((index: number) => {
    preloadImage(photoKeys[index]);
  }, []);

  const navigate = (dir: -1 | 1) => {
    if (selectedIndex === null) return;
    const newIndex = (selectedIndex + dir + photoKeys.length) % photoKeys.length;
    setSelectedIndex(newIndex);
  };

  const selectedKey = selectedIndex !== null ? photoKeys[selectedIndex] : null;

  return (
    <>
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 px-6">
        <div className="mx-auto max-w-7xl">
          {/* Back link */}
          <ScrollReveal>
            <Link
              href={`/${locale}/#galerija`}
              className="inline-flex items-center gap-2 text-white/40 hover:text-accent text-sm transition-colors mb-12"
            >
              <span>&larr;</span>
              <span>{t("backToHome")}</span>
            </Link>
          </ScrollReveal>

          {/* Section header */}
          <ScrollReveal className="text-center mb-16 md:mb-24">
            <p className="text-accent text-sm font-medium tracking-[0.3em] uppercase mb-4">
              {t("supra")}
            </p>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t("heading")}
            </h1>
            <div className="w-20 h-0.5 bg-accent mx-auto" />
          </ScrollReveal>

          {/* Photo grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {photoKeys.map((key, index) => (
              <ScrollReveal key={key} delay={0.05 * (index % 6)}>
                <button
                  onClick={() => setSelectedIndex(index)}
                  onMouseEnter={() => handleHover(index)}
                  className="group relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-surface-lighter cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent"
                  aria-label={t("openPhoto", { alt: t(`photos.${key}.alt`) })}
                >
                  <Image
                    src={thumbUrl(photoSrcs[key])}
                    alt={t(`photos.${key}.alt`)}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
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
                src={fullUrl(photoSrcs[selectedKey])}
                alt={t(`photos.${selectedKey}.alt`)}
                fill
                sizes="90vw"
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
