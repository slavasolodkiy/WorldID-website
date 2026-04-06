export function WorldIdPage() {
  return (
    <div className="w-full flex flex-col min-h-screen pt-24">
      <section className="px-6 py-20 max-w-4xl mx-auto w-full text-center">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">World ID</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
          A privacy-first identity protocol that lets you prove you are a real and unique person online.
        </p>
      </section>

      <section className="px-6 py-24 bg-card/30 border-y border-border/50">
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-xl font-mono">1</div>
            <h3 className="text-xl font-bold">Download App</h3>
            <p className="text-muted-foreground">Get a compatible wallet, like World App, to generate your unique World ID locally on your device.</p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-xl font-mono">2</div>
            <h3 className="text-xl font-bold">Verify</h3>
            <p className="text-muted-foreground">Visit an Orb to verify your World ID. The Orb ensures you are a real and unique person.</p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-xl font-mono">3</div>
            <h3 className="text-xl font-bold">Use Anywhere</h3>
            <p className="text-muted-foreground">Sign in to apps and websites seamlessly, proving you're human without sharing personal data.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
