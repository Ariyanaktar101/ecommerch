"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Lightbulb, AlertCircle } from 'lucide-react';
import { getSmartProductRecommendations } from '@/ai/flows/smart-product-recommendations';

export function ProductRecommendations() {
  const [userHistory, setUserHistory] = useState("");
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setRecommendations([]);

    try {
      const result = await getSmartProductRecommendations({ userHistory });
      setRecommendations(result.recommendations);
    } catch (err) {
      setError("Sorry, we couldn't generate recommendations at this time. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Lightbulb className="w-8 h-8 text-accent" />
              <div>
                <CardTitle className="font-headline text-3xl">Smart Recommendations</CardTitle>
                <CardDescription>Tell us what you've been looking at, and our AI will suggest products you'll love.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent>
              <Textarea
                placeholder="e.g., 'I've been searching for a comfortable office chair, some minimalist wall art, and maybe a new desk lamp.'"
                value={userHistory}
                onChange={(e) => setUserHistory(e.target.value)}
                rows={4}
                className="resize-none"
                disabled={loading}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={loading || !userHistory} className="w-full bg-accent hover:bg-accent/90">
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Get Recommendations'}
              </Button>
            </CardFooter>
          </form>

          {error && (
            <div className="p-6 pt-0">
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            </div>
          )}

          {recommendations.length > 0 && (
            <div className="p-6 pt-0">
              <h4 className="font-semibold mb-3">Here's what we found for you:</h4>
              <ul className="list-disc list-inside space-y-2 rounded-md border p-4">
                {recommendations.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>
          )}
        </Card>
      </div>
    </section>
  );
}
