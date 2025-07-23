"use client";

import type { CartItem, Product } from '@/types';
import { createContext } from 'react';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  cartTotal: number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);
