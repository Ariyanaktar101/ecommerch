"use client";

import Link from 'next/link';
import { useWishlist } from '@/hooks/useWishlist';
import { ProductCard } from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';
import { HeartCrack } from 'lucide-react';

export default function WishlistPage() {
  const { wishlist } = useWishlist();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold">Your Wishlist</h1>
        <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
          Your curated collection of favorite items. Add them to your cart when you're ready.
        </p>
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <HeartCrack className="mx-auto h-16 w-16 text-muted-foreground" />
          <h2 className="mt-6 text-2xl font-semibold">Your wishlist is empty</h2>
          <p className="mt-2 text-muted-foreground">Explore our products and find something you love.</p>
          <Button asChild className="mt-6">
            <Link href="/products">Discover Products</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
