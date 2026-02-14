"use client";

import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import ScrollReveal from "./ScrollReveal";
import Modal from "./Modal";

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
    label: "Posnetih pesmi v enem dnevu",
    description: "V snemalnem studiu",
  },
];

const abilities = [
  {
    title: "Absolutni posluh",
    description:
      "Filip prepozna in reproducira vsak ton brez reference. Slišano pesem lahko takoj zaigra in zapoje — vse se nauči sam.",
  },
  {
    title: "Neverjetni spomin",
    description:
      "Sposoben je memorizirati na tisoče besedil pesmi v različnih jezikih in jih reproducirati brez napake.",
  },
  {
    title: "Brez treme",
    description:
      "\"Nimam treme, ni me strah. Ljudi ne vidim.\" Filipova neposrednost in iskrenost očarata vse, ki ga srečajo.",
  },
  {
    title: "Glasbeni enciklopedist",
    description:
      "Pozna avtorje, izvajalce in zgodbe za pesmimi vseh žanrov in obdobij. Prepeva vse, najraje pa starejše pesmi.",
  },
];

export default function About() {
  const [bioOpen, setBioOpen] = useState(false);

  return (
    <>
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
            <p className="text-lg md:text-xl text-white/70 leading-relaxed text-center mb-6">
              Filip Jagodič se je rodil po hudih zapletih v petem mesecu
              nosečnosti. Kljub slepoti, cerebralni paralizi in avtizmu je razvil
              izjemen glasbeni talent — 100-odstotni absolutni posluh. Že pri
              dobrem letu je pel melodije, ko pa je dobil igračo s tipkami, je
              začel igrati vse, kar je slišal.
            </p>
            <blockquote className="text-xl md:text-2xl text-accent/80 font-heading italic text-center mb-8">
              {`\u201ENihče me ne uči. Vsega sem se naučil sam.\u201D`}
            </blockquote>
            <div className="text-center">
              <button
                onClick={() => setBioOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 border border-accent/30 text-accent rounded-full text-sm font-medium hover:bg-accent/10 hover:border-accent/50 transition-all duration-300"
              >
                Preberi celotno zgodbo
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
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

      {/* Full biography modal */}
      <Modal
        isOpen={bioOpen}
        onClose={() => setBioOpen(false)}
        maxWidth="max-w-4xl"
      >
        <div className="p-6 md:p-10">
          <p className="text-accent text-sm font-medium tracking-[0.3em] uppercase mb-4">
            Življenjska zgodba
          </p>
          <h3 className="font-heading text-3xl md:text-4xl font-bold text-white mb-8">
            Filip Jagodič
          </h3>

          <div className="space-y-6 text-white/70 leading-relaxed text-base md:text-lg">
            <p>
              Filip Jagodič se je rodil po hudih zapletih v petem mesecu
              nosečnosti. Njegova pot je bila od samega začetka izjemno zahtevna.
              Diagnoze — slepota, cerebralna paraliza in ena od oblik avtizma — bi
              marsikoga ustavile, a Filip je od vsega začetka kazal izjemno voljo
              in talent.
            </p>

            <p>
              Že pri dobrem letu starosti je začel peti pesmice — brez besedila,
              a z brezhibno melodijo. Ko je dobil igračo s tipkami, se je začela
              prava glasbena pot. Filip je začel igrati vse, kar je slišal. Nihče
              ga ni učil — vsega se je naučil sam, z 100-odstotnim absolutnim
              posluhom.
            </p>

            <blockquote className="border-l-2 border-accent/50 pl-6 my-8 text-accent/80 font-heading italic text-xl md:text-2xl">
              {`\u201ENihče me ne uči. Vsega sem se naučil sam.\u201D`}
            </blockquote>

            <p>
              Danes Filip pozna na tisoče pesmi — od jazzovskih standardov iz leta
              1920, šansonov in popevk iz 50-ih in 60-ih let, do sodobnih
              uspešnic. Vsako slišano pesem lahko takoj reproducira na klaviaturah
              in jo zapoje z vsemi glasovi. V snemalnem studiu posname tudi 30
              pesmi na eno sejo.
            </p>

            <p>
              Filip je izredno neposreden in iskren. Na odru nima treme — kot sam
              pravi: {`\u201ENimam treme, ni me strah. Ljudi ne vidim.\u201D`} Ta
              neposrednost je del njegovega čara, ki očara vse, ki ga srečajo — od
              navadnih poslušalcev do največjih zvezdnikov, kot je Andrea Bocelli.
            </p>

            <p>
              Poleg glasbe ima Filip še eno veliko strast — zbira sintetizatorje
              in diktafone. V svoji zbirki ima več kot 20 klaviatur, vsako pozna
              do potankosti. Njegova velika želja ostaja Yamaha Tyros 5 —
              profesionalna klaviatura, ki bi mu odprla nove glasbene svetove.
            </p>

            <p>
              Za Filipom stoji predana mama Andreja Pader, ki mu nudi vsakodnevno
              podporo in skrb. Skupaj sta neustavljiva ekipa — Filip s talentom,
              Andreja z neskončno ljubeznijo in voljo.
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
}
