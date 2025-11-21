import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import ReviewSection from "@/components/ReviewSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Park {
  id: string;
  name: string;
  difficulty: string;
}

export default function Reviews() {
  const [parks, setParks] = useState<Park[]>([]);
  const [selectedPark, setSelectedPark] = useState<string | null>(null);

  useEffect(() => {
    fetch("/data/parks.json")
      .then((res) => res.json())
      .then((data) => {
        setParks(data);
        if (data.length > 0) {
          setSelectedPark(data[0].id);
        }
      })
      .catch((err) => console.error("Failed to load parks data:", err));
  }, []);

  const selectedParkData = parks.find((p) => p.id === selectedPark);

  return (
    <Layout>
      <div className="bg-gradient-to-b from-secondary/30 to-background">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4" data-testid="text-page-title">
              Park Reviews & Ratings
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Read visitor experiences and share your own reviews of Singapore's nature parks
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Select a Park</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                  {parks.map((park) => (
                    <button
                      key={park.id}
                      onClick={() => setSelectedPark(park.id)}
                      className={`p-3 rounded-lg border text-left transition-all hover-elevate active-elevate-2 ${
                        selectedPark === park.id
                          ? "bg-primary/10 border-primary"
                          : "bg-background border-border"
                      }`}
                      data-testid={`button-select-park-${park.id}`}
                    >
                      <div className="font-medium text-sm text-foreground mb-2">
                        {park.name}
                      </div>
                      <Badge
                        variant={
                          park.difficulty === "Easy"
                            ? "secondary"
                            : park.difficulty === "Moderate"
                              ? "default"
                              : "destructive"
                        }
                        className="text-xs"
                      >
                        {park.difficulty}
                      </Badge>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {selectedParkData && (
              <ReviewSection
                parkId={selectedParkData.id}
                parkName={selectedParkData.name}
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
