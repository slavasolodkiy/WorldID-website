import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";

import { Home } from "./pages/Home";
import { ToolsForHumanity } from "./pages/ToolsForHumanity";
import { OrbPage } from "./pages/OrbPage";
import { WorldIdPage } from "./pages/WorldIdPage";
import { EcosystemPage } from "./pages/EcosystemPage";
import { TeamPage } from "./pages/TeamPage";
import { DeveloperPage } from "./pages/DeveloperPage";
import { useEffect } from "react";

const queryClient = new QueryClient();

function Router() {
  return (
    <div className="min-h-[100dvh] flex flex-col w-full">
      <Navbar />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/tools-for-humanity" component={ToolsForHumanity} />
          <Route path="/orb" component={OrbPage} />
          <Route path="/world-id" component={WorldIdPage} />
          <Route path="/ecosystem" component={EcosystemPage} />
          <Route path="/team" component={TeamPage} />
          <Route path="/developers" component={DeveloperPage} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  useEffect(() => {
    // Force dark mode
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
