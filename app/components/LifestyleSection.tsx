import Image from "next/image";
import Link from "next/link";

export default function LifestyleSection() {
  return (
    <section
      className="px-4 py-14 sm:px-6 lg:px-8"
      style={{ background: "var(--lucerna-beige)" }}
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-10 lg:flex-row lg:justify-between">
        <div className="max-w-md text-center lg:text-left">
          <div className="mb-4 inline-block text-zinc-500">
            <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path d="M12 2C8 2 6 5 6 8c0 4 6 10 6 10s6-6 6-10c0-3-2-6-6-6z" />
            </svg>
          </div>
          <p className="font-script text-2xl font-medium sm:text-3xl" style={{ color: "var(--lucerna-text-dark)" }}>
            Enjoy the fragrance of a scented candle
          </p>
          <p className="mt-3 text-zinc-600">
            Made using clean, non-toxic ingredients, our products are designed for everyone.
          </p>
          <Link
            href="#"
            className="mt-6 inline-block rounded border border-zinc-800 px-6 py-2.5 text-sm font-medium text-zinc-800 transition hover:bg-zinc-800 hover:text-white"
          >
            VIEW ALL
          </Link>
        </div>
        <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-lg">
          {/* <Image
            src="https://images.unsplash.com/photo-1602874801006-4e411e58a927?w=600&q=80"
            alt="Scented candle with golden lid"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          /> */}
          <video
            src="\v_1.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="object-contain"
          />
          {/* <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition hover:bg-black/30">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-zinc-800" aria-label="Play">
              <svg className="ml-1 h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </div> */}
        </div>
      </div>
    </section>
  );
}
