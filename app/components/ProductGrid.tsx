"use client";

import Image from "next/image";
import Link from "next/link";
import { ALL_PRODUCTS } from "../data/products";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { useState } from "react";

function ProductCard({ product }: { product: typeof ALL_PRODUCTS[0] }) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const isWishlisted = isInWishlist(product.id);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="group relative text-center">
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-zinc-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, 25vw"
          />
          
          {/* Quick Add Overlay */}
          <div className="absolute inset-x-0 bottom-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
            <button
              onClick={handleAdd}
              className={`w-full py-2.5 text-[10px] font-bold uppercase tracking-widest transition-all duration-200 ${
                added
                  ? "bg-[#9caa9a] text-white"
                  : "bg-white/95 text-zinc-900 backdrop-blur-sm hover:bg-zinc-900 hover:text-white"
              }`}
            >
              {added ? "✓ Added" : "Quick Add"}
            </button>
          </div>
        </div>
        <h3 className="mt-3 text-sm font-medium text-zinc-800">{product.name}</h3>
        <p className="mt-1 text-sm font-medium text-zinc-600">${product.price}.00</p>
        <div className="mt-2 flex flex-wrap justify-center gap-1.5">
          {product.colors.map((color, i) => (
            <span
              key={i}
              className="h-3 w-3 rounded-full border border-zinc-200"
              style={{ backgroundColor: color }}
              aria-hidden
            />
          ))}
        </div>
      </Link>
      
      {/* Wishlist Button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          toggleWishlist(product.id);
        }}
        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        className="absolute right-3 top-3 z-10 grid h-8 w-8 place-items-center rounded-full bg-white/80 shadow backdrop-blur-sm transition-all hover:scale-110 hover:bg-white"
      >
        <svg 
          className="h-4 w-4" 
          viewBox="0 0 24 24" 
          fill={isWishlisted ? "#ec4899" : "none"} 
          stroke={isWishlisted ? "#ec4899" : "#374151"} 
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>
    </div>
  );
}

export default function ProductGrid() {
  // Show only first 8 products for the home page grid
  const homeProducts = ALL_PRODUCTS.slice(0, 8);

  return (
    <section id="products" className="bg-white px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
          {homeProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/products"
            className="rounded border border-zinc-800 px-6 py-2.5 text-sm font-medium text-zinc-800 transition hover:bg-zinc-800 hover:text-white"
          >
            VIEW ALL PRODUCTS
          </Link>
        </div>
      </div>
    </section>
  );
}
