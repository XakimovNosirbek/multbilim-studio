import { handleTelegramUpdate, telegramWebhookSecret } from "../../../../lib/telegram";

export async function POST(request: Request) {
  const secret = telegramWebhookSecret();
  if (!secret || request.headers.get("x-telegram-bot-api-secret-token") !== secret) return new Response("Forbidden", { status: 403 });
  const update = await request.json().catch(() => null);
  if (update) await handleTelegramUpdate(update);
  return Response.json({ ok: true });
}
