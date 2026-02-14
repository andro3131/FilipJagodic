"use client";

import { useState } from "react";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import Modal from "./Modal";

const encounters = [
  {
    name: "Andrea Bocelli",
    role: "Legendarni tenor",
    event: "Srečanje v Ljubljani",
    image:
      "https://res.cloudinary.com/dewf3zos0/image/upload/v1771096727/andrea_bocelli_jboluq.jpg",
    description:
      "Filip je zaigral in zapel za Andreo Bocellija, ki je njegovo izvedbo pohvalil z navdušenim \"bravisimo\" in obdržal ključek s skladbo.",
    fullStory:
      "Eno največjih srečanj v Filipovem življenju se je zgodilo v Ljubljani, ko je imel priložnost zaigrati in zapeti pred legendarnim tenorom Andreo Bocellijem. Filip je bil povsem sproščen — kot vedno, brez treme in strahu. Bocelli je njegovo izvedbo pozorno poslušal in jo na koncu pohvalil z navdušenim \"bravisimo\". Tako navdušen je bil, da je Filipov ključek s skladbo obdržal kot spomin. Trenutek, ki ga Filip in njegova družina ne bodo nikoli pozabili.",
    highlight: true,
  },
  {
    name: "Klapa Šufit",
    role: "Hrvaška klapa",
    event: "Skupni nastop",
    image:
      "https://res.cloudinary.com/dewf3zos0/image/upload/v1771096728/klas%CC%8Ca_sufit_a92qqs.jpg",
    description:
      "Filip je nastopil skupaj s hrvaško klapo Šufit in občinstvo očaral z neposrednostjo in glasbenim talentom.",
    fullStory:
      "Filip je stopil na oder skupaj s člani hrvaške klape Šufit in dokazal, da glasba res ne pozna meja. Kljub temu, da je bil najmlajši na odru, je z neposrednostjo in talentom očaral celotno občinstvo. Člani klape so bili nad njegovim posluhom in sposobnostjo takojšnjega prilagajanja navdušeni.",
  },
  {
    name: "Jan Plestenjak",
    role: "Slovenski glasbenik",
    event: "Srečanje",
    image:
      "https://res.cloudinary.com/dewf3zos0/image/upload/v1771096729/plestenjak_vnjqg3.jpg",
    description:
      "Srečanje z enim najpopularnejših slovenskih glasbenikov, ki ga je Filipova iskrenost in talent globoko navdušil.",
    fullStory:
      "Ko je Filip srečal Jana Plestenjaka, enega najpopularnejših slovenskih glasbenikov, je bil zvest svojemu značaju — neposreden in iskren. Plestenjaka je Filipov talent globoko navdušil, predvsem sposobnost, da vsako slišano pesem takoj reproducira na klaviaturah.",
  },
  {
    name: "Borut Pahor",
    role: "Bivši predsednik Republike Slovenije",
    event: "Srečanje",
    image:
      "https://res.cloudinary.com/dewf3zos0/image/upload/v1771096727/borut_pahor_s8jwkb.jpg",
    description:
      "Filip je s svojim talentom navdušil tudi bivšega predsednika Republike Slovenije Boruta Pahorja.",
    fullStory:
      "Filip je s svojim talentom navdušil tudi bivšega predsednika Republike Slovenije Boruta Pahorja. Besedilo bo dopolnjeno.",
  },
  {
    name: "Dejan Zavec",
    role: "Slovenski boksar, svetovni prvak",
    event: "Srečanje",
    image:
      "https://res.cloudinary.com/dewf3zos0/image/upload/v1771096726/dejan_zavec1_pol9nb.jpg",
    description:
      "Srečanje dveh borcev — Filip s svojimi izzivi, Dejan v ringu. Oba zmagovalca.",
    fullStory:
      "Srečanje dveh borcev — Filip s svojimi izzivi, Dejan v ringu. Oba zmagovalca. Besedilo bo dopolnjeno.",
  },
  {
    name: "Darja Švajger",
    role: "Operna pevka",
    event: "Srečanje",
    image:
      "https://res.cloudinary.com/dewf3zos0/image/upload/v1771096726/darja_svajger_ascluf.jpg",
    description:
      "Filip je srečal tudi operno pevko Darjo Švajger, ki jo je navdušil s svojim izjemnim posluhom.",
    fullStory:
      "Filip je srečal tudi operno pevko Darjo Švajger, ki jo je navdušil s svojim izjemnim posluhom. Besedilo bo dopolnjeno.",
  },
];

export default function Encounters() {
  const [selected, setSelected] = useState<(typeof encounters)[0] | null>(
    null
  );

  return (
    <>
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
                        <button
                          onClick={() => setSelected(enc)}
                          className={`w-full text-left p-5 md:p-6 rounded-2xl border transition-all duration-500 cursor-pointer group ${
                            enc.highlight
                              ? "bg-[#1A1618] border-accent/30 hover:border-accent/50"
                              : "bg-[#141618] border-border hover:border-accent/30"
                          }`}
                        >
                          <div className="flex gap-4 items-start">
                            {/* Thumbnail */}
                            <div
                              className={`relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden bg-surface-lighter ${
                                enc.highlight ? "ring-2 ring-accent/30" : ""
                              }`}
                            >
                              {enc.image ? (
                                <Image
                                  src={enc.image}
                                  alt={enc.name}
                                  fill
                                  className="object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <svg
                                    className="w-8 h-8 text-white/10"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={1}
                                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                  </svg>
                                </div>
                              )}
                            </div>

                            {/* Text */}
                            <div className="flex-1 min-w-0">
                              <p className="text-accent text-xs font-medium tracking-[0.2em] uppercase mb-1">
                                {enc.event}
                              </p>
                              <h3 className="font-heading text-lg md:text-xl font-semibold text-white group-hover:text-accent transition-colors mb-1">
                                {enc.name}
                              </h3>
                              <p className="text-white/40 text-sm mb-2">
                                {enc.role}
                              </p>
                              <p className="text-white/50 text-sm leading-relaxed line-clamp-2">
                                {enc.description}
                              </p>
                            </div>
                          </div>

                          {/* "Preberi več" hint */}
                          <p className="text-accent/60 text-xs mt-3 group-hover:text-accent transition-colors text-right">
                            Preberi zgodbo &rarr;
                          </p>
                        </button>
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

      {/* Detail modal */}
      <Modal isOpen={!!selected} onClose={() => setSelected(null)}>
        {selected && (
          <div>
            {/* Image */}
            <div className="relative w-full aspect-[16/10] bg-surface-lighter">
              {selected.image ? (
                <Image
                  src={selected.image}
                  alt={selected.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <svg
                      className="w-16 h-16 text-white/10 mx-auto mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="text-white/20 text-sm">
                      Slika bo dodana
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6 md:p-8">
              <p className="text-accent text-xs font-medium tracking-[0.2em] uppercase mb-2">
                {selected.event}
              </p>
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-1">
                {selected.name}
              </h3>
              <p className="text-white/40 text-sm mb-4">{selected.role}</p>
              <p className="text-white/70 leading-relaxed text-base md:text-lg">
                {selected.fullStory}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
