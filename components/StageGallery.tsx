import type { WildStage } from "@/lib/types";

const STAGE_NAMES = [
  "Calm Min",
  "A bit spicy",
  "Hue slipping",
  "RGB split",
  "Neon creep",
  "Glitch wave",
  "Psychedelic",
  "Neon swirl",
  "MAX WILD",
];

const STAGE_COLORS = [
  "bg-pop-cyan",
  "bg-pop-cyan",
  "bg-pop-lime",
  "bg-pop-lime",
  "bg-pop-yellow",
  "bg-pop-yellow",
  "bg-pop-orange",
  "bg-pop-pink",
  "bg-pop-purple",
];

export default function StageGallery({ stages }: { stages: WildStage[] }) {
  return (
    <section id="stages" className="mx-auto max-w-6xl px-4 py-14">
      <div className="mb-8 text-center">
        <p className="font-display text-sm font-semibold uppercase tracking-widest text-pop-purple">
          The evolution
        </p>
        <h2 className="mt-1 font-display text-4xl font-bold sm:text-5xl">
          From calm to <span className="text-pop-pink">MAX WILD</span>
        </h2>
        <p className="mx-auto mt-3 max-w-md text-lg">
          The more Min says “wild”, the further his portrait mutates. Nine stages, one destiny.
        </p>
      </div>

      <ol className="grid grid-cols-3 gap-3 sm:gap-5 md:grid-cols-5 lg:grid-cols-9 lg:gap-3">
        {stages.map((stage) => {
          const isFinal = stage.level === stages.length - 1;
          return (
            <li
              key={stage.level}
              className={`group relative ${isFinal ? "col-span-3 md:col-span-1" : ""}`}
            >
              <div
                className={`pop-card overflow-hidden !rounded-2xl !shadow-pop transition-transform duration-200 group-hover:-translate-y-1 group-hover:rotate-[-2deg] ${
                  isFinal ? "mx-auto max-w-[14rem] md:max-w-none" : ""
                }`}
              >
                <div className="relative aspect-square">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={stage.image}
                    alt={`Stage ${stage.level}: ${stage.caption}`}
                    width={300}
                    height={300}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <span
                    className={`absolute left-1.5 top-1.5 grid h-7 w-7 place-items-center rounded-full border-2 border-ink font-display text-sm font-bold ${
                      STAGE_COLORS[stage.level] ?? "bg-white"
                    } ${stage.level >= 7 ? "text-white" : ""}`}
                  >
                    {stage.level}
                  </span>
                  {isFinal && (
                    <span className="absolute -right-1 -top-1 animate-wiggle text-2xl" aria-hidden="true">
                      👑
                    </span>
                  )}
                </div>
                <p className="border-t-[3px] border-ink px-2 py-1.5 text-center font-display text-sm font-semibold leading-tight">
                  {STAGE_NAMES[stage.level] ?? stage.caption}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
