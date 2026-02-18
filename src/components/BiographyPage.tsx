"use client";

import Image from "next/image";
import Link from "next/link";
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

const toddlerPhotos = [
  "https://res.cloudinary.com/dewf3zos0/image/upload/v1771448668/73_z6aqph.jpg",
  "https://res.cloudinary.com/dewf3zos0/image/upload/v1771448674/77_vyhui9.jpg",
  "https://res.cloudinary.com/dewf3zos0/image/upload/v1771448678/86_e8daqv.jpg",
];

const youngKeyboardPhoto =
  "https://res.cloudinary.com/dewf3zos0/image/upload/v1771448997/85_ursdd5.jpg";

const eightYearsPhoto =
  "https://res.cloudinary.com/dewf3zos0/image/upload/v1771449080/94_q3lmf1.jpg";

const teenPhoto =
  "https://res.cloudinary.com/dewf3zos0/image/upload/v1771449086/14232370_632665486910245_786561684551610605_n_mcxyjo.jpg";

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
];

const endPhoto =
  "https://res.cloudinary.com/dewf3zos0/image/upload/v1771444763/44443880_1045231838935515_918131203201040384_n_ikooyu.jpg";

function PhotoGrid({ photos, alt }: { photos: string[]; alt: string }) {
  return (
    <div
      className={`grid gap-3 my-10 ${
        photos.length === 1
          ? "grid-cols-1 max-w-2xl mx-auto"
          : photos.length === 2
            ? "grid-cols-2"
            : "grid-cols-2 md:grid-cols-3"
      }`}
    >
      {photos.map((src, i) => (
        <div
          key={i}
          className="relative aspect-[4/3] rounded-xl overflow-hidden bg-surface-lighter"
        >
          <Image
            src={src}
            alt={`${alt} — ${i + 1}`}
            fill
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}

function SinglePhoto({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="my-10 max-w-2xl mx-auto">
      <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-surface-lighter">
        <Image src={src} alt={alt} fill className="object-cover" />
      </div>
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
    <ScrollReveal delay={delay} className="mb-16 md:mb-20">
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
    <blockquote className="border-l-2 border-accent/50 pl-6 my-8 text-accent/80 font-heading italic text-lg md:text-xl">
      {children}
    </blockquote>
  );
}

export default function BiographyPage() {
  const t = useTranslations("about.bio");
  const locale = useLocale();

  return (
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
          <PhotoGrid photos={birthPhotos} alt={t("photoAlt")} />
        </Chapter>

        {/* Chapter 2: Diagnoses */}
        <Chapter title={t("ch2title")} delay={0.1}>
          <Paragraph>{t("ch2p1")}</Paragraph>
          <PhotoGrid photos={firstMonthsPhotos} alt={t("photoAlt")} />
        </Chapter>

        {/* Chapter 3: Rehabilitation */}
        <Chapter title={t("ch3title")} delay={0.1}>
          <Paragraph>{t("ch3p1")}</Paragraph>
          <Quote>{t("ch3q")}</Quote>
          <PhotoGrid photos={singingWithMomPhotos} alt={t("photoAlt")} />
        </Chapter>

        {/* Chapter 4: Father */}
        <Chapter title={t("ch4title")} delay={0.1}>
          <Paragraph>{t("ch4p1")}</Paragraph>
          <PhotoGrid photos={toddlerPhotos} alt={t("photoAlt")} />
        </Chapter>

        {/* Chapter 5: Musical talent */}
        <Chapter title={t("ch5title")} delay={0.1}>
          <Paragraph>{t("ch5p1")}</Paragraph>
          <Quote>{t("ch5q")}</Quote>
          <Paragraph>{t("ch5p2")}</Paragraph>
          <SinglePhoto src={youngKeyboardPhoto} alt={t("photoAlt")} />
          <SinglePhoto src={eightYearsPhoto} alt={t("photoAlt")} />
          <SinglePhoto src={teenPhoto} alt={t("photoAlt")} />
        </Chapter>

        {/* Chapter 6: Autistic traits */}
        <Chapter title={t("ch6title")} delay={0.1}>
          <Paragraph>{t("ch6p1")}</Paragraph>
          <Quote>{t("ch6q")}</Quote>
          <PhotoGrid photos={autisticPhotos} alt={t("photoAlt")} />
        </Chapter>

        {/* Chapter 7: Career */}
        <Chapter title={t("ch7title")} delay={0.1}>
          <Paragraph>{t("ch7p1")}</Paragraph>
          <PhotoGrid photos={careerPhotos} alt={t("photoAlt")} />
        </Chapter>

        {/* Chapter 8: Mother */}
        <Chapter title={t("ch8title")} delay={0.1}>
          <Paragraph>{t("ch8p1")}</Paragraph>
          <Quote>{t("ch8q")}</Quote>
          <Paragraph>{t("ch8p2")}</Paragraph>
          <PhotoGrid photos={motherPhotos} alt={t("photoAlt")} />
        </Chapter>

        {/* Chapter 9: Today */}
        <Chapter title={t("ch9title")} delay={0.1}>
          <Paragraph>{t("ch9p1")}</Paragraph>
          <Paragraph>{t("ch9p2")}</Paragraph>
          <SinglePhoto src={endPhoto} alt={t("photoAlt")} />
        </Chapter>
      </div>
    </section>
  );
}
