import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import Finder from "@/pages/Finder";
import Directions from "@/pages/Directions";
import Scenic from "@/pages/Scenic";
import Safety from "@/pages/Safety";
import Credits from "@/pages/Credits";
import Reviews from "@/pages/Reviews";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/finder" component={Finder} />
      <Route path="/directions" component={Directions} />
      <Route path="/scenic" component={Scenic} />
      <Route path="/safety" component={Safety} />
      <Route path="/reviews" component={Reviews} />
      <Route path="/credits" component={Credits} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
