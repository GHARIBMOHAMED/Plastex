import { careerAreas, careerJobs } from "../../../careers/jobs";
import {
  detectCvType,
  extractCapabilityTags,
  extractCvText,
  isAdminAuthorized,
  listApplications,
  saveApplication,
} from "../../../careers/application-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const attempts = new Map<string, { count: number; reset: number }>();
const languageLevels = [
  "Français et anglais professionnels",
  "Français professionnel, anglais intermédiaire",
  "Anglais professionnel, français intermédiaire",
  "Autre niveau",
];

function stringField(data: FormData, key: string, max: number) {
  const value = data.get(key);
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return Response.json({ error: "Invalid origin." }, { status: 403 });
  const length = Number(request.headers.get("content-length") || 0);
  if (length > 6_000_000) return Response.json({ error: "The CV must be under 5 MB." }, { status: 413 });

  const address = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const now = Date.now();
  const recent = attempts.get(address);
  if (recent && recent.reset > now && recent.count >= 5) return Response.json({ error: "Please try again later." }, { status: 429 });
  attempts.set(address, { count: recent && recent.reset > now ? recent.count + 1 : 1, reset: recent && recent.reset > now ? recent.reset : now + 3_600_000 });

  try {
    const data = await request.formData();
    if (stringField(data, "website", 100)) return Response.json({ ok: true });
    const name = stringField(data, "name", 120);
    const email = stringField(data, "email", 200);
    const phone = stringField(data, "phone", 60);
    const area = stringField(data, "area", 80);
    const experience = stringField(data, "experience", 1500);
    const skills = stringField(data, "skills", 1500);
    const availability = stringField(data, "availability", 120);
    const jobId = stringField(data, "jobId", 80) || "general";
    const job = careerJobs.find((item) => item.id === jobId);
    const accountingAnswers = {
      educationLevel: stringField(data, "educationLevel", 80),
      accountingYears: stringField(data, "accountingYears", 80),
      accountingPractice: stringField(data, "accountingPractice", 1200),
      languageLevel: stringField(data, "languageLevel", 120),
      sageOffice: stringField(data, "sageOffice", 1200),
    };
    const logisticsAnswers = {
      logisticsEducation: stringField(data, "logisticsEducation", 80),
      logisticsYears: stringField(data, "logisticsYears", 80),
      logisticsOperations: stringField(data, "logisticsOperations", 1200),
      erpOffice: stringField(data, "erpOffice", 1200),
      languageLevel: stringField(data, "languageLevel", 120),
    };
    const jobAnswers: Record<string, string> = jobId === "comptable-confirme-tanger"
      ? accountingAnswers
      : jobId === "charge-logistique-tanger" ? logisticsAnswers : {};
    const file = data.get("cv");

    if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || phone.length < 6 || !careerAreas.includes(area as typeof careerAreas[number]) || experience.length < 20 || !skills || !availability || (jobId !== "general" && !job) || data.get("consent") !== "yes" || !(file instanceof File)) {
      return Response.json({ error: "Please complete every required field." }, { status: 400 });
    }
    if (jobId === "comptable-confirme-tanger" && (
      !["Bac+4", "Bac+5", "Formation équivalente", "Autre formation"].includes(accountingAnswers.educationLevel) ||
      !["Moins de 3 ans", "3 ans", "4 ans", "Plus de 4 ans"].includes(accountingAnswers.accountingYears) ||
      accountingAnswers.accountingPractice.length < 20 ||
      !languageLevels.includes(accountingAnswers.languageLevel) ||
      accountingAnswers.sageOffice.length < 20
    )) return Response.json({ error: "Please complete the accounting role questions." }, { status: 400 });
    if (jobId === "charge-logistique-tanger" && (
      !["Bac+3", "Bac+4", "Bac+5", "Formation équivalente", "Autre formation"].includes(logisticsAnswers.logisticsEducation) ||
      !["Moins de 2 ans", "2 ans", "3 ans", "4 ans", "Plus de 4 ans"].includes(logisticsAnswers.logisticsYears) ||
      logisticsAnswers.logisticsOperations.length < 20 ||
      logisticsAnswers.erpOffice.length < 20 ||
      !languageLevels.includes(logisticsAnswers.languageLevel)
    )) return Response.json({ error: "Please complete the logistics role questions." }, { status: 400 });
    if (file.size < 100 || file.size > 5_000_000) return Response.json({ error: "Choose a PDF or DOCX under 5 MB." }, { status: 400 });
    const bytes = Buffer.from(await file.arrayBuffer());
    const type = detectCvType(bytes);
    if (!type) return Response.json({ error: "Choose a PDF or DOCX file." }, { status: 400 });
    const cvText = await extractCvText(bytes, type);
    const capabilityTags = extractCapabilityTags(`${cvText}\n${experience}\n${skills}\n${Object.values(jobAnswers).join("\n")}`);
    await saveApplication({
      jobId,
      jobTitle: job?.title || "General application",
      name,
      email,
      phone,
      area,
      experience,
      skills,
      jobAnswers,
      availability,
      cvName: file.name.replace(/[\\/\r\n]/g, " ").slice(0, 150),
      cvType: type,
      cvText,
      capabilityTags,
      extractionStatus: cvText ? "parsed" : "needs-review",
    }, bytes);
    return Response.json({ ok: true }, { status: 201, headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ error: "We could not save the application. Please try again." }, { status: 500 });
  }
}

export async function GET(request: Request) {
  if (!isAdminAuthorized(request.headers.get("authorization"))) return Response.json({ error: "Unauthorized." }, { status: 401 });
  return Response.json({ applications: await listApplications() }, { headers: { "Cache-Control": "no-store" } });
}
