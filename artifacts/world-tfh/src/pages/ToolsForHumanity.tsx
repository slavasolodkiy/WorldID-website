import { motion } from "framer-motion";
import { Link } from "wouter";
import { track } from "@/lib/analytics";

export function ToolsForHumanity() {
  return (
    <div className="w-full flex flex-col min-h-screen pt-24">
      {/* ── Hero ───────────────────────────────────────────────── */}
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
            Tools for Humanity is a technology company building the hardware and software
            that power the World Network — the infrastructure for a more inclusive global
            economy.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/orb"
              className="px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors"
              onClick={() => track({ event: "nav_link_click", destination: "/orb" })}
            >
              Discover the Orb
            </Link>
            <Link
              href="/team"
              className="px-6 py-3 border border-white/20 rounded-full font-medium hover:bg-white/10 transition-colors"
              onClick={() => track({ event: "nav_link_click", destination: "/team" })}
            >
              Meet the Team
            </Link>
            <Link
              href="/orb#become-operator"
              className="px-6 py-3 border border-white/20 rounded-full font-medium hover:bg-white/10 transition-colors"
              onClick={() => track({ event: "cta_become_operator_click", location: "tfh_hero" })}
            >
              Become an Operator
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ── Hardware / Software ────────────────────────────────── */}
      <section className="px-6 py-24 bg-card/50 border-y border-border/50">
        <div className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-4">Hardware</h2>
            <p className="text-muted-foreground mb-6">
              We design and manufacture the Orb, a custom biometric imaging device built to
              verify personhood in a privacy-preserving way. Orb operators worldwide run
              verification sessions that bring people into the World Network.
            </p>
            <div className="flex gap-4">
              <Link
                href="/orb"
                className="text-white underline underline-offset-4"
                onClick={() => track({ event: "nav_link_click", destination: "/orb" })}
              >
                Hardware specs
              </Link>
              <Link
                href="/orb#become-operator"
                className="text-white underline underline-offset-4"
                onClick={() => track({ event: "cta_become_operator_click", location: "tfh_hardware" })}
              >
                Operator program
              </Link>
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-4">Software</h2>
            <p className="text-muted-foreground mb-6">
              We build the World App — the first wallet supporting World ID — and the
              ecosystem tools that let developers integrate World ID into their products.
              The underlying World ID protocol is open and documented.
            </p>
            <div className="flex gap-4">
              <Link
                href="/world-id"
                className="text-white underline underline-offset-4"
                onClick={() => track({ event: "nav_link_click", destination: "/world-id" })}
              >
                World ID overview
              </Link>
              <Link
                href="/developers"
                className="text-white underline underline-offset-4"
                onClick={() => track({ event: "cta_developer_docs_click", destination: "/developers", location: "tfh_software" })}
              >
                Developer resources
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
