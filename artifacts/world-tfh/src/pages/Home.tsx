import { useGetStats, getGetStatsQueryKey } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { HeroOrb } from "@/components/ui/HeroOrb";
import { StatCounter } from "@/components/ui/StatCounter";
import { Link } from "wouter";

export function Home() {
  const { data: stats } = useGetStats({ query: { queryKey: getGetStatsQueryKey() } });

  return (
    <div className="w-full flex flex-col min-h-screen pt-24 cosmic-gradient">
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
          <div className="flex items-center justify-center gap-4">
            <Link href="/world-id" className="px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors">
              Explore World ID
            </Link>
            <Link href="/ecosystem" className="px-6 py-3 border border-white/20 rounded-full font-medium hover:bg-white/10 transition-colors">
              View Ecosystem
            </Link>
          </div>
        </motion.div>
      </section>

      <section className="px-6 py-12 relative overflow-hidden">
        <HeroOrb />
      </section>

      {stats && (
        <section className="px-6 py-24 max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCounter value={stats.verifiedHumans} label="Verified Humans" />
            <StatCounter value={stats.countriesActive} label="Countries" />
            <StatCounter value={stats.ecosystemApps} label="Ecosystem Apps" />
          </div>
        </section>
      )}
    </div>
  );
}
