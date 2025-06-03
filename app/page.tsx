import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Smartphone, Laptop, Headphones } from 'lucide-react';
import ProductCard from '@/components/shop/product-card';
import prisma from '@/lib/db';

export default async function Home() {
  // Get featured products (limit to 4)
  const products = await prisma.product.findMany({
    take: 4
  });

  return (
    <div className="flex flex-col gap-12">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center py-32"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg')",
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-lg">
            <h1 className="mb-6 text-4xl font-bold leading-tight text-white sm:text-5xl">
              The Latest Tech at Your Fingertips
            </h1>
            <p className="mb-8 text-lg text-gray-200">
              Discover cutting-edge smartphones, laptops, and accessories for the modern lifestyle.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link href="/shop">Shop Now</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="mb-12 text-center text-3xl font-bold">Why Choose Us</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 rounded-full bg-primary/10 p-4">
              <Smartphone className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">Latest Technology</h3>
            <p className="text-muted-foreground">
              We stock only the newest and most innovative tech products from leading brands.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 rounded-full bg-primary/10 p-4">
              <Laptop className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">Expert Support</h3>
            <p className="text-muted-foreground">
              Our tech experts are always ready to help you find the perfect device.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 rounded-full bg-primary/10 p-4">
              <Headphones className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">Premium Service</h3>
            <p className="text-muted-foreground">
              Enjoy free shipping, extended warranty, and dedicated after-sales support.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-12">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold">Featured Products</h2>
          <Link
            href="/shop"
            className="flex items-center text-sm font-medium text-primary hover:underline"
          >
            View All
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Testimonial */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">What Our Customers Say</h2>
          <div className="mx-auto max-w-3xl">
            <blockquote className="relative rounded-lg bg-background p-6 shadow-lg">
              <div className="mb-4 text-lg italic text-muted-foreground">
                &quot;The customer service is exceptional! I bought my new laptop here and got expert
                advice that helped me choose the perfect model for my needs. Fast shipping and great
                after-sales support!&quot;
              </div>
              <div className="flex items-center">
                <div className="h-12 w-12 overflow-hidden rounded-full bg-gray-300">
                  <Image
                    src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg"
                    alt="Customer"
                    width={48}
                    height={48}
                  />
                </div>
                <div className="ml-4">
                  <div className="font-semibold">David Wilson</div>
                  <div className="text-sm text-muted-foreground">Tech Enthusiast</div>
                </div>
              </div>
            </blockquote>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-12">
        <div className="rounded-lg bg-primary p-8 md:p-12">
          <div className="md:flex md:items-center md:justify-between">
            <div className="mb-6 max-w-lg md:mb-0">
              <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">
                Ready to upgrade your tech?
              </h2>
              <p className="text-primary-foreground">
                Sign up for our newsletter and get 10% off your first purchase!
              </p>
            </div>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/shop">Shop Now</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
