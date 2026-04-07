import { db } from "@workspace/db";
import { teamMembersTable } from "@workspace/db";

export async function listTeamMembers() {
  return db.select().from(teamMembersTable);
}
