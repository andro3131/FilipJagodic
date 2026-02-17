"use client";

import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import Modal from "./Modal";
import { useTranslations } from "next-intl";

function AnimatedNumber({
  target,
  suffix = "",
}: {
  target: number;
  suffix?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span
      ref={ref}
      className="font-heading text-4xl md:text-5xl font-bold text-accent"
    >
      {count}
      {suffix}
    </span>
  );
}

const abilityKeys = ["absolutePitch", "memory", "noStageFright", "encyclopedia"] as const;

const statsData = [
  { number: 1000, suffix: "+", key: "songs" },
  { number: 20, suffix: "+", key: "keyboards" },
  { number: 27, suffix: "", key: "years" },
  { number: 30, suffix: "+", key: "recorded" },
];

export default function About() {
  const t = useTranslations("about");
  const [bioOpen, setBioOpen] = useState(false);

  return (
    <>
      <section
        id="o-filipu"
        aria-labelledby="about-heading"
        className="relative py-24 md:py-32 px-6"
      >
        <div className="mx-auto max-w-7xl">
          {/* Section header */}
          <ScrollReveal className="text-center mb-16 md:mb-24">
            <p className="text-accent text-sm font-medium tracking-[0.3em] uppercase mb-4">
              {t("supra")}
            </p>
            <h2
              id="about-heading"
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            >
              {t("heading")}
            </h2>
            <div className="w-20 h-0.5 bg-accent mx-auto" />
          </ScrollReveal>

          {/* Story */}
          <ScrollReveal
            className="max-w-3xl mx-auto mb-20 md:mb-28"
            delay={0.2}
          >
            <p className="text-lg md:text-xl text-white/70 leading-relaxed text-center mb-6">
              {t("story")}
            </p>
            <blockquote className="text-xl md:text-2xl text-accent/80 font-heading italic text-center mb-8">
              {t("blockquote")}
            </blockquote>
            <div className="text-center">
              <button
                onClick={() => setBioOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 border border-accent/30 text-accent rounded-full text-sm font-medium hover:bg-accent/10 hover:border-accent/50 transition-all duration-300"
              >
                {t("readFullStory")}
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </ScrollReveal>

          {/* Abilities */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20 md:mb-28">
            {abilityKeys.map((key, index) => (
              <ScrollReveal key={key} delay={0.1 * index}>
                <div className="group p-8 rounded-2xl bg-surface border border-border hover:border-accent/30 transition-all duration-500">
                  <h3 className="font-heading text-xl md:text-2xl font-semibold text-accent mb-3">
                    {t(`abilities.${key}.title`)}
                  </h3>
                  <p className="text-white/60 leading-relaxed">
                    {t(`abilities.${key}.description`)}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {statsData.map((stat, index) => (
              <ScrollReveal
                key={stat.key}
                delay={0.15 * index}
                className="text-center"
              >
                <div
                  className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-accent/[0.08] to-transparent border border-accent/10"
                  style={{
                    animation: `sway 4s ease-in-out ${index * 0.5}s infinite`,
                  }}
                >
                  <AnimatedNumber target={stat.number} suffix={stat.suffix} />
                  <p className="text-white font-semibold mt-3 mb-1">
                    {t(`stats.${stat.key}.label`)}
                  </p>
                  <p className="text-white/40 text-sm">{t(`stats.${stat.key}.description`)}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Full biography modal */}
      <Modal
        isOpen={bioOpen}
        onClose={() => setBioOpen(false)}
        maxWidth="max-w-4xl"
      >
        <div className="p-6 md:p-10">
          <p className="text-accent text-sm font-medium tracking-[0.3em] uppercase mb-4">
            {t("bio.supra")}
          </p>
          <h3 className="font-heading text-3xl md:text-4xl font-bold text-white mb-8">
            {t("bio.heading")}
          </h3>

          <div className="space-y-6 text-white/70 leading-relaxed text-base md:text-lg">
            <p>{t("bio.p1")}</p>
            <p>{t("bio.p2")}</p>

            <blockquote className="border-l-2 border-accent/50 pl-6 my-8 text-accent/80 font-heading italic text-xl md:text-2xl">
              {t("bio.blockquote")}
            </blockquote>

            <p>{t("bio.p3")}</p>
            <p>{t("bio.p4")}</p>
            <p>{t("bio.p5")}</p>
            <p>{t("bio.p6")}</p>

            {/* Photo */}
            <div className="relative w-full rounded-xl overflow-hidden mt-8">
              <Image
                src="https://res.cloudinary.com/dewf3zos0/image/upload/v1771102674/Screenshot_2026-02-14_at_21.57.37_brrt7t.png"
                alt={t("bio.photoAlt")}
                width={1200}
                height={800}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
