import { Router } from "express";
import { listEcosystemApps } from "../services/ecosystem.service.js";
import { toErrorResponse } from "../lib/errors.js";

const router = Router();

router.get("/ecosystem", async (req, res) => {
  try {
    const data = await listEcosystemApps();
    res.json(data);
  } catch (err) {
    req.log.error({ err }, "Failed to fetch ecosystem apps");
    const { status, ...body } = toErrorResponse(err);
    res.status(status).json(body);
  }
});

export default router;
