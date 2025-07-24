
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/products/ProductCard';
import { products } from '@/lib/data';
import { ArrowRight, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useState, useEffect } from 'react';

export default function Home() {
  const featuredProducts = products.slice(0, 8);
  const mobileFeaturedProducts = products.slice(0, 4);

  const testimonials = [
    {
      name: "Priya Sharma",
      image: "https://placehold.co/100x100.png",
      dataAiHint: "woman smiling",
      rating: 5,
      review: "The Elegant Rose Print is absolutely stunning! The quality is amazing, and it adds such a graceful touch to my living room. I'm so happy with my purchase."
    },
    {
      name: "Rohan Mehta",
      image: "https://placehold.co/100x100.png",
      dataAiHint: "man portrait",
      rating: 5,
      review: "I bought the Cherry Blossom print, and it's so peaceful and beautiful. The colors are even more vibrant in person. The shipping was fast and the print was well-packaged."
    },
    {
      name: "Ananya Reddy",
      image: "https://placehold.co/100x100.png",
      dataAiHint: "woman happy",
      rating: 5,
      review: "I love the unique designs from The Mystical Prints. The Abstract Floral Medley is a true statement piece in my office. I'll definitely be buying more!"
    }
  ];

  const quotes = [
    "Experience nature’s beauty through stunning, soulful prints.",
    "Nature-inspired prints that bring peace and harmony.",
    "Turn your walls into windows to nature."
  ];

  const [quote, setQuote] = useState('');

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  return (
    <div className="flex flex-col">
      <section className="relative w-full h-[70vh] min-h-[500px] flex items-center justify-center text-center text-white bg-gradient-to-br from-purple-200 via-pink-200 to-white overflow-hidden">
        <div className="absolute inset-0 bg-repeat bg-center opacity-10" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/flowers.png')" }}></div>
        <div className="absolute top-8 left-8 z-10 text-gray-800 text-left">
          <p className="text-4xl font-display text-primary/80 drop-shadow-md">Welcome</p>
          {quote && <p className="text-sm mt-2 ml-1 text-primary/70 drop-shadow-sm">{quote}</p>}
        </div>
        <div className="relative z-10 p-4 text-gray-800">
          <h1 className="text-4xl md:text-6xl font-headline font-bold mb-4 drop-shadow-lg animate-fade-in-down text-primary">
            Where Art & Flora Blossom.
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 drop-shadow-md animate-fade-in-up animation-delay-300">
            Discover curated collections of timeless prints that bring the beauty of nature into your home.
          </p>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold animate-fade-in-up animation-delay-500">
            <Link href="/products">
              Explore Collections <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12 animate-fade-in">
            Featured Prints
          </h2>
          <div className="hidden md:grid grid-cols-4 gap-4 md:gap-8">
            {featuredProducts.map((product, i) => (
              <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 150}ms` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
           <div className="grid md:hidden grid-cols-2 gap-4">
            {mobileFeaturedProducts.map((product, i) => (
              <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 150}ms` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          <div className="text-center mt-12 animate-fade-in">
            <Button asChild variant="outline">
              <Link href="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12 animate-fade-in">
            What Our Customers Say
          </h2>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-xs sm:max-w-xl mx-auto"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card className="bg-background shadow-lg rounded-lg overflow-hidden">
                       <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                         <Avatar className="w-16 h-16 mb-4 border-4 border-primary/20">
                          <AvatarImage src={testimonial.image} alt={testimonial.name} data-ai-hint={testimonial.dataAiHint} />
                          <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={cn("w-5 h-5", i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300')} />
                          ))}
                        </div>
                        <p className="text-muted-foreground italic mb-4 text-xs sm:text-sm">"{testimonial.review}"</p>
                        <CardTitle className="font-headline text-base sm:text-lg font-semibold">{testimonial.name}</CardTitle>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="flex -left-4 sm:-left-8" />
            <CarouselNext className="flex -right-4 sm:-right-8" />
          </Carousel>
        </div>
      </section>
      
    </div>
  );
}
