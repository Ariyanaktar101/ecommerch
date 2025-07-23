import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-4">
              About The Mystical Prints
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              We believe that your home should be a sanctuary, a place that
              reflects your unique personality and brings you joy. That's why we
              curate a collection of high-quality, beautifully designed home
              goods, from furniture and decor to art and lighting.
            </p>
            <p className="text-muted-foreground">
              Our passion for craftsmanship and timeless design drives us to
              source products that are not only stylish but also built to last.
              We work with talented artisans and designers from around the world
              to bring you a unique selection of items you won't find anywhere
              else.
            </p>
          </div>
          <div className="order-1 md:order-2">
            <Image
              src="https://i.ibb.co/Vvz1DN7/logo.png"
              alt="About Us Image"
              width={600}
              height={400}
              className="rounded-lg shadow-xl"
              data-ai-hint="cozy living room"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
