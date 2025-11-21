import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";

interface ImageGalleryProps {
  parkName: string;
  images: string[];
}

export default function ImageGallery({ parkName, images }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  const goToPrevious = () => {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  const goToNext = () => {
    if (selectedIndex !== null && selectedIndex < images.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  if (images.length === 0) {
    return null;
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-primary" />
            Photo Gallery - {parkName}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => openLightbox(index)}
                className="relative aspect-square overflow-hidden rounded-lg border border-border hover-elevate active-elevate-2 group"
                data-testid={`button-image-${index}`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <div className="text-center">
                    <ImageIcon className="w-8 h-8 text-primary mx-auto mb-2" />
                    <div className="text-xs text-foreground font-medium px-2">
                      {parkName} Photo {index + 1}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors"></div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={selectedIndex !== null} onOpenChange={() => closeLightbox()}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-background">
          <div className="relative">
            <div className="absolute top-2 right-2 z-10">
              <Button
                variant="secondary"
                size="icon"
                onClick={closeLightbox}
                className="rounded-full"
                data-testid="button-close-lightbox"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="relative bg-muted/30" style={{ minHeight: "400px" }}>
              <div className="flex items-center justify-center p-12">
                <div className="text-center">
                  <ImageIcon className="w-24 h-24 text-primary mx-auto mb-4" />
                  <div className="text-xl font-semibold text-foreground mb-2">
                    {parkName}
                  </div>
                  {selectedIndex !== null && (
                    <div className="text-muted-foreground">
                      Photo {selectedIndex + 1} of {images.length}
                    </div>
                  )}
                  <div className="text-sm text-muted-foreground mt-4 max-w-md">
                    This is a placeholder for park images. Real images would be displayed here with proper licensing and attribution.
                  </div>
                </div>
              </div>
            </div>

            {selectedIndex !== null && images.length > 1 && (
              <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 pointer-events-none">
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={goToPrevious}
                  disabled={selectedIndex === 0}
                  className="rounded-full pointer-events-auto"
                  data-testid="button-prev-image"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={goToNext}
                  disabled={selectedIndex === images.length - 1}
                  className="rounded-full pointer-events-auto"
                  data-testid="button-next-image"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
