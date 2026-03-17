#!/usr/bin/env node
/**
 * Replaces Cloudinary URLs with Bunny CDN URLs in content JSON files.
 *
 * Usage:
 *   1. Run: node scripts/list-cloudinary-urls.js (to see current URLs)
 *   2. Edit scripts/url-mapping.json with old→new mappings
 *   3. Run: node scripts/replace-urls.js
 *
 * url-mapping.json format (object with old URL keys and new URL values):
 * {
 *   "https://res.cloudinary.com/.../old.jpg": "https://filip-jagodic.b-cdn.net/folder/old.jpg",
 *   ...
 * }
 *
 * Alternative: use --prefix to bulk-replace the Cloudinary base with Bunny base,
 *   keeping the original filename:
 *   node scripts/replace-urls.js --prefix https://filip-jagodic.b-cdn.net/images
 *   This replaces: https://res.cloudinary.com/dewf3zos0/image/upload/v1234/photo.jpg
 *            with: https://filip-jagodic.b-cdn.net/images/photo.jpg
 */
const fs = require("fs");
const path = require("path");

const CONTENT_DIR = path.join(__dirname, "..", "content");

const FILES = [
  "hero.json",
  "encounters.json",
  "gallery.json",
  "biography.json",
  "collections.json",
  "studio.json",
];

const args = process.argv.slice(2);
const prefixIdx = args.indexOf("--prefix");
const dryRun = args.includes("--dry-run");

function extractFilename(url) {
  try {
    return decodeURIComponent(url).split("/").pop();
  } catch {
    return url.split("/").pop();
  }
}

let mapping = {};
let replacements = 0;

if (prefixIdx !== -1 && args[prefixIdx + 1]) {
  // Bulk prefix mode
  const bunnyBase = args[prefixIdx + 1].replace(/\/$/, "");
  console.log(`Bulk prefix zamenjava: Cloudinary → ${bunnyBase}/{filename}\n`);

  for (const file of FILES) {
    const filePath = path.join(CONTENT_DIR, file);
    if (!fs.existsSync(filePath)) continue;
    let content = fs.readFileSync(filePath, "utf-8");

    // Match all Cloudinary URLs
    const regex =
      /https:\/\/res\.cloudinary\.com\/dewf3zos0\/(?:image|video)\/upload\/v\d+\/([^\s"]+)/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
      const oldUrl = match[0];
      const filename = extractFilename(oldUrl);
      mapping[oldUrl] = `${bunnyBase}/${filename}`;
    }
  }
} else {
  // Mapping file mode
  const mappingPath = path.join(__dirname, "url-mapping.json");
  if (!fs.existsSync(mappingPath)) {
    console.error(
      "Napaka: scripts/url-mapping.json ne obstaja.\n" +
        "Ustvari ga ali uporabi --prefix za bulk zamenjavo.\n" +
        "Primer: node scripts/replace-urls.js --prefix https://filip-jagodic.b-cdn.net/images"
    );
    process.exit(1);
  }
  mapping = JSON.parse(fs.readFileSync(mappingPath, "utf-8"));
}

console.log(`Najdenih ${Object.keys(mapping).length} mapiranj.\n`);

for (const file of FILES) {
  const filePath = path.join(CONTENT_DIR, file);
  if (!fs.existsSync(filePath)) continue;

  let content = fs.readFileSync(filePath, "utf-8");
  let fileReplacements = 0;

  for (const [oldUrl, newUrl] of Object.entries(mapping)) {
    // Escape special regex chars in URL
    const escaped = oldUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp(escaped, "g");
    const matches = content.match(re);
    if (matches) {
      content = content.replace(re, newUrl);
      fileReplacements += matches.length;
    }
  }

  if (fileReplacements > 0) {
    if (dryRun) {
      console.log(`  [DRY RUN] ${file}: ${fileReplacements} zamenjav`);
    } else {
      fs.writeFileSync(filePath, content, "utf-8");
      console.log(`  ${file}: ${fileReplacements} zamenjav`);
    }
    replacements += fileReplacements;
  }
}

console.log(`\nSkupaj: ${replacements} zamenjav.${dryRun ? " (DRY RUN)" : ""}`);
