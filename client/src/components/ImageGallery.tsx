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
                <div className="absolute inset-0">
                  <img
                    src={image}
                    alt={`${parkName} Photo ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
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

            <div className="relative bg-black/90 flex items-center justify-center" style={{ minHeight: "400px", maxHeight: "80vh" }}>
              {selectedIndex !== null && (
                <img
                  src={images[selectedIndex]}
                  alt={`${parkName} Photo ${selectedIndex + 1}`}
                  className="max-w-full max-h-[80vh] object-contain"
                />
              )}
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
