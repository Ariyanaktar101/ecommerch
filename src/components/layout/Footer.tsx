import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bot, Twitter, Facebook, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Bot className="h-7 w-7 text-primary" />
              <span className="text-xl font-bold font-headline">Lumina</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Curated collections for a modern lifestyle.
            </p>
            <div className="flex space-x-4">
              <Link href="#" aria-label="Twitter"><Twitter className="h-5 w-5 hover:text-primary" /></Link>
              <Link href="#" aria-label="Facebook"><Facebook className="h-5 w-5 hover:text-primary" /></Link>
              <Link href="#" aria-label="Instagram"><Instagram className="h-5 w-5 hover:text-primary" /></Link>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products" className="text-muted-foreground hover:text-foreground">All Products</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Furniture</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Decor</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Lighting</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-muted-foreground hover:text-foreground">About Us</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Careers</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Press</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Join our newsletter</h3>
            <p className="text-sm text-muted-foreground mb-4">Get the latest updates and special offers.</p>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input type="email" placeholder="Email" />
              <Button type="submit" className="bg-primary hover:bg-primary/90">Subscribe</Button>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Lumina Commerce. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
