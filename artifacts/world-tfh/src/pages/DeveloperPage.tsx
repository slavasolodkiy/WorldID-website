import { Link } from "wouter";

const PRODUCT_LINKS = [
  {
    label: "World App",
    description: "The end-user identity wallet. Available on iOS and Android.",
    links: [
      { text: "App Store", href: "https://apps.apple.com/app/world-app/id1560859277" },
      { text: "Google Play", href: "https://play.google.com/store/apps/details?id=com.worldcoin" },
    ],
  },
  {
    label: "World ID Protocol Docs",
    description: "Integrate World ID into your app. Verification flows, SDK reference, and quickstarts.",
    links: [
      { text: "developer.worldcoin.org", href: "https://developer.worldcoin.org" },
    ],
  },
  {
    label: "GitHub",
    description: "Open-source repositories for the World ecosystem.",
    links: [
      { text: "World ID Apple", href: "https://github.com/slavasolodkiy/WorldID-Apple" },
      { text: "worldcoin on GitHub", href: "https://github.com/worldcoin" },
    ],
  },
  {
    label: "Ecosystem",
    description: "Apps already integrating World ID. Use these as integration references.",
    links: [
      { text: "View Ecosystem", href: "/ecosystem" },
    ],
  },
];

export function DeveloperPage() {
  return (
    <div className="w-full flex flex-col min-h-screen pt-24">
      <section className="px-6 py-20 max-w-4xl mx-auto w-full">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-6 text-xs font-medium">
            Developers
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
            Build with World ID
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            This is the World marketing website. Core product engineering resources — SDK
            documentation, identity protocol specs, and the wallet backend — live in the
            product repositories and developer portal linked below.
          </p>
        </div>

        <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 px-6 py-4 mb-12">
          <p className="text-sm text-amber-200/80 leading-relaxed">
            <strong className="text-amber-200">Note:</strong> This website's API is a
            marketing content API (stats, ecosystem directory, team bios, newsletter). It
            is not the World ID verification or wallet API. Use the links below to access
            the actual developer resources.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {PRODUCT_LINKS.map((item) => (
            <div
              key={item.label}
              className="p-6 rounded-2xl border border-border/50 bg-card hover:border-white/20 transition-colors"
            >
              <h2 className="text-lg font-bold mb-2">{item.label}</h2>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                {item.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {item.links.map((link) =>
                  link.href.startsWith("/") ? (
                    <Link
                      key={link.text}
                      href={link.href}
                      className="text-sm px-3 py-1.5 rounded-full border border-white/20 hover:bg-white/10 transition-colors"
                    >
                      {link.text} →
                    </Link>
                  ) : (
                    <a
                      key={link.text}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm px-3 py-1.5 rounded-full border border-white/20 hover:bg-white/10 transition-colors"
                    >
                      {link.text} ↗
                    </a>
                  )
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-border/50 pt-12">
          <h2 className="text-2xl font-bold mb-3">Not finding what you need?</h2>
          <p className="text-muted-foreground mb-6">
            Sign up for developer updates and we'll let you know when new integration
            resources are available.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors text-sm"
          >
            ← Back to Home
          </Link>
        </div>
      </section>
    </div>
  );
}
