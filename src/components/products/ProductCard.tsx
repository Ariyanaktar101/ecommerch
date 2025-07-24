"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { Product } from '@/types';
import { ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };
  
  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const isWishlisted = isInWishlist(product.id);

  return (
    <Card className="w-full overflow-hidden group transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
      <Link href={`/products/${product.id}`} className="block">
        <CardContent className="p-0">
          <div className="relative overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              width={600}
              height={600}
              className="object-cover w-full aspect-square transition-transform duration-500 group-hover:scale-110"
              data-ai-hint={product.dataAiHint}
            />
            <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button
                    size="icon"
                    variant="default"
                    className={cn("rounded-full bg-background/80 hover:bg-background text-foreground shadow-lg transform-gpu transition-transform duration-200 hover:scale-110", isWishlisted && "bg-primary text-primary-foreground")}
                    onClick={handleWishlistClick}
                    aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                >
                    <Heart className={cn("h-5 w-5", isWishlisted && "fill-current")} />
                </Button>
                <Button
                    size="icon"
                    variant="default"
                    className="rounded-full bg-background/80 hover:bg-background text-foreground shadow-lg transform-gpu transition-transform duration-200 hover:scale-110"
                    onClick={handleAddToCartClick}
                    aria-label="Add to cart"
                >
                    <ShoppingCart className="h-5 w-5" />
                </Button>
            </div>
          </div>
          <div className="p-4 bg-background">
            <p className="text-sm text-muted-foreground">{product.category}</p>
            <h3 className="font-semibold text-lg truncate mt-1">{product.name}</h3>
            <p className="font-bold text-xl text-primary mt-2">₹{product.price.toFixed(2)}</p>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
