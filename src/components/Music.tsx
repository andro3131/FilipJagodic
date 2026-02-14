"use client";

import ScrollReveal from "./ScrollReveal";

const featured = {
  id: "EJYPq4STQ6w",
  title: "Privid",
  description:
    "Avtorska pesem v duetu s pevko Barbaro Leben, z besedilom Filipove mame Andreje Pader in glasbo Andreja Mežana. Hrepenenje po ljubezni in čustveno popotovanje dveh duš.",
};

const videos = [
  {
    id: "KPP-UOhs8iE",
    title: "Prsti zapleteni",
    description:
      "Jelena Rozga in Klapa Rišpet — Prsti zapleteni (cover), duet z Agnes Kumlanc.",
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

        {/* Channel links */}
        <ScrollReveal className="mt-12" delay={0.2}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://www.youtube.com/@rokvolfand6462"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-border hover:border-accent/30 bg-[#141618] hover:bg-accent/5 transition-all duration-300 group"
            >
              <svg className="w-5 h-5 text-[#FF0000]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              <span className="text-white/70 group-hover:text-white text-sm font-medium transition-colors">
                YouTube kanal
              </span>
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=100008212027574"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-border hover:border-accent/30 bg-[#141618] hover:bg-accent/5 transition-all duration-300 group"
            >
              <svg className="w-5 h-5 text-[#1877F2]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span className="text-white/70 group-hover:text-white text-sm font-medium transition-colors">
                Facebook profil
              </span>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
