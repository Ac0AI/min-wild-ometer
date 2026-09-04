const PHRASES = [
  "★ WILD ENERGY ★",
  "🔥 HOW WILD IS MIN?!! 🔥",
  "★ NEW!!! ★ MAXIMUM MUTATION",
  "🎰 FEED THE METER 🎰",
  "✨ NEON FOREVER ✨",
  "💀 REALITY IS MELTING 💀",
  "🌈 CARNIVAL CYBERPUNK TRASH 🌈",
  "⚡ RGB SPLIT ENGAGED ⚡",
  "🪩 HIT THE ANTHEM 🪩",
  "🦄 STAGE 8 OR BUST 🦄",
  "💥 NOT AFFILIATED · JUST VIBES 💥",
  "🐉 HUE SLIPPING… 🐉",
];

export default function WildMarquee({ reverse = false }: { reverse?: boolean }) {
  const doubled = [...PHRASES, ...PHRASES];
  return (
    <div className="ticker-track relative z-20" aria-hidden="true">
      <div
        className="ticker-inner"
        style={{
          animationName: reverse ? "marqueeRev" : "marquee",
          animationDuration: reverse ? "32s" : "28s",
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
        }}
      >
        {doubled.map((p, i) => (
          <span key={`${p}-${i}`}>
            {p}
            <span className="mx-3 text-neon-yellow">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
