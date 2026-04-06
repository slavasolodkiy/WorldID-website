import { pgTable, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const globalStatsTable = pgTable("global_stats", {
  id: serial("id").primaryKey(),
  verifiedHumans: integer("verified_humans").notNull().default(0),
  countriesActive: integer("countries_active").notNull().default(0),
  ecosystemApps: integer("ecosystem_apps").notNull().default(0),
  orbsDeployed: integer("orbs_deployed").notNull().default(0),
  dailyVerifications: integer("daily_verifications").notNull().default(0),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertGlobalStatsSchema = createInsertSchema(globalStatsTable).omit({ id: true, updatedAt: true });
export type InsertGlobalStats = z.infer<typeof insertGlobalStatsSchema>;
export type GlobalStats = typeof globalStatsTable.$inferSelect;
