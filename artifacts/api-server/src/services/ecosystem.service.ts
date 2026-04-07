import { db } from "@workspace/db";
import { ecosystemAppsTable } from "@workspace/db";

export async function listEcosystemApps() {
  return db.select().from(ecosystemAppsTable);
}
