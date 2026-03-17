const messages = [
  "FREE SHIPPING OVER 50K",
  "BECAUSE IT CAN CHANGE YOUR MOOD",
  "BRIGHT YOUR EVERY DAY",
  "FREE SHIPPING OVER 50K",
];

export default function AnnouncementBar() {
  return (
    <div
      className="flex items-center justify-center gap-0 py-2.5 text-xs font-medium uppercase tracking-wider"
      style={{ background: "var(--lucerna-announce)", color: "var(--lucerna-text-dark)" }}
    >
      {messages.map((msg, i) => (
        <span key={i} className="flex items-center gap-4 whitespace-nowrap px-4">
          {msg}
          {i < messages.length - 1 && (
            <span className="h-3 w-px shrink-0 bg-zinc-400" aria-hidden />
          )}
        </span>
      ))}
    </div>
  );
}
