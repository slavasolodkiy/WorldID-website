import { Link } from "wouter";
import { useSubscribeNewsletter, useHealthCheck, getHealthCheckQueryKey } from "@workspace/api-client-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { track } from "@/lib/analytics";

const APP_STORE_URL = "https://apps.apple.com/app/world-app/id1560859277";
const GOOGLE_PLAY_URL = "https://play.google.com/store/apps/details?id=com.worldcoin";

export function Footer() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [subscribed, setSubscribed] = useState(false);
  const subscribe = useSubscribeNewsletter();
  useHealthCheck({ query: { queryKey: getHealthCheckQueryKey(), refetchInterval: 30000 } });
  const { toast } = useToast();

  const validateEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError(null);

    if (!email) {
      setEmailError("Please enter your email address.");
      return;
    }
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    track({ event: "newsletter_subscribe_attempt", location: "footer" });

    subscribe.mutate(
      { data: { email } },
      {
        onSuccess: () => {
          track({ event: "newsletter_subscribe_success", location: "footer" });
          toast({ title: "You're subscribed!", description: "We'll send updates to " + email });
          setEmail("");
          setSubscribed(true);
        },
        onError: () => {
          track({ event: "newsletter_subscribe_error", location: "footer" });
          toast({
            title: "Subscription failed",
            description: "Please try again later.",
            variant: "destructive",
          });
        },
      }
    );
  };

  return (
    <footer className="border-t border-border/50 py-16 px-6 mt-24 bg-background">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-6 gap-12">
        {/* ── Brand + Newsletter ─────────────────────────────────── */}
        <div className="col-span-1 lg:col-span-2">
          <div className="flex items-center gap-8 mb-6">
            <Link href="/" className="text-xl font-bold tracking-tighter flex items-center gap-2">
              <div className="w-4 h-4 rounded-full border-2 border-white" />
              <span>World</span>
            </Link>
            <Link href="/tools-for-humanity" className="text-xl font-bold tracking-tighter flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-white" />
              <span>Tools for Humanity</span>
            </Link>
          </div>
          <p className="text-muted-foreground text-sm max-w-md mb-8">
            The marketing website for World and Tools for Humanity. Get the World App to
            verify your unique personhood.
          </p>

          {subscribed ? (
            <p className="text-sm text-green-400">Thanks for subscribing!</p>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-2 max-w-sm" noValidate>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError(null);
                  }}
                  aria-label="Email for newsletter"
                  aria-describedby={emailError ? "footer-email-error" : undefined}
                  aria-invalid={emailError ? "true" : undefined}
                  className="flex-1 bg-white/5 border border-border/50 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-white transition-all aria-invalid:border-red-500/60"
                />
                <button
                  type="submit"
                  disabled={subscribe.isPending}
                  className="px-4 py-2 bg-white text-black text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 shrink-0"
                >
                  {subscribe.isPending ? "Saving…" : "Subscribe"}
                </button>
              </div>
              {emailError && (
                <p id="footer-email-error" role="alert" className="text-xs text-red-400">
                  {emailError}
                </p>
              )}
            </form>
          )}
        </div>

        {/* ── World Network column ───────────────────────────────── */}
        <div>
          <h4 className="font-medium mb-4 text-sm">World Network</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><Link href="/" className="hover:text-foreground transition-colors">Home</Link></li>
            <li><Link href="/world-id" className="hover:text-foreground transition-colors">World ID</Link></li>
            <li><Link href="/ecosystem" className="hover:text-foreground transition-colors">Ecosystem</Link></li>
            <li>
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noreferrer"
                className="hover:text-foreground transition-colors"
                onClick={() => track({ event: "cta_app_store_click", location: "footer" })}
              >
                App Store ↗
              </a>
            </li>
            <li>
              <a
                href={GOOGLE_PLAY_URL}
                target="_blank"
                rel="noreferrer"
                className="hover:text-foreground transition-colors"
                onClick={() => track({ event: "cta_google_play_click", location: "footer" })}
              >
                Google Play ↗
              </a>
            </li>
          </ul>
        </div>

        {/* ── Tools for Humanity column ──────────────────────────── */}
        <div>
          <h4 className="font-medium mb-4 text-sm">Tools for Humanity</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><Link href="/tools-for-humanity" className="hover:text-foreground transition-colors">Company</Link></li>
            <li><Link href="/orb" className="hover:text-foreground transition-colors">The Orb</Link></li>
            <li>
              <Link
                href="/orb#become-operator"
                className="hover:text-foreground transition-colors"
                onClick={() => track({ event: "cta_become_operator_click", location: "footer" })}
              >
                Operator Program
              </Link>
            </li>
            <li><Link href="/team" className="hover:text-foreground transition-colors">Team</Link></li>
          </ul>
        </div>

        {/* ── Developers column ──────────────────────────────────── */}
        <div>
          <h4 className="font-medium mb-4 text-sm">Developers</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>
              <Link
                href="/developers"
                className="hover:text-foreground transition-colors"
                onClick={() => track({ event: "nav_link_click", destination: "/developers" })}
              >
                Developer Resources
              </Link>
            </li>
            <li>
              <a
                href="https://developer.worldcoin.org"
                target="_blank"
                rel="noreferrer"
                className="hover:text-foreground transition-colors"
                onClick={() => track({ event: "cta_developer_docs_click", destination: "developer.worldcoin.org", location: "footer" })}
              >
                Protocol Docs ↗
              </a>
            </li>
            <li>
              <a
                href="https://github.com/worldcoin"
                target="_blank"
                rel="noreferrer"
                className="hover:text-foreground transition-colors"
                onClick={() => track({ event: "cta_github_click", repo: "worldcoin", location: "footer" })}
              >
                GitHub ↗
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between text-xs text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} World & Tools for Humanity. All rights reserved.</p>
        <div className="flex items-center gap-6 mt-4 md:mt-0">
          <a href="https://world.org/privacy" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">Privacy</a>
          <a href="https://world.org/terms" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  );
}
