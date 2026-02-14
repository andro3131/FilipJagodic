"use client";

import ScrollReveal from "./ScrollReveal";

const encounters = [
  {
    name: "Andrea Bocelli",
    role: "Legendarni tenor",
    event: "Srečanje v Ljubljani",
    description:
      "Filip je zaigral in zapel za Andreo Bocellija, ki je njegovo izvedbo pohvalil z navdušenim \"bravisimo\" in obdržal ključek s skladbo.",
    highlight: true,
  },
  {
    name: "Klapa Šufit",
    role: "Hrvaška klapa",
    event: "Skupni nastop",
    description:
      "Filip je nastopil skupaj s hrvaško klapo Šufit in občinstvo očaral z neposrednostjo in glasbenim talentom.",
  },
  {
    name: "Jan Plestenjak",
    role: "Slovenski glasbenik",
    event: "Srečanje",
    description:
      "Srečanje z enim najpopularnejših slovenskih glasbenikov, ki ga je Filipova iskrenost in talent globoko navdušil.",
  },
  {
    name: "Zdenka Cotič",
    role: "Slovenska glasbenica",
    event: "Srečanje",
    description:
      "Filip je svojo neposrednost pokazal tudi ob srečanju z Zdenko Cotič — njegove iskrene pripombe presenetijo tudi slavne glasbenike.",
  },
];

export default function Encounters() {
  return (
    <section
      id="srecanja"
      aria-labelledby="encounters-heading"
      className="relative py-24 md:py-32 px-6 bg-surface"
    >
      <div className="mx-auto max-w-5xl">
        {/* Section header */}
        <ScrollReveal className="text-center mb-16 md:mb-24">
          <p className="text-accent text-sm font-medium tracking-[0.3em] uppercase mb-4">
            Posebni trenutki
          </p>
          <h2
            id="encounters-heading"
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            Srečanja
          </h2>
          <div className="w-20 h-0.5 bg-accent mx-auto mb-6" />
          <p className="text-white/50 max-w-2xl mx-auto">
            Filip je s svojim talentom in neposrednostjo navdušil mnoge znane
            glasbenike — vsako srečanje je zgodba zase.
          </p>
        </ScrollReveal>

        {/* Encounters timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px"
            aria-hidden="true"
          />

          <div className="space-y-12 md:space-y-16">
            {encounters.map((enc, index) => {
              const isLeft = index % 2 === 0;
              return (
                <ScrollReveal key={enc.name} delay={0.15 * index}>
                  <div
                    className={`relative flex items-start gap-6 md:gap-0 ${
                      isLeft ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Timeline dot */}
                    <div
                      className={`absolute left-6 md:left-1/2 w-3 h-3 rounded-full -translate-x-1/2 mt-2 z-10 ${
                        enc.highlight
                          ? "bg-accent shadow-[0_0_12px_rgba(212,64,64,0.6)]"
                          : "bg-white/30"
                      }`}
                      aria-hidden="true"
                    />

                    {/* Spacer for mobile left offset */}
                    <div className="w-6 flex-shrink-0 md:hidden" />

                    {/* Card */}
                    <div
                      className={`flex-1 md:w-[calc(50%-2rem)] ${
                        isLeft ? "md:pr-12" : "md:pl-12"
                      }`}
                    >
                      <div
                        className={`p-6 md:p-8 rounded-2xl border transition-all duration-500 ${
                          enc.highlight
                            ? "bg-[#1A1618] border-accent/30"
                            : "bg-[#141618] border-border hover:border-accent/20"
                        }`}
                      >
                        <p className="text-accent text-xs font-medium tracking-[0.2em] uppercase mb-2">
                          {enc.event}
                        </p>
                        <h3 className="font-heading text-xl md:text-2xl font-semibold text-white mb-1">
                          {enc.name}
                        </h3>
                        <p className="text-white/40 text-sm mb-3">
                          {enc.role}
                        </p>
                        <p className="text-white/60 leading-relaxed">
                          {enc.description}
                        </p>
                      </div>
                    </div>

                    {/* Empty space for other side (desktop) */}
                    <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
