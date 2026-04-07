import { Router } from "express";
import { subscribeToNewsletter } from "../services/newsletter.service.js";
import { toErrorResponse, Errors } from "../lib/errors.js";
import { SubscribeNewsletterBody } from "@workspace/api-zod";

const router = Router();

router.post("/newsletter", async (req, res) => {
  try {
    const parsed = SubscribeNewsletterBody.safeParse(req.body);
    if (!parsed.success) {
      throw Errors.badRequest("Invalid email address");
    }
    const result = await subscribeToNewsletter(parsed.data.email);
    res.json(result);
  } catch (err) {
    req.log.error({ err }, "Failed to subscribe to newsletter");
    const { status, ...body } = toErrorResponse(err);
    res.status(status).json(body);
  }
});

export default router;
