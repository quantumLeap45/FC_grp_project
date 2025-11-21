import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Train, Bus, Car, MapPin, ChevronUp, ExternalLink } from "lucide-react";

interface Park {
  id: string;
  name: string;
  transport: {
    mrt: string;
    bus: string;
    car: string;
  };
  mapUrl: string;
}

export default function Directions() {
  const [parks, setParks] = useState<Park[]>([]);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    fetch("/data/parks.json")
      .then((res) => res.json())
      .then((data) => setParks(data))
      .catch((err) => console.error("Failed to load parks data:", err));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getMapPlaceholder = (parkName: string) => {
    return `data:image/svg+xml,%3Csvg width="600" height="400" xmlns="http://www.w3.org/2000/svg"%3E%3Crect width="600" height="400" fill="%23A8D5A2"/%3E%3Ctext x="50%25" y="45%25" font-family="Arial" font-size="18" fill="%232E7D32" text-anchor="middle" dominant-baseline="middle"%3E${encodeURIComponent(parkName)}%3C/text%3E%3Ctext x="50%25" y="55%25" font-family="Arial" font-size="14" fill="%232E7D32" text-anchor="middle" dominant-baseline="middle"%3ERoute Map Placeholder%3C/text%3E%3C/svg%3E`;
  };

  return (
    <Layout>
      <div className="bg-gradient-to-b from-secondary/30 to-background">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4" data-testid="text-page-title">
              Directions & Access
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Find the best routes to each park via public transport or private vehicle, complete with map references and Google Maps links.
            </p>
          </div>

          <div className="max-w-5xl mx-auto space-y-10">
            {parks.map((park) => (
              <Card
                key={park.id}
                id={park.id}
                className="scroll-mt-24 shadow-md overflow-hidden"
                data-testid={`card-directions-${park.id}`}
              >
                <CardHeader className="bg-secondary/20">
                  <CardTitle className="text-2xl md:text-3xl text-foreground" data-testid={`text-park-name-${park.id}`}>
                    {park.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  <div className="space-y-4">
                    <div className="flex gap-3 p-4 bg-muted/30 rounded-lg border border-border">
                      <Train className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1">MRT</h3>
                        <p className="text-foreground leading-relaxed" data-testid={`text-mrt-${park.id}`}>
                          {park.transport.mrt}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3 p-4 bg-muted/30 rounded-lg border border-border">
                      <Bus className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1">Bus</h3>
                        <p className="text-foreground leading-relaxed" data-testid={`text-bus-${park.id}`}>
                          {park.transport.bus}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3 p-4 bg-muted/30 rounded-lg border border-border">
                      <Car className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1">Car</h3>
                        <p className="text-foreground leading-relaxed" data-testid={`text-car-${park.id}`}>
                          {park.transport.car}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-foreground text-lg">Route Map</h3>
                    <div className="rounded-lg overflow-hidden border border-border shadow-sm">
                      <img
                        src={getMapPlaceholder(park.name)}
                        alt={`Route map showing directions from nearest MRT station to ${park.name}`}
                        className="w-full h-auto object-cover"
                        data-testid={`img-map-${park.id}`}
                      />
                    </div>
                    <Button
                      variant="default"
                      className="w-full sm:w-auto"
                      asChild
                      data-testid={`button-google-maps-${park.id}`}
                    >
                      <a
                        href={park.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2"
                      >
                        <MapPin className="w-4 h-4" />
                        Open in Google Maps
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </Button>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <a
                      href="#top"
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToTop();
                      }}
                      className="text-primary hover:underline font-medium inline-flex items-center gap-1"
                      data-testid={`link-back-to-top-${park.id}`}
                    >
                      <ChevronUp className="w-4 h-4" />
                      Back to top
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {showBackToTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 rounded-full w-12 h-12 shadow-lg z-30"
          size="icon"
          data-testid="button-scroll-to-top"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-5 h-5" />
        </Button>
      )}
    </Layout>
  );
}
