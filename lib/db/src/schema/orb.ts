import { pgTable, text, serial, boolean, doublePrecision, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const orbLocationsTable = pgTable("orb_locations", {
  id: text("id").primaryKey(),
  city: text("city").notNull(),
  country: text("country").notNull(),
  countryCode: text("country_code").notNull(),
  lat: doublePrecision("lat").notNull(),
  lng: doublePrecision("lng").notNull(),
  active: boolean("active").notNull().default(true),
});

export const insertOrbLocationSchema = createInsertSchema(orbLocationsTable);
export type InsertOrbLocation = z.infer<typeof insertOrbLocationSchema>;
export type OrbLocation = typeof orbLocationsTable.$inferSelect;

export const orbHardwareTable = pgTable("orb_hardware", {
  id: serial("id").primaryKey(),
  version: text("version").notNull(),
  description: text("description").notNull(),
  privacyApproach: text("privacy_approach").notNull(),
  specs: jsonb("specs").notNull().$type<{ label: string; value: string }[]>(),
  features: jsonb("features").notNull().$type<string[]>(),
});

export const insertOrbHardwareSchema = createInsertSchema(orbHardwareTable).omit({ id: true });
export type InsertOrbHardware = z.infer<typeof insertOrbHardwareSchema>;
export type OrbHardware = typeof orbHardwareTable.$inferSelect;
