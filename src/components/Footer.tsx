export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-border" role="contentinfo">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="font-heading text-lg font-bold text-gold tracking-wider">
              FILIP JAGODIČ
            </p>
            <p className="text-white/30 text-sm mt-1">
              Glasba presega vse meje
            </p>
          </div>

          <nav
            aria-label="Noga — navigacija"
            className="flex flex-wrap gap-6 justify-center"
          >
            <a
              href="#o-filipu"
              className="text-white/40 hover:text-gold text-sm transition-colors"
            >
              O Filipu
            </a>
            <a
              href="#glasba"
              className="text-white/40 hover:text-gold text-sm transition-colors"
            >
              Glasba
            </a>
            <a
              href="#zbirke"
              className="text-white/40 hover:text-gold text-sm transition-colors"
            >
              Zbirke
            </a>
            <a
              href="#povezave"
              className="text-white/40 hover:text-gold text-sm transition-colors"
            >
              Povezave
            </a>
            <a
              href="#kontakt"
              className="text-white/40 hover:text-gold text-sm transition-colors"
            >
              Kontakt
            </a>
          </nav>

          <p className="text-white/20 text-sm">
            &copy; {new Date().getFullYear()} Filip Jagodič
          </p>
        </div>
      </div>
    </footer>
  );
}
