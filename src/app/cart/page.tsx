"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal, itemCount } = useCart();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-headline font-bold text-center mb-8">Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground" />
          <h2 className="mt-6 text-2xl font-semibold">Your cart is empty</h2>
          <p className="mt-2 text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
          <Button asChild className="mt-6">
            <Link href="/products">Start Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Product</TableHead>
                      <TableHead>Details</TableHead>
                      <TableHead className="text-center">Quantity</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cart.map(({ product, quantity }) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={80}
                            height={80}
                            className="rounded-md object-cover"
                            data-ai-hint={product.dataAiHint}
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          <Link href={`/products/${product.id}`} className="hover:underline">{product.name}</Link>
                          <p className="text-sm text-muted-foreground">${product.price.toFixed(2)}</p>
                        </TableCell>
                        <TableCell>
                           <div className="flex items-center justify-center border rounded-md max-w-[120px] mx-auto">
                              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(product.id, quantity - 1)}>
                                <Minus className="h-4 w-4" />
                              </Button>
                              <Input
                                type="number"
                                value={quantity}
                                onChange={(e) => updateQuantity(product.id, Number(e.target.value))}
                                className="w-12 h-8 text-center border-0 focus-visible:ring-0"
                                min="1"
                              />
                              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(product.id, quantity + 1)}>
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                        </TableCell>
                        <TableCell className="text-right font-medium">${(product.price * quantity).toFixed(2)}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon" onClick={() => removeFromCart(product.id)}>
                            <Trash2 className="h-5 w-5 text-muted-foreground hover:text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal ({itemCount} items)</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-4">
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild size="lg" className="w-full bg-accent hover:bg-accent/90">
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
