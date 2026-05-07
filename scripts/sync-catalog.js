#!/usr/bin/env node
// Keeps data/catalog.csv as a SNAPSHOT (one row per product).
//
// Modes:
//   1. Hook mode (default): reads {tool_name, tool_input:{file_path}} from stdin (Claude Code PostToolUse).
//      For a touched product JSON: replace the existing row in place, or append if the slug is new.
//      Preserves the original `Date Added` on updates.
//   2. CLI mode: `node sync-catalog.js <path/to/product.json>`  — same effect, no stdin.
//   3. Rebuild mode: `node sync-catalog.js --rebuild`            — regenerates the CSV from all JSON files.
//                                                                    Preserves Date Added per slug if already known.

const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..");
const PRODUCTS_DIR = path.join(ROOT, "data", "products");
const CSV = path.join(ROOT, "data", "catalog.csv");
const HEADERS = [
  "Slug", "Name", "Category", "Description", "Fabric",
  "Customizations", "Turnaround", "Featured", "Photo Folder", "Date Added",
];
const HEADER_LINE = HEADERS.join(",") + "\n";

function csvEscape(value) {
  const s = String(value ?? "");
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function csvRow(fields) {
  return fields.map(csvEscape).join(",") + "\n";
}

// Minimal RFC 4180 parser — handles quoted fields, embedded commas, and "" escape.
function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++; continue; }
      if (c === '"') { inQuotes = false; continue; }
      field += c;
    } else {
      if (c === '"' && field === "") { inQuotes = true; continue; }
      if (c === ",") { row.push(field); field = ""; continue; }
      if (c === "\n") { row.push(field); rows.push(row); row = []; field = ""; continue; }
      if (c === "\r") continue;
      field += c;
    }
  }
  if (field !== "" || row.length > 0) { row.push(field); rows.push(row); }
  return rows.filter((r) => r.some((f) => f !== ""));
}

function isProductJson(filePath) {
  const norm = filePath.replace(/\\/g, "/");
  return /\/data\/products\/[^/]+\.json$/.test(norm);
}

function buildFields(product, dateAdded) {
  const photoFolder = product.images?.[0]
    ? path.dirname(product.images[0]).replace(/^\/+/, "")
    : "";
  return [
    product.id,
    product.name ?? "",
    product.category ?? "",
    product.description ?? "",
    product.fabricNotes ?? "",
    (product.customizations ?? []).join("; "),
    product.turnaroundDays ?? "",
    product.featured ? "Yes" : "No",
    photoFolder,
    dateAdded,
  ];
}

function readCsvSnapshot() {
  if (!fs.existsSync(CSV)) return { header: HEADERS, rows: [] };
  const all = parseCsv(fs.readFileSync(CSV, "utf8"));
  if (all.length === 0) return { header: HEADERS, rows: [] };
  const [header, ...rows] = all;
  return { header, rows };
}

function writeCsv(rows) {
  fs.mkdirSync(path.dirname(CSV), { recursive: true });
  const body = rows.map((r) => csvRow(r)).join("");
  fs.writeFileSync(CSV, HEADER_LINE + body);
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function upsert(jsonPath) {
  if (!fs.existsSync(jsonPath)) return;
  const product = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
  if (!product?.id) return;

  const { rows } = readCsvSnapshot();
  const idx = rows.findIndex((r) => r[0] === product.id);
  const dateAdded = idx >= 0 ? rows[idx][9] || today() : today();
  const fields = buildFields(product, dateAdded);

  if (idx >= 0) rows[idx] = fields;
  else rows.push(fields);

  rows.sort((a, b) => a[0].localeCompare(b[0]));
  writeCsv(rows);
}

function rebuild() {
  const existingDates = new Map();
  if (fs.existsSync(CSV)) {
    for (const r of readCsvSnapshot().rows) {
      if (r[0] && r[9]) existingDates.set(r[0], r[9]);
    }
  }

  if (!fs.existsSync(PRODUCTS_DIR)) {
    writeCsv([]);
    return;
  }

  const files = fs.readdirSync(PRODUCTS_DIR).filter((f) => f.endsWith(".json")).sort();
  const rows = [];
  for (const f of files) {
    try {
      const product = JSON.parse(fs.readFileSync(path.join(PRODUCTS_DIR, f), "utf8"));
      if (!product?.id) continue;
      const dateAdded = existingDates.get(product.id) || today();
      rows.push(buildFields(product, dateAdded));
    } catch (err) {
      process.stderr.write(`sync-catalog: skipped ${f} (${err.message})\n`);
    }
  }
  writeCsv(rows);
}

async function readStdin() {
  if (process.stdin.isTTY) return "";
  let data = "";
  for await (const chunk of process.stdin) data += chunk;
  return data;
}

(async function main() {
  if (process.argv.includes("--rebuild")) {
    rebuild();
    return;
  }

  // CLI mode: explicit path argument
  const arg = process.argv[2];
  if (arg && !arg.startsWith("--")) {
    const target = path.resolve(arg);
    if (isProductJson(target)) upsert(target);
    return;
  }

  // Hook mode
  const raw = await readStdin();
  if (!raw.trim()) return;

  let payload;
  try { payload = JSON.parse(raw); } catch { return; }

  const tool = payload.tool_name;
  if (!["Write", "Edit", "MultiEdit", "NotebookEdit"].includes(tool)) return;

  const fp = payload.tool_input?.file_path;
  if (!fp || !isProductJson(fp)) return;

  upsert(fp);
})().catch((err) => {
  process.stderr.write(`sync-catalog: ${err.message}\n`);
});
