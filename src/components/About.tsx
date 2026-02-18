"use client";

import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import ScrollReveal from "./ScrollReveal";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

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
  const locale = useLocale();

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
              <Link
                href={`/${locale}/o-filipu`}
                className="inline-flex items-center gap-3 px-8 py-4 bg-accent/10 border border-accent/40 text-white rounded-full text-base font-semibold hover:bg-accent/20 hover:border-accent/60 transition-all duration-300"
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
              </Link>
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

    </>
  );
}
