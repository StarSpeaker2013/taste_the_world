#!/usr/bin/env node
/**
 * Build image manifests for folders that the site loops over.
 *
 * Usage:
 *   node scripts/build-manifest.js
 *
 * For each folder listed in FOLDERS below, this scans for image files
 * (jpg/jpeg/png/gif/webp) and writes an `index.json` inside that folder
 * containing an array of filenames, sorted naturally.
 *
 * The site's JS fetches these `index.json` files at runtime to build
 * things like the home-page hero carousel, so you never have to hand-edit
 * a list of `<img>` tags again — just drop new photos in and re-run
 * this script before committing.
 */

const fs = require("fs");
const path = require("path");

// Folders (relative to repo root) whose images should be listed.
// Add more paths here if other pages need the same treatment.
const FOLDERS = [
  "pic/Event/August",
];

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".gif", ".webp"]);

// Natural sort: "9.jpg" < "10.jpg", case-insensitive.
function naturalCompare(a, b) {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
}

function buildOne(relDir) {
  const absDir = path.resolve(__dirname, "..", relDir);
  if (!fs.existsSync(absDir) || !fs.statSync(absDir).isDirectory()) {
    console.warn(`  ! skipping (not a directory): ${relDir}`);
    return;
  }

  const files = fs
    .readdirSync(absDir)
    .filter((name) => {
      if (name.startsWith(".") || name === "index.json") return false;
      const full = path.join(absDir, name);
      if (!fs.statSync(full).isFile()) return false;
      return IMAGE_EXT.has(path.extname(name).toLowerCase());
    })
    .sort(naturalCompare);

  const outPath = path.join(absDir, "index.json");
  fs.writeFileSync(outPath, JSON.stringify(files, null, 2) + "\n", "utf8");
  console.log(`  \u2713 ${relDir}/index.json  (${files.length} images)`);
}

console.log("Building image manifests...");
FOLDERS.forEach(buildOne);
console.log("Done.");