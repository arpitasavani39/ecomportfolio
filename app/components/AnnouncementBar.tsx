const messages = [
  "FREE SHIPPING",
  "BECAUSE IT CAN CHANGE YOUR MOOD",
  "BRIGHT YOUR EVERY DAY",
  "FREE SHIPPING",
];

export default function AnnouncementBar() {
  return (
    <div
      className="flex overflow-hidden py-2.5 text-xs font-medium uppercase tracking-wider group"
      style={{ background: "var(--lucerna-announce)", color: "var(--lucerna-text-dark)" }}
    >
      <div className="flex animate-marquee group-hover:[animation-play-state:paused] w-max">
        {[...Array(10)].map((_, groupIndex) => (
          <div key={groupIndex} className="flex shrink-0 items-center justify-around">
            {messages.map((msg, i) => (
              <span key={`${groupIndex}-${i}`} className="flex items-center gap-4 whitespace-nowrap px-4">
                {msg}
                <span className="h-3 w-px shrink-0 bg-zinc-400" aria-hidden />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
