# FilipJagodic — pravila projekta

Next.js spletna stran Filipa Jagodiča. Detajlni handoff: **`grok.md`**.

## Obvezno

- Jezik: **slovenščina** (koda, commiti, pogovor).
- Po spremembah: `npm run build` → commit → **push `main`** (avto, brez spraševanja).
- Commit: slovenščina + `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`.

## Novice

- Metadata: `content/news.json` (key, date, pinned, image/video).
- Besedilo: `messages/sl.json` + `messages/en.json` pod `news.items.<key>`.
- Domov = featured (sort: pinned, nato datum); arhiv = `/novice`.

## Hero banner

- Trenutno **off**. Osnutek: `docs/OSNUTEK-hero-banner.md`.

## Ne commitaj

- `temp-material/`, `.env*`, `node_modules/`.
