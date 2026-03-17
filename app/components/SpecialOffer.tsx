"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

function useCountdown() {
  const [time, setTime] = useState({ h: 44, m: 1, s: 57, ms: 53 });
  useEffect(() => {
    const t = setInterval(() => {
      setTime((prev) => {
        let { h, m, s, ms } = prev;
        ms--;
        if (ms < 0) { ms = 99; s--; }
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) return { h: 0, m: 0, s: 0, ms: 0 };
        return { h, m, s, ms };
      });
    }, 10);
    return () => clearInterval(t);
  }, []);
  return time;
}

export default function SpecialOffer() {
  const { h, m, s, ms } = useCountdown();
  return (
    <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="relative overflow-hidden rounded-lg">
          <div className="relative aspect-[4/5]">
            <Image
              src="/so_1.jpg"
              alt="Capri Blue Jar Candle"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 33vw"
            />
          </div>
          <span className="absolute left-4 top-4 flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white shadow">
            Sale $18.00
          </span>
        </div>
        <div className="relative hidden overflow-hidden rounded-lg lg:block">
          <div className="relative aspect-[4/5]">
            <Image
              src="/so_2.jpg"
              alt="Capri Blue Jar Candles lifestyle"
              fill
              className="object-cover"
              sizes="33vw"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-sm font-medium uppercase tracking-wider text-zinc-500">Special Offer</p>
          <h2 className="mt-2 text-2xl font-bold sm:text-3xl" style={{ color: "var(--lucerna-text-dark)" }}>
            Capri Blue Jar Candle
          </h2>
          <p className="mt-3 text-zinc-600">
            Capri Blue&apos;s iconic visuals and fragrances – Hand-poured candles and vegan formulated beauty care.
          </p>
          <div className="mt-6 flex gap-2 font-mono text-2xl font-semibold tabular-nums" style={{ color: "var(--lucerna-text-dark)" }}>
            <span>{String(h).padStart(2, "0")}</span>
            <span>:</span>
            <span>{String(m).padStart(2, "0")}</span>
            <span>:</span>
            <span>{String(s).padStart(2, "0")}</span>
            <span>:</span>
            <span>{String(ms).padStart(2, "0")}</span>
          </div>
          <button
            type="button"
            className="mt-6 w-full max-w-xs rounded bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-zinc-800 sm:py-3.5"
          >
            ADD TO CART | $47.00
          </button>
        </div>
      </div>
    </section>
  );
}
