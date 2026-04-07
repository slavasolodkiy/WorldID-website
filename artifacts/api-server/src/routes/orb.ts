import { Router } from "express";
import { getOrbInfo, listOrbLocations } from "../services/orb.service.js";
import { toErrorResponse } from "../lib/errors.js";

const router = Router();

router.get("/orb", async (req, res) => {
  try {
    const data = await getOrbInfo();
    res.json(data);
  } catch (err) {
    req.log.error({ err }, "Failed to fetch orb info");
    const { status, ...body } = toErrorResponse(err);
    res.status(status).json(body);
  }
});

router.get("/locations", async (req, res) => {
  try {
    const data = await listOrbLocations();
    res.json(data);
  } catch (err) {
    req.log.error({ err }, "Failed to fetch orb locations");
    const { status, ...body } = toErrorResponse(err);
    res.status(status).json(body);
  }
});

export default router;
