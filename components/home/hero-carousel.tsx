"use client"

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const heroSlides = [
  {
    image: "https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg",
    title: "The Latest Tech at Your Fingertips",
    description: "Discover cutting-edge smartphones, laptops, and accessories for the modern lifestyle.",
    cta: "Shop Now",
    link: "/shop"
  },
  {
    image: "https://images.pexels.com/photos/325153/pexels-photo-325153.jpeg",
    title: "Premium Audio Experience",
    description: "Immerse yourself in crystal-clear sound with our collection of high-end headphones and speakers.",
    cta: "Explore Audio",
    link: "/shop"
  },
  {
    image: "https://images.pexels.com/photos/1038916/pexels-photo-1038916.jpeg",
    title: "Smart Home Solutions",
    description: "Transform your home with cutting-edge smart devices and automation systems.",
    cta: "Discover More",
    link: "/shop"
  }
];

export function HeroCarousel() {
  return (
    <Swiper
      modules={[Autoplay, Navigation, Pagination]}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000 }}
      loop={true}
      className="relative h-[600px] w-full"
    >
      {heroSlides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div className="relative h-full w-full">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="container px-4 text-center text-white">
                <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl">
                  {slide.title}
                </h1>
                <p className="mx-auto mb-8 max-w-xl text-lg">
                  {slide.description}
                </p>
                <Button size="lg" variant="secondary" asChild>
                  <Link href={slide.link}>{slide.cta}</Link>
                </Button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}