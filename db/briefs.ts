import { env } from "cloudflare:workers";

export type BriefInput = { name: string; email: string; company: string | null; topic: string; details: string };

export async function createBrief(input: BriefInput) {
  if (!env.DB) throw new Error("Database binding is unavailable");
  const brief = { id: crypto.randomUUID(), createdAt: Date.now(), ...input };
  await env.DB.prepare(
    `INSERT INTO contact_briefs (id, created_at, name, email, company, topic, details, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, 'new')`,
  ).bind(brief.id, brief.createdAt, brief.name, brief.email, brief.company, brief.topic, brief.details).run();
  return brief;
}

export async function getBriefSummary(limit = 5) {
  if (!env.DB) throw new Error("Database binding is unavailable");
  const [counts, recent] = await Promise.all([
    env.DB.prepare(`SELECT COUNT(*) AS total, SUM(CASE WHEN status = 'new' THEN 1 ELSE 0 END) AS unread FROM contact_briefs`).first<{ total: number; unread: number }>(),
    env.DB.prepare(`SELECT id, created_at, name, email, company, topic, details, status FROM contact_briefs ORDER BY created_at DESC LIMIT ?`).bind(limit).all<Record<string, string | number | null>>(),
  ]);
  return { total: Number(counts?.total) || 0, unread: Number(counts?.unread) || 0, recent: recent.results };
}
