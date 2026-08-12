import { env } from "cloudflare:workers";
import { getAnalyticsDashboard } from "../db/analytics-dashboard";
import { getBriefSummary, markAllBriefsRead } from "../db/briefs";

type RuntimeEnv = typeof env & { TELEGRAM_BOT_TOKEN?: string; TELEGRAM_ADMIN_IDS?: string; TELEGRAM_WEBHOOK_SECRET?: string; PUBLIC_SITE_URL?: string };
type TelegramUpdate = { message?: { text?: string; chat: { id: number }; from?: { id: number } }; callback_query?: { id: string; data?: string; from: { id: number }; message?: { chat: { id: number } } } };

const runtime = () => env as RuntimeEnv;
const allowedIds = () => new Set((runtime().TELEGRAM_ADMIN_IDS ?? "").split(",").map((id) => id.trim()).filter(Boolean));
export const telegramConfigured = () => Boolean(runtime().TELEGRAM_BOT_TOKEN && allowedIds().size);
export const telegramWebhookSecret = () => runtime().TELEGRAM_WEBHOOK_SECRET ?? "";
export const isTelegramAdmin = (id: number) => allowedIds().has(String(id));

async function api(method: string, body: Record<string, unknown>) {
  const token = runtime().TELEGRAM_BOT_TOKEN;
  if (!token) throw new Error("Telegram is not configured");
  const response = await fetch(`https://api.telegram.org/bot${token}/${method}`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
  if (!response.ok) throw new Error(`Telegram ${method} failed`);
  return response.json();
}

const keyboard = () => ({ inline_keyboard: [
  [{ text: "📊 Bugun", callback_data: "today" }, { text: "📈 7 kun", callback_data: "week" }, { text: "🗓 30 kun", callback_data: "month" }],
  [{ text: "🎬 Sahifalar", callback_data: "pages" }, { text: "📱 Qurilmalar", callback_data: "devices" }],
  [{ text: "✉️ Brieflar", callback_data: "briefs" }, { text: "✅ Yangi deb belgilashni tugatish", callback_data: "briefs_read" }],
  [{ text: "🟢 Sayt holati", callback_data: "status" }],
  [{ text: "📊 Admin Dashboard", web_app: { url: `${runtime().PUBLIC_SITE_URL ?? "https://multbilim-studio-demo.nosirbekxakimov01.chatgpt.site"}/telegram` } }],
  [{ text: "🌐 MultBilim Website", web_app: { url: runtime().PUBLIC_SITE_URL ?? "https://multbilim-studio-demo.nosirbekxakimov01.chatgpt.site" } }],
] });

function n(value: number) { return new Intl.NumberFormat("uz-UZ", { maximumFractionDigits: 1 }).format(value); }
function escape(value: unknown) { return String(value ?? "—").replace(/[&<>]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[char]!); }

async function report(command: string) {
  if (command === "briefs_read") {
    const changed = await markAllBriefsRead();
    return `✅ <b>Brief holati yangilandi</b>\n\n${changed ? `${changed} ta brief o‘qilgan deb belgilandi.` : "Yangi brief qolmagan."}`;
  }
  if (command === "status") return `🟢 <b>MultBilim sayti ishlayapti</b>\n\n🌐 ${escape(runtime().PUBLIC_SITE_URL ?? "Public demo")}\n🕒 ${new Intl.DateTimeFormat("uz-UZ", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Tashkent" }).format(new Date())}`;
  if (command === "briefs") {
    const briefs = await getBriefSummary();
    const lines = briefs.recent.map((item, index) => `${index + 1}. <b>${escape(item.topic)}</b> — ${escape(item.name)}\n   ${escape(item.company || item.email)}`);
    return `✉️ <b>Loyiha brieflari</b>\n\n🆕 Yangi: <b>${briefs.unread}</b>\n📚 Jami: <b>${briefs.total}</b>\n\n${lines.join("\n\n") || "Hozircha brief yo‘q."}`;
  }
  const days = command === "today" ? 1 : command === "week" ? 7 : 30;
  const data = await getAnalyticsDashboard(days);
  if (command === "pages") return `🎬 <b>Eng ko‘p ochilgan sahifalar — 30 kun</b>\n\n${data.pages.map((item, i) => `${i + 1}. ${escape(item.label)} — <b>${n(item.count)}</b> (${item.percentage}%)`).join("\n") || "Ma’lumot yo‘q."}`;
  if (command === "devices") return `📱 <b>Qurilmalar — 30 kun</b>\n\n${data.devices.map((item) => `${escape(item.label)} — <b>${n(item.count)}</b> (${item.percentage}%)`).join("\n") || "Ma’lumot yo‘q."}`;
  const title = days === 1 ? "Bugungi hisobot" : `${days} kunlik hisobot`;
  return `📊 <b>${title}</b>\n\n👁 Ko‘rishlar: <b>${n(data.totals.visits)}</b>\n👤 Tashrifchilar: <b>${n(data.totals.visitors)}</b>\n📄 Sahifa / tashrifchi: <b>${n(data.totals.pagesPerVisitor)}</b>\n\n🏆 Eng ommabop: ${escape(data.pages[0]?.label ?? "—")}`;
}

export async function sendTelegramMessage(chatId: number | string, text: string) { return api("sendMessage", { chat_id: chatId, text, parse_mode: "HTML", disable_web_page_preview: true, reply_markup: keyboard() }); }

export async function notifyAdminsOfBrief(brief: { name: string; email: string; company: string | null; topic: string; details: string }) {
  if (!telegramConfigured()) return;
  const text = `🔔 <b>Yangi loyiha briefi</b>\n\n👤 ${escape(brief.name)}\n🏢 ${escape(brief.company)}\n📧 ${escape(brief.email)}\n🎯 <b>${escape(brief.topic)}</b>\n\n${escape(brief.details.slice(0, 1200))}`;
  await Promise.all([...allowedIds()].map((id) => sendTelegramMessage(id, text)));
}

export async function handleTelegramUpdate(update: TelegramUpdate) {
  const actorId = update.callback_query?.from.id ?? update.message?.from?.id;
  const chatId = update.callback_query?.message?.chat.id ?? update.message?.chat.id;
  if (!actorId || !chatId) return;
  if (!isTelegramAdmin(actorId)) return;
  const raw = update.callback_query?.data ?? update.message?.text?.replace(/^\//, "").split("@")[0] ?? "start";
  const command = ["today", "week", "month", "pages", "devices", "briefs", "briefs_read", "status"].includes(raw) ? raw : "start";
  if (update.callback_query) await api("answerCallbackQuery", { callback_query_id: update.callback_query.id });
  const text = command === "start" ? "👋 <b>MultBilim Studio boshqaruv markazi</b>\n\nKerakli hisobotni tanlang. Ma’lumotlar faqat ruxsat berilgan administratorlarga ko‘rsatiladi." : await report(command);
  await sendTelegramMessage(chatId, text);
}
