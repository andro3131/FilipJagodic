"use client";

import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import ScrollReveal from "./ScrollReveal";

function AnimatedNumber({
  target,
  suffix = "",
}: {
  target: number;
  suffix?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span
      ref={ref}
      className="font-heading text-4xl md:text-5xl font-bold text-accent"
    >
      {count}
      {suffix}
    </span>
  );
}

const stats = [
  {
    number: 1000,
    suffix: "+",
    label: "Pesmi v repertoarju",
    description: "Memoriziranih besedil in melodij",
  },
  {
    number: 20,
    suffix: "+",
    label: "Klaviatur",
    description: "V osebni zbirki",
  },
  {
    number: 27,
    suffix: "",
    label: "Let",
    description: "Življenja s glasbo",
  },
  {
    number: 30,
    suffix: "+",
    label: "Pesmi na sejo",
    description: "V snemalnem studiu",
  },
];

const abilities = [
  {
    title: "Absolutni posluh",
    description:
      "Filip prepozna in reproducira vsak ton brez reference. Slišano pesem lahko takoj zaigra in zapoje.",
  },
  {
    title: "Neverjetni spomin",
    description:
      "Sposoben je memorizirati na tisoče besedil pesmi v različnih jezikih in jih reproducirati brez napake.",
  },
  {
    title: "Petje v obratni smeri",
    description:
      "Unikatna sposobnost — pesem lahko zapoje od zadnjega verza proti prvemu, z obratno obrnjeno melodijo.",
  },
  {
    title: "Glasbeni enciklopedist",
    description:
      "Pozna glasbeno zgodovino, avtorje, izvajalce in letnice pesmi od 1920 do danes.",
  },
];

export default function About() {
  return (
    <section
      id="o-filipu"
      aria-labelledby="about-heading"
      className="relative py-24 md:py-32 px-6"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <ScrollReveal className="text-center mb-16 md:mb-24">
          <p className="text-accent text-sm font-medium tracking-[0.3em] uppercase mb-4">
            Spoznaj
          </p>
          <h2
            id="about-heading"
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            O Filipu
          </h2>
          <div className="w-20 h-0.5 bg-accent mx-auto" />
        </ScrollReveal>

        {/* Story */}
        <ScrollReveal
          className="max-w-3xl mx-auto mb-20 md:mb-28"
          delay={0.2}
        >
          <p className="text-lg md:text-xl text-white/70 leading-relaxed text-center">
            Filip Jagodič je 27-letni glasbenik z absolutnim posluhom, ki
            presega vse ovire. Kljub cerebralni paralizi, avtizmu in slepoti je
            razvil izjemne glasbene sposobnosti. Igra na klaviature, poje in
            pozna na tisoče pesmi — od jazzovskih standardov iz leta 1920 do
            sodobnih uspešnic. Ko sede za klaviature, se zgodi čarobnost.
          </p>
        </ScrollReveal>

        {/* Abilities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20 md:mb-28">
          {abilities.map((ability, index) => (
            <ScrollReveal key={ability.title} delay={0.1 * index}>
              <div className="group p-8 rounded-2xl bg-surface border border-border hover:border-accent/30 transition-all duration-500">
                <h3 className="font-heading text-xl md:text-2xl font-semibold text-accent mb-3">
                  {ability.title}
                </h3>
                <p className="text-white/60 leading-relaxed">
                  {ability.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <ScrollReveal
              key={stat.label}
              delay={0.15 * index}
              className="text-center"
            >
              <div className="p-6 md:p-8 rounded-2xl bg-surface border border-border">
                <AnimatedNumber target={stat.number} suffix={stat.suffix} />
                <p className="text-white font-semibold mt-3 mb-1">
                  {stat.label}
                </p>
                <p className="text-white/40 text-sm">{stat.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
