import { Router } from "express";
import { db } from "@workspace/db";
import { globalStatsTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/stats", async (req, res) => {
  try {
    const rows = await db.select().from(globalStatsTable).limit(1);
    if (rows.length === 0) {
      return res.json({
        verifiedHumans: 0,
        countriesActive: 0,
        ecosystemApps: 0,
        orbsDeployed: 0,
        dailyVerifications: 0,
      });
    }
    const row = rows[0];
    return res.json({
      verifiedHumans: row.verifiedHumans,
      countriesActive: row.countriesActive,
      ecosystemApps: row.ecosystemApps,
      orbsDeployed: row.orbsDeployed,
      dailyVerifications: row.dailyVerifications,
    });
  } catch (err) {
    req.log.error({ err }, "Failed to fetch stats");
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
