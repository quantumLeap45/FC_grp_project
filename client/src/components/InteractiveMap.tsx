import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation } from "lucide-react";

interface Park {
  id: string;
  name: string;
  overview: string;
  difficulty: string;
  coordinates?: { lat: number; lng: number };
  mapUrl: string;
}

interface InteractiveMapProps {
  parks: Park[];
}

const parkCoordinates: Record<string, { lat: number; lng: number }> = {
  macritchie: { lat: 1.3489, lng: 103.8265 },
  bukittimah: { lat: 1.3547, lng: 103.7776 },
  railcorridor: { lat: 1.3635, lng: 103.7644 },
  coneyisland: { lat: 1.4118, lng: 103.9303 },
  sungeibuloh: { lat: 1.4453, lng: 103.7299 },
  labrador: { lat: 1.2718, lng: 103.8024 },
};

export default function InteractiveMap({ parks }: InteractiveMapProps) {
  const [selectedPark, setSelectedPark] = useState<string | null>(null);

  const selectedParkData = parks.find((p) => p.id === selectedPark);

  const centerLat = 1.3521;
  const centerLng = 103.8198;

  const getMapUrl = (parkId: string | null) => {
    if (!parkId) {
      return `https://www.google.com/maps/embed/v1/place?key=&q=Singapore&center=${centerLat},${centerLng}&zoom=11`;
    }
    const coords = parkCoordinates[parkId];
    if (coords) {
      return `https://www.google.com/maps/embed/v1/place?key=&q=${coords.lat},${coords.lng}&center=${coords.lat},${coords.lng}&zoom=14`;
    }
    return `https://www.google.com/maps/embed/v1/place?key=&q=Singapore&center=${centerLat},${centerLng}&zoom=11`;
  };

  return (
    <div className="w-full">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 order-2 md:order-1">
          <Card className="overflow-hidden shadow-lg">
            <CardContent className="p-0">
              <div className="relative w-full" style={{ paddingBottom: "75%" }}>
                <div className="absolute inset-0 bg-muted/20 flex items-center justify-center">
                  <div className="text-center p-8">
                    <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {selectedParkData ? selectedParkData.name : "Select a Park"}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {selectedParkData
                        ? "Click 'View on Google Maps' to see directions"
                        : "Choose a park from the list to view its location"}
                    </p>
                    {selectedParkData && (
                      <Button
                        asChild
                        size="lg"
                        data-testid={`button-open-map-${selectedParkData.id}`}
                      >
                        <a
                          href={selectedParkData.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Navigation className="w-4 h-4 mr-2" />
                          View on Google Maps
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-1 order-1 md:order-2">
          <Card className="shadow-lg">
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Park Locations
              </h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {parks.map((park) => (
                  <button
                    key={park.id}
                    onClick={() => setSelectedPark(park.id)}
                    className={`w-full text-left p-3 rounded-lg border transition-all hover-elevate active-elevate-2 ${
                      selectedPark === park.id
                        ? "bg-primary/10 border-primary"
                        : "bg-background border-border"
                    }`}
                    data-testid={`button-select-park-${park.id}`}
                  >
                    <div className="flex items-start gap-2">
                      <MapPin
                        className={`w-4 h-4 mt-1 flex-shrink-0 ${
                          selectedPark === park.id ? "text-primary" : "text-muted-foreground"
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-foreground text-sm mb-1">
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
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
