import { track } from "@/lib/analytics";
import { Link } from "wouter";

const APP_STORE_URL = "https://apps.apple.com/app/world-app/id1560859277";
const GOOGLE_PLAY_URL = "https://play.google.com/store/apps/details?id=com.worldcoin";

export function WorldIdPage() {
  return (
    <div className="w-full flex flex-col min-h-screen pt-24">
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="px-6 py-20 max-w-4xl mx-auto w-full text-center">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">World ID</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
          A privacy-first identity protocol that lets you prove you are a real and unique person
          online — without revealing who you are.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors"
            onClick={() => track({ event: "cta_app_store_click", location: "world_id_hero" })}
          >
            Download World App — iOS
          </a>
          <a
            href={GOOGLE_PLAY_URL}
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 border border-white/20 rounded-full font-medium hover:bg-white/10 transition-colors"
            onClick={() => track({ event: "cta_google_play_click", location: "world_id_hero" })}
          >
            Download — Android
          </a>
        </div>
      </section>

      {/* ── How it works ──────────────────────────────────────────── */}
      <section className="px-6 py-24 bg-card/30 border-y border-border/50">
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-16">How it works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-xl font-mono">1</div>
              <h3 className="text-xl font-bold">Download World App</h3>
              <p className="text-muted-foreground">
                Get the World App on iOS or Android. Your World ID is generated locally on your device — no personal data leaves your phone.
              </p>
              <div className="flex gap-3 pt-2">
                <a
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs px-3 py-1.5 rounded-full border border-white/20 hover:bg-white/10 transition-colors"
                  onClick={() => track({ event: "cta_app_store_click", location: "world_id_step1" })}
                >
                  App Store ↗
                </a>
                <a
                  href={GOOGLE_PLAY_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs px-3 py-1.5 rounded-full border border-white/20 hover:bg-white/10 transition-colors"
                  onClick={() => track({ event: "cta_google_play_click", location: "world_id_step1" })}
                >
                  Google Play ↗
                </a>
              </div>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-xl font-mono">2</div>
              <h3 className="text-xl font-bold">Verify at an Orb</h3>
              <p className="text-muted-foreground">
                Visit an Orb near you for a quick, privacy-preserving biometric check. The Orb confirms you are a real, unique human.
              </p>
              <Link
                href="/orb"
                className="inline-block text-xs px-3 py-1.5 rounded-full border border-white/20 hover:bg-white/10 transition-colors mt-2"
                onClick={() => track({ event: "nav_link_click", destination: "/orb" })}
              >
                Find an Orb →
              </Link>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-xl font-mono">3</div>
              <h3 className="text-xl font-bold">Use Anywhere</h3>
              <p className="text-muted-foreground">
                Sign in to apps and services that support World ID. Prove you're human without sharing your name, email, or any personal data.
              </p>
              <Link
                href="/ecosystem"
                className="inline-block text-xs px-3 py-1.5 rounded-full border border-white/20 hover:bg-white/10 transition-colors mt-2"
                onClick={() => track({ event: "nav_link_click", destination: "/ecosystem" })}
              >
                See supported apps →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Developer link-out ─────────────────────────────────────── */}
      <section className="px-6 py-20 max-w-4xl mx-auto w-full text-center">
        <h2 className="text-2xl font-bold mb-4">Building with World ID?</h2>
        <p className="text-muted-foreground mb-8">
          Add Sybil resistance to your app. The SDK docs, integration guides, and GitHub repos
          are all in the developer resources.
        </p>
        <Link
          href="/developers"
          className="inline-flex px-6 py-3 border border-white/20 rounded-full font-medium hover:bg-white/10 transition-colors text-sm"
          onClick={() => track({ event: "cta_developer_docs_click", destination: "/developers", location: "world_id_bottom" })}
        >
          Developer Resources →
        </Link>
      </section>
    </div>
  );
}
