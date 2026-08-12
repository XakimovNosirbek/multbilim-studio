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

type TelegramUser = { id?: number; first_name?: string; last_name?: string; username?: string };
type ValidationResult = { user: TelegramUser | null; error: string | null };

async function validateInitData(initData: string): Promise<ValidationResult> {
  const runtime = env as RuntimeEnv;
  if (!runtime.TELEGRAM_BOT_TOKEN) return { user: null, error: "Telegram sozlamalari topilmadi" };
  const params = new URLSearchParams(initData);
  const receivedHash = params.get("hash") ?? "";
  const authDate = Number(params.get("auth_date"));
  if (!receivedHash || !authDate) return { user: null, error: "Telegram sessiyasi noto‘g‘ri" };
  if (Math.abs(Date.now() / 1000 - authDate) > 3600) return { user: null, error: "Telegram sessiyasi eskirgan. Mini App’ni qayta oching." };
  params.delete("hash");
  const dataCheckString = [...params.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([key, value]) => `${key}=${value}`).join("\n");
  const encoder = new TextEncoder();
  const webAppKey = await crypto.subtle.importKey("raw", encoder.encode("WebAppData"), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const secretKey = await crypto.subtle.sign("HMAC", webAppKey, encoder.encode(runtime.TELEGRAM_BOT_TOKEN));
  const dataKey = await crypto.subtle.importKey("raw", secretKey, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const calculatedHash = bytesToHex(await crypto.subtle.sign("HMAC", dataKey, encoder.encode(dataCheckString)));
  if (!secureEqual(calculatedHash, receivedHash)) return { user: null, error: "Telegram imzosi tasdiqlanmadi. Botdagi tugmadan qayta oching." };
  let user: TelegramUser | null = null;
  try {
    user = JSON.parse(params.get("user") ?? "null") as TelegramUser | null;
  } catch {
    return { user: null, error: "Telegram foydalanuvchisi aniqlanmadi" };
  }
  if (!user?.id) return { user: null, error: "Telegram foydalanuvchisi aniqlanmadi" };
  const allowed = new Set((runtime.TELEGRAM_ADMIN_IDS ?? "").split(",").map((value) => value.trim()).filter(Boolean));
  if (!allowed.has(String(user.id))) return { user: null, error: "Bu Telegram akkauntiga administrator ruxsati berilmagan" };
  return { user, error: null };
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as { initData?: string; days?: number } | null;
  if (!body?.initData) return Response.json({ error: "Telegram orqali oching" }, { status: 401 });
  const validation = await validateInitData(body.initData);
  if (!validation.user) return Response.json({ error: validation.error ?? "Ruxsat berilmagan" }, { status: 403 });
  const days = body.days === 1 || body.days === 7 ? body.days : 30;
  const [analytics, briefs] = await Promise.all([getAnalyticsDashboard(days), getBriefSummary(6)]);
  return Response.json({ user: validation.user, analytics, briefs });
}
