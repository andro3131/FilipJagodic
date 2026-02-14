"use client";

import ScrollReveal from "./ScrollReveal";

const featured = {
  id: "EJYPq4STQ6w",
  title: "Privid",
  description:
    "Avtorska pesem in videospot — duet z Barbaro Leben. Edina avtorska glasba, posneta profesionalno.",
};

const videos = [
  {
    id: "KPP-UOhs8iE",
    title: "Prsti zapleteni",
    description: "Duet s Klapo Rišpet.",
  },
  {
    id: "1WPEC_KJXpk",
    title: "Take Good Care of Her",
    description:
      "Adam Wade — prikaz kako Filip posname vokal in klaviature hkrati.",
  },
  {
    id: "ruVUK_g5rK0",
    title: "Let It Be Me",
    description: "Cover pesmi Elvisa Presleyja.",
  },
  {
    id: "SJgYyL1qdzE",
    title: "Nastop v živo s Klapo Šufit",
    description: "Filip na odru skupaj s hrvaško klapo.",
  },
];

export default function Music() {
  return (
    <section
      id="glasba"
      aria-labelledby="music-heading"
      className="relative py-24 md:py-32 px-6 bg-surface"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <ScrollReveal className="text-center mb-16">
          <p className="text-accent text-sm font-medium tracking-[0.3em] uppercase mb-4">
            Poslušaj
          </p>
          <h2
            id="music-heading"
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            Glasba
          </h2>
          <div className="w-20 h-0.5 bg-accent mx-auto mb-6" />
          <p className="text-white/50 max-w-2xl mx-auto">
            Filipove izvedbe in nastopi — od avtorske glasbe do coverjev
            in nastopov v živo.
          </p>
        </ScrollReveal>

        {/* Featured video */}
        <ScrollReveal className="mb-12" delay={0.1}>
          <div className="max-w-4xl mx-auto">
            <div className="aspect-video rounded-2xl overflow-hidden bg-black border border-border">
              <iframe
                src={`https://www.youtube.com/embed/${featured.id}`}
                title={featured.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
                loading="lazy"
              />
            </div>
            <div className="mt-4 text-center">
              <h3 className="font-heading text-xl md:text-2xl font-semibold text-white">
                {featured.title}
              </h3>
              <p className="text-white/50 mt-1">{featured.description}</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Video grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {videos.map((video, index) => (
            <ScrollReveal key={video.id} delay={0.1 * index}>
              <div className="rounded-2xl overflow-hidden bg-[#141618] border border-border hover:border-accent/30 transition-all duration-500">
                <div className="aspect-video bg-black">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                    loading="lazy"
                  />
                </div>
                <div className="p-4 md:p-5">
                  <h3 className="font-heading text-lg font-semibold text-white">
                    {video.title}
                  </h3>
                  <p className="text-white/50 text-sm mt-1">
                    {video.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
