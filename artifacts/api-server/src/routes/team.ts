import { Router } from "express";
import { db } from "@workspace/db";
import { teamMembersTable } from "@workspace/db";

const router = Router();

router.get("/team", async (req, res) => {
  try {
    const members = await db.select().from(teamMembersTable);
    return res.json(members);
  } catch (err) {
    req.log.error({ err }, "Failed to fetch team members");
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
