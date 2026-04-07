import { Router } from "express";
import { listTeamMembers } from "../services/team.service.js";
import { toErrorResponse } from "../lib/errors.js";

const router = Router();

router.get("/team", async (req, res) => {
  try {
    const data = await listTeamMembers();
    res.json(data);
  } catch (err) {
    req.log.error({ err }, "Failed to fetch team members");
    const { status, ...body } = toErrorResponse(err);
    res.status(status).json(body);
  }
});

export default router;
