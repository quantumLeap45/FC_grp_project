import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import InteractiveMap from "@/components/InteractiveMap";

interface Park {
  id: string;
  name: string;
  overview: string;
  difficulty: string;
  mapUrl: string;
}

export default function Home() {
  const [parks, setParks] = useState<Park[]>([]);

  useEffect(() => {
    fetch("/data/parks.json")
      .then((res) => res.json())
      .then((data) => setParks(data))
      .catch((err) => console.error("Failed to load parks data:", err));
  }, []);
  return (
    <Layout>
      <div className="relative">
        <div
          className="h-[60vh] md:h-[70vh] bg-gradient-to-br from-primary/20 via-accent/30 to-secondary/20 relative overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(rgba(46, 125, 50, 0.7), rgba(46, 125, 50, 0.85)), url('data:image/svg+xml,%3Csvg width="100" height="100" xmlns="http://www.w3.org/2000/svg"%3E%3Cdefs%3E%3Cpattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse"%3E%3Cpath d="M 20 0 L 0 0 0 20" fill="none" stroke="%23A8D5A2" stroke-width="0.5" opacity="0.1"/%3E%3C/pattern%3E%3C/defs%3E%3Crect width="100" height="100" fill="url(%23grid)" /%3E%3C/svg%3E')`,
            backgroundSize: "cover, 100px 100px",
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="container mx-auto px-4 text-center">
              <div className="max-w-3xl mx-auto space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight" data-testid="text-hero-title">
                  Exploring Singapore's Green Gems
                </h1>
                <div className="h-1 w-24 bg-accent mx-auto rounded-full"></div>
                <p className="text-xl md:text-2xl text-white/95 leading-relaxed" data-testid="text-hero-subtitle">
                  Discover pristine nature reserves, scenic trails, and rich biodiversity across Singapore's six most treasured green spaces
                </p>
                <p className="text-lg md:text-xl text-white/90 italic" data-testid="text-hero-tagline">
                  Find your next outdoor adventure, from coastal boardwalks to rainforest summits
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-background">
          <div className="container mx-auto px-4 py-16 md:py-20">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                <div className="bg-card border border-card-border rounded-lg p-8 shadow-sm hover-elevate transition-all">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                    Our Purpose
                  </h2>
                  <p className="text-lg text-foreground leading-relaxed">
                    This guide helps you explore Singapore's natural heritage with comprehensive information about trails, accessibility, scenic highlights, and safety tips for each location. Whether you're a seasoned hiker or first-time explorer, find everything you need for a memorable outdoor experience.
                  </p>
                </div>

                <div className="bg-card border border-card-border rounded-lg p-8 shadow-sm hover-elevate transition-all">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                    What You Can Do Here
                  </h2>
                  <ul className="space-y-3 text-lg text-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold mt-1">•</span>
                      <span>Browse detailed information about six premier nature reserves and parks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold mt-1">•</span>
                      <span>Get accurate directions via MRT, bus, and car with interactive maps</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold mt-1">•</span>
                      <span>Discover scenic highlights and must-see attractions at each location</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold mt-1">•</span>
                      <span>Learn essential safety guidelines and packing tips for trail adventures</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-16">
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                    Explore Park Locations
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Select a park to view its location and get directions
                  </p>
                </div>
                {parks.length > 0 && <InteractiveMap parks={parks} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
