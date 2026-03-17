#!/usr/bin/env node
/**
 * Lists all Cloudinary URLs found in content JSON files.
 * Outputs: section, key/path, URL, filename
 *
 * Usage: node scripts/list-cloudinary-urls.js
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

let total = 0;

function extractFilename(url) {
  try {
    const decoded = decodeURIComponent(url);
    return decoded.split("/").pop();
  } catch {
    return url.split("/").pop();
  }
}

function findUrls(obj, prefix) {
  const results = [];
  if (typeof obj === "string") {
    if (obj.includes("res.cloudinary.com")) {
      results.push({ path: prefix, url: obj, filename: extractFilename(obj) });
    }
  } else if (Array.isArray(obj)) {
    obj.forEach((item, i) => {
      results.push(...findUrls(item, `${prefix}[${i}]`));
    });
  } else if (obj && typeof obj === "object") {
    for (const [key, val] of Object.entries(obj)) {
      results.push(...findUrls(val, prefix ? `${prefix}.${key}` : key));
    }
  }
  return results;
}

console.log("=== Cloudinary URLs v content JSON datotekah ===\n");

for (const file of FILES) {
  const filePath = path.join(CONTENT_DIR, file);
  if (!fs.existsSync(filePath)) continue;

  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const urls = findUrls(data, "");

  if (urls.length === 0) continue;

  console.log(`\n--- ${file} (${urls.length} URL-jev) ---`);
  urls.forEach((u) => {
    console.log(`  ${u.path}`);
    console.log(`    ${u.url}`);
    console.log(`    -> ${u.filename}`);
    total++;
  });
}

console.log(`\n=== SKUPAJ: ${total} URL-jev ===`);
