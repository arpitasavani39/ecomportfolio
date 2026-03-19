"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import AnnouncementBar from "../../components/AnnouncementBar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { ALL_PRODUCTS } from "../../data/products";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

/* ─── STAR RATING ──────────────────────────────────────── */
function Stars({ rating, reviews }: { rating: number; reviews: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((s) => (
          <svg
            key={s}
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill={s <= Math.round(rating) ? "#f59e0b" : "#d1d5db"}
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <span className="text-sm font-medium text-zinc-500">{rating} ({reviews} reviews)</span>
    </div>
  );
}

export default function ProductSinglePage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  
  const [product, setProduct] = useState<(typeof ALL_PRODUCTS)[0] | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const isWishlisted = product ? isInWishlist(product.id) : false;

  useEffect(() => {
    const p = ALL_PRODUCTS.find((p) => p.id === Number(id));
    if (p) {
      setProduct(p);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-zinc-800">Product Not Found</h2>
            <Link href="/products" className="mt-4 inline-block text-[#9caa9a] hover:underline">Back to Shop</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const relatedProducts = ALL_PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <AnnouncementBar />
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-xs text-zinc-400">
          <Link href="/" className="hover:text-[#9caa9a] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#9caa9a] transition-colors">Products</Link>
          <span>/</span>
          <span className="font-medium text-zinc-700">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Product Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-[#f0ede8] shadow-sm">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 hover:scale-110"
                priority
              />
              {product.badge && (
                <span
                  className="absolute left-6 top-6 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white shadow-xl"
                  style={{ background: product.badgeColor ?? "#9caa9a" }}
                >
                  {product.badge}
                </span>
              )}

              {/* Wishlist Button */}
              <button
                onClick={() => product && toggleWishlist(product.id)}
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                className="absolute right-6 top-6 z-10 grid h-12 w-12 place-items-center rounded-full bg-white/80 shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:bg-white"
              >
                <svg 
                  className="h-6 w-6" 
                  viewBox="0 0 24 24" 
                  fill={isWishlisted ? "#ec4899" : "none"} 
                  stroke={isWishlisted ? "#ec4899" : "#374151"} 
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
            {/* Small thumbnails (placeholders for now) */}
            <div className="grid grid-cols-4 gap-4">
               {[1,2,3,4].map(i => (
                 <div key={i} className={`aspect-square rounded-xl bg-[#f0ede8] cursor-pointer border-2 transition-all ${i === 1 ? 'border-[#9caa9a]' : 'border-transparent hover:border-zinc-200'}`}>
                    <Image src={product.image} alt={product.name} width={200} height={200} className="w-full h-full object-cover rounded-lg opacity-80" />
                 </div>
               ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-2">
              <p className="text-sm font-bold uppercase tracking-widest text-[#9caa9a]">
                {product.category}
              </p>
              <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl">
                {product.name}
              </h1>
              <div className="pt-2">
                <Stars rating={product.rating} reviews={product.reviews} />
              </div>
            </div>

            <div className="flex items-baseline gap-4">
              <span className="text-3xl font-bold text-zinc-900">${product.price}.00</span>
              {product.originalPrice && (
                <span className="text-xl text-zinc-400 line-through">
                  ${product.originalPrice}.00
                </span>
              )}
            </div>

            <p className="text-base leading-relaxed text-zinc-600">
              {product.description}
            </p>

            {/* Selection Options */}
            <div className="space-y-6 pt-4">
              {/* Color Selection */}
              {/* <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-900">
                  Select Color: <span className="ml-1 font-medium text-zinc-500">{selectedColor}</span>
                </h3>
                <div className="mt-3 flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`h-10 w-10 rounded-full border-2 p-1 transition-all hover:scale-110 ${
                        selectedColor === color ? "border-[#9caa9a]" : "border-transparent"
                      }`}
                    >
                      <span
                        className="block h-full w-full rounded-full shadow-inner"
                        style={{ backgroundColor: color }}
                      />
                    </button>
                  ))}
                </div>
              </div> */}

              {/* Quantity Selection */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-900">Quantity</h3>
                <div className="mt-3 flex h-12 w-32 items-center justify-between rounded-full border border-zinc-200 px-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-xl font-medium text-zinc-500 transition hover:text-zinc-900"
                  >
                    −
                  </button>
                  <span className="text-sm font-bold text-zinc-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-xl font-medium text-zinc-500 transition hover:text-zinc-900"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4 pt-6 sm:flex-row">
              <button
                onClick={handleAddToCart}
                className={`flex-1 rounded-full py-4 text-sm font-bold uppercase tracking-widest transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${
                  added
                    ? "bg-[#9caa9a] text-white"
                    : "bg-zinc-900 text-white hover:bg-zinc-800"
                }`}
              >
                {added ? "✓ Added to Cart" : "Add to Cart"}
              </button>
            </div>

            {/* Additional Info Accordion (Static for now) */}
            <div className="mt-8 border-t border-zinc-100 pt-8 space-y-4">
               <details className="group cursor-pointer">
                  <summary className="flex items-center justify-between text-sm font-bold uppercase tracking-widest text-zinc-900 outline-none">
                    Product Details
                    <span className="transition-transform group-open:rotate-180">↓</span>
                  </summary>
                  <div className="mt-4 text-sm leading-relaxed text-zinc-600">
                    Our candles are made with 100% natural soy wax and lead-free cotton wicks. They are vegan, cruelty-free, and phthalate-free. Each candle is hand-poured in small batches for consistent quality.
                  </div>
               </details>
               <details className="group cursor-pointer">
                  <summary className="flex items-center justify-between text-sm font-bold uppercase tracking-widest text-zinc-900 outline-none">
                    Shipping & Returns
                    <span className="transition-transform group-open:rotate-180">↓</span>
                  </summary>
                  <div className="mt-4 text-sm leading-relaxed text-zinc-600">
                    Free shipping on orders over $50. We accept returns within 30 days of purchase for unused products in their original packaging.
                  </div>
               </details>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-24">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-[#9caa9a]">Complete the set</p>
                <h2 className="mt-2 text-3xl font-bold text-zinc-900">You May Also Like</h2>
              </div>
              <Link href="/products" className="text-sm font-bold uppercase tracking-widest text-zinc-900 hover:text-[#9caa9a] transition-colors">
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {relatedProducts.map((rp) => (
                <Link key={rp.id} href={`/products/${rp.id}`} className="group space-y-3">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-[#f0ede8]">
                    <Image
                      src={rp.image}
                      alt={rp.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="px-1">
                    <h3 className="text-sm font-semibold text-zinc-800 transition-colors group-hover:text-[#9caa9a]">{rp.name}</h3>
                    <p className="text-sm font-bold text-zinc-900">${rp.price}.00</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
