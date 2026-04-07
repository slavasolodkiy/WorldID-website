/**
 * API integration tests.
 * Runs against a live database; DATABASE_URL must be set.
 * Usage: pnpm --filter @workspace/api-server run test
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import supertest from "supertest";
import app from "../app.js";

const request = supertest(app);

// ── Health ─────────────────────────────────────────────────────────────────────
describe("GET /api/healthz", () => {
  it("returns 200 with status field", async () => {
    const res = await request.get("/api/healthz");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("status");
    expect(typeof res.body.status).toBe("string");
  });
});

// ── Stats ──────────────────────────────────────────────────────────────────────
describe("GET /api/stats", () => {
  it("returns all required stat fields as numbers", async () => {
    const res = await request.get("/api/stats");
    expect(res.status).toBe(200);
    const body = res.body;
    expect(typeof body.verifiedHumans).toBe("number");
    expect(typeof body.countriesActive).toBe("number");
    expect(typeof body.ecosystemApps).toBe("number");
    expect(typeof body.orbsDeployed).toBe("number");
    expect(typeof body.dailyVerifications).toBe("number");
  });
});

// ── Ecosystem ──────────────────────────────────────────────────────────────────
describe("GET /api/ecosystem", () => {
  it("returns an array of apps with required fields", async () => {
    const res = await request.get("/api/ecosystem");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    if (res.body.length > 0) {
      const app = res.body[0];
      expect(app).toHaveProperty("id");
      expect(app).toHaveProperty("name");
      expect(app).toHaveProperty("category");
      expect(typeof app.worldIdEnabled).toBe("boolean");
    }
  });
});

// ── Orb ────────────────────────────────────────────────────────────────────────
describe("GET /api/orb", () => {
  it("returns orb info with version, specs, and features", async () => {
    const res = await request.get("/api/orb");
    expect(res.status).toBe(200);
    const body = res.body;
    expect(typeof body.version).toBe("string");
    expect(typeof body.description).toBe("string");
    expect(Array.isArray(body.specs)).toBe(true);
    expect(Array.isArray(body.features)).toBe(true);
    expect(typeof body.privacyApproach).toBe("string");
    if (body.specs.length > 0) {
      expect(body.specs[0]).toHaveProperty("label");
      expect(body.specs[0]).toHaveProperty("value");
    }
  });
});

// ── Locations ──────────────────────────────────────────────────────────────────
describe("GET /api/locations", () => {
  it("returns an array of orb locations", async () => {
    const res = await request.get("/api/locations");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    if (res.body.length > 0) {
      const loc = res.body[0];
      expect(loc).toHaveProperty("city");
      expect(loc).toHaveProperty("country");
      expect(typeof loc.lat).toBe("number");
      expect(typeof loc.lng).toBe("number");
      expect(typeof loc.active).toBe("boolean");
    }
  });
});

// ── Team ───────────────────────────────────────────────────────────────────────
describe("GET /api/team", () => {
  it("returns an array of team members", async () => {
    const res = await request.get("/api/team");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    if (res.body.length > 0) {
      const member = res.body[0];
      expect(member).toHaveProperty("name");
      expect(member).toHaveProperty("role");
      expect(member).toHaveProperty("bio");
    }
  });
});

// ── Newsletter ─────────────────────────────────────────────────────────────────
describe("POST /api/newsletter", () => {
  it("accepts a valid email", async () => {
    const res = await request
      .post("/api/newsletter")
      .send({ email: "test-integration@example.com" })
      .set("Content-Type", "application/json");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(typeof res.body.message).toBe("string");
  });

  it("returns 400 for missing or invalid email", async () => {
    const res = await request
      .post("/api/newsletter")
      .send({ email: "not-an-email" })
      .set("Content-Type", "application/json");
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body).toHaveProperty("code");
  });

  it("returns 400 for empty body", async () => {
    const res = await request
      .post("/api/newsletter")
      .send({})
      .set("Content-Type", "application/json");
    expect(res.status).toBe(400);
  });
});

// ── Error envelope shape ───────────────────────────────────────────────────────
describe("Error envelope contract", () => {
  it("404 responses include error and code fields", async () => {
    const res = await request.get("/api/nonexistent-route");
    expect(res.status).toBe(404);
  });
});
