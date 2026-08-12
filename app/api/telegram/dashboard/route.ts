import { env } from "cloudflare:workers";
import { getAnalyticsDashboard } from "../../../../db/analytics-dashboard";
import { getBriefSummary } from "../../../../db/briefs";

type RuntimeEnv = typeof env & { TELEGRAM_BOT_TOKEN?: string; TELEGRAM_ADMIN_IDS?: string };

function bytesToHex(bytes: ArrayBuffer) {
  return [...new Uint8Array(bytes)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function secureEqual(left: string, right: string) {
  if (left.length !== right.length) return false;
  let difference = 0;
  for (let index = 0; index < left.length; index += 1) difference |= left.charCodeAt(index) ^ right.charCodeAt(index);
  return difference === 0;
}

async function validateInitData(initData: string) {
  const runtime = env as RuntimeEnv;
  if (!runtime.TELEGRAM_BOT_TOKEN) return null;
  const params = new URLSearchParams(initData);
  const receivedHash = params.get("hash") ?? "";
  const authDate = Number(params.get("auth_date"));
  if (!receivedHash || !authDate || Math.abs(Date.now() / 1000 - authDate) > 3600) return null;
  params.delete("hash"); params.delete("signature");
  const dataCheckString = [...params.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([key, value]) => `${key}=${value}`).join("\n");
  const encoder = new TextEncoder();
  const webAppKey = await crypto.subtle.importKey("raw", encoder.encode("WebAppData"), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const secretKey = await crypto.subtle.sign("HMAC", webAppKey, encoder.encode(runtime.TELEGRAM_BOT_TOKEN));
  const dataKey = await crypto.subtle.importKey("raw", secretKey, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const calculatedHash = bytesToHex(await crypto.subtle.sign("HMAC", dataKey, encoder.encode(dataCheckString)));
  if (!secureEqual(calculatedHash, receivedHash)) return null;
  const user = JSON.parse(params.get("user") ?? "null") as { id?: number; first_name?: string; last_name?: string; username?: string } | null;
  const allowed = new Set((runtime.TELEGRAM_ADMIN_IDS ?? "").split(",").map((value) => value.trim()).filter(Boolean));
  return user?.id && allowed.has(String(user.id)) ? user : null;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as { initData?: string; days?: number } | null;
  if (!body?.initData) return Response.json({ error: "Telegram orqali oching" }, { status: 401 });
  const user = await validateInitData(body.initData);
  if (!user) return Response.json({ error: "Ruxsat berilmagan" }, { status: 403 });
  const days = body.days === 1 || body.days === 7 ? body.days : 30;
  const [analytics, briefs] = await Promise.all([getAnalyticsDashboard(days), getBriefSummary(6)]);
  return Response.json({ user, analytics, briefs });
}
