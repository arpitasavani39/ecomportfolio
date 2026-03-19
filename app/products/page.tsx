"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import AnnouncementBar from "../components/AnnouncementBar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ALL_PRODUCTS, CATEGORIES, SCENTS, SORT_OPTIONS } from "../data/products";

/* ─── STAR RATING ──────────────────────────────────────── */
function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          className="h-3 w-3"
          viewBox="0 0 20 20"
          fill={s <= Math.round(rating) ? "#f59e0b" : "#d1d5db"}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

/* ─── PRODUCT CARD ─────────────────────────────────────── */
function ProductCard({ product }: { product: (typeof ALL_PRODUCTS)[0] }) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const wishlisted = isInWishlist(product.id);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist(product.id);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <Link href={`/products/${product.id}`} className="group block" aria-label={product.name}>
      {/* Image wrapper */}
      <div className="relative overflow-hidden rounded-2xl bg-[#f0ede8]" style={{ aspectRatio: "3/4" }}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-95"
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

        {/* Discount pill */}
        {discount && (
          <span className="absolute left-3 top-10 mt-1 rounded-full bg-black/80 px-2 py-0.5 text-[10px] font-bold text-white">
            -{discount}%
          </span>
        )}

        {/* Wishlist btn */}
        <button
          onClick={handleWishlist}
          aria-label="Add to wishlist"
          className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/80 shadow backdrop-blur-sm transition-all hover:scale-110 hover:bg-white"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill={wishlisted ? "#ec4899" : "none"} stroke={wishlisted ? "#ec4899" : "#374151"} strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        {/* Quick add overlay */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
          <button
            onClick={handleAdd}
            className={`w-full py-3 text-xs font-bold uppercase tracking-widest transition-all duration-200 ${
              added
                ? "bg-[#9caa9a] text-white"
                : "bg-white/95 text-zinc-900 backdrop-blur-sm hover:bg-zinc-900 hover:text-white"
            }`}
          >
            {added ? "✓ Added to Cart" : "Quick Add"}
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="mt-3 space-y-1 px-1">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[#9caa9a]">
            {product.category}
          </p>
          <div className="flex items-center gap-1">
            <Stars rating={product.rating} />
            <span className="text-[10px] text-zinc-400">({product.reviews})</span>
          </div>
        </div>

        <h3 className="text-sm font-semibold text-zinc-800 transition-colors group-hover:text-[#9caa9a]">
          {product.name}
        </h3>

        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-zinc-900">${product.price}.00</span>
          {product.originalPrice && (
            <span className="text-xs text-zinc-400 line-through">${product.originalPrice}.00</span>
          )}
        </div>

        {/* Color dots */}
        {/* <div className="flex gap-1.5 pt-0.5">
          {product.colors.map((c, i) => (
            <span
              key={i}
              className="h-3 w-3 rounded-full border border-white shadow-sm ring-1 ring-zinc-200 transition-transform hover:scale-125"
              style={{ background: c }}
            />
          ))}
        </div> */}
      </div>
    </Link>
  );
}

