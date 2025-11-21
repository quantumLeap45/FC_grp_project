import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Star, User, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { format } from "date-fns";

interface Review {
  id: string;
  parkId: string;
  reviewerName: string;
  rating: number;
  reviewText: string;
  createdAt: string;
}

interface ReviewSectionProps {
  parkId: string;
  parkName: string;
}

export default function ReviewSection({ parkId, parkName }: ReviewSectionProps) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    reviewerName: "",
    rating: 5,
    reviewText: "",
  });
  const { toast } = useToast();

  const { data: reviewsData, isLoading } = useQuery<{
    success: boolean;
    reviews: Review[];
  }>({
    queryKey: ["/api/reviews", parkId],
  });

  const reviews = reviewsData?.reviews || [];

  const reviewMutation = useMutation({
    mutationFn: async (data: { parkId: string; reviewerName: string; rating: number; reviewText: string }) => {
      const res = await apiRequest("POST", "/api/reviews", data);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Review submitted!",
        description: "Thank you for sharing your experience.",
      });
      setFormData({ reviewerName: "", rating: 5, reviewText: "" });
      setShowForm(false);
      queryClient.invalidateQueries({ queryKey: ["/api/reviews", parkId] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    reviewMutation.mutate({ parkId, ...formData });
  };

  const renderStars = (rating: number, interactive = false, onChange?: (rating: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type={interactive ? "button" : undefined}
            onClick={interactive && onChange ? () => onChange(star) : undefined}
            className={interactive ? "hover-elevate rounded" : ""}
            disabled={!interactive}
            data-testid={interactive ? `button-rating-${star}` : `star-${star}`}
          >
            <Star
              className={`w-5 h-5 ${
                star <= rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-none text-muted-foreground"
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : "0.0";

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              <span>Reviews for {parkName}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-muted-foreground">
                {renderStars(Math.round(Number(averageRating)))}
                <span className="ml-2">{averageRating} ({reviews.length} review{reviews.length !== 1 ? 's' : ''})</span>
              </div>
              <Button
                onClick={() => setShowForm(!showForm)}
                size="sm"
                data-testid="button-write-review"
              >
                {showForm ? "Cancel" : "Write Review"}
              </Button>
            </div>
          </CardTitle>
        </CardHeader>

        {showForm && (
          <CardContent className="border-t border-border pt-6">
            <form onSubmit={handleSubmit} className="space-y-4" data-testid="form-review">
              <div className="space-y-2">
                <Label htmlFor="reviewerName">Your Name</Label>
                <Input
                  id="reviewerName"
                  type="text"
                  placeholder="Enter your name"
                  required
                  value={formData.reviewerName}
                  onChange={(e) => setFormData({ ...formData, reviewerName: e.target.value })}
                  data-testid="input-reviewer-name"
                />
              </div>

              <div className="space-y-2">
                <Label>Rating</Label>
                <div className="flex items-center gap-2">
                  {renderStars(formData.rating, true, (rating) => setFormData({ ...formData, rating }))}
                  <span className="text-sm text-muted-foreground">({formData.rating} star{formData.rating !== 1 ? 's' : ''})</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reviewText">Your Review</Label>
                <Textarea
                  id="reviewText"
                  placeholder="Share your experience at this park..."
                  required
                  rows={4}
                  className="resize-none"
                  value={formData.reviewText}
                  onChange={(e) => setFormData({ ...formData, reviewText: e.target.value })}
                  data-testid="textarea-review"
                />
              </div>

              <Button
                type="submit"
                disabled={reviewMutation.isPending}
                data-testid="button-submit-review"
              >
                {reviewMutation.isPending ? "Submitting..." : "Submit Review"}
              </Button>
            </form>
          </CardContent>
        )}

        <CardContent className={showForm ? "border-t border-border pt-6" : ""}>
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">Loading reviews...</div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No reviews yet. Be the first to share your experience!
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="p-4 bg-muted/30 rounded-lg border border-border"
                  data-testid={`review-${review.id}`}
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">{review.reviewerName}</div>
                        <div className="text-xs text-muted-foreground">
                          {format(new Date(review.createdAt), "MMM d, yyyy")}
                        </div>
                      </div>
                    </div>
                    {renderStars(review.rating)}
                  </div>
                  <p className="text-foreground leading-relaxed">{review.reviewText}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
