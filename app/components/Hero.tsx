"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const CAROUSEL_IMAGES = [
  "/candle1.png",
  "/candle2.png"
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative flex min-h-[420px] flex-col items-center justify-between gap-8 overflow-hidden px-4 py-12 sm:min-h-[480px] sm:flex-row sm:px-6 lg:px-8">
      {/* Background images array */}
      <div className="absolute inset-0 z-0">
        {CAROUSEL_IMAGES.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt=""
            fill
            className={`object-cover object-right transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
            priority={index === 0}
            sizes="100vw"
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-1 flex-col justify-center gap-4 text-center sm:max-w-md sm:text-left">
        <p className="text-sm font-medium uppercase tracking-wider" style={{ color: "var(--lucerna-text-muted)" }}>
          From a new life&apos;s
        </p>
        <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl" style={{ color: "var(--lucerna-text-dark)" }}>
          Choose well
          <br />
          Be well
        </h1>
        <Link
          href="#products"
          className="inline-flex items-center text-sm font-medium underline underline-offset-4 transition hover:opacity-80"
          style={{ color: "var(--lucerna-text-dark)" }}
        >
          CHECK OUR ITEM
        </Link>
      </div>
      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {CAROUSEL_IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2 w-2 rounded-full transition-colors ${
              index === currentSlide ? "bg-zinc-700" : "border-2 border-zinc-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
