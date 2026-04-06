import { pgTable, text, serial, boolean, doublePrecision } from "drizzle-orm/pg-core";
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
