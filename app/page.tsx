import Image from "next/image";
import { readFile } from "fs/promises";
import path from "path";
import type { WildData } from "@/lib/types";
import StageGallery from "@/components/StageGallery";
import SightingsList from "@/components/SightingsList";
import WildAnthem from "@/components/WildAnthem";
import WildMarquee from "@/components/WildMarquee";

const WILD_GOAL = 1000;

async function loadWildData(): Promise<WildData> {
  const file = path.join(process.cwd(), "public", "data", "wild.json");
  const raw = await readFile(file, "utf-8");
  return JSON.parse(raw) as WildData;
}

function hypeCopy(count: number): string {
  const left = Math.max(0, WILD_GOAL - count);
  if (count >= WILD_GOAL) {
    return "🚨 1000 WILD HIT!!! Min Choi has ASCENDED. Reality is optional. 🚨";
  }
  if (count >= 950) {
    return `🌋 ULTRA WILD — only ${left} to 1000!!! Min is about to break the meter. Hold onto your pixels. 🌋`;
  }
  if (count >= 900) {
    return `🔥 MIN IS FERAL — ${count} wilds and climbing. Just ${left} more until legendary 1000. 🔥`;
  }
  if (count >= 750) {
    return `🌶️ Serious wild energy — ${count}/1000. ${left} wilds left before Min goes nuclear. 🌶️`;
  }
  if (count >= 500) {
    return `👀 Halfway-and-then-some wild. Min at ${count} — ${left} to go until 1000. Feed the meter. 👀`;
  }
  return `Baseline vibes… for now. Min sits at ${count}/1000. Feed the wild and watch the mutate. 👀`;
}

