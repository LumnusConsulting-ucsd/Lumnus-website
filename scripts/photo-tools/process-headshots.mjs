// Crops tagged headshots to consistent head-and-shoulders squares and exports WebP.
//   node scripts/photo-tools/process-headshots.mjs           -> writes raw/.cache/team-preview/ + contact sheet
//   node scripts/photo-tools/process-headshots.mjs --apply   -> copies approved files to public/team/
//                                                              and points each person's `photo` at them
// Framing: 4:5 portrait. Crop height = FACE_SCALE × face height; face centre sits FACE_Y of the way down.
import fs from "node:fs/promises";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const MEMBERS = path.join(ROOT, "app/about/members.json");
const PREVIEW = path.join(ROOT, "raw/.cache/team-preview");
const ROTATED = path.join(PREVIEW, "rotated");
const PUBLIC_TEAM = path.join(ROOT, "public/team");
const FACE_SCALE = 3.0;
const FACE_Y = 0.4;
const ASPECT = 4 / 5; // width / height
const OUT_W = 640, OUT_H = 800; // shown at up to ~260px wide, sharp on 2-3x screens
const APPLY = process.argv.includes("--apply");
const slug = (n) => n.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

const data = JSON.parse(await fs.readFile(MEMBERS, "utf8"));
const tagged = data.members.filter((m) => m.headshotSource);

if (APPLY) {
  await fs.mkdir(PUBLIC_TEAM, { recursive: true });
  for (const m of tagged) {
    const file = `${slug(m.name)}.webp`;
    await fs.copyFile(path.join(PREVIEW, file), path.join(PUBLIC_TEAM, file));
    m.photo = `/team/${file}`;
  }
  await fs.writeFile(MEMBERS, JSON.stringify(data, null, 2) + "\n");
  console.log(`applied ${tagged.length} headshots to public/team/ and members.json`);
  process.exit(0);
}

// 1) normalise orientation so Vision and sharp see the same pixels
await fs.mkdir(ROTATED, { recursive: true });
const rotated = [];
for (const m of tagged) {
  const out = path.join(ROTATED, `${slug(m.name)}.jpg`);
  await sharp(path.join(ROOT, m.headshotSource)).rotate().jpeg({ quality: 95 }).toFile(out);
  rotated.push(out);
}

// 2) detect faces
const detections = JSON.parse(execFileSync("swift", [path.join(ROOT, "scripts/photo-tools/faces.swift"), ...rotated], { maxBuffer: 1 << 24 }).toString());

// 3) crop
const report = [];
for (const [i, m] of tagged.entries()) {
  const d = detections[i];
  const W = d.width, H = d.height;
  // biggest face = the subject
  const face = (d.faces ?? []).sort((a, b) => b.w * b.h - a.w * a.h)[0];
  let ch, cx, cy, note = "";
  if (face) {
    ch = face.h * FACE_SCALE;
    cx = face.x + face.w / 2;
    cy = face.y + face.h / 2 - (FACE_Y - 0.5) * ch; // shift so the face sits above centre
  } else {
    note = "no face found: centred top crop";
    ch = Math.min(H, W / ASPECT); cx = W / 2; cy = ch / 2;
  }
  // keep the 4:5 box inside the image; shrink it if needed (face stays centred horizontally)
  ch = Math.min(ch, H, W / ASPECT);
  let cw = ch * ASPECT;
  const left = Math.round(Math.min(Math.max(cx - cw / 2, 0), W - cw));
  const top = Math.round(Math.min(Math.max(cy - ch / 2, 0), H - ch));
  ch = Math.floor(ch); cw = Math.floor(ch * ASPECT);
  if (face && ch < face.h * FACE_SCALE * 0.9) note = "photo too tight: framed a bit closer";
  if (cw < 400) note += (note ? "; " : "") + `low-res source (${cw}px wide crop)`;
  await sharp(rotated[i]).extract({ left, top, width: cw, height: ch }).resize(OUT_W, OUT_H)
    .webp({ quality: 80 }).toFile(path.join(PREVIEW, `${slug(m.name)}.webp`));
  report.push({ name: m.name, crop: `${cw}×${ch}`, faces: d.faces?.length ?? 0, note });
}

// 4) contact sheet: circles on the page background, names underneath
const cols = 7, cell = 180, cellH = 225, pad = 16, label = 34;
const rows = Math.ceil(report.length / cols);
const mask = Buffer.from(`<svg width="${cell}" height="${cellH}"><rect width="${cell}" height="${cellH}" rx="18"/></svg>`);
const tiles = [];
for (const [i, r] of report.entries()) {
  const img = await sharp(path.join(PREVIEW, `${slug(r.name)}.webp`)).resize(cell, cellH)
    .composite([{ input: mask, blend: "dest-in" }]).png().toBuffer();
  const x = pad + (i % cols) * (cell + pad), y = pad + Math.floor(i / cols) * (cellH + label + pad);
  const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
  const text = Buffer.from(`<svg width="${cell + pad}" height="${label}"><text x="${(cell + pad) / 2}" y="16" font-family="Helvetica" font-size="14" font-weight="600" fill="#0f1a2e" text-anchor="middle">${esc(r.name)}</text>${r.note ? `<text x="${(cell + pad) / 2}" y="31" font-family="Helvetica" font-size="11" fill="#b4231a" text-anchor="middle">${esc(r.note.split(":")[0].split(";")[0])}</text>` : ""}</svg>`);
  tiles.push({ input: img, left: x, top: y }, { input: text, left: x - pad / 2, top: y + cellH + 4 });
}
await sharp({ create: { width: pad + cols * (cell + pad), height: pad + rows * (cellH + label + pad), channels: 3, background: "#f7f8fa" } })
  .composite(tiles).jpeg({ quality: 88 }).toFile(path.join(PREVIEW, "contact-sheet.jpg"));

console.table(report);
console.log(`preview: ${path.relative(ROOT, path.join(PREVIEW, "contact-sheet.jpg"))}`);
