import { useListEcosystemApps, getListEcosystemAppsQueryKey } from "@workspace/api-client-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ApiState } from "@/components/ui/ApiState";

export function EcosystemPage() {
  const { data: apps, isLoading, isError, refetch } = useListEcosystemApps({ query: { queryKey: getListEcosystemAppsQueryKey() } });
  const [filter, setFilter] = useState<string>("all");

  const categories = ["all", "defi", "social", "gaming", "tools", "payments", "identity"];

  return (
    <div className="w-full flex flex-col min-h-screen pt-24">
      <section className="px-6 py-20 max-w-6xl mx-auto w-full">
        <h1 className="text-5xl font-bold tracking-tighter mb-6">Ecosystem</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mb-12">
          Explore applications building with World ID across the internet.
        </p>

        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize",
                filter === cat ? "bg-white text-black" : "bg-secondary text-muted-foreground hover:text-white hover:bg-secondary/80"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <ApiState
          data={apps}
          isLoading={isLoading}
          isError={isError}
          onRetry={refetch}
          loadingRows={6}
          empty={<p className="text-muted-foreground text-sm py-16 text-center">No apps found in this category.</p>}
        >
          {(allApps) => {
            const filtered = allApps.filter(a => filter === "all" || a.category === filter);
            if (filtered.length === 0) {
              return <p className="text-muted-foreground text-sm py-16 text-center">No apps in this category yet.</p>;
            }
            return (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map(app => (
                  <a
                    key={app.id}
                    href={app.websiteUrl ?? undefined}
                    target="_blank"
                    rel="noreferrer"
                    className="group p-6 rounded-2xl bg-card border border-border/50 hover:border-white/20 transition-all hover:-translate-y-1 block"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center overflow-hidden">
                        {app.logoUrl ? <img src={app.logoUrl} alt={app.name} className="w-full h-full object-cover" /> : <div className="text-xl font-bold">{app.name[0]}</div>}
                      </div>
                      <div>
                        <h3 className="font-bold">{app.name}</h3>
                        <span className="text-xs text-muted-foreground uppercase tracking-wider">{app.category}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{app.description}</p>
                    {app.worldIdEnabled && (
                      <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded border border-white/10 bg-white/5 text-xs">
                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                        World ID Enabled
                      </div>
                    )}
                  </a>
                ))}
              </div>
            );
          }}
        </ApiState>
      </section>
    </div>
  );
}
