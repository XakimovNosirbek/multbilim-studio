import { env } from "cloudflare:workers";

type TotalRow = {
  visits: number;
  visitors: number;
};

type DailyRow = {
  day: string;
  visits: number;
  visitors: number;
};

type LabelCountRow = {
  label: string | null;
  count: number;
};

type RecentVisitRow = {
  id: string;
  visited_at: number;
  path: string;
  referrer_origin: string | null;
  language: string | null;
  device_type: string | null;
  timezone: string | null;
};

export type AnalyticsDashboard = {
  generatedAt: number;
  totals: {
    visits: number;
    visitors: number;
    todayVisits: number;
    todayVisitors: number;
    pagesPerVisitor: number;
    visitTrend: number | null;
    visitorTrend: number | null;
  };
  daily: Array<{ day: string; visits: number; visitors: number }>;
  pages: Array<{ label: string; count: number; percentage: number }>;
  devices: Array<{ label: string; count: number; percentage: number }>;
  sources: Array<{ label: string; count: number; percentage: number }>;
  languages: Array<{ label: string; count: number; percentage: number }>;
  recent: Array<{
    id: string;
    visitedAt: number;
    path: string;
    source: string;
    language: string;
    device: string;
    timezone: string;
  }>;
};

const DAY_MS = 24 * 60 * 60 * 1000;
const TASHKENT_OFFSET_MS = 5 * 60 * 60 * 1000;

function percentChange(current: number, previous: number) {
  if (previous === 0) return current === 0 ? 0 : null;
  return Math.round(((current - previous) / previous) * 100);
}

function startOfTashkentDay(timestamp: number) {
  return Math.floor((timestamp + TASHKENT_OFFSET_MS) / DAY_MS) * DAY_MS - TASHKENT_OFFSET_MS;
}

function asBreakdown(rows: LabelCountRow[], total: number, fallback: string) {
  return rows.map((row) => ({
    label: row.label?.trim() || fallback,
    count: Number(row.count) || 0,
    percentage: total > 0 ? Math.round(((Number(row.count) || 0) / total) * 100) : 0,
  }));
}

function fillDailySeries(rows: DailyRow[], days: number, now: number) {
  const found = new Map(rows.map((row) => [row.day, row]));
  const start = startOfTashkentDay(now) - (days - 1) * DAY_MS;

  return Array.from({ length: days }, (_, index) => {
    const timestamp = start + index * DAY_MS;
    const day = new Date(timestamp + TASHKENT_OFFSET_MS).toISOString().slice(0, 10);
    const row = found.get(day);
    return {
      day,
      visits: Number(row?.visits) || 0,
      visitors: Number(row?.visitors) || 0,
    };
  });
}

export async function getAnalyticsDashboard(days = 30): Promise<AnalyticsDashboard> {
  if (!env.DB) throw new Error("Analytics database binding is unavailable");

  const now = Date.now();
  const periodStart = now - days * DAY_MS;
  const previousStart = periodStart - days * DAY_MS;
  const todayStart = startOfTashkentDay(now);

  const [
    current,
    previous,
    today,
    dailyResult,
    pagesResult,
    devicesResult,
    sourcesResult,
    languagesResult,
    recentResult,
  ] = await Promise.all([
    env.DB.prepare(
      "SELECT COUNT(*) AS visits, COUNT(DISTINCT visitor_id) AS visitors FROM analytics_visits WHERE visited_at >= ?",
    ).bind(periodStart).first<TotalRow>(),
    env.DB.prepare(
      "SELECT COUNT(*) AS visits, COUNT(DISTINCT visitor_id) AS visitors FROM analytics_visits WHERE visited_at >= ? AND visited_at < ?",
    ).bind(previousStart, periodStart).first<TotalRow>(),
    env.DB.prepare(
      "SELECT COUNT(*) AS visits, COUNT(DISTINCT visitor_id) AS visitors FROM analytics_visits WHERE visited_at >= ?",
    ).bind(todayStart).first<TotalRow>(),
    env.DB.prepare(
      `SELECT strftime('%Y-%m-%d', (visited_at + 18000000) / 1000, 'unixepoch') AS day,
              COUNT(*) AS visits,
              COUNT(DISTINCT visitor_id) AS visitors
       FROM analytics_visits
       WHERE visited_at >= ?
       GROUP BY day
       ORDER BY day ASC`,
    ).bind(periodStart).all<DailyRow>(),
    env.DB.prepare(
      `SELECT path AS label, COUNT(*) AS count
       FROM analytics_visits
       WHERE visited_at >= ?
       GROUP BY path
       ORDER BY count DESC
       LIMIT 8`,
    ).bind(periodStart).all<LabelCountRow>(),
    env.DB.prepare(
      `SELECT device_type AS label, COUNT(*) AS count
       FROM analytics_visits
       WHERE visited_at >= ?
       GROUP BY device_type
       ORDER BY count DESC`,
    ).bind(periodStart).all<LabelCountRow>(),
    env.DB.prepare(
      `SELECT referrer_origin AS label, COUNT(*) AS count
       FROM analytics_visits
       WHERE visited_at >= ?
       GROUP BY referrer_origin
       ORDER BY count DESC
       LIMIT 8`,
    ).bind(periodStart).all<LabelCountRow>(),
    env.DB.prepare(
      `SELECT language AS label, COUNT(*) AS count
       FROM analytics_visits
       WHERE visited_at >= ?
       GROUP BY language
       ORDER BY count DESC
       LIMIT 8`,
    ).bind(periodStart).all<LabelCountRow>(),
    env.DB.prepare(
      `SELECT id, visited_at, path, referrer_origin, language, device_type, timezone
       FROM analytics_visits
       ORDER BY visited_at DESC
       LIMIT 12`,
    ).all<RecentVisitRow>(),
  ]);

  const currentVisits = Number(current?.visits) || 0;
  const currentVisitors = Number(current?.visitors) || 0;
  const previousVisits = Number(previous?.visits) || 0;
  const previousVisitors = Number(previous?.visitors) || 0;

  return {
    generatedAt: now,
    totals: {
      visits: currentVisits,
      visitors: currentVisitors,
      todayVisits: Number(today?.visits) || 0,
      todayVisitors: Number(today?.visitors) || 0,
      pagesPerVisitor: currentVisitors > 0 ? currentVisits / currentVisitors : 0,
      visitTrend: percentChange(currentVisits, previousVisits),
      visitorTrend: percentChange(currentVisitors, previousVisitors),
    },
    daily: fillDailySeries(dailyResult.results, days, now),
    pages: asBreakdown(pagesResult.results, currentVisits, "Noma’lum sahifa"),
    devices: asBreakdown(devicesResult.results, currentVisits, "Noma’lum qurilma"),
    sources: asBreakdown(sourcesResult.results, currentVisits, "To‘g‘ridan-to‘g‘ri"),
    languages: asBreakdown(languagesResult.results, currentVisits, "Noma’lum til"),
    recent: recentResult.results.map((row) => ({
      id: row.id,
      visitedAt: Number(row.visited_at),
      path: row.path,
      source: row.referrer_origin?.trim() || "To‘g‘ridan-to‘g‘ri",
      language: row.language?.trim() || "—",
      device: row.device_type?.trim() || "unknown",
      timezone: row.timezone?.trim() || "—",
    })),
  };
}
