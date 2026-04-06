import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

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
              <Link href="/world-id" className={cn("transition-colors hover:text-foreground", location === "/world-id" && "text-foreground")}>World ID</Link>
              <Link href="/ecosystem" className={cn("transition-colors hover:text-foreground", location === "/ecosystem" && "text-foreground")}>Ecosystem</Link>
              <Link href="/tools-for-humanity" className="transition-colors hover:text-foreground">Company</Link>
            </>
          ) : (
            <>
              <Link href="/orb" className={cn("transition-colors hover:text-foreground", location === "/orb" && "text-foreground")}>The Orb</Link>
              <Link href="/team" className={cn("transition-colors hover:text-foreground", location === "/team" && "text-foreground")}>Team</Link>
              <Link href="/" className="transition-colors hover:text-foreground">World Network</Link>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Link href={isTfh ? "/" : "/tools-for-humanity"} className="text-xs font-medium px-3 py-1.5 rounded-full border border-border/50 bg-secondary/50 hover:bg-secondary transition-colors">
          {isTfh ? "Go to World" : "Go to TFH"}
        </Link>
      </div>
    </nav>
  );
}
