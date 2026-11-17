// Local-only server for the photo tools (never deployed; lives outside app/ and public/).
//   node scripts/photo-tools/server.mjs headshots   -> http://127.0.0.1:4310  (tag headshots)
//   node scripts/photo-tools/server.mjs media-day   -> http://127.0.0.1:4311  (pick media day photos)
// Progress autosaves to raw/.cache/<set>/state.json, so you can close the tab and come back.
import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const SET = process.argv[2];
const CONFIG = {
  headshots: { port: 4310, page: "tagger.html" },
  "media-day": { port: 4311, page: "picker.html" },
}[SET];
if (!CONFIG) {
  console.error("usage: server.mjs headshots|media-day");
  process.exit(1);
}
const RAW = path.join(ROOT, "raw", SET);
const CACHE = path.join(ROOT, "raw", ".cache", SET);
const MEMBERS = path.join(ROOT, "app", "about", "members.json");
const STATE = path.join(CACHE, "state.json");

const TYPES = { ".html": "text/html", ".json": "application/json", ".webp": "image/webp", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png" };
const send = (res, code, body, type = "application/json") => {
  res.writeHead(code, { "Content-Type": type, "Cache-Control": "no-store" });
  res.end(typeof body === "string" || Buffer.isBuffer(body) ? body : JSON.stringify(body));
};
// Serve a file only if it resolves inside `dir` (no ../ escapes).
async function serveFrom(dir, rel, res) {
  const full = path.resolve(dir, decodeURIComponent(rel));
  if (!full.startsWith(dir + path.sep)) return send(res, 403, { error: "forbidden" });
  try {
    send(res, 200, await fs.readFile(full), TYPES[path.extname(full).toLowerCase()] ?? "application/octet-stream");
  } catch {
    send(res, 404, { error: "not found" });
  }
}
const readBody = (req) => new Promise((ok, fail) => {
  let b = "";
  req.on("data", (c) => (b += c)).on("end", () => ok(JSON.parse(b || "{}"))).on("error", fail);
});
const readJson = async (f, fallback) => JSON.parse(await fs.readFile(f, "utf8").catch(() => JSON.stringify(fallback)));

// Headshot export. Writes two things to members.json, after the page has shown a confirmation:
//   - `headshotSource` for each tagged person (the site's `photo` is untouched until processing)
//   - removal of people marked as graduated (never Executive Board members)
// A timestamped backup of members.json is written to raw/.cache/headshots/ first.
async function exportHeadshots({ assignments = [], remove = [] }) {
  const data = await readJson(MEMBERS);
  const byName = new Map(data.members.map((m) => [m.name, m]));
  const isBoard = (m) => m.departments.includes("Executive Board");
  const errors = [], seen = new Set();
  for (const name of remove) {
    const m = byName.get(name);
    if (!m) errors.push(`unknown name ${name}`);
    else if (isBoard(m)) errors.push(`${name} is on the Executive Board and can't be removed here`);
  }
  for (const { name, file } of assignments) {
    if (!byName.has(name)) errors.push(`unknown name ${name}`);
    if (seen.has(name)) errors.push(`${name} is tagged on more than one photo`);
    seen.add(name);
    await fs.access(path.join(RAW, file)).catch(() => errors.push(`missing file ${file}`));
  }
  if (errors.length) return { ok: false, errors };

  const backup = path.join(CACHE, `members.backup-${new Date().toISOString().replace(/[:.]/g, "-")}.json`);
  await fs.copyFile(MEMBERS, backup);
  for (const m of data.members) delete m.headshotSource; // a re-export replaces the previous mapping
  const removing = new Set(remove);
  let tagged = 0;
  for (const { name, file } of assignments) {
    if (removing.has(name)) continue;
    byName.get(name).headshotSource = `raw/headshots/${file}`;
    tagged++;
  }
  data.members = data.members.filter((m) => !removing.has(m.name));
  await fs.writeFile(MEMBERS, JSON.stringify(data, null, 2) + "\n");
  return { ok: true, tagged, removed: remove.length, backup: path.relative(ROOT, backup) };
}

// Media-day export: just the selection list; resizing happens in a separate script.
async function exportMediaDay({ hero, gallery }) {
  if (!hero) return { ok: false, errors: ["pick one hero photo"] };
  const out = path.join(CACHE, "selection.json");
  await fs.writeFile(out, JSON.stringify({ hero, gallery }, null, 2) + "\n");
  return { ok: true, written: gallery.length + 1, file: path.relative(ROOT, out) };
}

http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, "http://x");
    const p = url.pathname;
    if (p === "/") return serveFrom(path.dirname(fileURLToPath(import.meta.url)), CONFIG.page, res);
    if (p === "/index.json") return serveFrom(CACHE, "index.json", res);
    if (p.startsWith("/thumbs/")) return serveFrom(path.join(CACHE, "thumbs"), p.slice(8), res);
    if (p.startsWith("/full/")) return serveFrom(RAW, p.slice(6), res);
    if (p === "/names") {
      const data = await readJson(MEMBERS);
      const names = data.members
        .map((m) => ({ name: m.name, depts: m.departments, board: m.departments.includes("Executive Board"), current: m.photo }))
        .sort((a, b) => a.name.localeCompare(b.name));
      return send(res, 200, names);
    }
    if (p === "/state" && req.method === "GET") return send(res, 200, await readJson(STATE, {}));
    if (p === "/state" && req.method === "POST") {
      await fs.writeFile(STATE, JSON.stringify(await readBody(req)));
      return send(res, 200, { ok: true });
    }
    if (p === "/export" && req.method === "POST") {
      const body = await readBody(req);
      return send(res, 200, SET === "headshots" ? await exportHeadshots(body) : await exportMediaDay(body));
    }
    send(res, 404, { error: "not found" });
  } catch (e) {
    send(res, 500, { error: String(e) });
  }
}).listen(CONFIG.port, "127.0.0.1", () => console.log(`${SET} tool: http://127.0.0.1:${CONFIG.port}`));
