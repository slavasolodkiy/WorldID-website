/**
 * Programmatic migration runner.
 * Usage: pnpm --filter @workspace/db run migrate
 *
 * Applies all pending migrations from the ./migrations folder.
 * Safe to run multiple times — already-applied migrations are skipped.
 */
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import pg from "pg";
import path from "path";
import { fileURLToPath } from "url";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is required");
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

console.log("Running migrations...");
await migrate(db, { migrationsFolder: path.join(__dirname, "../migrations") });
console.log("✅ Migrations complete");
await pool.end();
