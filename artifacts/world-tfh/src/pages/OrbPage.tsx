import { useGetOrbInfo, getGetOrbInfoQueryKey, useListOrbLocations, getListOrbLocationsQueryKey } from "@workspace/api-client-react";
import orbImg from "@/assets/orb.png";

export function OrbPage() {
  const { data: orb } = useGetOrbInfo({ query: { queryKey: getGetOrbInfoQueryKey() } });
  const { data: locations } = useListOrbLocations({ query: { queryKey: getListOrbLocationsQueryKey() } });

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

      {orb && (
        <section className="px-6 py-24 bg-card/50 border-t border-border/50">
          <div className="max-w-6xl mx-auto w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div>
                <h2 className="text-3xl font-bold mb-8">Technical Specs</h2>
                <div className="space-y-4">
                  {orb.specs.map((spec, i) => (
                    <div key={i} className="flex justify-between border-b border-border/50 pb-4">
                      <span className="text-muted-foreground">{spec.label}</span>
                      <span className="font-medium text-right">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-8">Privacy First</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {orb.privacyApproach}
                </p>
                <div className="mt-8 space-y-4">
                  {orb.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-white mt-2 shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {locations && locations.length > 0 && (
        <section className="px-6 py-24">
          <div className="max-w-6xl mx-auto w-full">
            <h2 className="text-3xl font-bold mb-12 text-center">Global Deployment</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {locations.map((loc) => (
                <div key={loc.id} className="p-6 rounded-2xl border border-border/50 bg-card hover:bg-card/80 transition-colors">
                  <h3 className="font-bold mb-1">{loc.city}</h3>
                  <p className="text-sm text-muted-foreground">{loc.country}</p>
                  <div className="mt-4 flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${loc.active ? 'bg-green-500' : 'bg-yellow-500'}`} />
                    <span className="text-xs uppercase tracking-wider">{loc.active ? 'Active' : 'Coming Soon'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