/* ─── FILTER CHIP ──────────────────────────────────────── */
function Chip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 ${
        active
          ? "border-[#9caa9a] bg-[#9caa9a] text-white shadow"
          : "border-zinc-200 bg-white text-zinc-600 hover:border-[#9caa9a] hover:text-[#9caa9a]"
      }`}
    >
      {label}
    </button>
  );
}

/* ─── PAGE ─────────────────────────────────────────────── */
export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeScent, setActiveScent] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [priceMax, setPriceMax] = useState(100);
  const [showSale, setShowSale] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [gridCols, setGridCols] = useState<3 | 4>(4);

  const filtered = useMemo(() => {
    let list = ALL_PRODUCTS.filter((p) => {
      if (activeCategory !== "All" && p.category !== activeCategory) return false;
      if (activeScent !== "All" && p.scent !== activeScent) return false;
      if (p.price > priceMax) return false;
      if (showSale && !p.isSale) return false;
      if (showNew && !p.isNew) return false;
      return true;
    });

    if (sortBy === "price_asc") list = [...list].sort((a, b) => a.price - b.price);
    else if (sortBy === "price_desc") list = [...list].sort((a, b) => b.price - a.price);
    else if (sortBy === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    else if (sortBy === "reviews") list = [...list].sort((a, b) => b.reviews - a.reviews);

    return list;
  }, [activeCategory, activeScent, sortBy, priceMax, showSale, showNew]);

  return (
    <div className="min-h-screen bg-white">
      <AnnouncementBar />
      <Header />

      {/* ── HERO BANNER ── */}
      <section className="relative overflow-hidden bg-[#e8ede6] px-6 py-16 text-center">
        {/* Decorative blobs */}
        <div
          className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, #9caa9a, transparent)" }}
        />
        <div
          className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, #b5c4b0, transparent)" }}
        />

        <p className="font-script text-2xl text-[#9caa9a]">hand-poured with love</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-6xl">
          Our <span className="text-[#9caa9a]">Collection</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-zinc-500">
          Each candle is crafted with intention — vegan, sustainable & made to spark joy in your space. ✨
        </p>

        {/* Breadcrumb */}
        <nav className="mt-6 flex items-center justify-center gap-2 text-xs text-zinc-400">
          <Link href="/" className="hover:text-[#9caa9a] transition-colors">Home</Link>
          <span>/</span>
          <span className="font-medium text-zinc-700">Products</span>
        </nav>
      </section>

      {/* ── TOOLBAR ── */}
      <div className="sticky top-16 z-40 border-b border-zinc-100 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          {/* Category chips */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <Chip key={c} label={c} active={activeCategory === c} onClick={() => setActiveCategory(c)} />
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* Results count */}
            <span className="hidden text-xs text-zinc-400 sm:block">
              {filtered.length} product{filtered.length !== 1 ? "s" : ""}
            </span>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 outline-none focus:border-[#9caa9a]"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>

            {/* Grid toggle */}
            <div className="flex rounded-full border border-zinc-200 overflow-hidden">
              {([3, 4] as const).map((n) => (
                <button
                  key={n}
                  onClick={() => setGridCols(n)}
                  className={`px-3 py-1.5 text-xs font-bold transition-colors ${
                    gridCols === n ? "bg-zinc-900 text-white" : "bg-white text-zinc-400 hover:text-zinc-700"
                  }`}
                >
                  {n === 3 ? "▦" : "⣿"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN LAYOUT ── */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex gap-8 lg:gap-10">

          {/* ── SIDEBAR ── */}
          <aside className="hidden w-56 shrink-0 lg:block">
            <div className="sticky top-32 space-y-8">

              {/* Scent filter */}
              <div>
                <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-zinc-900">Scent</h3>
                <div className="flex flex-col gap-2">
                  {SCENTS.map((s) => (
                    <button
                      key={s}
                      onClick={() => setActiveScent(s)}
                      className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all ${
                        activeScent === s
                          ? "bg-[#e8ede6] font-semibold text-[#6b8768]"
                          : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
                      }`}
                    >
                      <span className={`h-2 w-2 rounded-full transition-all ${activeScent === s ? "bg-[#9caa9a]" : "bg-zinc-300"}`} />
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price range */}
              <div>
                <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-zinc-900">Max Price</h3>
                <div className="space-y-2">
                  <input
                    type="range"
                    min={20}
                    max={100}
                    step={2}
                    value={priceMax}
                    onChange={(e) => setPriceMax(Number(e.target.value))}
                    className="w-full accent-[#9caa9a]"
                  />
                  <div className="flex justify-between text-xs text-zinc-500">
                    <span>$20</span>
                    <span className="font-semibold text-zinc-800">${priceMax}</span>
                    <span>$100</span>
                  </div>
                </div>
              </div>

              {/* Toggles */}
              <div>
                <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-zinc-900">Filter By</h3>
                <div className="space-y-3">
                  {[
                    { label: "On Sale", value: showSale, set: setShowSale },
                    { label: "New Arrivals", value: showNew, set: setShowNew },
                  ].map(({ label, value, set }) => (
                    <label key={label} className="flex cursor-pointer items-center justify-between rounded-lg px-1 py-1">
                      <span className="text-sm text-zinc-700">{label}</span>
                      <div
                        onClick={() => set((v) => !v)}
                        className={`relative h-5 w-9 rounded-full transition-colors ${value ? "bg-[#9caa9a]" : "bg-zinc-200"}`}
                      >
                        <span
                          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all ${value ? "left-4" : "left-0.5"}`}
                        />
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Reset */}
              <button
                onClick={() => {
                  setActiveCategory("All");
                  setActiveScent("All");
                  setPriceMax(100);
                  setShowSale(false);
                  setShowNew(false);
                }}
                className="w-full rounded-full border border-zinc-200 py-2 text-xs font-semibold text-zinc-500 transition hover:border-zinc-400 hover:text-zinc-800"
              >
                Reset Filters
              </button>
            </div>
          </aside>

          {/* ── PRODUCT GRID ── */}
          <div className="flex-1">
            {/* Mobile scent pills */}
            <div className="mb-5 flex flex-wrap gap-2 lg:hidden">
              {SCENTS.map((s) => (
                <Chip key={s} label={s} active={activeScent === s} onClick={() => setActiveScent(s)} />
              ))}
            </div>

            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <span className="text-5xl">🕯️</span>
                <h2 className="mt-4 text-xl font-bold text-zinc-700">No candles found</h2>
                <p className="mt-2 text-sm text-zinc-400">Try adjusting your filters</p>
              </div>
            ) : (
              <div
                className={`grid gap-5 ${
                  gridCols === 3
                    ? "grid-cols-2 md:grid-cols-3"
                    : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                }`}
              >
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}

            {/* Load more */}
            {filtered.length > 0 && (
              <div className="mt-14 flex flex-col items-center gap-3">
                <p className="text-xs text-zinc-400">Showing {filtered.length} of {ALL_PRODUCTS.length} products</p>
                <div className="h-1 w-40 overflow-hidden rounded-full bg-zinc-100">
                  <div
                    className="h-full rounded-full bg-[#9caa9a] transition-all duration-500"
                    style={{ width: `${(filtered.length / ALL_PRODUCTS.length) * 100}%` }}
                  />
                </div>
                <button className="mt-2 rounded-full border border-zinc-800 px-8 py-3 text-xs font-bold uppercase tracking-widest text-zinc-800 transition-all hover:bg-zinc-900 hover:text-white hover:scale-105 active:scale-95">
                  Load More
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── PROMO STRIP ── */}
      <section className="mt-6 overflow-hidden bg-[#2d2d2d] py-5">
        <div className="animate-marquee flex whitespace-nowrap">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="mx-8 text-xs font-semibold uppercase tracking-widest text-[#9caa9a]">
              ✦ Hand-Poured &nbsp; ✦ Vegan &nbsp; ✦ Sustainable &nbsp; ✦ Made with Love
            </span>
          ))}
        </div>
      </section>

      <Footer />

      <style jsx global>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 18s linear infinite;
          width: max-content;
        }
      `}</style>
    </div>
  );
}
