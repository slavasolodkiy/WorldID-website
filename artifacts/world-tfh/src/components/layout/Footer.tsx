import { Link } from "wouter";
import { useSubscribeNewsletter, useHealthCheck, getHealthCheckQueryKey } from "@workspace/api-client-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function Footer() {
  const [email, setEmail] = useState("");
  const subscribe = useSubscribeNewsletter();
  const { data: health } = useHealthCheck({ query: { queryKey: getHealthCheckQueryKey(), refetchInterval: 30000 } });
  const { toast } = useToast();


  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    subscribe.mutate({ data: { email } }, {
      onSuccess: () => {
        toast({
          title: "Subscribed successfully",
          description: "You'll receive our next update.",
        });
        setEmail("");
      },
      onError: () => {
        toast({
          title: "Subscription failed",
          description: "Please try again later.",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <footer className="border-t border-border/50 py-16 px-6 mt-24 bg-background">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">
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
            Building the world's largest human identity and financial network.
            Designed for a future where humans and AI coexist equitably.
          </p>

          <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-white/5 border border-border/50 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-white transition-all"
              required
            />
            <button 
              type="submit" 
              disabled={subscribe.isPending}
              className="px-4 py-2 bg-white text-black text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              {subscribe.isPending ? "..." : "Subscribe"}
            </button>
          </form>
        </div>

        <div>
          <h4 className="font-medium mb-4">World Network</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><Link href="/" className="hover:text-foreground transition-colors">Home</Link></li>
            <li><Link href="/world-id" className="hover:text-foreground transition-colors">World ID</Link></li>
            <li><Link href="/ecosystem" className="hover:text-foreground transition-colors">Ecosystem</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-medium mb-4">Tools for Humanity</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><Link href="/tools-for-humanity" className="hover:text-foreground transition-colors">Company</Link></li>
            <li><Link href="/orb" className="hover:text-foreground transition-colors">The Orb</Link></li>
            <li><Link href="/team" className="hover:text-foreground transition-colors">Team</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between text-xs text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} World & Tools for Humanity. All rights reserved.</p>
        <div className="flex items-center gap-6 mt-4 md:mt-0">
          <span className="hover:text-foreground transition-colors cursor-pointer">Privacy</span>
          <span className="hover:text-foreground transition-colors cursor-pointer">Terms</span>
        </div>
      </div>
    </footer>
  );
}
