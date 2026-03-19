import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex min-h-[420px] flex-col items-center justify-between gap-8 overflow-hidden px-4 py-12 sm:min-h-[480px] sm:flex-row sm:px-6 lg:px-8">
      {/* Background image: candle still-life */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/cover_1.jpg"
          alt=""
          fill
          className="object-cover object-right"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-white/50 sm:bg-gradient-to-r sm:from-white/80 sm:via-white/40 sm:to-transparent" aria-hidden />
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
      <div className="relative z-10 flex flex-1 items-center justify-end" aria-hidden>
        {/* Spacer so dots stay right; image is in background */}
      </div>
      <div className="relative z-10 flex gap-2">
        <span className="h-2 w-2 rounded-full bg-zinc-700" aria-hidden />
        <span className="h-2 w-2 rounded-full border-2 border-zinc-400" aria-hidden />
      </div>
    </section>
  );
}
