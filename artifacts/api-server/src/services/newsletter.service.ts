import { db } from "@workspace/db";
import { newsletterSubscribersTable } from "@workspace/db";
import { Errors } from "../lib/errors.js";

export async function subscribeToNewsletter(email: string) {
  const existing = await db
    .select()
    .from(newsletterSubscribersTable)
    .limit(1);

  await db
    .insert(newsletterSubscribersTable)
    .values({ email })
    .onConflictDoNothing();

  return { success: true, message: "Successfully subscribed to updates" };
}
