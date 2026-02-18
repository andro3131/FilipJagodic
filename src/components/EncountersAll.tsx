"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";
import Modal from "./Modal";
import { useTranslations, useLocale } from "next-intl";

const encounterKeys = ["bocelli", "sufit", "plestenjak", "pahor", "zavec", "svajger", "slabinac", "smolar"] as const;

const encounterImages: Record<string, string> = {
  bocelli: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771096727/andrea_bocelli_jboluq.jpg",
  sufit: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771096728/klas%CC%8Ca_sufit_a92qqs.jpg",
  plestenjak: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771096729/plestenjak_vnjqg3.jpg",
  pahor: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771096727/borut_pahor_s8jwkb.jpg",
  zavec: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771096726/dejan_zavec1_pol9nb.jpg",
  svajger: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771096726/darja_svajger_ascluf.jpg",
  slabinac: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771443715/125402116_1704431406400309_7387810105924028628_n_nmadpp.jpg",
  smolar: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771443993/adi_u7h56z.jpg",
};

const encounterVideos: Record<string, string> = {
  plestenjak: "https://res.cloudinary.com/dewf3zos0/video/upload/v1771445309/19874134_107584786563726_526080777331408896_n_dahm5v.mp4",
};

const highlightKeys = new Set(["bocelli"]);

export default function EncountersAll() {
  const t = useTranslations("encounters");
  const locale = useLocale();
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  return (
    <>
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 px-6">
        <div className="mx-auto max-w-5xl">
          {/* Back link */}
          <ScrollReveal>
            <Link
              href={`/${locale}/#srecanja`}
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
            <div className="w-20 h-0.5 bg-accent mx-auto mb-6" />
            <p className="text-white/50 max-w-2xl mx-auto">
              {t("subtitle")}
            </p>
          </ScrollReveal>

          {/* Encounters timeline */}
          <div className="relative">
            <div
              className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px"
              aria-hidden="true"
            />

            <div className="space-y-6 md:space-y-8">
              {encounterKeys.map((key, index) => {
                const isLeft = index % 2 === 0;
                const isHighlight = highlightKeys.has(key);
                const image = encounterImages[key];
                return (
                  <ScrollReveal key={key} delay={0.15 * index}>
                    <div
                      className={`relative flex items-start gap-6 md:gap-0 ${
                        isLeft ? "md:flex-row" : "md:flex-row-reverse"
                      }`}
                    >
                      <div
                        className={`absolute left-6 md:left-1/2 w-3 h-3 rounded-full -translate-x-1/2 mt-2 z-10 ${
                          isHighlight
                            ? "bg-accent shadow-[0_0_12px_rgba(212,64,64,0.6)]"
                            : "bg-white/30"
                        }`}
                        aria-hidden="true"
                      />

                      <div className="w-6 flex-shrink-0 md:hidden" />

                      <div
                        className={`flex-1 md:w-[calc(50%-2rem)] ${
                          isLeft ? "md:pr-12" : "md:pl-12"
                        }`}
                      >
                        <button
                          onClick={() => setSelectedKey(key)}
                          className={`w-full text-left p-5 md:p-6 rounded-2xl border transition-all duration-500 cursor-pointer group ${
                            isHighlight
                              ? "bg-[#1A1618] border-accent/30 hover:border-accent/50"
                              : "bg-[#141618] border-border hover:border-accent/30"
                          }`}
                        >
                          <div className="flex gap-4 items-start">
                            <div
                              className={`relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden bg-surface-lighter ${
                                isHighlight ? "ring-2 ring-accent/30" : ""
                              }`}
                            >
                              <Image
                                src={image}
                                alt={t(`items.${key}.name`)}
                                fill
                                className="object-cover"
                              />
                            </div>

                            <div className="flex-1 min-w-0">
                              <p className="text-accent text-xs font-medium tracking-[0.2em] uppercase mb-1">
                                {t(`items.${key}.event`)}
                              </p>
                              <h3 className="font-heading text-lg md:text-xl font-semibold text-white group-hover:text-accent transition-colors mb-1">
                                {t(`items.${key}.name`)}
                              </h3>
                              <p className="text-white/40 text-sm mb-2">
                                {t(`items.${key}.role`)}
                              </p>
                              <p className="text-white/50 text-sm leading-relaxed line-clamp-2">
                                {t(`items.${key}.description`)}
                              </p>
                            </div>
                          </div>

                          <p className="text-accent/60 text-xs mt-3 group-hover:text-accent transition-colors text-right">
                            {t("readStory")} &rarr;
                          </p>
                        </button>
                      </div>

                      <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Detail modal */}
      <Modal isOpen={!!selectedKey} onClose={() => setSelectedKey(null)}>
        {selectedKey && (
          <div>
            <div className="relative w-full aspect-[16/10] bg-surface-lighter">
              <Image
                src={encounterImages[selectedKey]}
                alt={t(`items.${selectedKey}.name`)}
                fill
                className="object-cover"
              />
            </div>

            {encounterVideos[selectedKey] && (
              <div className="px-6 pt-6">
                <video
                  src={encounterVideos[selectedKey]}
                  controls
                  className="w-full rounded-xl"
                  preload="metadata"
                />
              </div>
            )}

            <div className="p-6 md:p-8">
              <p className="text-accent text-xs font-medium tracking-[0.2em] uppercase mb-2">
                {t(`items.${selectedKey}.event`)}
              </p>
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-1">
                {t(`items.${selectedKey}.name`)}
              </h3>
              <p className="text-white/40 text-sm mb-4">{t(`items.${selectedKey}.role`)}</p>
              <p className="text-white/70 leading-relaxed text-base md:text-lg">
                {t(`items.${selectedKey}.fullStory`)}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
