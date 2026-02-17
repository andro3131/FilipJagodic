"use client";

import ScrollReveal from "./ScrollReveal";
import { useTranslations } from "next-intl";

const featuredId = "EJYPq4STQ6w";

const videoKeys = ["prstiZapleteni", "takeGoodCare", "letItBeMe", "klapaSufit"] as const;
const videoIds: Record<string, string> = {
  prstiZapleteni: "KPP-UOhs8iE",
  takeGoodCare: "1WPEC_KJXpk",
  letItBeMe: "ruVUK_g5rK0",
  klapaSufit: "SJgYyL1qdzE",
};

export default function Music() {
  const t = useTranslations("music");

  return (
    <section
      id="glasba"
      aria-labelledby="music-heading"
      className="relative py-24 md:py-32 px-6 bg-surface"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <ScrollReveal className="text-center mb-16">
          <p className="text-accent text-sm font-medium tracking-[0.3em] uppercase mb-4">
            {t("supra")}
          </p>
          <h2
            id="music-heading"
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            {t("heading")}
          </h2>
          <div className="w-20 h-0.5 bg-accent mx-auto mb-6" />
          <p className="text-white/50 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </ScrollReveal>

        {/* Featured video */}
        <ScrollReveal className="mb-12" delay={0.1}>
          <div className="max-w-4xl mx-auto">
            <div className="aspect-video rounded-2xl overflow-hidden bg-black border border-border">
              <iframe
                src={`https://www.youtube.com/embed/${featuredId}`}
                title={t("featured.title")}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
                loading="lazy"
              />
            </div>
            <div className="mt-4 text-center">
              <h3 className="font-heading text-xl md:text-2xl font-semibold text-white">
                {t("featured.title")}
              </h3>
              <p className="text-white/50 mt-1">{t("featured.description")}</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Video grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {videoKeys.map((key, index) => (
            <ScrollReveal key={key} delay={0.1 * index}>
              <div className="rounded-2xl overflow-hidden bg-[#141618] border border-border hover:border-accent/30 transition-all duration-500">
                <div className="aspect-video bg-black">
                  <iframe
                    src={`https://www.youtube.com/embed/${videoIds[key]}`}
                    title={t(`videos.${key}.title`)}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                    loading="lazy"
                  />
                </div>
                <div className="p-4 md:p-5">
                  <h3 className="font-heading text-lg font-semibold text-white">
                    {t(`videos.${key}.title`)}
                  </h3>
                  <p className="text-white/50 text-sm mt-1">
                    {t(`videos.${key}.description`)}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
