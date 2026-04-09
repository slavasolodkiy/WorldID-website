import { useState } from "react";
import { Link } from "wouter";
import { useSubscribeNewsletter } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { track } from "@/lib/analytics";

function DeveloperNewsletter() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [subscribed, setSubscribed] = useState(false);
  const subscribe = useSubscribeNewsletter();
  const { toast } = useToast();

  const validateEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError(null);
    if (!email) { setEmailError("Please enter your email address."); return; }
    if (!validateEmail(email)) { setEmailError("Please enter a valid email address."); return; }

    track({ event: "newsletter_subscribe_attempt", location: "developers_page" });
    subscribe.mutate(
      { data: { email } },
      {
        onSuccess: () => {
          track({ event: "newsletter_subscribe_success", location: "developers_page" });
          toast({ title: "You're subscribed!", description: "We'll notify you when new developer resources are available." });
          setEmail("");
          setSubscribed(true);
        },
        onError: () => {
          track({ event: "newsletter_subscribe_error", location: "developers_page" });
          toast({ title: "Subscription failed", description: "Please try again later.", variant: "destructive" });
        },
      }
    );
  };

  return (
    <div className="border-t border-border/50 pt-12">
      <h2 className="text-2xl font-bold mb-3">Stay in the loop</h2>
      <p className="text-muted-foreground mb-6 max-w-lg">
        New developer resources, SDK releases, and integration guides. Subscribe for
        updates — no spam, unsubscribe any time.
      </p>
      {subscribed ? (
        <p className="text-sm text-green-400">Thanks! We'll keep you posted.</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-2" noValidate>
          <div className="flex gap-2 max-w-sm">
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); if (emailError) setEmailError(null); }}
              aria-label="Email for developer updates"
              aria-invalid={emailError ? "true" : undefined}
              className="flex-1 bg-white/5 border border-border/50 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-white transition-all aria-invalid:border-red-500/60"
            />
            <button
              type="submit"
              disabled={subscribe.isPending}
              className="px-4 py-2 bg-white text-black text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 shrink-0"
            >
              {subscribe.isPending ? "Saving…" : "Notify me"}
            </button>
          </div>
          {emailError && <p role="alert" className="text-xs text-red-400">{emailError}</p>}
        </form>
      )}
    </div>
  );
}

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
                      onClick={() => track({ event: "nav_link_click", destination: link.href })}
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
                      onClick={() => track({ event: "cta_developer_docs_click", destination: link.href, location: "developers_page" })}
                    >
                      {link.text} ↗
                    </a>
                  )
                )}
              </div>
            </div>
          ))}
        </div>

        <DeveloperNewsletter />
      </section>
    </div>
  );
}
