import Image from "next/image";
import Link from "next/link";

const categories = [
  { name: "Jar Candle", count: "12 Items", image: "/c_1.jpg" },
  { name: "Votive Candle", count: "14 Items", image: "/c_2.jpg" },
  { name: "Candle set", count: "12 Items", image: "/c_3.jpg" },
];

export default function ShopCategories() {
  return (
    <section
      className="px-4 py-14 sm:px-6 lg:px-8"
      style={{ background: "var(--lucerna-beige)" }}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-md">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl" style={{ color: "var(--lucerna-text-dark)" }}>
            Shop by categories
          </h2>
          <p className="mt-3 text-zinc-600">
            All our candles are made from the finest wax and lead-free wicks to ensure a long, clean burn.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
          {categories.map((cat) => (
            <Link key={cat.name} href="#" className="group flex flex-col items-center">
              <div className="relative h-40 w-40 overflow-hidden rounded-full border-2 border-white shadow-md sm:h-48 sm:w-48">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover transition group-hover:scale-110"
                  sizes="192px"
                />
              </div>
              <span className="mt-3 text-sm font-medium text-zinc-800">{cat.name}</span>
              <span className="text-xs text-zinc-500">{cat.count}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
