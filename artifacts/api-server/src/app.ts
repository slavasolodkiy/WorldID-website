import express, { type Express, type Request, type Response, type NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import pinoHttp from "pino-http";
import router from "./routes/index.js";
import { logger } from "./lib/logger.js";
import { toErrorResponse } from "./lib/errors.js";

const app: Express = express();

// ── Security ──────────────────────────────────────────────────────────────────
app.use(
  helmet({
    crossOriginEmbedderPolicy: false, // allow Vite preview iframe in dev
  }),
);

const ALLOWED_ORIGINS = process.env["ALLOWED_ORIGINS"]
  ? process.env["ALLOWED_ORIGINS"].split(",").map((o) => o.trim())
  : ["http://localhost:3000", "http://localhost:5173", "http://localhost:23426"];

app.use(
  cors({
    origin: (origin, cb) => {
      // allow same-origin (no Origin header) and server-to-server calls
      if (!origin) return cb(null, true);
      // in development allow anything on localhost
      if (process.env["NODE_ENV"] !== "production") return cb(null, true);
      if (ALLOWED_ORIGINS.includes(origin)) return cb(null, true);
      cb(new Error(`CORS: origin ${origin} not allowed`));
    },
    credentials: true,
  }),
);

app.use(
  rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 120,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Too many requests", code: "RATE_LIMITED", status: 429 },
  }),
);

// ── Logging ───────────────────────────────────────────────────────────────────
app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return { id: req.id, method: req.method, url: req.url?.split("?")[0] };
      },
      res(res) {
        return { statusCode: res.statusCode };
      },
    },
  }),
);

// ── Body parsing (with size limits) ───────────────────────────────────────────
app.use(express.json({ limit: "64kb" }));
app.use(express.urlencoded({ extended: true, limit: "64kb" }));

// ── Routes ────────────────────────────────────────────────────────────────────
app.use("/api", router);

// ── Global error handler ──────────────────────────────────────────────────────
app.use((err: unknown, req: Request, res: Response, _next: NextFunction) => {
  const shaped = toErrorResponse(err);
  req.log.error({ err, code: shaped.code }, shaped.error);
  res.status(shaped.status).json({ error: shaped.error, code: shaped.code });
});

export default app;
