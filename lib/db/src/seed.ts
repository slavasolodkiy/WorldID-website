/**
 * Deterministic seed script — idempotent, safe to re-run.
 * Usage: pnpm --filter @workspace/db run seed
 */
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import {
  globalStatsTable,
  ecosystemAppsTable,
  teamMembersTable,
  orbLocationsTable,
  orbHardwareTable,
  newsletterSubscribersTable,
} from "./schema/index.js";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is required");
}

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

async function seed() {
  console.log("🌱 Seeding database...");

  // ── Global Stats ───────────────────────────────────────────────────────────
  await db.delete(globalStatsTable);
  await db.insert(globalStatsTable).values({
    verifiedHumans: 12_700_000,
    countriesActive: 160,
    ecosystemApps: 847,
    orbsDeployed: 1_200,
    dailyVerifications: 48_000,
  });
  console.log("  ✓ global_stats");

  // ── Orb Hardware ───────────────────────────────────────────────────────────
  await db.delete(orbHardwareTable);
  await db.insert(orbHardwareTable).values({
    version: "Orb 2.0",
    description:
      "The Orb is a custom-built biometric imaging device that verifies humanness and uniqueness using iris patterns. It captures a high-resolution image of both irises and generates a unique IrisCode — a compact numeric representation — without storing any biometric data.",
    privacyApproach:
      "The Orb generates a unique IrisCode locally and immediately discards all raw biometric data. Only the cryptographic hash is used for uniqueness verification. World ID verifications use zero-knowledge proofs so no personal data is ever revealed to third parties.",
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
  });
  console.log("  ✓ orb_hardware");

  // ── Ecosystem Apps ─────────────────────────────────────────────────────────
  await db.delete(ecosystemAppsTable);
  await db.insert(ecosystemAppsTable).values([
    { id: "reddit", name: "Reddit", description: "Community discussion platform integrating World ID for bot-free communities.", category: "social", logoUrl: null, websiteUrl: "https://reddit.com", worldIdEnabled: true, featured: true },
    { id: "discord", name: "Discord", description: "Voice and text communication with World ID human verification.", category: "social", logoUrl: null, websiteUrl: "https://discord.com", worldIdEnabled: true, featured: true },
    { id: "uniswap", name: "Uniswap", description: "Decentralized exchange protocol with sybil-resistant governance.", category: "defi", logoUrl: null, websiteUrl: "https://uniswap.org", worldIdEnabled: true, featured: true },
    { id: "optimism", name: "Optimism", description: "Layer 2 Ethereum network using World ID for airdrop eligibility.", category: "defi", logoUrl: null, websiteUrl: "https://optimism.io", worldIdEnabled: true, featured: true },
    { id: "gitcoin", name: "Gitcoin", description: "Open source funding platform with World ID for passport verification.", category: "tools", logoUrl: null, websiteUrl: "https://gitcoin.co", worldIdEnabled: true, featured: false },
    { id: "worldapp", name: "World App", description: "The official World App for storing and using your World ID.", category: "payments", logoUrl: null, websiteUrl: "https://world.org/world-app", worldIdEnabled: true, featured: true },
    { id: "human", name: "Human", description: "Proof-of-personhood marketplace connecting verified humans.", category: "identity", logoUrl: null, websiteUrl: "https://human.app", worldIdEnabled: true, featured: false },
    { id: "match", name: "Match", description: "Dating app with verified human profiles powered by World ID.", category: "social", logoUrl: null, websiteUrl: "https://match.com", worldIdEnabled: true, featured: false },
    { id: "lens", name: "Lens Protocol", description: "Decentralized social graph with World ID integration.", category: "social", logoUrl: null, websiteUrl: "https://lens.xyz", worldIdEnabled: true, featured: false },
    { id: "gnosis", name: "Gnosis", description: "Ethereum sidechain supporting World ID verification.", category: "defi", logoUrl: null, websiteUrl: "https://gnosis.io", worldIdEnabled: true, featured: false },
    { id: "poap", name: "POAP", description: "Proof of attendance NFT protocol with World ID gating.", category: "tools", logoUrl: null, websiteUrl: "https://poap.xyz", worldIdEnabled: true, featured: false },
    { id: "snapshot", name: "Snapshot", description: "Decentralized governance voting with sybil resistance via World ID.", category: "tools", logoUrl: null, websiteUrl: "https://snapshot.org", worldIdEnabled: true, featured: false },
  ]);
  console.log("  ✓ ecosystem_apps");

  // ── Team Members ───────────────────────────────────────────────────────────
  await db.delete(teamMembersTable);
  await db.insert(teamMembersTable).values([
    { id: "sam-altman", name: "Sam Altman", role: "Co-Founder & Chairman", bio: "Sam Altman is the co-founder and chairman of Tools for Humanity. He is also the CEO of OpenAI. Previously President of Y Combinator.", avatarUrl: null, linkedinUrl: null, twitterUrl: "https://twitter.com/sama" },
    { id: "alex-blania", name: "Alex Blania", role: "Co-Founder & CEO", bio: "Alex Blania is the co-founder and CEO of Tools for Humanity, leading the engineering and operations teams building the global World identity network.", avatarUrl: null, linkedinUrl: null, twitterUrl: null },
    { id: "tiago-sada", name: "Tiago Sada", role: "Head of Product & Engineering", bio: "Tiago leads product and engineering at Tools for Humanity. He previously worked at Google and co-founded several startups.", avatarUrl: null, linkedinUrl: null, twitterUrl: null },
    { id: "damien-kieran", name: "Damien Kieran", role: "Chief Privacy Officer", bio: "Damien oversees privacy strategy and compliance, ensuring World ID meets the highest standards for data protection globally.", avatarUrl: null, linkedinUrl: null, twitterUrl: null },
    { id: "max-novendstern", name: "Max Novendstern", role: "General Counsel", bio: "Max is the General Counsel at Tools for Humanity, managing legal strategy and regulatory affairs across all operating jurisdictions.", avatarUrl: null, linkedinUrl: null, twitterUrl: null },
    { id: "ana-alfaro", name: "Ana Alfaro", role: "Head of Operations", bio: "Ana oversees global operations including Orb deployments, partnerships, and go-to-market strategy across 160+ countries.", avatarUrl: null, linkedinUrl: null, twitterUrl: null },
  ]);
  console.log("  ✓ team_members");

  // ── Orb Locations ──────────────────────────────────────────────────────────
  await db.delete(orbLocationsTable);
  await db.insert(orbLocationsTable).values([
    { id: "sf-mission", city: "San Francisco", country: "United States", countryCode: "US", lat: 37.7599, lng: -122.4148, active: true },
    { id: "nyc-manhattan", city: "New York", country: "United States", countryCode: "US", lat: 40.7580, lng: -73.9855, active: true },
    { id: "london-shoreditch", city: "London", country: "United Kingdom", countryCode: "GB", lat: 51.5246, lng: -0.0791, active: true },
    { id: "berlin-mitte", city: "Berlin", country: "Germany", countryCode: "DE", lat: 52.5200, lng: 13.4050, active: true },
    { id: "tokyo-shibuya", city: "Tokyo", country: "Japan", countryCode: "JP", lat: 35.6580, lng: 139.7016, active: true },
    { id: "seoul-gangnam", city: "Seoul", country: "South Korea", countryCode: "KR", lat: 37.5172, lng: 127.0473, active: true },
    { id: "mexico-city", city: "Mexico City", country: "Mexico", countryCode: "MX", lat: 19.4326, lng: -99.1332, active: true },
    { id: "sao-paulo", city: "Sao Paulo", country: "Brazil", countryCode: "BR", lat: -23.5505, lng: -46.6333, active: true },
    { id: "nairobi", city: "Nairobi", country: "Kenya", countryCode: "KE", lat: -1.2921, lng: 36.8219, active: true },
    { id: "lagos", city: "Lagos", country: "Nigeria", countryCode: "NG", lat: 6.5244, lng: 3.3792, active: true },
    { id: "dubai", city: "Dubai", country: "UAE", countryCode: "AE", lat: 25.2048, lng: 55.2708, active: true },
    { id: "singapore", city: "Singapore", country: "Singapore", countryCode: "SG", lat: 1.3521, lng: 103.8198, active: true },
    { id: "sydney", city: "Sydney", country: "Australia", countryCode: "AU", lat: -33.8688, lng: 151.2093, active: true },
    { id: "paris", city: "Paris", country: "France", countryCode: "FR", lat: 48.8566, lng: 2.3522, active: true },
    { id: "amsterdam", city: "Amsterdam", country: "Netherlands", countryCode: "NL", lat: 52.3676, lng: 4.9041, active: true },
    { id: "buenos-aires", city: "Buenos Aires", country: "Argentina", countryCode: "AR", lat: -34.6037, lng: -58.3816, active: true },
    { id: "jakarta", city: "Jakarta", country: "Indonesia", countryCode: "ID", lat: -6.2088, lng: 106.8456, active: true },
    { id: "mumbai", city: "Mumbai", country: "India", countryCode: "IN", lat: 19.0760, lng: 72.8777, active: true },
    { id: "cape-town", city: "Cape Town", country: "South Africa", countryCode: "ZA", lat: -33.9249, lng: 18.4241, active: true },
    { id: "toronto", city: "Toronto", country: "Canada", countryCode: "CA", lat: 43.6532, lng: -79.3832, active: true },
  ]);
  console.log("  ✓ orb_locations");

  console.log("✅ Seed complete");
  await pool.end();
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
