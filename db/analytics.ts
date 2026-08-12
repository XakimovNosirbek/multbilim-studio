import { env } from "cloudflare:workers";

export type AnonymousVisit = {
  visitorId: string;
  path: string;
  referrerOrigin: string | null;
  language: string | null;
  deviceType: string | null;
  devicePlatform: string | null;
  timezone: string | null;
  consentVersion: string;
};

const THIRTEEN_MONTHS_MS = 13 * 30 * 24 * 60 * 60 * 1000;

export async function recordAnonymousVisit(visit: AnonymousVisit) {
  if (!env.DB) throw new Error("Analytics database binding is unavailable");

  const now = Date.now();
  const removeExpired = env.DB
    .prepare("DELETE FROM analytics_visits WHERE visited_at < ?")
    .bind(now - THIRTEEN_MONTHS_MS);
  const insertVisit = env.DB
    .prepare(
      `INSERT INTO analytics_visits
        (id, visitor_id, visited_at, path, referrer_origin, language, device_type, device_platform, timezone, consent_version)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .bind(
      crypto.randomUUID(),
      visit.visitorId,
      now,
      visit.path,
      visit.referrerOrigin,
      visit.language,
      visit.deviceType,
      visit.devicePlatform,
      visit.timezone,
      visit.consentVersion,
    );

  await env.DB.batch([removeExpired, insertVisit]);
}
