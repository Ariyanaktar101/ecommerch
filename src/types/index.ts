export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  dataAiHint: string;
  category: string;
  rating: number;
  reviews: number;
  tags: string[];
};

export type CartItem = {
  product: Product;
  quantity: number;
};
