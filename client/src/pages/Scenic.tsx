import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, ChevronUp } from "lucide-react";
import ImageGallery from "@/components/ImageGallery";

interface Park {
  id: string;
  name: string;
  scenic: string[];
}

const galleryImages: Record<string, string[]> = {
  macritchie: [
    "https://images.unsplash.com/photo-1626078302214-2734953673d6?q=80&w=800&auto=format&fit=crop", // MacRitchie specific
    "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=800&auto=format&fit=crop", // Nature
    "https://images.unsplash.com/photo-1533241241368-7f362925283c?q=80&w=800&auto=format&fit=crop", // Bridge/Nature
  ],
  bukittimah: [
    "https://images.unsplash.com/photo-1632972768860-5c2724137023?q=80&w=800&auto=format&fit=crop", // Bukit Timah
    "https://images.unsplash.com/photo-1449157291145-7efd4cf87e1e?q=80&w=800&auto=format&fit=crop", // Forest
    "https://images.unsplash.com/photo-1518182170546-0766bc6e9236?q=80&w=800&auto=format&fit=crop", // Trail
  ],
  railcorridor: [
    "https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=800&auto=format&fit=crop", // Rail track
    "https://images.unsplash.com/photo-1470137430626-983a37b8ea46?q=80&w=800&auto=format&fit=crop", // Greenery
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop", // Nature
  ],
  coneyisland: [
    "https://images.unsplash.com/photo-1669286598887-8617d1857583?q=80&w=800&auto=format&fit=crop", // Coney Island
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop", // Beach
    "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=800&auto=format&fit=crop", // Coastal
  ],
  sungeibuloh: [
    "https://images.unsplash.com/photo-1634488385849-b95663e90927?q=80&w=800&auto=format&fit=crop", // Sungei Buloh
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800&auto=format&fit=crop", // Wetland
    "https://images.unsplash.com/photo-1589556264800-08ae9e129a8c?q=80&w=800&auto=format&fit=crop", // Mangrove
  ],
  labrador: [
    "https://images.unsplash.com/photo-1623266663148-3a1985270c84?q=80&w=800&auto=format&fit=crop", // Coastal/Park
    "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?q=80&w=800&auto=format&fit=crop", // Nature
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=800&auto=format&fit=crop", // Scenic
  ],
};

export default function Scenic() {
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

  return (
    <Layout>
      <div className="bg-gradient-to-b from-secondary/30 to-background">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4" data-testid="text-page-title">
              Scenic Highlights
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover the must-see attractions and breathtaking views at each nature reserve, from suspension bridges to coastal boardwalks.
            </p>
          </div>

          <div className="max-w-5xl mx-auto space-y-8">
            {parks.map((park) => (
              <Card
                key={park.id}
                id={park.id}
                className="scroll-mt-24 shadow-md hover-elevate transition-all"
                data-testid={`card-scenic-${park.id}`}
              >
                <CardHeader className="bg-gradient-to-r from-accent/20 to-secondary/20">
                  <CardTitle className="text-2xl md:text-3xl text-foreground flex items-center gap-2">
                    <Sparkles className="w-7 h-7 text-primary" />
                    <span data-testid={`text-park-name-${park.id}`}>{park.name}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  <div className="space-y-4">
                    {park.scenic.map((highlight, idx) => {
                      const [title, ...descParts] = highlight.split(" - ");
                      const description = descParts.join(" - ");

                      return (
                        <div
                          key={idx}
                          className="flex gap-4 p-5 bg-muted/30 rounded-lg border border-border hover-elevate transition-all"
                          data-testid={`item-highlight-${park.id}-${idx}`}
                        >
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                            <span className="text-primary font-bold text-lg">{idx + 1}</span>
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-foreground text-lg mb-2">
                              {title}
                            </h3>
                            {description && (
                              <p className="text-foreground leading-relaxed">
                                {description}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-6">
                    <ImageGallery
                      parkName={park.name}
                      images={galleryImages[park.id] || []}
                    />
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
