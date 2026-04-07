import { Router } from "express";
import { getGlobalStats } from "../services/stats.service.js";
import { toErrorResponse } from "../lib/errors.js";

const router = Router();

router.get("/stats", async (req, res) => {
  try {
    const data = await getGlobalStats();
    res.json(data);
  } catch (err) {
    req.log.error({ err }, "Failed to fetch stats");
    const { status, ...body } = toErrorResponse(err);
    res.status(status).json(body);
  }
});

export default router;
