import type { WildStage } from "@/lib/types";

const POSTER_TAGS = [
  "BASELINE BABY",
  "GETTING SPICY",
  "HUE CHAOS",
  "RGB SPLIT!!!",
  "NOISE CREEP",
  "GLITCH WAVE",
  "PSYCHO POSTER",
  "NEON SWIRL",
  "★ MAX WILD ★",
];

export default function StageGallery({ stages }: { stages: WildStage[] }) {
  return (
    <section id="stages" className="relative mx-auto max-w-6xl px-4 py-16">
      <div className="pointer-events-none absolute -left-2 top-8 glitter opacity-80" style={{ animationDelay: "0.2s" }} />
      <div className="pointer-events-none absolute right-6 top-20 glitter" style={{ animationDelay: "0.8s" }} />

      <div className="mb-12 text-center">
        <div className="mb-3 flex flex-wrap items-center justify-center gap-3">
          <span className="sticker sticker-new text-xs sm:text-sm">★ NEW!!! ★ COLLECT &apos;EM ALL</span>
          <span className="sticker sticker-burst">TRADE<br />ME</span>
        </div>
        <p className="mb-2 font-pixel text-[10px] uppercase tracking-[0.2em] text-neon-cyan sm:text-xs">
          ⚡ mutation trading cards ⚡
        </p>
        <h2 className="section-kaboom text-4xl uppercase tracking-tight text-white sm:text-6xl">
          Stages <span className="text-neon-yellow">0 → 8</span>
        </h2>
        <p className="mt-4 font-body text-base font-bold text-white/80 sm:text-lg">
          Wrestling-poster energy. From calm baseline to{" "}
          <span className="text-neon-pink">MAXIMUM WILD</span>. Scroll the glow. 💥
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stages.map((stage) => (
          <article
            key={stage.level}
            className="stage-card chrome-frame group"
          >
            <div className="poster-banner">
              {POSTER_TAGS[stage.level] ?? `STAGE ${stage.level}`}
            </div>
            <div className="relative aspect-square overflow-hidden bg-void">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={stage.image}
                alt={`Wild stage ${stage.level}: ${stage.caption}`}
                width={400}
                height={400}
                className="h-full w-full object-cover"
                loading="eager"
                decoding="async"
              />
              <div className="lvl-badge absolute left-3 top-3 z-10">
                LVL {stage.level}
              </div>
              {stage.level === 8 && (
                <span className="sticker sticker-new absolute right-2 top-2 z-10 text-[10px] sm:text-xs">
                  ★ FINAL BOSS ★
                </span>
              )}
              {stage.level >= 6 && stage.level < 8 && (
                <span className="absolute bottom-3 right-3 z-10 animate-bounceSoft text-2xl" aria-hidden="true">
                  🔥
                </span>
              )}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-transparent opacity-70" />
            </div>
            <div className="border-t-4 border-neon-yellow bg-gradient-to-r from-void via-[#1a0a2e] to-void px-4 py-3">
              <p className="font-display text-lg tracking-wide text-neon-cyan sm:text-xl">
                {stage.caption}
              </p>
              <p className="mt-1 font-pixel text-[8px] uppercase tracking-widest text-neon-pink/80">
                official wild card · not legal tender
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
