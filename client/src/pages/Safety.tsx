import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Cloud, Backpack, Shield, Users, Leaf } from "lucide-react";

export default function Safety() {
  const safetyGuidelines = [
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Stay on designated trails",
      description: "Protect wildlife habitats and ensure your safety by keeping to marked paths"
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Respect wildlife",
      description: "Observe animals from a distance, never feed them, and maintain silence in nature reserves"
    },
    {
      icon: <Leaf className="w-5 h-5" />,
      title: "Leave no trace",
      description: "Carry out all trash, avoid picking plants, and preserve nature for future visitors"
    },
    {
      icon: <AlertTriangle className="w-5 h-5" />,
      title: "Check trail closures",
      description: "Verify that your chosen trail is open before visiting, as maintenance closures occur periodically"
    }
  ];

  const packingList = [
    "Water (at least 1 liter per person)",
    "Sun protection (hat, sunglasses, sunscreen SPF 30+)",
    "Rain gear (umbrella or light waterproof jacket)",
    "Comfortable closed-toe shoes with good grip",
    "Insect repellent",
    "Basic first-aid supplies",
    "Fully charged mobile phone",
    "Light snacks or energy bars",
    "Personal medications if needed"
  ];

  return (
    <Layout>
      <div className="bg-gradient-to-b from-secondary/30 to-background">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4" data-testid="text-page-title">
              Safety & Etiquette
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Essential guidelines and packing tips to ensure a safe, enjoyable, and responsible outdoor experience.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
              <div className="space-y-8">
                <Card className="shadow-md">
                  <CardContent className="pt-6">
                    <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                      <Shield className="w-6 h-6 text-primary" />
                      Safety Guidelines
                    </h2>
                    <div className="space-y-4">
                      {safetyGuidelines.map((guideline, idx) => (
                        <div
                          key={idx}
                          className="flex gap-3 p-4 bg-muted/30 rounded-lg border border-border hover-elevate transition-all"
                          data-testid={`item-safety-${idx}`}
                        >
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            {guideline.icon}
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground mb-1">
                              {guideline.title}
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {guideline.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-md bg-accent/10 border-accent">
                  <CardContent className="pt-6">
                    <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                      <Cloud className="w-6 h-6 text-primary" />
                      Weather Reminder
                    </h2>
                    <p className="text-foreground leading-relaxed mb-4">
                      Singapore's tropical climate brings sudden rain showers and high humidity year-round. Check weather forecasts before heading out and be prepared for afternoon thunderstorms, especially during the monsoon seasons (November-March and June-September).
                    </p>
                    <p className="text-sm text-muted-foreground italic">
                      Best trail times: Early morning (7-9 AM) or late afternoon (4-6 PM) to avoid peak heat
                    </p>
                  </CardContent>
                </Card>

                <Card className="shadow-md">
                  <CardContent className="pt-6">
                    <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                      <Backpack className="w-6 h-6 text-primary" />
                      Packing Checklist
                    </h2>
                    <ul className="space-y-2" data-testid="list-packing">
                      {packingList.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-foreground"
                        >
                          <span className="flex-shrink-0 w-5 h-5 rounded-sm bg-primary/10 flex items-center justify-center mt-0.5">
                            <span className="text-primary text-xs font-bold">✓</span>
                          </span>
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:sticky lg:top-24">
                <Card className="shadow-md overflow-hidden">
                  <div className="aspect-square bg-gradient-to-br from-accent via-secondary/50 to-primary/20 relative">
                    <div className="absolute inset-0 flex items-center justify-center p-8">
                      <div className="text-center space-y-6">
                        <div className="w-32 h-32 mx-auto rounded-full bg-primary/10 flex items-center justify-center backdrop-blur-sm">
                          <Backpack className="w-16 h-16 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-foreground mb-2">
                            Prepare Well
                          </h3>
                          <p className="text-muted-foreground">
                            Proper preparation ensures a safe and enjoyable trail experience
                          </p>
                        </div>
                        <div className="grid grid-cols-3 gap-4 pt-4">
                          <div className="bg-background/80 backdrop-blur-sm rounded-lg p-3">
                            <Backpack className="w-8 h-8 mx-auto text-primary mb-2" />
                            <div className="text-xs font-semibold text-foreground">Pack Smart</div>
                          </div>
                          <div className="bg-background/80 backdrop-blur-sm rounded-lg p-3">
                            <Cloud className="w-8 h-8 mx-auto text-primary mb-2" />
                            <div className="text-xs font-semibold text-foreground">Check Weather</div>
                          </div>
                          <div className="bg-background/80 backdrop-blur-sm rounded-lg p-3">
                            <Shield className="w-8 h-8 mx-auto text-primary mb-2" />
                            <div className="text-xs font-semibold text-foreground">Stay Safe</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardContent className="pt-6">
                    <img
                      src="data:image/svg+xml,%3Csvg width='400' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='400' height='300' fill='%23F5E8D0'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='16' fill='%232E7D32' text-anchor='middle' dominant-baseline='middle'%3EHiking Safety Illustration%3C/text%3E%3C/svg%3E"
                      alt="Illustration of hiking safety equipment and trail preparation essentials"
                      className="w-full h-auto rounded-lg"
                      data-testid="img-safety-illustration"
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
