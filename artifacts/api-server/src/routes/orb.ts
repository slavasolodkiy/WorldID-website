import { Router } from "express";
import { db } from "@workspace/db";
import { orbLocationsTable } from "@workspace/db";

const router = Router();

router.get("/orb", async (req, res) => {
  try {
    return res.json({
      version: "Orb 2.0",
      description:
        "The Orb is a custom-built biometric imaging device that verifies humanness and uniqueness using iris patterns. It captures a high-resolution image of both irises and generates a unique IrisCode — a compact numeric representation — without storing any biometric data.",
      specs: [
        { label: "Biometric sensors", value: "Dual near-infrared iris cameras" },
        { label: "Verification time", value: "< 30 seconds" },
        { label: "Privacy approach", value: "Zero biometric data retention" },
        { label: "Hardware security", value: "Secure enclave, tamper-resistant" },
        { label: "Connectivity", value: "4G LTE + WiFi" },
        { label: "Weight", value: "~1.5 kg" },
        { label: "Operating temp", value: "0°C – 45°C" },
        { label: "Certifications", value: "CE, FCC, RCM" },
      ],
      features: [
        "Iris-based proof of unique humanity",
        "No biometric data stored or transmitted",
        "Tamper-resistant hardware",
        "End-to-end encrypted verification flow",
        "Open source cryptographic protocols",
        "Privacy-preserving zero-knowledge proofs",
      ],
      privacyApproach:
        "The Orb generates a unique IrisCode locally and immediately discards all raw biometric data. Only the cryptographic hash is used for uniqueness verification. World ID verifications use zero-knowledge proofs so no personal data is ever revealed to third parties.",
    });
  } catch (err) {
    req.log.error({ err }, "Failed to fetch orb info");
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/locations", async (req, res) => {
  try {
    const locations = await db.select().from(orbLocationsTable);
    return res.json(locations);
  } catch (err) {
    req.log.error({ err }, "Failed to fetch orb locations");
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
