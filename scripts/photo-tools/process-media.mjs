// Resizes chosen media-day photos to WebP for the About page.
//   node scripts/photo-tools/process-media.mjs
// Reads raw/.cache/media-day/selection.json:
//   { "hero": null | { "file", "alt" }, "gallery": [{ "file", "alt" }] }
// Writes public/gallery/media-day-NN.webp (+ public/about-hero.webp if a hero is set)
// and app/about/gallery.json, which the page renders (existing gallery photos stay first).
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const RAW = path.join(ROOT, "raw/media-day");
const SEL = path.join(ROOT, "raw/.cache/media-day/selection.json");
const GALLERY_JSON = path.join(ROOT, "app/about/gallery.json");
const EXISTING = [
  { src: "/gallery/full-cohort-group.jpg", alt: "The full Lumnus intern cohort" },
  { src: "/gallery/main-intern-class.jpg", alt: "Intern class outside Wells Fargo Hall" },
  { src: "/gallery/palm-trio.jpg", alt: "Interns outside the Rady building" },
];

// The camera burns an orange date (e.g. 09/28/2026) into the bottom-right corner.
// It shows up as orange pixels confined to a thin horizontal band. Warm surfaces
// (wood floors, lights) also contain orange, but spread over many rows, so they're ignored.
async function stampTop(img, w, h) {
  const rw = Math.round(w * 0.4), rh = Math.round(h * 0.25);
  const { data, info } = await img.clone().extract({ left: w - rw, top: h - rh, width: rw, height: rh })
    .removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const rows = new Array(info.height).fill(0);
  for (let y = 0; y < info.height; y++)
    for (let x = 0; x < info.width; x++) {
      const i = (y * info.width + x) * 3, r = data[i], g = data[i + 1], b = data[i + 2];
      if (r > 165 && b < 70 && r - b > 110 && g > 90 && g < 175) rows[y]++;
    }
  const hitRows = rows.map((n, y) => (n >= 2 ? y : -1)).filter((y) => y >= 0);
  const total = rows.reduce((a, n) => a + n, 0);
  if (total < 25 || !hitRows.length) return null;
  const top = hitRows[0], bottom = hitRows.at(-1);
  if (bottom - top > h * 0.07) return null; // too tall to be a date stamp
  return h - rh + top - Math.round(h * 0.015);
}

async function processOne(file, out, maxEdge) {
  const base = sharp(path.join(RAW, file)).rotate();
  // materialise rotation losslessly so extract() uses upright coords (JPEG would smear the stamp colours)
  const buf = await base.png({ compressionLevel: 1 }).toBuffer();
  const img = sharp(buf);
  const { width: w, height: h } = await img.metadata();
  const cut = await stampTop(img, w, h);
  let pipeline = sharp(buf);
  if (cut) pipeline = pipeline.extract({ left: 0, top: 0, width: w, height: cut });
  const info = await pipeline.resize(maxEdge, maxEdge, { fit: "inside", withoutEnlargement: true })
    .webp({ quality: 78 }).toFile(out);
  return { width: info.width, height: info.height, stampCropped: !!cut };
}

const sel = JSON.parse(await fs.readFile(SEL, "utf8"));
await fs.mkdir(path.join(ROOT, "public/gallery"), { recursive: true });
const report = [];
const gallery = [];
for (const e of EXISTING) {
  const m = await sharp(path.join(ROOT, "public", e.src)).metadata();
  gallery.push({ ...e, width: m.width, height: m.height });
}
for (const [i, g] of sel.gallery.entries()) {
  const name = `media-day-${String(i + 1).padStart(2, "0")}.webp`;
  const r = await processOne(g.file, path.join(ROOT, "public/gallery", name), 1600);
  gallery.push({ src: `/gallery/${name}`, alt: g.alt, width: r.width, height: r.height });
  report.push({ out: name, ...r, kb: Math.round((await fs.stat(path.join(ROOT, "public/gallery", name))).size / 1024) });
}
let hero = null;
if (sel.hero) {
  const r = await processOne(sel.hero.file, path.join(ROOT, "public/about-hero.webp"), 2400);
  hero = { src: "/about-hero.webp", alt: sel.hero.alt };
  report.push({ out: "about-hero.webp", ...r });
}
await fs.writeFile(GALLERY_JSON, JSON.stringify({ hero, gallery }, null, 2) + "\n");
console.table(report);
