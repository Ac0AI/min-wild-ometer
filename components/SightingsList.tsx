import type { WildSighting } from "@/lib/types";
import { formatSightingRelative, formatSightingTime } from "@/lib/format";

export default function SightingsList({ sightings }: { sightings: WildSighting[] }) {
  return (
    <section id="sightings" className="relative mx-auto max-w-3xl px-4 py-10 sm:py-12">
      <div className="mb-8 text-center">
        <span className="sticker sticker-burst mb-3 inline-flex">WHOA<br />!!!</span>
        <p className="mb-2 font-pixel text-[10px] uppercase tracking-[0.2em] text-neon-pink sm:text-xs">
          📡 latest wild tweets · with times
        </p>
        <h2 className="section-kaboom text-4xl uppercase tracking-tight text-white sm:text-5xl">
          Recent <span className="text-neon-yellow">Wild</span> Sightings
        </h2>
        <p className="mt-3 font-body text-base font-bold text-white/80">
          Newest first. See when Min went wild — then jump to X. 👀✨
        </p>
      </div>

      <ul className="space-y-4">
        {sightings.map((s, i) => {
          const relative = formatSightingRelative(s.at);
          const absolute = formatSightingTime(s.at);
          return (
            <li key={s.id}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="sighting-ticket block p-4 sm:p-5"
              >
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-flex flex-wrap items-center gap-2 font-display text-lg tracking-wide text-neon-cyan">
                    <span className="rounded bg-neon-pink px-2 py-0.5 text-sm text-white shadow-[2px_2px_0_#000]">
                      #{String(i + 1).padStart(2, "0")}
                    </span>
                    SIGHTING
                    {i === 0 && (
                      <span className="sticker sticker-new text-[10px]">★ NEW!!! ★</span>
                    )}
                  </span>
                  <time
                    dateTime={s.at}
                    className="inline-flex flex-col items-end gap-0.5 text-right"
                  >
                    <span className="font-display text-base tracking-wide text-neon-yellow sm:text-lg">
                      {relative || absolute}
                    </span>
                    <span className="font-pixel text-[8px] uppercase tracking-wider text-neon-cyan/90 sm:text-[9px]">
                      {absolute} PT
                    </span>
                  </time>
                </div>
                <p className="font-body text-sm font-bold leading-relaxed text-white/95 sm:text-base">
                  {s.text}
                </p>
                <p className="mt-3 font-display text-base tracking-wider text-neon-yellow">
                  open on x.com → 🚀
                </p>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
