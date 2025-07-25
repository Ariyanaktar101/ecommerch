"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, ShoppingCart, Heart, User } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/about', label: 'About' },
];

export function Header() {
  const { itemCount } = useCart();
  const { wishlistCount } = useWishlist();

  const iconButtonClasses = "rounded-full border w-8 h-8";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2 md:gap-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold font-headline text-primary">The Mystical Prints</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <Button variant="ghost" size="icon" asChild className={cn(iconButtonClasses, "hidden md:flex")}>
            <Link href="/login">
              <User className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild className={cn(iconButtonClasses, "relative")}>
            <Link href="/wishlist">
              <Heart className="h-4 w-4" />
              {wishlistCount > 0 && (
                <span className="absolute top-[-4px] right-[-4px] inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform bg-accent rounded-full">
                  {wishlistCount}
                </span>
              )}
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild className={cn(iconButtonClasses, "relative")}>
            <Link href="/cart">
              <ShoppingCart className="h-4 w-4" />
              {itemCount > 0 && (
                <span className="absolute top-[-4px] right-[-4px] inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform bg-accent rounded-full">
                  {itemCount}
                </span>
              )}
            </Link>
          </Button>
           <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 p-6">
                <Link href="/" className="flex items-center gap-2 mb-4">
                  <span className="text-xl font-bold font-headline text-primary">The Mystical Prints</span>
                </Link>
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-lg font-medium text-foreground"
                    >
                      {link.label}
                    </Link>
                  ))}
                   <Link href="/login" className="text-lg font-medium text-foreground">Login</Link>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
