"use client";

import ScrollReveal from "./ScrollReveal";

type CollectionItem = {
  name: string;
  description: string;
  category: "klaviatura" | "diktafon";
  image?: string;
};

const items: CollectionItem[] = [
  {
    name: "Yamaha PSR-S975",
    description: "Profesionalna izvajalska klaviatura z bogato zvočno banko.",
    category: "klaviatura",
  },
  {
    name: "Sony ICD-UX570",
    description: "Kompakten digitalni diktafon z odličnim mikrofonom.",
    category: "diktafon",
  },
  {
    name: "Korg PA1000",
    description: "Napredna aranžerska klaviatura z realističnimi zvoki.",
    category: "klaviatura",
  },
  {
    name: "Olympus WS-853",
    description: "Zanesljiv diktafon za snemanje v studijski kvaliteti.",
    category: "diktafon",
  },
  {
    name: "Roland E-A7",
    description: "Vsestranska klaviatura z zvoki z vsega sveta.",
    category: "klaviatura",
  },
  {
    name: "Zoom H1n",
    description: "Prenosni snemalnik z X/Y stereo mikrofonoma.",
    category: "diktafon",
  },
];

function KeyboardIcon() {
  return (
    <svg
      className="w-14 h-14 text-accent/20"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1}
        d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
      />
    </svg>
  );
}

function RecorderIcon() {
  return (
    <svg
      className="w-14 h-14 text-accent/20"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1}
        d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
      />
    </svg>
  );
}

export default function Collections() {
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
            Strast
          </p>
          <h2
            id="collections-heading"
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            Zbirke
          </h2>
          <div className="w-20 h-0.5 bg-accent mx-auto mb-6" />
          <p className="text-white/50 max-w-2xl mx-auto">
            Filip je zbiratelj klaviatur in diktafonov — ima več kot 20
            klaviatur in številne diktafone. Vsak ima svoj značaj, ki ga Filip
            pozna do potankosti.
          </p>
        </ScrollReveal>

        {/* Unified grid — alternating keyboards & dictaphones */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <ScrollReveal key={item.name} delay={0.1 * index}>
              <div className="group p-6 rounded-2xl bg-surface border border-border hover:border-accent/30 transition-all duration-500">
                {/* Placeholder visual */}
                <div
                  className={`w-full aspect-[4/3] rounded-xl mb-4 flex items-center justify-center ${
                    item.category === "klaviatura"
                      ? "bg-gradient-to-br from-accent/5 to-accent/[0.02]"
                      : "bg-gradient-to-br from-white/[0.04] to-white/[0.01]"
                  }`}
                >
                  {item.category === "klaviatura" ? (
                    <KeyboardIcon />
                  ) : (
                    <RecorderIcon />
                  )}
                </div>

                {/* Info */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="font-semibold text-white group-hover:text-accent transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-white/40 text-sm mt-1">
                      {item.description}
                    </p>
                  </div>
                  <span
                    className={`flex-shrink-0 text-[10px] font-medium tracking-wider uppercase px-2.5 py-1 rounded-full ${
                      item.category === "klaviatura"
                        ? "bg-accent/10 text-accent/60"
                        : "bg-white/5 text-white/40"
                    }`}
                  >
                    {item.category === "klaviatura" ? "Klaviatura" : "Diktafon"}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
