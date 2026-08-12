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
    timezone: text("timezone"),
    consentVersion: text("consent_version").notNull(),
  },
  (table) => [
    index("idx_analytics_visits_visited_at").on(table.visitedAt),
    index("idx_analytics_visits_visitor_id").on(table.visitorId),
  ],
);
