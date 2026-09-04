import Image from "next/image";
import { readFile } from "fs/promises";
import path from "path";
import type { WildData } from "@/lib/types";
import StageGallery from "@/components/StageGallery";
import SightingsList from "@/components/SightingsList";
import WildAnthem from "@/components/WildAnthem";
import WildMarquee from "@/components/WildMarquee";

async function loadWildData(): Promise<WildData> {
  const file = path.join(process.cwd(), "public", "data", "wild.json");
  const raw = await readFile(file, "utf-8");
  return JSON.parse(raw) as WildData;
}

function hypeCopy(count: number): string {
  if (count >= 20) {
    return "🚨 THE METER IS SCREAMING!!! Reality is melting. Someone call a scientist — or a DJ. 🚨";
  }
  if (count >= 10) {
    return "🌶️ Things are getting SPICY. Hue slipping. Neon incoming. Hold onto your pixels. 🌶️";
  }
  return "Baseline vibes… for now. Feed the wild and watch Min mutate. 👀";
}

export default async function HomePage() {
  const data = await loadWildData();
  const updated = new Date(data.lastUpdated).toLocaleString("en-GB", {
    timeZone: "Europe/Madrid",
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <main className="relative overflow-x-hidden pb-10">
      <WildMarquee />

      {/* floating stickers */}
      <div className="pointer-events-none absolute left-2 top-28 z-30 hidden sm:block" aria-hidden="true">
        <span className="sticker sticker-burst animate-bounceSoft">WOW<br />!!!</span>
      </div>
      <div className="pointer-events-none absolute right-3 top-36 z-30 hidden sm:block" aria-hidden="true">
        <span className="sticker sticker-new animate-wobble text-xs">★ HOT!!! ★</span>
      </div>
      <div className="glitter left-[12%] top-[22%]" style={{ animationDelay: "0.3s" }} aria-hidden="true" />
      <div className="glitter right-[18%] top-[28%]" style={{ animationDelay: "0.9s" }} aria-hidden="true" />
      <div className="glitter left-[70%] top-[18%]" style={{ animationDelay: "1.4s" }} aria-hidden="true" />

      {/* Hero */}
      <header className="relative mx-auto flex max-w-5xl flex-col items-center px-4 pb-10 pt-10 text-center sm:pt-14">
        <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
          <span className="sticker sticker-new text-xs sm:text-sm">★ NEW!!! ★ LIVE FEED</span>
          <p className="inline-flex items-center gap-2 rounded-full border-2 border-neon-lime bg-void/70 px-4 py-1.5 font-pixel text-[8px] uppercase tracking-[0.25em] text-neon-lime shadow-[0_0_16px_#b8ff3c] sm:text-[10px]">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-neon-lime shadow-[0_0_8px_#b8ff3c]" />
            live · wild-o-meter · 🔥
          </p>
        </div>

        <p className="mb-2 font-pixel text-[9px] uppercase tracking-[0.3em] text-neon-cyan sm:text-[11px]">
          how wild is min choi?!?
        </p>

        <h1
          className="glitch-text font-display text-[clamp(2.5rem,11vw,6.5rem)] leading-[0.85] tracking-wide text-white"
          data-text="WILD LEVEL:"
        >
          WILD LEVEL:
        </h1>

        <div className="relative mt-2">
          <span
            className="hero-chrome font-display block text-[clamp(5rem,22vw,11rem)] leading-none"
            aria-label={`Wild count ${data.wildCount}`}
          >
            {data.wildCount}
          </span>
          <span
            className="pointer-events-none absolute -right-4 -top-2 animate-spinSlow text-3xl sm:text-5xl"
            aria-hidden="true"
          >
            ✨
          </span>
          <span
            className="pointer-events-none absolute -bottom-1 -left-6 animate-bounceSoft text-2xl sm:text-4xl"
            aria-hidden="true"
          >
            💥
          </span>
        </div>

        <p className="mt-6 max-w-xl font-body text-base font-bold text-white/90 sm:text-xl">
          {hypeCopy(data.wildCount)}
        </p>

        <p className="mt-3 font-pixel text-[8px] text-white/40 sm:text-[9px]">
          last sync · {updated} PT · word hits on public threads
        </p>

        <div className="mt-10 w-full">
          <WildAnthem />
        </div>

        <nav className="mt-10 flex flex-wrap justify-center gap-3 font-display text-base tracking-wider sm:text-lg">
          <a
            href="#portrait"
            className="rounded-full border-2 border-neon-cyan bg-void/60 px-5 py-2 text-neon-cyan shadow-[3px_3px_0_#ff2d95] transition hover:-translate-y-0.5 hover:bg-neon-cyan hover:text-void"
          >
            🖼️ Portrait
          </a>
          <a
            href="#stages"
            className="rounded-full border-2 border-neon-pink bg-void/60 px-5 py-2 text-neon-pink shadow-[3px_3px_0_#ffe600] transition hover:-translate-y-0.5 hover:bg-neon-pink hover:text-white"
          >
            🃏 Stages
          </a>
          <a
            href="#sightings"
            className="rounded-full border-2 border-neon-yellow bg-void/60 px-5 py-2 text-neon-yellow shadow-[3px_3px_0_#00f0ff] transition hover:-translate-y-0.5 hover:bg-neon-yellow hover:text-void"
          >
            📡 Sightings
          </a>
        </nav>
      </header>

      <WildMarquee reverse />

      {/* Current portrait */}
      <section id="portrait" className="relative mx-auto max-w-xl px-4 py-12">
        <div className="mb-6 text-center">
          <span className="sticker sticker-new mb-3 inline-flex text-xs">★ CURRENT FORM ★</span>
          <p className="font-pixel text-[10px] uppercase tracking-[0.25em] text-neon-lime">
            mutated portrait booth
          </p>
          <h2 className="section-kaboom mt-2 text-3xl uppercase text-white sm:text-5xl">
            Mutated Portrait
          </h2>
        </div>
        <div className="chrome-frame animate-float relative mx-auto aspect-square overflow-hidden rounded-3xl">
          <Image
            src={data.currentImage}
            alt="Current wild mutated portrait of Min"
            fill
            priority
            sizes="(max-width: 640px) 100vw, 576px"
            className="object-cover animate-pulseNeon"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent opacity-60" />
          <div className="absolute left-3 top-3">
            <span className="sticker sticker-burst text-[7px]">LIVE<br />NOW</span>
          </div>
          <div className="absolute bottom-3 left-0 right-0 text-center">
            <span className="inline-block rounded-md border-4 border-white bg-gradient-to-r from-neon-pink via-neon-yellow to-neon-cyan px-4 py-1 font-display text-xl tracking-widest text-void shadow-[4px_4px_0_#000] sm:text-2xl">
              MAX WILD ENERGY 🔥
            </span>
          </div>
        </div>
      </section>

      <StageGallery stages={data.stages} />
      <SightingsList sightings={data.sightings} />

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
