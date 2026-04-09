import { useGetOrbInfo, getGetOrbInfoQueryKey, useListOrbLocations, getListOrbLocationsQueryKey } from "@workspace/api-client-react";
import orbImg from "@/assets/orb.png";
import { ApiState } from "@/components/ui/ApiState";
import { track } from "@/lib/analytics";

export function OrbPage() {
  const { data: orb, isLoading: orbLoading, isError: orbError, refetch: refetchOrb } = useGetOrbInfo({ query: { queryKey: getGetOrbInfoQueryKey() } });
  const { data: locations, isLoading: locLoading, isError: locError, refetch: refetchLoc } = useListOrbLocations({ query: { queryKey: getListOrbLocationsQueryKey() } });

  return (
    <div className="w-full flex flex-col min-h-screen pt-24">
      <section className="px-6 py-20 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">The Orb.</h1>
          <p className="text-xl text-muted-foreground mb-8">
            {orb?.description || "A custom biometric imaging device developed to prove personhood in a privacy-preserving way."}
          </p>
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-secondary rounded-lg text-sm">
            <span className="font-mono text-muted-foreground">Version</span>
            <span className="font-mono text-white">{orb?.version || "2.0"}</span>
          </div>
        </div>
        <div className="relative aspect-square rounded-full flex items-center justify-center">
          <img src={orbImg} alt="The Orb" className="w-full h-full object-contain drop-shadow-2xl" />
        </div>
      </section>

      <section className="px-6 py-24 bg-card/50 border-t border-border/50">
        <div className="max-w-6xl mx-auto w-full">
          <ApiState data={orb} isLoading={orbLoading} isError={orbError} onRetry={refetchOrb} loadingRows={4}>
            {(o) => (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div>
                  <h2 className="text-3xl font-bold mb-8">Technical Specs</h2>
                  <div className="space-y-4">
                    {o.specs.map((spec, i) => (
                      <div key={i} className="flex justify-between border-b border-border/50 pb-4">
                        <span className="text-muted-foreground">{spec.label}</span>
                        <span className="font-medium text-right">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-8">Privacy First</h2>
                  <p className="text-muted-foreground leading-relaxed">{o.privacyApproach}</p>
                  <div className="mt-8 space-y-4">
                    {o.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-white mt-2 shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </ApiState>
        </div>
      </section>

      {/* ── Global Deployment ─────────────────────────────────── */}
      <section className="px-6 py-24">
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-3xl font-bold mb-12 text-center">Global Deployment</h2>
          <ApiState data={locations} isLoading={locLoading} isError={locError} onRetry={refetchLoc} loadingRows={8}>
            {(locs) => (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {locs.map((loc) => (
                  <div
                    key={loc.id}
                    className="p-6 rounded-2xl border border-border/50 bg-card hover:bg-card/80 transition-colors"
                    onClick={() => track({ event: "orb_location_viewed", city: loc.city, country: loc.country })}
                  >
                    <h3 className="font-bold mb-1">{loc.city}</h3>
                    <p className="text-sm text-muted-foreground">{loc.country}</p>
                    <div className="mt-4 flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${loc.active ? "bg-green-500" : "bg-yellow-500"}`} />
                      <span className="text-xs uppercase tracking-wider">{loc.active ? "Active" : "Coming Soon"}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ApiState>
        </div>
      </section>

      {/* ── Operator Acquisition CTA ───────────────────────────── */}
      <section id="become-operator" className="px-6 py-24 bg-card/50 border-t border-border/50 scroll-mt-24">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground block mb-4">
            For Operators & Agents
          </span>
          <h2 className="text-4xl font-bold tracking-tight mb-6">
            Deploy an Orb in your region
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-10">
            Orb operators are the backbone of the World Network. As an operator or agent,
            you run Orb verification sessions in your region, helping onboard real humans
            to the network. Tools for Humanity provides hardware, support, and operator
            economics.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://world.org/become-an-orb-operator"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors"
              onClick={() => track({ event: "cta_become_operator_click", location: "orb_page_cta" })}
            >
              Apply to Become an Operator ↗
            </a>
            <a
              href="https://world.org/find-orb"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 border border-white/20 rounded-full font-medium hover:bg-white/10 transition-colors"
              onClick={() => track({ event: "nav_link_click", destination: "find-orb" })}
            >
              Find an Orb Near You ↗
            </a>
          </div>
          <p className="text-xs text-muted-foreground mt-8">
            Interested in operating at scale? Contact the operator program team at{" "}
            <a
              href="mailto:operators@toolsforhumanity.com"
              className="underline underline-offset-4 hover:text-foreground transition-colors"
              onClick={() => track({ event: "cta_become_operator_click", location: "orb_page_email" })}
            >
              operators@toolsforhumanity.com
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
