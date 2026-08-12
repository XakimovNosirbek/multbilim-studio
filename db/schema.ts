import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const analyticsVisits = sqliteTable(
  "analytics_visits",
  {
    id: text("id").primaryKey(),
    visitorId: text("visitor_id").notNull(),
    visitedAt: integer("visited_at").notNull(),
    path: text("path").notNull(),
    referrerOrigin: text("referrer_origin"),
    language: text("language"),
    deviceType: text("device_type"),
    devicePlatform: text("device_platform"),
    timezone: text("timezone"),
    consentVersion: text("consent_version").notNull(),
  },
  (table) => [
    index("idx_analytics_visits_visited_at").on(table.visitedAt),
    index("idx_analytics_visits_visitor_id").on(table.visitorId),
  ],
);

export const contactBriefs = sqliteTable(
  "contact_briefs",
  {
    id: text("id").primaryKey(),
    createdAt: integer("created_at").notNull(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    company: text("company"),
    topic: text("topic").notNull(),
    details: text("details").notNull(),
    status: text("status").notNull().default("new"),
  },
  (table) => [
    index("idx_contact_briefs_created_at").on(table.createdAt),
    index("idx_contact_briefs_status").on(table.status),
  ],
);
