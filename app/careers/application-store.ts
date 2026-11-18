import "server-only";

import { randomUUID, timingSafeEqual } from "node:crypto";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { PDFParse } from "pdf-parse";
import mammoth from "mammoth";
import type { ApplicationRecord } from "./application-types";

const root = path.join(process.cwd(), ".local-applications");

const capabilityTerms: Record<string, RegExp> = {
  "CNC / machining": /\b(cnc|machining|usinage|turning|milling|tournage|fraisage)\b/i,
  "Quality inspection": /\b(quality|qualit[eé]|inspection|metrology|m[eé]trologie|calibration)\b/i,
  "Brake components": /\b(brake|frein|rotor|disc|disque|drum|tambour|pad|plaquette)\b/i,
  "Clutch / friction": /\b(clutch|embrayage|friction|lining|garniture)\b/i,
  "Logistics": /\b(logistics|logistique|warehouse|entrep[oô]t|shipping|exp[eé]dition)\b/i,
  "Maintenance": /\b(maintenance|m[eé]canique|mechanical|electrical|[eé]lectrique)\b/i,
  "Accounting / finance": /\b(accounting|accountant|comptabilit[eé]|comptable|finance|financi[eè]re)\b/i,
  "SAGE": /\bsage\b/i,
  "Excel / Office": /\b(excel|microsoft office|pack office|powerpoint)\b/i,
  "Moroccan accounting": /\b(comptabilit[eé] marocaine|moroccan accounting)\b/i,
  "Anglo-Saxon standards": /\b(anglo[- ]saxon|ifrs|uk gaap|us gaap)\b/i,
  "Import / export": /\b(import|export|douane|customs)\b/i,
  "Transport": /\b(transport|freight|shipping|exp[eé]dition)\b/i,
  "Stock management": /\b(stock|stocks|inventory|inventaire|warehouse|entrep[oô]t)\b/i,
  "ERP": /\b(erp|sap|odoo|oracle|sage x3)\b/i,
};

export function isAdminAuthorized(authHeader: string | null) {
  const configured = process.env.RECRUITMENT_ADMIN_TOKEN;
  const token = authHeader?.replace(/^Bearer\s+/i, "");
  if (!configured || !token) return false;
  const left = Buffer.from(configured);
  const right = Buffer.from(token);
  return left.length === right.length && timingSafeEqual(left, right);
}

export function detectCvType(bytes: Buffer): "pdf" | "docx" | null {
  if (bytes.subarray(0, 5).toString("ascii") === "%PDF-") return "pdf";
  if (bytes.subarray(0, 4).toString("hex") === "504b0304") return "docx";
  return null;
}

export async function extractCvText(bytes: Buffer, type: "pdf" | "docx") {
  try {
    if (type === "docx") {
      const result = await mammoth.extractRawText({ buffer: bytes });
      return result.value.slice(0, 50000).trim();
    }
    const parser = new PDFParse({ data: new Uint8Array(bytes) });
    try {
      const result = await parser.getText();
      return result.text.slice(0, 50000).trim();
    } finally {
      await parser.destroy();
    }
  } catch {
    return "";
  }
}

export function extractCapabilityTags(text: string) {
  return Object.entries(capabilityTerms)
    .filter(([, pattern]) => pattern.test(text))
    .map(([name]) => name);
}

export async function saveApplication(record: Omit<ApplicationRecord, "id" | "submittedAt">, cv: Buffer) {
  const id = randomUUID();
  const folder = path.join(root, id);
  await mkdir(folder, { recursive: true });
  const complete: ApplicationRecord = { ...record, id, submittedAt: new Date().toISOString() };
  await writeFile(path.join(folder, `cv.${record.cvType}`), cv, { flag: "wx", mode: 0o600 });
  await writeFile(path.join(folder, "record.json"), JSON.stringify(complete), { flag: "wx", mode: 0o600 });
  return id;
}

export async function listApplications() {
  await mkdir(root, { recursive: true });
  const folders = await readdir(root, { withFileTypes: true });
  const records = await Promise.all(folders.filter((entry) => entry.isDirectory() && /^[0-9a-f-]{36}$/.test(entry.name)).map(async (entry) => {
    try {
      return JSON.parse(await readFile(path.join(root, entry.name, "record.json"), "utf8")) as ApplicationRecord;
    } catch {
      return null;
    }
  }));
  return records.filter((record): record is ApplicationRecord => record !== null).sort((a, b) => b.submittedAt.localeCompare(a.submittedAt));
}

export async function loadApplicationCv(id: string, type: "pdf" | "docx") {
  if (!/^[0-9a-f-]{36}$/.test(id)) return null;
  try {
    return await readFile(path.join(root, id, `cv.${type}`));
  } catch {
    return null;
  }
}
