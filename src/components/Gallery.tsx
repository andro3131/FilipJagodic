"use client";

import { useState } from "react";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import Modal from "./Modal";

const photos = [
  {
    src: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771098561/14232370_632665486910245_786561684551610605_n_lrymzy.jpg",
    alt: "Filip za klaviaturami",
    caption: "Filip za klaviaturami",
  },
  {
    src: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771098693/11019010_402268379949958_4207790944302076286_n_eor5pu.jpg",
    alt: "Filip na nastopu",
    caption: "Nastop v živo",
  },
  {
    src: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771098529/andrea_bocelli_qwksga.jpg",
    alt: "Filip in Andrea Bocelli",
    caption: "Srečanje z Andreo Bocellijem",
  },
  {
    src: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771098609/20250520_175129_uvgigs.jpg",
    alt: "Filip v studiu",
    caption: "V snemalnem studiu",
    position: "top" as const,
  },
  {
    src: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771098651/21761758_833699250140200_3605137899429653888_n_jqsvoi.jpg",
    alt: "Filip z mamo Andrejo",
    caption: "Filip z mamo Andrejo",
  },
  {
    src: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771098757/21752222_833699213473537_373850975019071424_n_ijhcv2.jpg",
    alt: "Filip z diktafonom",
    caption: "Filip z diktafonom",
  },
];

export default function Gallery() {
  const [selected, setSelected] = useState<(typeof photos)[0] | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const openPhoto = (photo: (typeof photos)[0], index: number) => {
    setSelected(photo);
    setSelectedIndex(index);
  };

  const navigate = (dir: -1 | 1) => {
    const newIndex =
      (selectedIndex + dir + photos.length) % photos.length;
    setSelected(photos[newIndex]);
    setSelectedIndex(newIndex);
  };

  return (
    <>
      <section
        id="galerija"
        aria-labelledby="gallery-heading"
        className="relative py-24 md:py-32 px-6"
      >
        <div className="mx-auto max-w-7xl">
          {/* Section header */}
          <ScrollReveal className="text-center mb-16 md:mb-24">
            <p className="text-accent text-sm font-medium tracking-[0.3em] uppercase mb-4">
              Utrinki
            </p>
            <h2
              id="gallery-heading"
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            >
              Galerija
            </h2>
            <div className="w-20 h-0.5 bg-accent mx-auto" />
          </ScrollReveal>

          {/* Photo grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {photos.map((photo, index) => (
              <ScrollReveal key={index} delay={0.08 * index}>
                <button
                  onClick={() => openPhoto(photo, index)}
                  className="group relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-surface-lighter cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent"
                  aria-label={`Odpri: ${photo.alt}`}
                >
                  {photo.src ? (
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      style={photo.position ? { objectPosition: photo.position } : undefined}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg
                        className="w-10 h-10 text-white/10"
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
                    </div>
                  )}

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end p-3">
                    <p className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      {photo.caption}
                    </p>
                  </div>
                </button>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox modal */}
      <Modal
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        maxWidth="max-w-5xl"
      >
        {selected && (
          <div className="relative">
            {/* Image */}
            <div className="relative w-full aspect-[16/10] bg-black">
              {selected.src ? (
                <Image
                  src={selected.src}
                  alt={selected.alt}
                  fill
                  className="object-contain"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <svg
                      className="w-20 h-20 text-white/10 mx-auto mb-2"
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
                    <p className="text-white/20 text-sm">Slika bo dodana</p>
                  </div>
                </div>
              )}

              {/* Navigation arrows */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(-1);
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
                  navigate(1);
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
            </div>

            {/* Caption */}
            <div className="p-4 md:p-6 text-center">
              <p className="text-white/80 font-medium">{selected.caption}</p>
              <p className="text-white/30 text-sm mt-1">
                {selectedIndex + 1} / {photos.length}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
