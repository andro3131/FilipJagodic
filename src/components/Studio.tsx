"use client";

import { useState } from "react";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import Modal from "./Modal";

const albums = [
  {
    title: "Zgoščenka 1",
    cover:
      "https://res.cloudinary.com/dewf3zos0/image/upload/v1771103655/listek_zunaj-FINAL_paujro.jpg",
    images: [] as string[],
  },
  {
    title: "Zgoščenka 2",
    cover:
      "https://res.cloudinary.com/dewf3zos0/image/upload/v1771103718/ovitek_noter_ZUNAJ_FINAL_eco11d.jpg",
    images: [] as string[],
  },
  {
    title: "Zgoščenka 3",
    cover:
      "https://res.cloudinary.com/dewf3zos0/image/upload/v1771103695/Screenshot_2026-02-14_at_22.14.48_zvzcdg.png",
    images: [] as string[],
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
  const [selectedAlbum, setSelectedAlbum] = useState<
    (typeof albums)[0] | null
  >(null);
  const [activeImage, setActiveImage] = useState(0);

  const openAlbum = (album: (typeof albums)[0]) => {
    setSelectedAlbum(album);
    setActiveImage(0);
  };

  const allImages = selectedAlbum
    ? [selectedAlbum.cover, ...selectedAlbum.images]
    : [];

  return (
    <>
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
          <ScrollReveal
            className="max-w-3xl mx-auto mb-20 md:mb-28"
            delay={0.1}
          >
            <div className="space-y-5 text-white/60 leading-relaxed text-base md:text-lg text-center">
              <p>
                Ko Filip stopi v studio, se začne pravi šov. Vse dela izključno
                na dotik — klaviature odigra in zapoje hkrati, brez not, brez
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
                Filip je posnel tri zgoščenke. Na voljo so v fizični obliki ali
                na USB ključku.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {albums.map((album, index) => (
                <ScrollReveal key={album.title} delay={0.1 * index}>
                  <button
                    onClick={() => openAlbum(album)}
                    className="group w-full rounded-2xl overflow-hidden bg-[#141618] border border-border hover:border-accent/30 transition-all duration-500 cursor-pointer text-left"
                  >
                    {/* Cover */}
                    <div className="relative aspect-square bg-surface-lighter overflow-hidden">
                      <Image
                        src={album.cover}
                        alt={album.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    {/* Info */}
                    <div className="p-4 text-center">
                      <h4 className="font-semibold text-white group-hover:text-accent transition-colors">
                        {album.title}
                      </h4>
                      <p className="text-accent/50 text-xs mt-1 group-hover:text-accent/70 transition-colors">
                        Odpri galerijo &rarr;
                      </p>
                    </div>
                  </button>
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

      {/* Album detail modal */}
      <Modal
        isOpen={!!selectedAlbum}
        onClose={() => setSelectedAlbum(null)}
        maxWidth="max-w-3xl"
      >
        {selectedAlbum && (
          <div>
            {/* Main image */}
            <div className="relative w-full aspect-square bg-black">
              <Image
                src={allImages[activeImage] || selectedAlbum.cover}
                alt={`${selectedAlbum.title} — slika ${activeImage + 1}`}
                fill
                className="object-contain"
              />

              {/* Navigation arrows (shown when multiple images) */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImage(
                        (activeImage - 1 + allImages.length) % allImages.length
                      );
                    }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white/70 hover:text-white hover:bg-black/70 flex items-center justify-center transition-colors"
                    aria-label="Prejšnja slika"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImage((activeImage + 1) % allImages.length);
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white/70 hover:text-white hover:bg-black/70 flex items-center justify-center transition-colors"
                    aria-label="Naslednja slika"
                  >
                    <svg
                      className="w-5 h-5"
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
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails strip */}
            {allImages.length > 1 && (
              <div className="flex gap-2 p-4 overflow-x-auto">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                      i === activeImage
                        ? "border-accent"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Info */}
            <div className="p-4 md:p-6 text-center">
              <h3 className="font-heading text-xl md:text-2xl font-bold text-white">
                {selectedAlbum.title}
              </h3>
              {allImages.length > 1 && (
                <p className="text-white/30 text-sm mt-1">
                  {activeImage + 1} / {allImages.length}
                </p>
              )}
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
