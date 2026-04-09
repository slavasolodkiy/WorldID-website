import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";

const APP_STORE_URL = "https://apps.apple.com/app/world-app/id1560859277";

export function Navbar() {
  const [location] = useLocation();

  const isTfh = location.startsWith("/tools-for-humanity") || location === "/orb" || location === "/team";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-background/50 border-b border-border/50">
      <div className="flex items-center gap-8">
        <Link href={isTfh ? "/tools-for-humanity" : "/"} className="text-xl font-bold tracking-tighter flex items-center gap-2">
          {isTfh ? (
            <>
              <div className="w-5 h-5 rounded-full bg-white" />
              <span>Tools for Humanity</span>
            </>
          ) : (
            <>
              <div className="w-5 h-5 rounded-full border-2 border-white" />
              <span>World</span>
            </>
          )}
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          {!isTfh ? (
            <>
              <Link
                href="/world-id"
                className={cn("transition-colors hover:text-foreground", location === "/world-id" && "text-foreground")}
                onClick={() => track({ event: "nav_link_click", destination: "/world-id" })}
              >
                World ID
              </Link>
              <Link
                href="/ecosystem"
                className={cn("transition-colors hover:text-foreground", location === "/ecosystem" && "text-foreground")}
                onClick={() => track({ event: "nav_link_click", destination: "/ecosystem" })}
              >
                Ecosystem
              </Link>
              <Link
                href="/tools-for-humanity"
                className="transition-colors hover:text-foreground"
                onClick={() => track({ event: "nav_link_click", destination: "/tools-for-humanity" })}
              >
                Company
              </Link>
              <Link
                href="/developers"
                className={cn("transition-colors hover:text-foreground", location === "/developers" && "text-foreground")}
                onClick={() => track({ event: "nav_link_click", destination: "/developers" })}
              >
                Developers
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/orb"
                className={cn("transition-colors hover:text-foreground", location === "/orb" && "text-foreground")}
                onClick={() => track({ event: "nav_link_click", destination: "/orb" })}
              >
                The Orb
              </Link>
              <Link
                href="/orb#become-operator"
                className="transition-colors hover:text-foreground"
                onClick={() => track({ event: "cta_become_operator_click", location: "navbar" })}
              >
                Operators
              </Link>
              <Link
                href="/team"
                className={cn("transition-colors hover:text-foreground", location === "/team" && "text-foreground")}
                onClick={() => track({ event: "nav_link_click", destination: "/team" })}
              >
                Team
              </Link>
              <Link
                href="/"
                className="transition-colors hover:text-foreground"
                onClick={() => track({ event: "nav_link_click", destination: "/" })}
              >
                World Network
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Link
          href={isTfh ? "/" : "/tools-for-humanity"}
          className="text-xs font-medium px-3 py-1.5 rounded-full border border-border/50 bg-secondary/50 hover:bg-secondary transition-colors"
          onClick={() => track({ event: "nav_link_click", destination: isTfh ? "/" : "/tools-for-humanity" })}
        >
          {isTfh ? "Go to World" : "Go to TFH"}
        </Link>
        {!isTfh && (
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noreferrer"
            className="text-xs font-medium px-3 py-1.5 rounded-full bg-white text-black hover:bg-gray-200 transition-colors"
            onClick={() => track({ event: "cta_app_store_click", location: "navbar" })}
          >
            Get App
          </a>
        )}
      </div>
    </nav>
  );
}