export default async function HomePage() {
  const data = await loadWildData();
  const updated = new Date(data.lastUpdated).toLocaleString("en-GB", {
    timeZone: "Europe/Madrid",
    dateStyle: "medium",
    timeStyle: "short",
  });
  const progressPct = Math.min(100, Math.round((data.wildCount / WILD_GOAL) * 1000) / 10);
  const remaining = Math.max(0, WILD_GOAL - data.wildCount);

  return (
    <main className="relative overflow-x-hidden pb-10">
      {/* slim top ticker — demoted noise */}
      <div className="opacity-70">
        <WildMarquee />
      </div>

      {/* soft decorative stickers — smaller / less competing */}
      <div className="pointer-events-none absolute left-2 top-24 z-20 hidden opacity-50 lg:block" aria-hidden="true">
        <span className="sticker sticker-burst scale-75 animate-bounceSoft">WOW<br />!!!</span>
      </div>
      <div className="pointer-events-none absolute right-3 top-28 z-20 hidden opacity-50 lg:block" aria-hidden="true">
        <span className="sticker sticker-new scale-75 animate-wobble text-[10px]">★ HOT!!! ★</span>
      </div>
      <div className="glitter left-[8%] top-[18%] opacity-60" style={{ animationDelay: "0.3s" }} aria-hidden="true" />
      <div className="glitter right-[10%] top-[22%] opacity-60" style={{ animationDelay: "0.9s" }} aria-hidden="true" />

      {/* HERO: Min portrait + wild count — first viewport focus */}
      <header className="relative mx-auto max-w-6xl px-4 pb-6 pt-6 sm:pt-8">
        <div className="mb-4 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
          <span className="sticker sticker-new text-[10px] sm:text-xs">★ LIVE FEED ★</span>
          <p className="inline-flex items-center gap-2 rounded-full border-2 border-neon-lime bg-void/70 px-3 py-1 font-pixel text-[7px] uppercase tracking-[0.2em] text-neon-lime shadow-[0_0_12px_#b8ff3c] sm:text-[9px]">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-neon-lime shadow-[0_0_8px_#b8ff3c]" />
            wild-o-meter · live
          </p>
        </div>

        <div className="grid items-center gap-6 md:grid-cols-2 md:gap-8 lg:gap-12">
          {/* Portrait — the star */}
          <div className="relative mx-auto w-full max-w-md md:max-w-none">
            <div className="chrome-frame animate-float relative mx-auto aspect-square overflow-hidden rounded-3xl">
              <Image
                src={data.currentImage}
                alt="Current wild mutated portrait of Min Choi"
                fill
                priority
                sizes="(max-width: 768px) 90vw, 480px"
                className="object-cover animate-pulseNeon"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent opacity-50" />
              <div className="absolute left-3 top-3">
                <span className="sticker sticker-burst text-[7px]">LIVE<br />NOW</span>
              </div>
              <div className="absolute bottom-3 left-0 right-0 px-3 text-center">
                <span className="inline-block rounded-md border-4 border-white bg-gradient-to-r from-neon-pink via-neon-yellow to-neon-cyan px-3 py-1 font-display text-lg tracking-widest text-void shadow-[4px_4px_0_#000] sm:text-xl">
                  MAX WILD ENERGY 🔥
                </span>
              </div>
            </div>
          </div>

          {/* Name + count + meter */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <a
              href="https://x.com/minchoi"
              target="_blank"
              rel="noopener noreferrer"
              className="group mb-1 inline-block"
            >
              <h1
                className="glitch-text font-display text-[clamp(2.75rem,12vw,5.5rem)] leading-[0.85] tracking-wide text-white transition group-hover:text-neon-cyan"
                data-text="MIN CHOI"
              >
                MIN CHOI
              </h1>
              <span className="mt-1 inline-block font-pixel text-[10px] uppercase tracking-[0.35em] text-neon-cyan group-hover:text-neon-pink sm:text-xs">
                @minchoi →
              </span>
            </a>

            <p className="mt-4 font-pixel text-[9px] uppercase tracking-[0.3em] text-neon-yellow sm:text-[11px]">
              wild count
            </p>

            <div className="relative mt-1">
              <span
                className="hero-chrome font-display block text-[clamp(4.5rem,18vw,9rem)] leading-none"
                aria-label={`Wild count ${data.wildCount}`}
              >
                {data.wildCount}
              </span>
              <span
                className="pointer-events-none absolute -right-3 -top-1 animate-spinSlow text-2xl sm:text-4xl"
                aria-hidden="true"
              >
                ✨
              </span>
              <span
                className="pointer-events-none absolute -bottom-1 -left-4 animate-bounceSoft text-xl sm:text-3xl"
                aria-hidden="true"
              >
                💥
              </span>
            </div>

            {/* Neon progress toward 1000 */}
            <div className="mt-5 w-full max-w-md">
              <div className="mb-1.5 flex items-baseline justify-between gap-2 font-pixel text-[8px] uppercase tracking-[0.2em] text-white/70 sm:text-[9px]">
                <span>
                  {data.wildCount}
                  <span className="text-neon-pink"> / {WILD_GOAL}</span>
                </span>
                <span className="text-neon-lime">
                  {remaining > 0 ? `${remaining} to go` : "MAXED!!!"}
                </span>
              </div>
              <div
                className="wild-progress"
                role="progressbar"
                aria-valuenow={data.wildCount}
                aria-valuemin={0}
                aria-valuemax={WILD_GOAL}
                aria-label={`Wild progress ${data.wildCount} of ${WILD_GOAL}`}
              >
                <div className="wild-progress-fill" style={{ width: `${progressPct}%` }} />
              </div>
            </div>

            <p className="mt-5 max-w-md font-body text-sm font-bold text-white/90 sm:text-base">
              {hypeCopy(data.wildCount)}
            </p>

            <p className="mt-2 font-pixel text-[7px] text-white/40 sm:text-[8px]">
              last sync · {updated} PT · word hits on public threads
            </p>
          </div>
        </div>

        {/* Anthem below hero focus — kept, demoted */}
        <div className="mx-auto mt-10 max-w-lg opacity-95">
          <WildAnthem />
        </div>

        <nav className="mt-8 flex flex-wrap justify-center gap-2 font-display text-sm tracking-wider opacity-80 sm:gap-3 sm:text-base">
          <a
            href="#portrait"
            className="rounded-full border-2 border-neon-cyan/80 bg-void/60 px-4 py-1.5 text-neon-cyan shadow-[2px_2px_0_#ff2d95] transition hover:-translate-y-0.5 hover:bg-neon-cyan hover:text-void"
          >
            🖼️ Form
          </a>
          <a
            href="#stages"
            className="rounded-full border-2 border-neon-pink/80 bg-void/60 px-4 py-1.5 text-neon-pink shadow-[2px_2px_0_#ffe600] transition hover:-translate-y-0.5 hover:bg-neon-pink hover:text-white"
          >
            🃏 Stages
          </a>
          <a
            href="#sightings"
            className="rounded-full border-2 border-neon-yellow/80 bg-void/60 px-4 py-1.5 text-neon-yellow shadow-[2px_2px_0_#00f0ff] transition hover:-translate-y-0.5 hover:bg-neon-yellow hover:text-void"
          >
            📡 Sightings
          </a>
        </nav>
      </header>

      <div className="opacity-60">
        <WildMarquee reverse />
      </div>

      {/* Latest wild tweets early — times front and center */}
      <SightingsList sightings={data.sightings} />

      {/* Compact current-form note — no duplicate giant portrait */}
      <section id="portrait" className="relative mx-auto max-w-2xl px-4 py-8 text-center">
        <span className="sticker sticker-new mb-2 inline-flex text-[10px]">★ CURRENT FORM ★</span>
        <p className="font-pixel text-[9px] uppercase tracking-[0.25em] text-neon-lime sm:text-[10px]">
          mutated portrait booth · live in the hero ↑
        </p>
        <h2 className="section-kaboom mt-1 text-2xl uppercase text-white sm:text-3xl">
          This Is Min Right Now
        </h2>
        <p className="mx-auto mt-3 max-w-md font-body text-sm font-bold text-white/75">
          The portrait up top mutates as the wild count climbs. Stage cards below — same energy, more chaos.
        </p>
      </section>

      <StageGallery stages={data.stages} />

      <footer className="mx-auto mt-8 max-w-3xl border-t-4 border-dashed border-neon-pink/50 px-4 py-10 text-center">
        <p className="mb-3 font-display text-2xl tracking-wide text-neon-yellow animate-flicker">
          ★ THANKS FOR PLAYING ★
        </p>
        <p className="font-body text-sm font-bold text-white/80">
          tracking{" "}
          <a
            href="https://x.com/minchoi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neon-cyan underline decoration-neon-cyan/40 underline-offset-4 hover:text-neon-pink"
          >
            @minchoi
          </a>{" "}
          · built for fun · not affiliated 🦄
        </p>
        <p className="mt-3 font-pixel text-[8px] uppercase tracking-[0.25em] text-white/35 sm:text-[9px]">
          wild-o-meter · meme energy only · no refunds
        </p>
      </footer>
    </main>
  );
}
