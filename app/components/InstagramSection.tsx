import Image from "next/image";

const instaImages = [
  "/i_1.jpg",
  "/i_2.jpg",
  "/i_3.jpg",
  "/i_4.jpg",
];

export default function InstagramSection() {
  return (
    <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl" style={{ color: "var(--lucerna-text-dark)" }}>
          Give us your best shot!
        </h2>
        <p className="mt-2 text-zinc-600">
          Follow us on Instagram <span className="font-medium text-zinc-800">@lucerna</span> and make sure to tag us for a chance to be featured.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-2 sm:gap-4 md:grid-cols-4">
          {instaImages.map((src, i) => (
            <div key={i} className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src={src}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, 25vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
