"use client";

import ScrollReveal from "./ScrollReveal";

export default function Contact() {
  return (
    <section
      id="kontakt"
      aria-labelledby="contact-heading"
      className="relative py-24 md:py-32 px-6"
    >
      <div className="mx-auto max-w-3xl text-center">
        <ScrollReveal>
          <p className="text-accent text-sm font-medium tracking-[0.3em] uppercase mb-4">
            Povežimo se
          </p>
          <h2
            id="contact-heading"
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            Kontakt
          </h2>
          <div className="w-20 h-0.5 bg-accent mx-auto mb-8" />
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-white/60 text-lg mb-12 max-w-xl mx-auto">
            Za nastope, sodelovanja, medijske poizvedbe ali preprosto sporočilo
            — z veseljem se povežemo.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <a
            href="mailto:kontakt@filipjagodic.si"
            className="inline-flex items-center gap-3 px-10 py-5 bg-accent text-white font-semibold text-lg rounded-full hover:bg-accent-light transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-[#141618]"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            Pišite nam
          </a>
        </ScrollReveal>

        <ScrollReveal delay={0.4} className="mt-12">
          <div className="flex flex-col sm:flex-row gap-8 justify-center text-white/40">
            <div>
              <p className="font-semibold text-white/60 mb-1">Nastopi</p>
              <p className="text-sm">Koncerti, dogodki, festivali</p>
            </div>
            <div className="hidden sm:block w-px bg-border" aria-hidden="true" />
            <div>
              <p className="font-semibold text-white/60 mb-1">Mediji</p>
              <p className="text-sm">Intervjuji, reportaže, dokumentarci</p>
            </div>
            <div className="hidden sm:block w-px bg-border" aria-hidden="true" />
            <div>
              <p className="font-semibold text-white/60 mb-1">Sodelovanja</p>
              <p className="text-sm">Glasba, projekti, dobrodelnost</p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
