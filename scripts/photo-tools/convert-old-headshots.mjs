// Converts headshots still pointing at public/members/ (large JPG/PNG uploads) into small WebP
// files in public/team/, keeping the full frame (no crop), and repoints members.json at them.
// Originals are left untouched in public/members/.
//   node scripts/photo-tools/convert-old-headshots.mjs
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const MEMBERS = path.join(ROOT, "app/about/members.json");
const slug = (n) => n.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

const data = JSON.parse(await fs.readFile(MEMBERS, "utf8"));
await fs.copyFile(MEMBERS, path.join(ROOT, "raw/.cache", `members.backup-${Date.now()}.json`));
await fs.mkdir(path.join(ROOT, "public/team"), { recursive: true });

let n = 0, before = 0, after = 0;
for (const m of data.members) {
  if (!m.photo.startsWith("/members/")) continue;
  const src = path.join(ROOT, "public", m.photo);
  const out = `/team/${slug(m.name)}.webp`;
  await sharp(src).rotate().resize(800, 800, { fit: "inside", withoutEnlargement: true })
    .webp({ quality: 80 }).toFile(path.join(ROOT, "public", out));
  before += (await fs.stat(src)).size;
  after += (await fs.stat(path.join(ROOT, "public", out))).size;
  m.photo = out;
  n++;
}
await fs.writeFile(MEMBERS, JSON.stringify(data, null, 2) + "\n");
console.log(`converted ${n} headshots: ${(before / 1e6).toFixed(1)} MB -> ${(after / 1e6).toFixed(1)} MB`);
