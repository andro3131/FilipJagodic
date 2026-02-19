"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useCallback, useEffect } from "react";
import ScrollReveal from "./ScrollReveal";
import { useTranslations, useLocale } from "next-intl";

const birthPhotos = [
  "https://res.cloudinary.com/dewf3zos0/image/upload/v1771448586/7_1_smae7f.jpg",
  "https://res.cloudinary.com/dewf3zos0/image/upload/v1771448587/2_cicbzf.jpg",
  "https://res.cloudinary.com/dewf3zos0/image/upload/v1771448589/6_1_eyvnbp.jpg",
  "https://res.cloudinary.com/dewf3zos0/image/upload/v1771448604/26_2_ymx1ws.jpg",
  "https://res.cloudinary.com/dewf3zos0/image/upload/v1771448626/41_xhhvp3.jpg",
  "https://res.cloudinary.com/dewf3zos0/image/upload/v1771448630/42_sxrvyz.jpg",
];

const firstMonthsPhotos = [
  "https://res.cloudinary.com/dewf3zos0/image/upload/v1771448635/49_ge749n.jpg",
  "https://res.cloudinary.com/dewf3zos0/image/upload/v1771448664/68_tsukco.jpg",
];

const singingWithMomPhotos = [
  "https://res.cloudinary.com/dewf3zos0/image/upload/v1771448639/50_iqxa9i.jpg",
  "https://res.cloudinary.com/dewf3zos0/image/upload/v1771448643/52_ypcfmu.jpg",
];

const fatherPhotos = [
  "https://res.cloudinary.com/dewf3zos0/image/upload/v1771448678/86_e8daqv.jpg",
  "https://res.cloudinary.com/dewf3zos0/image/upload/v1771448656/65_or4onk.jpg",
  "https://res.cloudinary.com/dewf3zos0/image/upload/v1771448650/54_2_buai9t.jpg",
  "https://res.cloudinary.com/dewf3zos0/image/upload/v1771448635/49_ge749n.jpg",
  "https://res.cloudinary.com/dewf3zos0/image/upload/v1771448589/6_1_eyvnbp.jpg",
  "https://res.cloudinary.com/dewf3zos0/image/upload/v1771490902/55704623_1192077094302412_8834702750974476288_n_iksgej.jpg",
];

const musicalTalentPhotos = [
  "https://res.cloudinary.com/dewf3zos0/image/upload/v1771448997/85_ursdd5.jpg",
  "https://res.cloudinary.com/dewf3zos0/image/upload/v1771449080/94_q3lmf1.jpg",
  "https://res.cloudinary.com/dewf3zos0/image/upload/v1771449086/14232370_632665486910245_786561684551610605_n_mcxyjo.jpg",
];

const autisticPhotos = [
  "https://res.cloudinary.com/dewf3zos0/image/upload/v1771444128/zbrika2_2021_lnshyb.jpg",
  "https://res.cloudinary.com/dewf3zos0/image/upload/v1771444110/klaviature_do_2020_llmar5.jpg",
];

const careerPhotos = [
  "https://res.cloudinary.com/dewf3zos0/image/upload/v1771103695/Screenshot_2026-02-14_at_22.14.48_zvzcdg.png",
  "https://res.cloudinary.com/dewf3zos0/image/upload/v1771103621/FILIP_JUMBO_25.MAJ_majhna_FINAL_vhfuxe.jpg",
  "https://res.cloudinary.com/dewf3zos0/image/upload/v1771444746/33573390_964264710416986_3024183878676905984_n_qcolgm.jpg",
  "https://res.cloudinary.com/dewf3zos0/image/upload/v1771098529/andrea_bocelli_qwksga.jpg",
  "https://res.cloudinary.com/dewf3zos0/image/upload/v1771098693/11019010_402268379949958_4207790944302076286_n_eor5pu.jpg",
  "https://res.cloudinary.com/dewf3zos0/image/upload/v1771096727/borut_pahor_s8jwkb.jpg",
];

const motherPhotos = [
  "https://res.cloudinary.com/dewf3zos0/image/upload/v1771450879/21761758_833699250140200_3605137899429653888_n_rpombz.jpg",
  "https://res.cloudinary.com/dewf3zos0/image/upload/v1771450860/10959463_399208300255966_485022783268918936_n_kfqz7s.jpg",
  "https://res.cloudinary.com/dewf3zos0/image/upload/v1771490829/469235815_2846551268854978_2775173921985612069_n_l38a3y.jpg",
  "https://res.cloudinary.com/dewf3zos0/image/upload/v1771489763/48426432_1130207687156020_6968695209261531136_n_wyzb3z.jpg",
  "https://res.cloudinary.com/dewf3zos0/image/upload/v1771444837/Filip_2014_RTV_SLO_f2r3xh.jpg",
  "https://res.cloudinary.com/dewf3zos0/image/upload/v1771444759/33720422_964264490417008_9021151803894398976_n_igtckq.jpg",
];

const endPhoto =
  "https://res.cloudinary.com/dewf3zos0/image/upload/v1771444763/44443880_1045231838935515_918131203201040384_n_ikooyu.jpg";

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
        <div className="mx-auto max-w-3xl">
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
