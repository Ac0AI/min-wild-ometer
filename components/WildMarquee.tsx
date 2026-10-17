const PHRASES = [
  "how wild is min?!",
  "feed the meter",
  "1000 or bust",
  "every “wild” counts",
  "reality is melting",
  "not affiliated · just vibes",
];

export default function WildMarquee() {
  const doubled = [...PHRASES, ...PHRASES, ...PHRASES, ...PHRASES];
  return (
    <div className="overflow-hidden border-y-[3px] border-ink bg-pop-yellow py-2" aria-hidden="true">
      <div className="marquee-track animate-marquee">
        {doubled.map((p, i) => (
          <span key={`${p}-${i}`} className="font-display text-lg font-semibold uppercase tracking-wide">
            {p}
            <span className="mx-5 text-pop-pink">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
