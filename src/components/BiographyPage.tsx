"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useCallback, useEffect } from "react";
import ScrollReveal from "./ScrollReveal";
import { useTranslations, useLocale } from "next-intl";

import biographyData from '../../content/biography.json';

const birthPhotos = biographyData.birthPhotos;
const firstMonthsPhotos = biographyData.firstMonthsPhotos;
const singingWithMomPhotos = biographyData.singingWithMomPhotos;
const fatherPhotos = biographyData.fatherPhotos;
const musicalTalentPhotos = biographyData.musicalTalentPhotos;
const autisticPhotos = biographyData.autisticPhotos;
const careerPhotos = biographyData.careerPhotos;
const motherPhotos = biographyData.motherPhotos;
const endPhoto = biographyData.endPhoto[0];

// Collect all photos in page order for lightbox navigation
const allPhotos = [
  ...birthPhotos,
  ...firstMonthsPhotos,
  ...singingWithMomPhotos,
  ...fatherPhotos,
  ...musicalTalentPhotos,
  ...autisticPhotos,
  ...careerPhotos,
  ...motherPhotos,
  endPhoto,
];

function Lightbox({
  photos,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  photos: string[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      window.scrollTo(0, scrollY);
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 text-white/60 hover:text-white transition-colors"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Prev arrow */}
      {photos.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/50 border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/70 transition-all"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Image */}
      <div
        className="relative w-[90vw] h-[80vh] max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={photos[index]}
          alt=""
          fill
          className="object-contain"
          sizes="90vw"
        />
      </div>

      {/* Next arrow */}
      {photos.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/50 border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/70 transition-all"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Counter */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-sm">
        {index + 1} / {photos.length}
      </div>
    </div>
  );
}

function PhotoGrid({
  photos,
  alt,
  onPhotoClick,
}: {
  photos: string[];
  alt: string;
  onPhotoClick: (src: string) => void;
}) {
  return (
    <div
      className={`grid gap-3 my-6 ${
        photos.length === 1
          ? "grid-cols-1 max-w-2xl mx-auto"
          : photos.length === 2
            ? "grid-cols-2"
            : "grid-cols-2 md:grid-cols-3"
      }`}
    >
      {photos.map((src, i) => (
        <button
          key={i}
          onClick={() => onPhotoClick(src)}
          className="relative aspect-[4/3] rounded-xl overflow-hidden bg-surface-lighter cursor-pointer group"
        >
          <Image
            src={src}
            alt={`${alt} — ${i + 1}`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        </button>
      ))}
    </div>
  );
}

function SinglePhoto({
  src,
  alt,
  onPhotoClick,
}: {
  src: string;
  alt: string;
  onPhotoClick: (src: string) => void;
}) {
  return (
    <div className="my-6 max-w-2xl mx-auto">
      <button
        onClick={() => onPhotoClick(src)}
        className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-surface-lighter cursor-pointer group"
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
      </button>
    </div>
  );
}

function Chapter({
  title,
  children,
  delay = 0,
}: {
  title: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <ScrollReveal delay={delay} className="mb-8 md:mb-10">
      <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-6">
        {title}
      </h2>
      {children}
    </ScrollReveal>
  );
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-white/70 leading-relaxed text-base md:text-lg mb-4">
      {children}
    </p>
  );
}

function Quote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="border-l-2 border-accent/50 pl-6 my-5 text-accent/80 font-heading italic text-lg md:text-xl">
      {children}
    </blockquote>
  );
}

export default function BiographyPage() {
  const t = useTranslations("about.bio");
  const locale = useLocale();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = useCallback((src: string) => {
    const idx = allPhotos.indexOf(src);
    setLightboxIndex(idx >= 0 ? idx : 0);
  }, []);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevPhoto = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i - 1 + allPhotos.length) % allPhotos.length : null));
  }, []);
  const nextPhoto = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i + 1) % allPhotos.length : null));
  }, []);

  return (
    <>
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 px-6">
        <div className="mx-auto max-w-[996px]">
          {/* Back link */}
          <ScrollReveal>
            <Link
              href={`/${locale}/#o-filipu`}
              className="inline-flex items-center gap-2 text-white/40 hover:text-accent text-sm transition-colors mb-12"
            >
              <span>&larr;</span>
              <span>{t("backToHome")}</span>
            </Link>
          </ScrollReveal>

          {/* Header */}
          <ScrollReveal className="text-center mb-16">
            <p className="text-accent text-sm font-medium tracking-[0.3em] uppercase mb-4">
              {t("supra")}
            </p>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t("heading")}
            </h1>
            <div className="w-20 h-0.5 bg-accent mx-auto" />
          </ScrollReveal>

          {/* Chapter 1: Birth */}
          <Chapter title={t("ch1title")}>
            <Paragraph>{t("ch1p1")}</Paragraph>
            <Paragraph>{t("ch1p2")}</Paragraph>
            <Quote>{t("ch1q")}</Quote>
            <PhotoGrid photos={birthPhotos} alt={t("photoAlt")} onPhotoClick={openLightbox} />
          </Chapter>

          {/* Chapter 2: Diagnoses */}
          <Chapter title={t("ch2title")} delay={0.1}>
            <Paragraph>{t("ch2p1")}</Paragraph>
            <PhotoGrid photos={firstMonthsPhotos} alt={t("photoAlt")} onPhotoClick={openLightbox} />
          </Chapter>

          {/* Chapter 3: Rehabilitation */}
          <Chapter title={t("ch3title")} delay={0.1}>
            <Paragraph>{t("ch3p1")}</Paragraph>
            <Quote>{t("ch3q")}</Quote>
            <PhotoGrid photos={singingWithMomPhotos} alt={t("photoAlt")} onPhotoClick={openLightbox} />
          </Chapter>

          {/* Chapter 4: Father */}
          <Chapter title={t("ch4title")} delay={0.1}>
            <Paragraph>{t("ch4p1")}</Paragraph>
            <PhotoGrid photos={fatherPhotos} alt={t("photoAlt")} onPhotoClick={openLightbox} />
          </Chapter>

          {/* Chapter 5: Musical talent */}
          <Chapter title={t("ch5title")} delay={0.1}>
            <Paragraph>{t("ch5p1")}</Paragraph>
            <Quote>{t("ch5q")}</Quote>
            <Paragraph>{t("ch5p2")}</Paragraph>
            <PhotoGrid photos={musicalTalentPhotos} alt={t("photoAlt")} onPhotoClick={openLightbox} />
          </Chapter>

          {/* Chapter 6: Autistic traits */}
          <Chapter title={t("ch6title")} delay={0.1}>
            <Paragraph>{t("ch6p1")}</Paragraph>
            <Quote>{t("ch6q")}</Quote>
            <Paragraph>{t("ch6p2")}</Paragraph>
            <PhotoGrid photos={autisticPhotos} alt={t("photoAlt")} onPhotoClick={openLightbox} />
          </Chapter>

          {/* Chapter 7: Career */}
          <Chapter title={t("ch7title")} delay={0.1}>
            <Paragraph>{t("ch7p1")}</Paragraph>
            <PhotoGrid photos={careerPhotos} alt={t("photoAlt")} onPhotoClick={openLightbox} />
          </Chapter>

          {/* Chapter 8: Mother */}
          <Chapter title={t("ch8title")} delay={0.1}>
            <Paragraph>{t("ch8p1")}</Paragraph>
            <Quote>{t("ch8q")}</Quote>
            <Paragraph>{t("ch8p2")}</Paragraph>
            <Paragraph>{t("ch8p3")}</Paragraph>
            <PhotoGrid photos={motherPhotos} alt={t("photoAlt")} onPhotoClick={openLightbox} />
          </Chapter>

          {/* Chapter 9: Today */}
          <Chapter title={t("ch9title")} delay={0.1}>
            <Paragraph>{t("ch9p1")}</Paragraph>
            <Paragraph>{t("ch9p2")}</Paragraph>
            <Paragraph>{t("ch9p3")}</Paragraph>
            <SinglePhoto src={endPhoto} alt={t("photoAlt")} onPhotoClick={openLightbox} />
          </Chapter>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          photos={allPhotos}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevPhoto}
          onNext={nextPhoto}
        />
      )}
    </>
  );
}
