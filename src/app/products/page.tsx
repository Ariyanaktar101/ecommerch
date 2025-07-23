import { ProductCard } from '@/components/products/ProductCard';
import { products } from '@/lib/data';

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold">Our Collections</h1>
        <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
          Explore our carefully curated selection of products, designed to bring style and quality into your life.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
