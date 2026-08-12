# Osnutek: hero marquee banner (iskanje osebnega asistenta)

Odstranjen **2026-08-12**, ker je asistent najden (Vili).
Če bo kdaj spet potreben (novo iskanje / nujno obvestilo), ta datoteka drži kodo iz commita pred odstranitvijo (`c46736d^`).

## Prevodi (`messages/*.json` → ključ `hero`)

```json
// sl.json
"bannerText": "Filip išče novega osebnega asistenta",
"bannerCta": "Klikni za več informacij"

// en.json
"bannerText": "Filip is looking for a new personal assistant",
"bannerCta": "Click for more info"
```

## CSS (`src/app/globals.css`)

```css
/* Marquee scroll for hero banner */
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

@keyframes banner-glow {
  0%, 100% { box-shadow: 0 0 20px rgba(212, 64, 64, 0.3), inset 0 0 20px rgba(212, 64, 64, 0.1); }
  50% { box-shadow: 0 0 40px rgba(212, 64, 64, 0.5), inset 0 0 30px rgba(212, 64, 64, 0.15); }
}

@keyframes banner-pulse {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}
```

Opomba: `banner-pulse` je **ostal** v projektu (NOVO badge pri novicah).
Ob ponovni vključitvi dodaj nazaj samo `marquee` + `banner-glow`.

## JSX — mobilni banner

V `src/components/Hero.tsx`, znotraj mobile bloka, **po citatu** (pod `quoteAuthor`).

```tsx
          {/* Mobile banner strip — below quote, above video */}
          <motion.div
            className="overflow-hidden rounded-lg mt-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
          >
            <a
              href="#novice"
              className="block relative"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById("novice");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <div
                className="relative py-3"
                style={{
                  background: "linear-gradient(135deg, #D44040 0%, #B83333 40%, #E85555 60%, #D44040 100%)",
                  animation: "banner-glow 3s ease-in-out infinite",
                }}
              >
                <div
                  className="flex whitespace-nowrap"
                  style={{ animation: "marquee 12s linear infinite" }}
                >
                  {[0, 1].map((i) => (
                    <div key={i} className="flex items-center gap-6 px-4 shrink-0">
                      {[0, 1].map((j) => (
                        <span key={j} className="flex items-center gap-2">
                          <span className="inline-flex items-center justify-center px-1.5 py-0.5 bg-black rounded text-[9px] font-bold text-white tracking-wider uppercase">
                            NOVO
                          </span>
                          <span
                            className="inline-block w-1.5 h-1.5 rounded-full bg-white/80"
                            style={{ animation: "banner-pulse 2s ease-in-out infinite", animationDelay: `${j * 0.5}s` }}
                            aria-hidden="true"
                          />
                          <span className="text-white font-semibold text-xs tracking-wide uppercase">
                            {t("bannerText")}
                          </span>
                          <span className="text-black font-medium text-[10px]">
                            — {t("bannerCta")} →
                          </span>
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </a>
          </motion.div>
```

## JSX — desktop banner

V `src/components/Hero.tsx`, **nad** bottom blur / scroll indicatorjem.

```tsx
      {/* Desktop news banner strip — above scroll indicator */}
      <motion.div
        className="hidden lg:block absolute left-0 right-0 bottom-16 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        style={{ zIndex: 5 }}
      >
        <a
          href="#novice"
          className="block relative"
          onClick={(e) => {
            e.preventDefault();
            const el = document.getElementById("novice");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <div
            className="relative py-3.5"
            style={{
              background: "linear-gradient(135deg, #D44040 0%, #B83333 40%, #E85555 60%, #D44040 100%)",
              animation: "banner-glow 3s ease-in-out infinite",
            }}
          >
            {/* Shimmer overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
                backgroundSize: "200% 100%",
                animation: "shimmer-flash 3s ease-in-out infinite",
              }}
              aria-hidden="true"
            />

            {/* Marquee text — 2 copies for seamless loop, 2 items each */}
            <div
              className="flex whitespace-nowrap"
              style={{ animation: "marquee 25s linear infinite" }}
            >
              {[0, 1].map((i) => (
                <div key={i} className="flex items-center gap-10 px-6 shrink-0">
                  {[0, 1].map((j) => (
                    <span key={j} className="flex items-center gap-3">
                      <span className="inline-flex items-center justify-center px-2.5 py-1 bg-black rounded text-xs font-bold text-white tracking-wider uppercase">
                        NOVO
                      </span>
                      <span
                        className="inline-block w-2 h-2 rounded-full bg-white/80"
                        style={{ animation: "banner-pulse 2s ease-in-out infinite", animationDelay: `${j * 0.5}s` }}
                        aria-hidden="true"
                      />
                      <span className="text-white font-semibold text-lg tracking-wide uppercase">
                        {t("bannerText")}
                      </span>
                      <span className="text-black font-medium text-sm">
                        — {t("bannerCta")} →
                      </span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </a>
      </motion.div>
```

## Vezava

- Klik skrolne na `#novice` (pinned novica).
- Marquee: 2 kopiji besedila za seamless loop.
- Animacije: `banner-glow`, `marquee`, `banner-pulse`, `shimmer-flash` (desktop).
