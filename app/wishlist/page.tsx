"use client";

import Image from "next/image";
import Link from "next/link";
import AnnouncementBar from "../components/AnnouncementBar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ALL_PRODUCTS } from "../data/products";
import { useWishlist } from "../context/WishlistContext";

export default function WishlistPage() {
  const { wishlist, toggleWishlist } = useWishlist();

  const wishlistedProducts = ALL_PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="min-h-screen bg-white">
      <AnnouncementBar />
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="font-script text-2xl text-[#9caa9a]">saved for later</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
            My <span className="text-[#9caa9a]">Wishlist</span>
          </h1>
          <p className="mt-4 text-zinc-500">
            Keep track of your favorite scents and aesthetic pieces.
          </p>
        </div>

        {wishlistedProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-6 grid h-20 w-20 place-items-center rounded-full bg-zinc-50">
              <svg className="h-10 w-10 text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-zinc-900">Your wishlist is empty</h2>
            <p className="mt-2 text-zinc-500">Looks like you haven&apos;t saved any candles yet.</p>
            <Link
              href="/products"
              className="mt-8 rounded-full bg-zinc-900 px-8 py-3 text-sm font-bold uppercase tracking-widest text-white transition-all hover:scale-105 active:scale-95"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4">
            {wishlistedProducts.map((product) => (
              <div key={product.id} className="group relative">
                <Link href={`/products/${product.id}`} className="block text-center">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-[#f0ede8]">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-all duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    
                    {/* Badge */}
                    {product.badge && (
                      <span
                        className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow-lg"
                        style={{ background: product.badgeColor ?? "#9caa9a" }}
                      >
                        {product.badge}
                      </span>
                    )}
                  </div>
                  
                  <div className="mt-4 px-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#9caa9a]">
                      {product.category}
                    </p>
                    <h3 className="mt-1 text-sm font-semibold text-zinc-800 transition-colors group-hover:text-[#9caa9a]">
                      {product.name}
                    </h3>
                    <p className="mt-1 text-sm font-bold text-zinc-900">${product.price}.00</p>
                  </div>
                </Link>

                {/* Remove button */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  aria-label="Remove from wishlist"
                  className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/90 shadow backdrop-blur-sm transition-all hover:scale-110 hover:bg-white"
                >
                  <svg className="h-4 w-4 text-[#ec4899]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
