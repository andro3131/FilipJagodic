"use client";

import Link from "next/link";
import ScrollReveal from "./ScrollReveal";
import { useTranslations, useLocale } from "next-intl";

const featuredId = "EJYPq4STQ6w";

const videoKeys = [
  "prstiZapleteni", "takeGoodCare", "letItBeMe", "klapaSufit",
  "blueChristmas", "shame", "letHerGo", "blueEyes",
  "yourCheatingHeart", "poJezeru", "thisCouldBeHeaven",
  "darkMoon", "loveIsAll", "hamburgSong", "smile",
  "whoAmI", "overTheRainbow", "weCallOnHim",
  "forTheGoodTimes", "stillWaiting", "upWhereWeBelong",
  "whatAWonderfulWorld",
  "moja", "glazekVincka", "notteStellata", "cigo", "shallow",
] as const;
const videoIds: Record<string, string> = {
  prstiZapleteni: "KPP-UOhs8iE",
  takeGoodCare: "1WPEC_KJXpk",
  letItBeMe: "ruVUK_g5rK0",
  klapaSufit: "SJgYyL1qdzE",
  blueChristmas: "Qz2Qaa1msLE",
  shame: "7Qf24gXHNDw",
  letHerGo: "3W1fW61wqrk",
  blueEyes: "G19dpj2Mw1c",
  yourCheatingHeart: "GGUwSNEsP04",
  poJezeru: "U_LeonbTwJY",
  thisCouldBeHeaven: "khuVaQuCZl0",
  darkMoon: "Z_AAYxf_Zdw",
  loveIsAll: "QJihFOWj10c",
  hamburgSong: "-z57R6--Fi0",
  smile: "MCWNcfkBVAQ",
  whoAmI: "oOsBwLI9f88",
  overTheRainbow: "ulIzJOADq6U",
  weCallOnHim: "Cl6Z34kqDMs",
  forTheGoodTimes: "cfFoncG4mSY",
  stillWaiting: "Z3Drko8tcJU",
  upWhereWeBelong: "SZwYAaYL_Iw",
  whatAWonderfulWorld: "SDJ0yhM6418",
  moja: "ZKqP1HdgHj8",
  glazekVincka: "1svESZ1LtCw",
  notteStellata: "fq5V-xHL4n4",
  cigo: "DAlKoGOPouY",
  shallow: "YI6aJS-atv0",
};

export default function MusicAll() {
  const t = useTranslations("music");
  const locale = useLocale();

  return (
    <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Back link */}
        <ScrollReveal>
          <Link
            href={`/${locale}/#glasba`}
            className="inline-flex items-center gap-2 text-white/40 hover:text-accent text-sm transition-colors mb-12"
          >
            <span>&larr;</span>
            <span>{t("backToHome")}</span>
          </Link>
        </ScrollReveal>

        {/* Section header */}
        <ScrollReveal className="text-center mb-16">
          <p className="text-accent text-sm font-medium tracking-[0.3em] uppercase mb-4">
            {t("supra")}
          </p>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {t("heading")}
          </h1>
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

        {/* All videos grid */}
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
