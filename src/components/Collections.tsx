"use client";

import ScrollReveal from "./ScrollReveal";

const keyboards = [
  {
    name: "Yamaha PSR-S975",
    description: "Profesionalna izvajalska klaviatura z bogato zvočno banko.",
  },
  {
    name: "Korg PA1000",
    description: "Napredna aranžerska klaviatura z realističnimi zvoki.",
  },
  {
    name: "Roland E-A7",
    description: "Vsestranska klaviatura z zvoki z vsega sveta.",
  },
  {
    name: "Yamaha PSR-SX900",
    description: "Vrhunska klaviatura z naprednimi funkcijami.",
  },
  {
    name: "Casio CT-X5000",
    description: "Zmogljiva klaviatura z AiX Sound Source.",
  },
  {
    name: "Korg PA700",
    description: "Profesionalna aranžerska postaja.",
  },
];

const dictaphones = [
  {
    name: "Sony ICD-UX570",
    description: "Kompakten digitalni diktafon z odličnim mikrofonom.",
  },
  {
    name: "Olympus WS-853",
    description: "Zanesljiv diktafon za snemanje v studijski kvaliteti.",
  },
  {
    name: "Zoom H1n",
    description: "Prenosni snemalnik z X/Y stereo mikrofonoma.",
  },
  {
    name: "Tascam DR-05X",
    description: "Stereo prenosni snemalnik za glasbene posnetke.",
  },
];

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
          <p className="text-gold text-sm font-medium tracking-[0.3em] uppercase mb-4">
            Strast
          </p>
          <h2
            id="collections-heading"
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            Zbirke
          </h2>
          <div className="w-20 h-0.5 bg-gold mx-auto" />
        </ScrollReveal>

        {/* Keyboards */}
        <div className="mb-20">
          <ScrollReveal>
            <h3 className="font-heading text-2xl md:text-3xl font-semibold text-gold mb-8 text-center">
              Klaviature
            </h3>
            <p className="text-white/50 text-center max-w-2xl mx-auto mb-12">
              Filip je zbiratelj klaviatur — ima jih več kot 20. Vsaka ima svoj
              značaj in zvok, ki ga Filip pozna do potankosti.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {keyboards.map((kb, index) => (
              <ScrollReveal key={kb.name} delay={0.1 * index}>
                <div className="group p-6 rounded-2xl bg-surface border border-border hover:border-gold/30 transition-all duration-500">
                  <div className="w-full aspect-[4/3] rounded-xl bg-surface-lighter mb-4 flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-white/10"
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
                  </div>
                  <h4 className="font-semibold text-white group-hover:text-gold transition-colors">
                    {kb.name}
                  </h4>
                  <p className="text-white/40 text-sm mt-1">
                    {kb.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Dictaphones */}
        <div>
          <ScrollReveal>
            <h3 className="font-heading text-2xl md:text-3xl font-semibold text-gold mb-8 text-center">
              Diktafoni
            </h3>
            <p className="text-white/50 text-center max-w-2xl mx-auto mb-12">
              Poleg klaviatur Filip zbira tudi diktafone — orodja za zajem
              zvoka, ki ga spremljajo povsod.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dictaphones.map((d, index) => (
              <ScrollReveal key={d.name} delay={0.1 * index}>
                <div className="group p-6 rounded-2xl bg-surface border border-border hover:border-gold/30 transition-all duration-500">
                  <div className="w-full aspect-square rounded-xl bg-surface-lighter mb-4 flex items-center justify-center">
                    <svg
                      className="w-10 h-10 text-white/10"
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
                  </div>
                  <h4 className="font-semibold text-white group-hover:text-gold transition-colors">
                    {d.name}
                  </h4>
                  <p className="text-white/40 text-sm mt-1">{d.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
