import { pgTable, text, serial, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const ecosystemAppsTable = pgTable("ecosystem_apps", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  logoUrl: text("logo_url"),
  websiteUrl: text("website_url"),
  worldIdEnabled: boolean("world_id_enabled").notNull().default(true),
  featured: boolean("featured").notNull().default(false),
});

export const insertEcosystemAppSchema = createInsertSchema(ecosystemAppsTable);
export type InsertEcosystemApp = z.infer<typeof insertEcosystemAppSchema>;
export type EcosystemApp = typeof ecosystemAppsTable.$inferSelect;
