import { createBrief } from "../../../db/briefs";
import { notifyAdminsOfBrief } from "../../../lib/telegram";

const text = (value: unknown, max: number) => typeof value === "string" ? value.trim().slice(0, max) : "";

export async function POST(request: Request) {
  const origin = request.headers.get("origin"); const host = request.headers.get("host");
  if (origin && host && new URL(origin).host !== host) return Response.json({ error: "Forbidden" }, { status: 403 });
  const body = await request.json().catch(() => null) as Record<string, unknown> | null;
  if (!body) return Response.json({ error: "Invalid request" }, { status: 400 });
  const brief = { name: text(body.name, 100), email: text(body.email, 160), company: text(body.company, 140) || null, topic: text(body.topic, 80), details: text(body.details, 3000) };
  if (!brief.name || !brief.email.includes("@") || !brief.topic || brief.details.length < 10) return Response.json({ error: "Invalid brief" }, { status: 400 });
  const saved = await createBrief(brief);
  await notifyAdminsOfBrief(brief).catch(() => undefined);
  return Response.json({ ok: true, id: saved.id });
}
