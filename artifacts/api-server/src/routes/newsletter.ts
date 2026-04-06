import { Router } from "express";
import { db } from "@workspace/db";
import { newsletterSubscribersTable } from "@workspace/db";
import { SubscribeNewsletterBody } from "@workspace/api-zod";

const router = Router();

router.post("/newsletter", async (req, res) => {
  try {
    const parsed = SubscribeNewsletterBody.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ success: false, message: "Invalid email address" });
    }

    const { email } = parsed.data;

    await db
      .insert(newsletterSubscribersTable)
      .values({ email })
      .onConflictDoNothing();

    return res.json({ success: true, message: "Successfully subscribed to updates" });
  } catch (err) {
    req.log.error({ err }, "Failed to subscribe to newsletter");
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
});

export default router;
