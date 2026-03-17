import Image from "next/image";
import Link from "next/link";

const products = [
  { name: "Clean Jar Candle", price: "$54.00", colors: ["#3b82f6", "#eab308", "#f97316"], image: "/p_1.jpg" },
  { name: "Floral Glass Candle", price: "$64.00", colors: ["#22c55e", "#ec4899", "#eab308"], image: "/p_2.jpg" },
  { name: "Colorful Glass Candle", price: "$54.00", colors: ["#a855f7", "#ec4899"], image: "/p_3.jpg" },
  { name: "Ceramic Candle", price: "$38.00", colors: ["#71717a", "#ec4899", "#22c55e", "#eab308", "#ec4899", "#f97316"], image: "/p_4.jpg" },
  { name: "Goods Regal Scented Candle", price: "$32.00", colors: ["#3b82f6", "#eab308"], image: "/p_5.jpg" },
  { name: "Lark Tonka Candle", price: "$38.00", colors: ["#22c55e", "#71717a"], image: "/p_6.jpg" },
  { name: "Small Glass Hurricane", price: "$32.00", colors: ["#a855f7", "#ec4899", "#eab308"], image: "/p_7.jpg" },
  { name: "Marble Ceramic Candle", price: "$32.00", colors: ["#71717a", "#ec4899", "#22c55e"], image: "/p_8.jpg" },
];

export default function ProductGrid() {
  return (
    <section id="products" className="bg-white px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
          {products.map((product) => (
            <Link key={product.name} href="#" className="group text-center">
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-zinc-100">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
              </div>
              <h3 className="mt-3 text-sm font-medium text-zinc-800">{product.name}</h3>
              <p className="mt-1 text-sm font-medium text-zinc-600">{product.price}</p>
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
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Link
            href="#"
            className="rounded border border-zinc-800 px-6 py-2.5 text-sm font-medium text-zinc-800 transition hover:bg-zinc-800 hover:text-white"
          >
            VIEW ALL PRODUCTS
          </Link>
        </div>
      </div>
    </section>
  );
}
