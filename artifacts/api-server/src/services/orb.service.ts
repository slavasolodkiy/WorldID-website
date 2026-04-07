import { db } from "@workspace/db";
import { orbLocationsTable, orbHardwareTable } from "@workspace/db";
import { Errors } from "../lib/errors.js";

export async function getOrbInfo() {
  const rows = await db.select().from(orbHardwareTable).limit(1);
  if (rows.length === 0) {
    throw Errors.notFound("Orb hardware data");
  }
  const row = rows[0];
  return {
    version: row.version,
    description: row.description,
    specs: row.specs as { label: string; value: string }[],
    features: row.features as string[],
    privacyApproach: row.privacyApproach,
  };
}

export async function listOrbLocations() {
  return db.select().from(orbLocationsTable);
}
