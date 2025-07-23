import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/products/ProductCard';
import { products } from '@/lib/data';
import { ProductRecommendations } from '@/components/products/ProductRecommendations';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="flex flex-col">
      <section className="relative w-full h-[70vh] min-h-[500px] flex items-center justify-center text-center text-white bg-gradient-to-br from-purple-200 via-pink-200 to-white overflow-hidden">
        <div className="absolute inset-0 bg-repeat bg-center opacity-10" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/flowers.png')" }}></div>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, i) => (
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
      
      <ProductRecommendations />
    </div>
  );
}
