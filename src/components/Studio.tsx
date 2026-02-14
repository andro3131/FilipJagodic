"use client";

import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

const albums = [
  {
    title: "Zgoščenka 1",
    image: "",
    year: "",
  },
  {
    title: "Zgoščenka 2",
    image: "",
    year: "",
  },
  {
    title: "Zgoščenka 3",
    image: "",
    year: "",
  },
];

const duets = [
  {
    name: "Barbara Leben",
    song: "Privid",
    description:
      "Avtorska pesem — duet z izjemno vokalistko, z besedilom Andreje Pader in glasbo Andreja Mežana.",
  },
  {
    name: "Agnes Kumlanc",
    song: "Prsti zapleteni",
    description:
      "Cover pesmi Jelene Rozge in Klape Rišpet, poln energije in čustev.",
  },
  {
    name: "Mija Koritnik",
    song: "Duet",
    description:
      "Poseben duet s slepo deklico Mijo — dva glasova, ista občutljivost za glasbo.",
  },
  {
    name: "Jernej Golob",
    song: "Duet",
    description:
      "Duet z enim od Filipovih pomočnikov — prijateljstvo, ki se sliši tudi v glasbi.",
  },
];

const highlights = [
  {
    number: "30+",
    label: "Pesmi na snemalno popoldne",
  },
  {
    number: "99%",
    label: "Odpetih iz prve",
  },
  {
    number: "3",
    label: "Zgoščenke",
  },
];

export default function Studio() {
  return (
    <section
      id="studio"
      aria-labelledby="studio-heading"
      className="relative py-24 md:py-32 px-6 bg-surface"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <ScrollReveal className="text-center mb-16 md:mb-24">
          <p className="text-accent text-sm font-medium tracking-[0.3em] uppercase mb-4">
            Drugi dom
          </p>
          <h2
            id="studio-heading"
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            V studiu
          </h2>
          <div className="w-20 h-0.5 bg-accent mx-auto mb-6" />
          <p className="text-white/50 max-w-2xl mx-auto">
            Studio v Trebnjem je Filipov drugi dom. Poleg petja doma je najraje
            prav tukaj, kjer nastajajo posnetki, zgoščenke in nepozabni
            trenutki.
          </p>
        </ScrollReveal>

        {/* Story */}
        <ScrollReveal className="max-w-3xl mx-auto mb-20 md:mb-28" delay={0.1}>
          <div className="space-y-5 text-white/60 leading-relaxed text-base md:text-lg text-center">
            <p>
              Ko Filip stopi v studio, se začne pravi šov. Vse dela izključno na
              dotik — klaviature odigra in zapoje hkrati, brez not, brez
              priprav. 99% pesmi odpoje iz prve. Na snemalno popoldne posname
              tudi 30 in več pesmi.
            </p>
            <p>
              V studiu se veliko šalimo — Filip se najraje pogovarja v
              angleščini (čisto za foro) in vzdušje je vedno sproščeno. A ko
              pritisne tipko in odpre usta, je vsak posnetek čista magija.
            </p>
          </div>
        </ScrollReveal>

        {/* Stat highlights */}
        <ScrollReveal className="mb-20 md:mb-28" delay={0.15}>
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {highlights.map((h) => (
              <div key={h.label} className="text-center">
                <p className="font-heading text-3xl md:text-4xl font-bold text-accent">
                  {h.number}
                </p>
                <p className="text-white/40 text-sm mt-1">{h.label}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Albums */}
        <div className="mb-20 md:mb-28">
          <ScrollReveal>
            <h3 className="font-heading text-2xl md:text-3xl font-semibold text-white mb-3 text-center">
              Zgoščenke
            </h3>
            <p className="text-white/40 text-center mb-10 max-w-xl mx-auto">
              Filip je posnel tri zgoščenke. Na voljo so v fizični obliki ali na
              USB ključku.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {albums.map((album, index) => (
              <ScrollReveal key={album.title} delay={0.1 * index}>
                <div className="group rounded-2xl overflow-hidden bg-[#141618] border border-border hover:border-accent/30 transition-all duration-500">
                  {/* Cover */}
                  <div className="relative aspect-square bg-surface-lighter">
                    {album.image ? (
                      <Image
                        src={album.image}
                        alt={album.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg
                          className="w-16 h-16 text-accent/10"
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
                    )}
                  </div>
                  {/* Info */}
                  <div className="p-4 text-center">
                    <h4 className="font-semibold text-white group-hover:text-accent transition-colors">
                      {album.title}
                    </h4>
                    {album.year && (
                      <p className="text-white/30 text-sm mt-1">
                        {album.year}
                      </p>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.3} className="text-center mt-8">
            <a
              href="#kontakt"
              className="inline-flex items-center gap-2 px-6 py-3 border border-accent/30 text-accent rounded-full text-sm font-medium hover:bg-accent/10 hover:border-accent/50 transition-all duration-300"
            >
              Naroči CD ali USB ključek
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
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </a>
          </ScrollReveal>
        </div>

        {/* Duets */}
        <div>
          <ScrollReveal>
            <h3 className="font-heading text-2xl md:text-3xl font-semibold text-white mb-3 text-center">
              Dueti
            </h3>
            <p className="text-white/40 text-center mb-10 max-w-xl mx-auto">
              Filip je posnel duete z različnimi glasbeniki — vsako sodelovanje
              je zgodba zase.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {duets.map((duet, index) => (
              <ScrollReveal key={duet.name} delay={0.1 * index}>
                <div className="p-6 rounded-2xl bg-[#141618] border border-border hover:border-accent/30 transition-all duration-500">
                  <p className="text-accent text-xs font-medium tracking-[0.2em] uppercase mb-2">
                    {duet.song}
                  </p>
                  <h4 className="font-heading text-lg md:text-xl font-semibold text-white mb-2">
                    {duet.name}
                  </h4>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {duet.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
