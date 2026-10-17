import Image from "next/image";
import { readFile } from "fs/promises";
import path from "path";
import type { WildData } from "@/lib/types";
import { formatSightingRelative, formatSightingTime } from "@/lib/format";
import { WILD_GOAL, WILD_TIERS, tierIndex } from "@/lib/wildLevels";
import RelativeTime from "@/components/RelativeTime";
import StageGallery from "@/components/StageGallery";
import SightingsList from "@/components/SightingsList";
import WildAnthem from "@/components/WildAnthem";
import WildGauge from "@/components/WildGauge";
import WildMarquee from "@/components/WildMarquee";

async function loadWildData(): Promise<WildData> {
  const file = path.join(process.cwd(), "public", "data", "wild.json");
  const raw = await readFile(file, "utf-8");
  return JSON.parse(raw) as WildData;
}

function hypeCopy(count: number): { mood: string; line: string } {
  const left = Math.max(0, WILD_GOAL - count);
  if (count >= WILD_GOAL) {
    return { mood: "🚨 Ascended", line: "1000 wilds. Min has broken the meter. Reality is optional now." };
  }
  const tier = WILD_TIERS[tierIndex(count)];
  const mood = `${tier.emoji} ${tier.label[0].toUpperCase()}${tier.label.slice(1)}`;
  if (count >= 950) {
    return { mood, line: `Only ${left} to go — the meter is about to explode.` };
  }
  if (count >= 900) {
    return { mood, line: `Just ${left} more until the legendary 1000. Hold onto your pixels.` };
  }
  if (count >= 750) {
    return { mood, line: `${left} wilds left before Min goes nuclear.` };
  }
  if (count >= 500) {
    return { mood, line: `Past halfway — ${left} to go until 1000.` };
  }
  return { mood, line: `Baseline vibes… for now. ${left} to go.` };
}

const HOW_IT_WORKS = [
  { emoji: "🗣️", title: "Min says “wild”", text: "We count every whole-word “wild” in his own posts on X.", color: "bg-pop-cyan" },
  { emoji: "📈", title: "The meter climbs", text: "Retweets and replies don't count. Only pure, original wild.", color: "bg-pop-yellow" },
  { emoji: "🧬", title: "Min mutates", text: "His portrait gets wilder stage by stage. Goal: 1000.", color: "bg-pop-pink" },
];

export default async function HomePage() {
  const data = await loadWildData();
  const updated = new Date(data.lastUpdated).toLocaleString("en-GB", {
    timeZone: "Europe/Madrid",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
  const remaining = Math.max(0, WILD_GOAL - data.wildCount);
  const hype = hypeCopy(data.wildCount);
  const lastWild = data.sightings[0];

  return (
    <main className="overflow-x-hidden">
      {/* top bar */}
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4">
        <span className="font-display text-xl font-bold tracking-tight">
          wild<span className="text-pop-pink">·o·</span>meter
        </span>
        <span className="pop-chip bg-white text-sm">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pop-pink opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-pop-pink" />
          </span>
          Updated {updated}
        </span>
      </div>

      {/* HERO */}
      <header className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-14 pt-4 md:grid-cols-[1.1fr_1fr] md:pt-8">
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <h1 className="font-display text-[clamp(2.4rem,7vw,4rem)] font-bold leading-[1.02] tracking-tight">
            How wild is{" "}
            <a
              href="https://x.com/minchoi"
              target="_blank"
              rel="noopener noreferrer"
              className="pop-link whitespace-nowrap text-pop-pink underline decoration-[5px] underline-offset-[6px] hover:text-pop-purple"
            >
              Min Choi
            </a>
            ?!
          </h1>

          <div className="pop-card mt-8 w-full max-w-md bg-white p-5 sm:p-6">
            <div className="flex justify-center">
              <WildGauge count={data.wildCount} goal={WILD_GOAL} />
            </div>
            <div className="-mt-1 flex items-end justify-center gap-2">
              <span className="font-display text-7xl font-bold leading-none tracking-tight">
                {data.wildCount}
              </span>
              <span className="pb-2 font-display text-2xl font-semibold text-ink/40">/ {WILD_GOAL}</span>
            </div>
            <p className="mt-1 text-center font-display text-lg font-semibold">wilds said so far</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <span className="pop-chip bg-pop-yellow text-sm !shadow-none">{hype.mood}</span>
              <span className="pop-chip bg-pop-lime text-sm !shadow-none">
                {remaining > 0 ? `${remaining} to go` : "Goal smashed!"}
              </span>
              {lastWild && (
                <span className="pop-chip bg-pop-cyan text-sm !shadow-none">
                  Last wild <RelativeTime
                    iso={lastWild.at}
                    initial={formatSightingRelative(lastWild.at)}
                    fallback={formatSightingTime(lastWild.at)}
                  />
                </span>
              )}
            </div>
          </div>

          <p className="mt-6 max-w-md text-lg font-semibold">{hype.line}</p>

          <div className="mt-6">
            <WildAnthem />
          </div>
        </div>

        {/* Portrait */}
        <div className="relative order-first mx-auto w-full max-w-[17rem] sm:max-w-sm md:order-none md:max-w-md">
          <div className="absolute inset-0 translate-x-4 translate-y-4 rotate-3 rounded-[2rem] bg-pop-purple" aria-hidden="true" />
          <div className="relative animate-float overflow-hidden rounded-[2rem] border-[3px] border-ink bg-white shadow-pop-lg">
            <div className="relative aspect-square">
              <Image
                src={data.currentImage}
                alt="Min Choi's current wild mutated portrait"
                fill
                priority
                sizes="(max-width: 768px) 90vw, 448px"
                className="object-cover"
              />
            </div>
            <p className="border-t-[3px] border-ink bg-pop-yellow py-2 text-center font-display text-xl font-bold">
              Min, right now 🧬
            </p>
          </div>
          <span
            className="pop-chip absolute -left-3 -top-4 rotate-[-10deg] bg-pop-pink px-4 py-1.5 text-lg text-white"
            aria-hidden="true"
          >
            Current form!
          </span>
          <span className="absolute -bottom-6 -right-2 animate-wiggle text-5xl" aria-hidden="true">
            ⚡
          </span>
        </div>
      </header>

      <WildMarquee />

      <SightingsList sightings={data.sightings} />

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="mb-8 text-center font-display text-3xl font-bold sm:text-4xl">How it works</h2>
        <ol className="grid gap-5 md:grid-cols-3">
          {HOW_IT_WORKS.map((step, i) => (
            <li key={step.title} className="pop-card flex items-start gap-4 p-5">
              <span
                className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl border-[3px] border-ink text-3xl ${step.color}`}
                aria-hidden="true"
              >
                {step.emoji}
              </span>
              <div>
                <p className="font-display text-sm font-semibold uppercase tracking-widest text-ink/50">
                  Step {i + 1}
                </p>
                <h3 className="font-display text-xl font-bold">{step.title}</h3>
                <p className="mt-1 text-ink/75">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <StageGallery stages={data.stages} />

      <footer className="mt-6 border-t-[3px] border-ink bg-ink px-4 py-10 text-center text-cream">
        <p className="font-display text-2xl font-bold">Thanks for playing ✌️</p>
        <p className="mt-2 text-cream/80">
          Tracking{" "}
          <a
            href="https://x.com/minchoi"
            target="_blank"
            rel="noopener noreferrer"
            className="pop-link font-bold text-pop-yellow underline underline-offset-4 hover:text-pop-pink"
          >
            @minchoi
          </a>{" "}
          · built for fun · not affiliated 🦄
        </p>
      </footer>
    </main>
  );
}
