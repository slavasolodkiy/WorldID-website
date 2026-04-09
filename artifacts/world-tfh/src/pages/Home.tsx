import { useGetStats, getGetStatsQueryKey } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { HeroOrb } from "@/components/ui/HeroOrb";
import { StatCounter } from "@/components/ui/StatCounter";
import { ApiState } from "@/components/ui/ApiState";
import { Link } from "wouter";
import { track } from "@/lib/analytics";

const APP_STORE_URL = "https://apps.apple.com/app/world-app/id1560859277";
const GOOGLE_PLAY_URL = "https://play.google.com/store/apps/details?id=com.worldcoin";

const FUNNELS = [
  {
    audience: "End Users",
    heading: "Get verified as a human",
    body: "Download World App, visit an Orb near you, and prove your unique personhood while staying anonymous.",
    cta: "Download World App",
    href: APP_STORE_URL,
    external: true,
    event: () => track({ event: "cta_app_store_click", location: "home_funnels" }),
  },
  {
    audience: "Operators & Agents",
    heading: "Deploy an Orb",
    body: "Join the global network of Orb operators helping verify humanity. Learn about the hardware and the operator program.",
    cta: "Become an Operator",
    href: "/orb#become-operator",
    external: false,
    event: () => track({ event: "cta_become_operator_click", location: "home_funnels" }),
  },
  {
    audience: "Developers",
    heading: "Integrate World ID",
    body: "Add Sybil resistance and proof-of-humanity to your app. Find the SDK docs, quickstarts, and GitHub repos.",
    cta: "Developer Resources",
    href: "/developers",
    external: false,
    event: () => track({ event: "cta_developer_docs_click", destination: "/developers", location: "home_funnels" }),
  },
] as const;

export function Home() {
  const { data: stats, isLoading, isError, refetch } = useGetStats({ query: { queryKey: getGetStatsQueryKey() } });

  return (
    <div className="w-full flex flex-col min-h-screen pt-24 cosmic-gradient">
      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="px-6 py-20 md:py-32 flex flex-col items-center text-center max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-8">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-medium">World Network is live</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-gradient leading-[1.1] mb-6">
            The world's largest human identity network
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            World ID is a digital passport that lets you prove you are a unique and real person while remaining anonymous.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors"
              onClick={() => track({ event: "cta_app_store_click", location: "home_hero" })}
            >
              Download World App
            </a>
            <a
              href={GOOGLE_PLAY_URL}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 border border-white/20 rounded-full font-medium hover:bg-white/10 transition-colors"
              onClick={() => track({ event: "cta_google_play_click", location: "home_hero" })}
            >
              Get on Google Play
            </a>
          </div>
        </motion.div>
      </section>

      {/* ── Orb visual ─────────────────────────────────────────── */}
      <section className="px-6 py-12 relative overflow-hidden">
        <HeroOrb />
      </section>

      {/* ── Stats ──────────────────────────────────────────────── */}
      <section className="px-6 py-24 max-w-6xl mx-auto w-full">
        <ApiState data={stats} isLoading={isLoading} isError={isError} onRetry={refetch} loadingRows={1}>
          {(s) => (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCounter value={s.verifiedHumans} label="Verified Humans" />
              <StatCounter value={s.countriesActive} label="Countries" />
              <StatCounter value={s.ecosystemApps} label="Ecosystem Apps" />
            </div>
          )}
        </ApiState>
      </section>

      {/* ── Three-funnel routing ───────────────────────────────── */}
      <section className="px-6 py-16 border-t border-border/50 bg-card/30">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-10 text-center">
            Who are you?
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FUNNELS.map((f) => (
              <div
                key={f.audience}
                className="p-8 rounded-2xl border border-border/50 bg-card hover:border-white/20 transition-colors flex flex-col"
              >
                <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                  {f.audience}
                </span>
                <h3 className="text-xl font-bold mb-3">{f.heading}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">{f.body}</p>
                {f.external ? (
                  <a
                    href={f.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium border border-white/20 px-4 py-2 rounded-full hover:bg-white/10 transition-colors self-start"
                    onClick={f.event}
                  >
                    {f.cta} ↗
                  </a>
                ) : (
                  <Link
                    href={f.href}
                    className="inline-flex items-center gap-2 text-sm font-medium border border-white/20 px-4 py-2 rounded-full hover:bg-white/10 transition-colors self-start"
                    onClick={f.event}
                  >
                    {f.cta} →
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
