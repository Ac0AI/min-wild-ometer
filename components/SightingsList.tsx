import type { ReactNode } from "react";
import type { WildSighting } from "@/lib/types";
import { formatSightingRelative, formatSightingTime } from "@/lib/format";

const FEATURED = 3;
const CARD_TILTS = ["sm:-rotate-1", "sm:rotate-1", "sm:-rotate-[0.5deg]"];

/** Wrap every whole-word "wild" in a highlighter mark. */
function highlightWild(text: string): ReactNode[] {
  return text.split(/(\bwild\b)/gi).map((part, i) =>
    /^wild$/i.test(part) ? (
      <mark key={i} className="wild-mark text-ink">
        {part}
      </mark>
    ) : (
      part
    ),
  );
}

/** First line becomes the headline; t.co links are dropped from the preview. */
function splitTweet(text: string) {
  const lines = text
    .replace(/https?:\/\/t\.co\/\S+/g, "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  return { headline: lines[0] ?? "", rest: lines.slice(1).join(" ") };
}

function SightingCard({ sighting, featured }: { sighting: WildSighting; featured?: boolean }) {
  const { headline, rest } = splitTweet(sighting.text);
  const relative = formatSightingRelative(sighting.at);
  const absolute = formatSightingTime(sighting.at);

  return (
    <a
      href={sighting.url}
      target="_blank"
      rel="noopener noreferrer"
      className="pop-card pop-button pop-link flex h-full flex-col p-5"
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <time
          dateTime={sighting.at}
          title={`${absolute} (Madrid time)`}
          className="pop-chip bg-pop-cyan !px-2.5 !py-0.5 text-sm !shadow-none"
        >
          🕒 {relative || absolute}
        </time>
        {featured && <span className="text-2xl" aria-hidden="true">🔥</span>}
      </div>
      <p className={`font-display font-semibold leading-snug ${featured ? "text-xl" : "text-lg"}`}>
        {highlightWild(headline)}
      </p>
      {rest && (
        <p className="mt-2 line-clamp-3 text-[15px] leading-relaxed text-ink/75">{highlightWild(rest)}</p>
      )}
      <span className="mt-auto pt-4 font-display text-sm font-semibold text-pop-purple">
        Read on X →
      </span>
    </a>
  );
}

export default function SightingsList({ sightings }: { sightings: WildSighting[] }) {
  const featured = sightings.slice(0, FEATURED);
  const more = sightings.slice(FEATURED);

  return (
    <section id="sightings" className="mx-auto max-w-6xl px-4 py-14">
      <div className="mb-8 text-center">
        <p className="font-display text-sm font-semibold uppercase tracking-widest text-pop-pink">
          Caught in the wild
        </p>
        <h2 className="mt-1 font-display text-4xl font-bold sm:text-5xl">Latest wild sightings</h2>
        <p className="mx-auto mt-3 max-w-md text-lg">
          Fresh from X — every <mark className="wild-mark text-ink">wild</mark> highlighted so you can spot it.
        </p>
      </div>

      <ul className="grid gap-6 md:grid-cols-3">
        {featured.map((s, i) => (
          <li key={s.id} className={CARD_TILTS[i % CARD_TILTS.length]}>
            <SightingCard sighting={s} featured />
          </li>
        ))}
      </ul>

      {more.length > 0 && (
        <details className="group mt-10">
          <summary className="mx-auto flex w-fit cursor-pointer list-none">
            <span className="pop-chip pop-button bg-pop-yellow px-5 py-2 text-lg">
              <span className="group-open:hidden">Show {more.length} more sightings 👀</span>
              <span className="hidden group-open:inline">Show fewer</span>
            </span>
          </summary>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((s) => (
              <li key={s.id}>
                <SightingCard sighting={s} />
              </li>
            ))}
          </ul>
        </details>
      )}
    </section>
  );
}
