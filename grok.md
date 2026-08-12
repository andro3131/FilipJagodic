# Filip Jagodič — handoff (Grok)

> Spletna stran pevca Filipa Jagodiča. Next.js, next-intl (SL/EN), Vercel, Bunny CDN.  
> Zadnja posodobitev: **2026-08-12**.

---

## Projekt

| | |
|---|---|
| Repo | `github.com/andro3131/FilipJagodic` · `main` |
| Lokalno | `Andrej_Codespaces/FilipJagodic/` |
| Stack | Next.js 15, React 19, Tailwind 4, TypeScript, Framer Motion, next-intl |
| Deploy | Vercel (auto po push na `main`) · **avto-push** (korenski `CLAUDE.md`) |
| Live | https://filip-jagodic.vercel.app |
| CDN | `https://filip-jagodic.b-cdn.net/` (Novice/, Galerija/, …) |

**Gate pred push:** `npm run build` mora uspeti. Commit v slovenščini + `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`.

---

## Struktura (pomembno)

| Pot | Vloga |
|-----|--------|
| `content/*.json` | Vsebina (hero, news, gallery, music, …) — brez dolgih prevodov |
| `messages/sl.json`, `messages/en.json` | Vsi napisi, telesa novic, biografija … |
| `src/components/Hero.tsx` | Hero (video + naslov); **brez** marquee bannerja |
| `src/components/News.tsx` | Domov: **ena** featured novica (pinned/najnovejša) |
| `src/components/NewsAll.tsx` | `/novice` — vse novice, mreža + modal |
| `docs/OSNUTEK-hero-banner.md` | Shranjena koda rdečega hero bannerja (če ga kdaj spet rabimo) |
| `temp-material/` | Lokalni materiali (npr. slike) — **ne commitaj** |

### Domov (vrstni red)

Hero → … → `#novice` (featured) → … (glej `src/app/[locale]/page.tsx`)

### Navigacija (2026-08-12)

- **Active state:** na podstrani se poudari ustrezna postavka (`text-accent` + `aria-current`), npr. `/novice` → Novice.
- **Domov:** aktivno na `/{locale}/`.
- **Href logika** (`Navigation.tsx`):
  - na domači → scroll na `#hash`;
  - na isti podstrani (npr. že `/novice`) → scroll na vrh;
  - z druge podstrani, če obstaja full page (`novice`, `o-filipu`, `srecanja`, `galerija`, `glasba`) → gre na to pot;
  - studio / zbirke / kontakt (samo sekcije) → `/{locale}/#hash`.
- **Scroll-spy (domača):** med skrolanjem se poudari trenutna sekcija; na heroju = Domov. Podstrani: active po poti (brez spy).
- **Footer:** © leto + „Vse pravice pridržane.“ + Kontakt: mama Andreja (#kontakt) · Facebook.

### Jeziki

- Locale routing: `/sl/…`, `/en/…` (`src/i18n/`, middleware).
- Novice: ključ v `content/news.json` + prevodi pod `news.items.<key>` v obeh `messages`.

---

## Novice — kako deluje (od 2026-08-12)

**Več vnosov, arhiv po datumu.**

1. `content/news.json` — seznam:
   ```json
   {
     "key": "slug-leto",
     "date": "YYYY-MM-DD",
     "pinned": true|false,
     "image": "https://filip-jagodic.b-cdn.net/Novice/....",
     "video": "",
     "media": []
   }
   ```
2. Sort v UI: **pinned najprej**, nato `date` padajoče (novejše zgoraj).
3. **Domov (`News.tsx`):** samo prva po sortu (featured) — slika in/ali video + polno telo.
4. **`/novice` (`NewsAll.tsx`):** mreža vseh; klik → modal s polno vsebino.
5. Če je >1 novica → gumb **Vse novice** na domači.
6. Prevodi: `messages/sl.json` + `en.json` → `news.items.<key>` (`title`, `excerpt`, `date`, `body`).

### Trenutne novice

| key | date | pinned | media | Opomba |
|-----|------|--------|-------|--------|
| `asistent-vili-2026` | 2026-08-12 | da | slika CDN | **Aktualna** — Vili (brez priimka) |
| `osebni-asistent-2026` | 2026-03-19 | ne | video CDN | **Arhiv** — iskanje asistenta |

**Slika Vili:**  
`https://filip-jagodic.b-cdn.net/Novice/asistent-in-Filip-slika.jpg`

**SL telo (skrajšano, odobreno):** dobra novica o Viliju; smeh/energija; Filip in Vili · voda in svoboda; opomba k fotografiji.  
**Brez** teme o uhanih/kosmatosti (zavestno izpuščeno iz FB postov mame Andreje).

---

## Hero banner (odstranjen 2026-08-12)

- Bil: rdeči marquee pod hero — “Filip išče novega osebnega asistenta” (desktop + mobile).
- **Zakaj off:** asistent najden (Vili).
- **Osnutek za ponovno vključitev:** `docs/OSNUTEK-hero-banner.md` (prevodi, CSS `marquee`/`banner-glow`, JSX mobile+desktop).
- `banner-pulse` ostaja v `globals.css` (NOVO badge pri novicah).

---

## Seja 2026-08-12 — kaj je narejeno

1. Klon repa v workspace (`FilipJagodic/` prej ni bil lokalno).
2. Odstranjen hero banner (mobile + desktop) + prevodi `bannerText`/`bannerCta`.
3. Osnutek bannerja v `docs/`.
4. Novice: multi-item + sort; Vili featured; stara iskalna v arhivu.
5. Push na `main`: `c46736d` (banner off), `d71f95d` (Vili + arhiv).
6. Pravilo workspace: **avto-push na vse git projekte** (korenski `CLAUDE.md`).

---

## Ne / pazljivo

- Ne briši arhivske novice o iskanju, razen če eksplicitno prosi.
- `temp-material/` ne v git.
- CDN URL-ji so kanonski; lokalne kopije slik so samo za referenco.
- Emailjs: glej `EMAILJS-NAVODILA.md` (kontaktni obrazec).

---

## Naslednji koraki (po prilepku)

- Nove novice: CDN slika/video → vnos v `news.json` + SL/EN v `messages` → build → push.
- Po potrebi: pin zamenjaj na novo novico (`pinned: true` na novi, `false` na stari).
- Če spet iskanje asistenta: obnovi banner iz `docs/OSNUTEK-hero-banner.md`.
