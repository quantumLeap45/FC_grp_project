import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ExternalLink, Users, FileText, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface Source {
  title: string;
  url: string;
  type: string;
  license: string;
}

interface SourcesData {
  references: Source[];
  images: Array<{
    description: string;
    source: string;
    license: string;
  }>;
  acknowledgment: string;
  team: Array<{
    name: string;
    role: string;
  }>;
}

export default function Credits() {
  const [sources, setSources] = useState<SourcesData | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const { toast } = useToast();

  useEffect(() => {
    fetch("/data/sources.json")
      .then((res) => res.json())
      .then((data) => setSources(data))
      .catch((err) => console.error("Failed to load sources data:", err));
  }, []);

  const contactMutation = useMutation({
    mutationFn: async (data: { name: string; email: string; message: string }) => {
      const res = await apiRequest("POST", "/api/contact", data);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Message sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });
      setFormData({ name: "", email: "", message: "" });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate(formData);
  };

  return (
    <Layout>
      <div className="bg-gradient-to-b from-secondary/30 to-background">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4" data-testid="text-page-title">
              Credits & Contact
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Attribution for sources, images, and project team information, plus a way to get in touch with us.
            </p>
          </div>

          <div className="max-w-5xl mx-auto space-y-8">
            <Card className="shadow-md">
              <CardHeader className="bg-secondary/20">
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Users className="w-6 h-6 text-primary" />
                  Project Team
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6" data-testid="section-team">
                {sources?.team.map((member, idx) => (
                  <div key={idx} className="mb-2">
                    <span className="font-semibold text-foreground">{member.name}</span>
                    <span className="text-muted-foreground"> - {member.role}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader className="bg-secondary/20">
                <CardTitle className="text-2xl flex items-center gap-2">
                  <FileText className="w-6 h-6 text-primary" />
                  References & Sources
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4" data-testid="section-references">
                  {sources?.references.map((source, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-muted/30 rounded-lg border border-border hover-elevate transition-all"
                    >
                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground mb-1">
                            {source.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            {source.type} • {source.license}
                          </p>
                          <a
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                            data-testid={`link-source-${idx}`}
                          >
                            {source.url}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-border">
                  <h3 className="font-semibold text-foreground mb-3">Image Attribution</h3>
                  <div className="space-y-3">
                    {sources?.images.map((image, idx) => (
                      <div key={idx} className="text-sm">
                        <span className="font-medium text-foreground">{image.description}</span>
                        <span className="text-muted-foreground"> - {image.source} ({image.license})</span>
                      </div>
                    ))}
                  </div>
                </div>

                {sources?.acknowledgment && (
                  <div className="mt-6 p-4 bg-accent/10 border border-accent rounded-lg">
                    <p className="text-sm text-foreground italic">
                      {sources.acknowledgment}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader className="bg-secondary/20">
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Mail className="w-6 h-6 text-primary" />
                  Contact & Feedback
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-6 max-w-md" data-testid="form-contact">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-foreground font-medium">
                      Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your full name"
                      required
                      className="text-base"
                      data-testid="input-name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground font-medium">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      required
                      className="text-base"
                      data-testid="input-email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-foreground font-medium">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Share your feedback, questions, or suggestions..."
                      required
                      rows={6}
                      className="text-base resize-none"
                      data-testid="textarea-message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full sm:w-auto"
                    data-testid="button-submit"
                    disabled={contactMutation.isPending}
                  >
                    {contactMutation.isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
