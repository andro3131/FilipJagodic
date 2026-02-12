"use client";

import ScrollReveal from "./ScrollReveal";

const links = [
  {
    name: "YouTube",
    description: "Video posnetki Filipovih nastopov in studijskih sej.",
    url: "#",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0C.488 3.45.029 5.804 0 12c.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0C23.512 20.55 23.971 18.196 24 12c-.029-6.185-.484-8.549-4.385-8.816zM9 16V8l8 4-8 4z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    description: "Filipova Facebook stran z novicami in objavami.",
    url: "#",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
];

export default function Links() {
  return (
    <section
      id="povezave"
      aria-labelledby="links-heading"
      className="relative py-24 md:py-32 px-6 bg-surface"
    >
      <div className="mx-auto max-w-3xl">
        <ScrollReveal className="text-center mb-16">
          <p className="text-accent text-sm font-medium tracking-[0.3em] uppercase mb-4">
            Spremljaj
          </p>
          <h2
            id="links-heading"
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            Povezave
          </h2>
          <div className="w-20 h-0.5 bg-accent mx-auto" />
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {links.map((link, index) => (
            <ScrollReveal key={link.name} delay={0.15 * index}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center p-8 rounded-2xl bg-[#141618] border border-border hover:border-accent/30 transition-all duration-500 text-center focus:outline-none focus:ring-2 focus:ring-accent"
                aria-label={`${link.name} — ${link.description}`}
              >
                <div className="text-white/30 group-hover:text-accent transition-colors duration-300 mb-4">
                  {link.icon}
                </div>
                <h3 className="font-heading text-xl font-semibold text-white group-hover:text-accent transition-colors mb-2">
                  {link.name}
                </h3>
                <p className="text-white/40 text-sm">{link.description}</p>
              </a>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="text-center mt-8" delay={0.3}>
          <p className="text-white/30 text-sm">
            Povezave bodo posodobljene z dejanskimi URL naslovi.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
