"use client";

import { useState } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { products } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Star, Minus, Plus, Heart } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id.toString() === params.id);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();

  if (!product) {
    notFound();
  }
  
  const handleWishlistClick = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const isWishlisted = isInWishlist(product.id);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="flex justify-center items-center">
            <Image
                src={product.image}
                alt={product.name}
                width={600}
                height={600}
                className="rounded-lg shadow-xl object-cover w-full max-w-md"
                data-ai-hint={product.dataAiHint}
            />
        </div>
        <div>
          <p className="text-sm font-medium text-primary">{product.category.toUpperCase()}</p>
          <h1 className="text-4xl md:text-5xl font-headline font-bold my-3">{product.name}</h1>
          <div className="flex items-center gap-4 my-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={cn("w-5 h-5", i < Math.round(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300')} />
              ))}
            </div>
            <span className="text-muted-foreground text-sm">({product.reviews} reviews)</span>
          </div>
          <p className="text-3xl font-bold text-primary mb-6">${product.price.toFixed(2)}</p>
          <p className="text-muted-foreground leading-relaxed">{product.description}</p>

          <Separator className="my-8" />
          
          <div className="flex items-center gap-4">
            <div className="flex items-center border rounded-md">
              <Button variant="ghost" size="icon" onClick={() => setQuantity(q => Math.max(1, q - 1))}>
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-16 h-10 text-center border-0 focus-visible:ring-0"
                min="1"
              />
              <Button variant="ghost" size="icon" onClick={() => setQuantity(q => q + 1)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button size="lg" className="flex-grow bg-accent hover:bg-accent/90" onClick={() => addToCart(product, quantity)}>
              Add to Cart
            </Button>
            <Button size="lg" variant="outline" onClick={handleWishlistClick} className="px-3">
              <Heart className={cn("h-5 w-5", isWishlisted && "fill-current text-accent")} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
