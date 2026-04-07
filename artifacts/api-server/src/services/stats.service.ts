import { db } from "@workspace/db";
import { globalStatsTable } from "@workspace/db";
import { Errors } from "../lib/errors.js";

export async function getGlobalStats() {
  const rows = await db.select().from(globalStatsTable).limit(1);
  if (rows.length === 0) {
    return {
      verifiedHumans: 0,
      countriesActive: 0,
      ecosystemApps: 0,
      orbsDeployed: 0,
      dailyVerifications: 0,
    };
  }
  const row = rows[0];
  return {
    verifiedHumans: row.verifiedHumans,
    countriesActive: row.countriesActive,
    ecosystemApps: row.ecosystemApps,
    orbsDeployed: row.orbsDeployed,
    dailyVerifications: row.dailyVerifications,
  };
}
