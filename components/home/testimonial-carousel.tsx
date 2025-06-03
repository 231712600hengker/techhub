"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    content:
      "The customer service is exceptional! I bought my new laptop here and got expert advice that helped me choose the perfect model for my needs. Fast shipping and great after-sales support!",
    author: "David Wilson",
    role: "Tech Enthusiast",
    image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
  },
  {
    content:
      "I've been shopping at TechHub for all my gadget needs. Their prices are competitive and the product quality is always top-notch. Highly recommended!",
    author: "Sarah Johnson",
    role: "Digital Creator",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
  },
  {
    content:
      "The selection of products is amazing, and their technical support team really knows their stuff. They helped me set up my entire smart home system!",
    author: "Michael Chen",
    role: "Smart Home Enthusiast",
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
  },
];

export function TestimonialCarousel() {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000 }}
      loop={true}
      className="pb-12"
    >
      {testimonials.map((testimonial, index) => (
        <SwiperSlide key={index}>
          <div className="mx-auto max-w-3xl">
            <blockquote className="relative rounded-lg bg-background p-6 shadow-lg">
              <p className="mb-4 text-lg italic text-muted-foreground">
                {testimonial.content}
              </p>
              <div className="flex items-center">
                <div className="h-12 w-12 overflow-hidden rounded-full bg-gray-300">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.author}
                    width={48}
                    height={48}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="ml-4">
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </blockquote>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
