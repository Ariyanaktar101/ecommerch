"use client";

import type { ReactNode } from 'react';
import { useState, useEffect, useCallback } from 'react';
import { CartContext } from './CartContext';
import { WishlistContext } from './WishlistContext';
import type { CartItem, Product } from '@/types';
import { useToast } from "@/hooks/use-toast";

export function AppContextProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsMounted(true);
    try {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
      const storedWishlist = localStorage.getItem('wishlist');
      if (storedWishlist) {
        setWishlist(JSON.parse(storedWishlist));
      }
    } catch (error) {
      console.error("Failed to parse from localStorage", error);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, isMounted]);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
  }, [wishlist, isMounted]);

  const addToCart = useCallback((product: Product, quantity: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { product, quantity }];
    });
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  }, [toast]);

  const removeFromCart = useCallback((productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const itemCount = cart.reduce((count, item) => count + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  const addToWishlist = useCallback((product: Product) => {
    setWishlist(prev => {
      if (prev.find(p => p.id === product.id)) {
        toast({
          title: "Already in Wishlist",
          description: `${product.name} is already in your wishlist.`,
          variant: "default",
        });
        return prev;
      }
      toast({
          title: "Added to Wishlist",
          description: `${product.name} has been added to your wishlist.`,
      });
      return [...prev, product];
    });
  }, [toast]);

  const removeFromWishlist = useCallback((productId: number) => {
    setWishlist(prev => prev.filter(p => p.id !== productId));
    toast({
        title: "Removed from Wishlist",
        description: "The item has been removed from your wishlist.",
    });
  }, [toast]);

  const isInWishlist = useCallback((productId: number) => {
    return wishlist.some(p => p.id === productId);
  }, [wishlist]);

  const wishlistCount = wishlist.length;

  if (!isMounted) {
    return null;
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, itemCount, cartTotal }}>
      <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist, wishlistCount }}>
        {children}
      </WishlistContext.Provider>
    </CartContext.Provider>
  );
}
