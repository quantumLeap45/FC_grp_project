import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, TrendingUp, Droplets, Home as Toilet, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Park {
  id: string;
  name: string;
  overview: string;
  difficulty: string;
  duration: string;
  amenities: string[];
  hours: string;
}

export default function Finder() {
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

  const getDifficultyColor = (difficulty: string) => {
    const lower = difficulty.toLowerCase();
    if (lower === "easy") return "bg-green-100 text-green-800 border-green-200";
    if (lower === "moderate") return "bg-yellow-100 text-yellow-800 border-yellow-200";
    return "bg-red-100 text-red-800 border-red-200";
  };

  const amenityIcons: Record<string, React.ReactNode> = {
    "Toilets": <Toilet className="w-4 h-4" />,
    "Water fountains": <Droplets className="w-4 h-4" />,
    "Water coolers": <Droplets className="w-4 h-4" />,
  };

  return (
    <Layout>
      <div className="bg-gradient-to-b from-secondary/30 to-background">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4" data-testid="text-page-title">
              Park Finder
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore detailed information about each park including difficulty levels, estimated duration, and available amenities to plan your perfect outdoor adventure.
            </p>
          </div>

          <div className="max-w-5xl mx-auto space-y-8">
            {parks.map((park) => (
              <Card
                key={park.id}
                id={park.id}
                className="scroll-mt-24 shadow-md hover-elevate transition-all"
                data-testid={`card-park-${park.id}`}
              >
                <CardHeader className="bg-secondary/20">
                  <CardTitle className="text-2xl md:text-3xl text-foreground flex items-center justify-between flex-wrap gap-4">
                    <span data-testid={`text-park-name-${park.id}`}>{park.name}</span>
                    <Badge
                      variant="outline"
                      className={`text-sm px-4 py-1 ${getDifficultyColor(park.difficulty)}`}
                      data-testid={`badge-difficulty-${park.id}`}
                    >
                      <TrendingUp className="w-4 h-4 mr-1" />
                      {park.difficulty}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  <p className="text-lg text-foreground leading-relaxed" data-testid={`text-overview-${park.id}`}>
                    {park.overview}
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg border border-border">
                      <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                      <div>
                        <div className="text-sm text-muted-foreground">Duration</div>
                        <div className="font-semibold text-foreground" data-testid={`text-duration-${park.id}`}>
                          {park.duration}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg border border-border">
                      <div className="text-primary">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Hours</div>
                        <div className="font-semibold text-foreground text-sm" data-testid={`text-hours-${park.id}`}>
                          {park.hours}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground mb-3 text-lg">Amenities</h3>
                    <div className="flex flex-wrap gap-2" data-testid={`list-amenities-${park.id}`}>
                      {park.amenities.map((amenity, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="px-3 py-1.5 text-sm flex items-center gap-1.5"
                        >
                          {amenityIcons[amenity] || null}
                          {amenity}
                        </Badge>
                      ))}
                    </div>
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
