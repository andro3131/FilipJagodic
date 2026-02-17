"use client";

import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import { useTranslations } from "next-intl";

const itemKeys = ["yamaha", "sony", "korg", "olympus"] as const;

const itemImages: Record<string, string> = {
  yamaha: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771104657/yamahapsr-s975-sounds_KEY0004768-000_emppra.jpg",
  sony: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771104655/96f58b90-30f7-4f43-ba2b-e3427723e87c.__CR0_0_600_450_PT0_SX600_V1____jpf5kj.jpg",
  korg: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771104659/ea2ab88f9f04a3c588eacd63941f8cc3_rrb00y.jpg",
  olympus: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771104653/a0f484d4-3b9f-4174-bbac-92184b1846ce.jpg._CB313504000__j4gk3c.jpg",
};

const itemCategories: Record<string, "keyboard" | "dictaphone"> = {
  yamaha: "keyboard",
  sony: "dictaphone",
  korg: "keyboard",
  olympus: "dictaphone",
};

export default function Collections() {
  const t = useTranslations("collections");

  return (
    <section
      id="zbirke"
      aria-labelledby="collections-heading"
      className="relative py-24 md:py-32 px-6"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <ScrollReveal className="text-center mb-16 md:mb-24">
          <p className="text-accent text-sm font-medium tracking-[0.3em] uppercase mb-4">
            {t("supra")}
          </p>
          <h2
            id="collections-heading"
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            {t("heading")}
          </h2>
          <div className="w-20 h-0.5 bg-accent mx-auto mb-6" />
          <p className="text-white/50 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </ScrollReveal>

        {/* Single row — 4 items */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {itemKeys.map((key, index) => {
            const cat = itemCategories[key];
            return (
              <ScrollReveal key={key} delay={0.1 * index}>
                <div className="group p-4 rounded-2xl bg-surface border border-border hover:border-accent/30 transition-all duration-500">
                  {/* Image */}
                  <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-[#141618]">
                    <Image
                      src={itemImages[key]}
                      alt={t(`items.${key}.name`)}
                      fill
                      className="object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Info */}
                  <h4 className="font-semibold text-white text-sm group-hover:text-accent transition-colors">
                    {t(`items.${key}.name`)}
                  </h4>
                  <p className="text-white/40 text-xs mt-1">
                    {t(`items.${key}.description`)}
                  </p>
                  <span
                    className={`inline-block mt-2 text-[10px] font-medium tracking-wider uppercase px-2.5 py-1 rounded-full ${
                      cat === "keyboard"
                        ? "bg-accent/10 text-accent/60"
                        : "bg-white/5 text-white/40"
                    }`}
                  >
                    {cat === "keyboard" ? t("keyboard") : t("dictaphone")}
                  </span>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
