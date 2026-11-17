// Indexes a folder of photos for the local tagging/picking pages.
//   1. Exact / near-exact copies (re-exports, resizes) are merged — you never see them twice.
//   2. Consecutive shots of the same sitting (taken seconds apart, visually similar) are
//      stacked into one card so each person/moment appears once, with alternates inside.
// Usage: node scripts/photo-tools/index-photos.mjs <srcDir> <cacheDir> [--no-series]
// Output: <cacheDir>/index.json and <cacheDir>/thumbs/<file>.webp
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const args = process.argv.slice(2);
const [srcDir, cacheDir] = args.filter((a) => !a.startsWith("--"));
const SERIES = !args.includes("--no-series");
if (!srcDir || !cacheDir) {
  console.error("usage: index-photos.mjs <srcDir> <cacheDir> [--no-series]");
  process.exit(1);
}
const IMG = /\.(jpe?g|png|heic|webp)$/i;
const COPY_BITS = 12; // 256-bit dHash distance that counts as "same image"
const SERIES_GAP_S = 30; // max seconds between shots in one sitting
const SERIES_DIFF = 20; // max blurred-thumbnail difference between neighbouring shots

async function dhash(img) {
  const N = 16;
  const px = await img.clone().greyscale().resize(N + 1, N, { fit: "fill" }).raw().toBuffer();
  let bits = 0n;
  for (let y = 0; y < N; y++)
    for (let x = 0; x < N; x++) bits = (bits << 1n) | (px[y * (N + 1) + x] > px[y * (N + 1) + x + 1] ? 1n : 0n);
  return bits;
}
const hamming = (a, b) => {
  let v = a ^ b, n = 0;
  while (v) { n += Number(v & 1n); v >>= 1n; }
  return n;
};
async function looks(img) {
  return new Float32Array(await img.clone().greyscale().normalise().blur(2).resize(32, 48, { fit: "fill" }).raw().toBuffer());
}
const diff = (a, b) => { let s = 0; for (let i = 0; i < a.length; i++) s += Math.abs(a[i] - b[i]); return s / a.length; };
// Capture time. EXIF holds several timestamps (edit time, original, digitized);
// the capture time is the earliest of them.
function exifTime(exif) {
  const all = [...(exif?.toString("latin1") ?? "").matchAll(/(\d{4}):(\d{2}):(\d{2}) (\d{2}):(\d{2}):(\d{2})/g)]
    .map((m) => Date.UTC(+m[1], m[2] - 1, +m[3], +m[4], +m[5], +m[6]) / 1000);
  return all.length ? Math.min(...all) : null;
}

const files = (await fs.readdir(srcDir)).filter((f) => IMG.test(f)).sort();
await fs.mkdir(path.join(cacheDir, "thumbs"), { recursive: true });

const items = [];
for (const [i, f] of files.entries()) {
  try {
    const img = sharp(path.join(srcDir, f)).rotate();
    const meta = await img.metadata();
    const w = meta.autoOrient?.width ?? meta.width, h = meta.autoOrient?.height ?? meta.height;
    items.push({ file: f, w, h, t: exifTime(meta.exif), hash: await dhash(img), look: await looks(img) });
    const thumb = path.join(cacheDir, "thumbs", f.replace(/\.\w+$/, ".webp"));
    await fs.access(thumb).catch(() => img.clone().resize(480, 480, { fit: "inside" }).webp({ quality: 72 }).toFile(thumb));
  } catch (e) {
    console.warn(`skip unreadable ${f}: ${e.message}`);
  }
  if ((i + 1) % 50 === 0) console.log(`indexed ${i + 1}/${files.length}`);
}

// 1) merge true copies (union-find)
const parent = items.map((_, i) => i);
const find = (i) => (parent[i] === i ? i : (parent[i] = find(parent[i])));
for (let i = 0; i < items.length; i++)
  for (let j = i + 1; j < items.length; j++)
    if (hamming(items[i].hash, items[j].hash) <= COPY_BITS) parent[find(i)] = find(j);
const copySets = new Map();
items.forEach((it, i) => copySets.set(find(i), [...(copySets.get(find(i)) ?? []), it]));
const photos = [...copySets.values()].map((set) => {
  set.sort((a, b) => b.w * b.h - a.w * a.h); // keep the largest copy
  const best = set[0];
  return { ...best, t: set.find((s) => s.t)?.t ?? null, copies: set.map((s) => s.file) };
});

// 2) stack consecutive shots of one sitting
photos.sort((a, b) => (a.t ?? Infinity) - (b.t ?? Infinity) || a.file.localeCompare(b.file));
const stacks = [];
for (const p of photos) {
  const last = stacks.at(-1)?.at(-1);
  const sameSitting = SERIES && last && p.t != null && last.t != null &&
    p.t - last.t <= SERIES_GAP_S && diff(p.look, last.look) <= SERIES_DIFF;
  if (sameSitting) stacks.at(-1).push(p);
  else stacks.push([p]);
}

const out = stacks.map((s, i) => ({
  id: `s${String(i + 1).padStart(3, "0")}`,
  shots: s.map((p) => ({ file: p.file, thumb: p.file.replace(/\.\w+$/, ".webp"), w: p.w, h: p.h, copies: p.copies })),
}));
await fs.writeFile(path.join(cacheDir, "index.json"), JSON.stringify({ srcDir, stacks: out }, null, 2));

const merged = photos.reduce((n, p) => n + p.copies.length - 1, 0);
console.log(`${files.length} files: ${merged} duplicate copies merged -> ${photos.length} unique photos -> ${out.length} cards` +
  (SERIES ? ` (${out.filter((s) => s.shots.length > 1).length} cards stack several shots of one sitting)` : ""));
