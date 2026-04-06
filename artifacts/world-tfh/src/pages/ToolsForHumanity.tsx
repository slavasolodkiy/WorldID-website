import { motion } from "framer-motion";
import { Link } from "wouter";

export function ToolsForHumanity() {
  return (
    <div className="w-full flex flex-col min-h-screen pt-24">
      <section className="px-6 py-20 md:py-32 max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-tight">
            Building the tools for a more equitable future.
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mb-12">
            We are a technology company building hardware and software to support the World Network. Our mission is to accelerate the transition to a more inclusive global economy.
          </p>
          <div className="flex gap-4">
            <Link href="/orb" className="px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors">
              Discover the Orb
            </Link>
            <Link href="/team" className="px-6 py-3 border border-white/20 rounded-full font-medium hover:bg-white/10 transition-colors">
              Meet the Team
            </Link>
          </div>
        </motion.div>
      </section>

      <section className="px-6 py-24 bg-card/50 border-y border-border/50">
        <div className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-4">Hardware</h2>
            <p className="text-muted-foreground mb-6">
              We design and manufacture the Orb, a custom biometric imaging device developed to prove personhood in a privacy-preserving way.
            </p>
            <Link href="/orb" className="text-white underline underline-offset-4">Learn more</Link>
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-4">Software</h2>
            <p className="text-muted-foreground mb-6">
              We develop the core software infrastructure powering the World Network, including the World App, the first frontend to World ID.
            </p>
            <Link href="/world-id" className="text-white underline underline-offset-4">Learn more</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
