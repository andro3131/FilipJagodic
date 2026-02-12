"use client";

import { useState } from "react";
import ScrollReveal from "./ScrollReveal";

const categories = [
  { id: "vse", label: "Vse" },
  { id: "1920-1950", label: "1920–1950" },
  { id: "1950-1970", label: "1950–1970" },
  { id: "sodobno", label: "Sodobno" },
];

const tracks = [
  {
    title: "What a Wonderful World",
    artist: "Louis Armstrong",
    year: "1967",
    category: "1950-1970",
    description: "Filipova interpretacija klasike, posneta v studiu.",
  },
  {
    title: "Fly Me to the Moon",
    artist: "Frank Sinatra",
    year: "1964",
    category: "1950-1970",
    description: "Nežna izvedba z značilnim Filipovim pridihom.",
  },
  {
    title: "La Vie en Rose",
    artist: "Edith Piaf",
    year: "1947",
    category: "1920-1950",
    description: "Francoski šanson v izvedbi z absolutnim posluhom.",
  },
  {
    title: "Over the Rainbow",
    artist: "Judy Garland",
    year: "1939",
    category: "1920-1950",
    description: "Časless klasika, polna čustev.",
  },
  {
    title: "Imagine",
    artist: "John Lennon",
    year: "1971",
    category: "sodobno",
    description: "Filipova ganljiva različica legendarnega hita.",
  },
  {
    title: "Bohemian Rhapsody",
    artist: "Queen",
    year: "1975",
    category: "sodobno",
    description: "Epska izvedba z vsemi vokalnimi deli.",
  },
];

export default function Music() {
  const [activeCategory, setActiveCategory] = useState("vse");

  const filteredTracks =
    activeCategory === "vse"
      ? tracks
      : tracks.filter((t) => t.category === activeCategory);

  return (
    <section
      id="glasba"
      aria-labelledby="music-heading"
      className="relative py-24 md:py-32 px-6 bg-surface"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <ScrollReveal className="text-center mb-16">
          <p className="text-gold text-sm font-medium tracking-[0.3em] uppercase mb-4">
            Arhiv
          </p>
          <h2
            id="music-heading"
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            Glasba
          </h2>
          <div className="w-20 h-0.5 bg-gold mx-auto mb-6" />
          <p className="text-white/50 max-w-2xl mx-auto">
            Zbirka Filipovih izvedb — od jazzovskih klasik do sodobnih
            uspešnic. Vsaka pesem je posneta v enem prehodu, brez popravkov.
          </p>
        </ScrollReveal>

        {/* Filter tabs */}
        <ScrollReveal
          className="flex flex-wrap justify-center gap-3 mb-12"
          delay={0.1}
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold ${
                activeCategory === cat.id
                  ? "bg-gold text-black"
                  : "bg-surface-light text-white/60 hover:text-white border border-border hover:border-gold/30"
              }`}
              aria-pressed={activeCategory === cat.id}
            >
              {cat.label}
            </button>
          ))}
        </ScrollReveal>

        {/* Tracks grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTracks.map((track, index) => (
            <ScrollReveal key={track.title} delay={0.1 * index}>
              <article className="group p-6 rounded-2xl bg-[#050505] border border-border hover:border-gold/30 transition-all duration-500">
                {/* Album art placeholder */}
                <div className="w-full aspect-square rounded-xl bg-surface-lighter mb-5 flex items-center justify-center overflow-hidden relative">
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      background:
                        "linear-gradient(135deg, #C9A84C 0%, #050505 100%)",
                    }}
                  />
                  <button
                    className="relative z-10 w-16 h-16 bg-gold/90 rounded-full flex items-center justify-center hover:bg-gold hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold"
                    aria-label={`Predvajaj ${track.title}`}
                  >
                    <svg
                      className="w-6 h-6 text-black ml-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                </div>

                <div>
                  <h3 className="font-heading text-lg font-semibold text-white group-hover:text-gold transition-colors">
                    {track.title}
                  </h3>
                  <p className="text-white/40 text-sm mt-1">
                    {track.artist} · {track.year}
                  </p>
                  <p className="text-white/50 text-sm mt-3 leading-relaxed">
                    {track.description}
                  </p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>

        {/* YouTube embed placeholder */}
        <ScrollReveal className="mt-16" delay={0.2}>
          <div className="p-8 rounded-2xl bg-[#050505] border border-border text-center">
            <h3 className="font-heading text-2xl font-semibold mb-4">
              Video posnetki
            </h3>
            <p className="text-white/50 mb-6">
              Filipovi video posnetki bodo prikazani tukaj. Povezava do YouTube
              kanala bo dodana kmalu.
            </p>
            <div className="aspect-video max-w-3xl mx-auto rounded-xl bg-surface-lighter flex items-center justify-center">
              <div className="text-center">
                <svg
                  className="w-16 h-16 text-white/20 mx-auto mb-3"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0C.488 3.45.029 5.804 0 12c.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0C23.512 20.55 23.971 18.196 24 12c-.029-6.185-.484-8.549-4.385-8.816zM9 16V8l8 4-8 4z" />
                </svg>
                <p className="text-white/30 text-sm">
                  YouTube video bo dodan tukaj
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
