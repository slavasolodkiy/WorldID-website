import { Router } from "express";
import { db } from "@workspace/db";
import { ecosystemAppsTable } from "@workspace/db";

const router = Router();

router.get("/ecosystem", async (req, res) => {
  try {
    const apps = await db.select().from(ecosystemAppsTable);
    return res.json(apps);
  } catch (err) {
    req.log.error({ err }, "Failed to fetch ecosystem apps");
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
