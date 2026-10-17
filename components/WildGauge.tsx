import type { CSSProperties } from "react";
import { WILD_TIERS, gaugePosition } from "@/lib/wildLevels";

const ZONES = WILD_TIERS;

const CX = 120;
const CY = 120;
const R = 96;

/** Point on the gauge arc; t=0 is the far left, t=1 the far right. */
function arcPoint(t: number, radius = R) {
  const angle = Math.PI * (1 - t);
  return { x: CX + radius * Math.cos(angle), y: CY - radius * Math.sin(angle) };
}

function arcPath(from: number, to: number) {
  const a = arcPoint(from);
  const b = arcPoint(to);
  return `M ${a.x} ${a.y} A ${R} ${R} 0 0 1 ${b.x} ${b.y}`;
}

/** Speedometer-style dial: needle points into the zone of the current mood tier. */
export default function WildGauge({ count, goal }: { count: number; goal: number }) {
  const pct = gaugePosition(count);
  const needleStyle = { "--needle-angle": `${pct * 180 - 90}deg` } as CSSProperties;
  const step = 1 / ZONES.length;

  return (
    <svg
      viewBox="0 0 240 140"
      className="w-full max-w-sm"
      role="img"
      aria-label={`Wild meter at ${count} of ${goal}`}
    >
      {/* dark outline under the colored zones */}
      <path d={arcPath(0, 1)} fill="none" stroke="#1b1035" strokeWidth={30} strokeLinecap="round" />
      {ZONES.map((zone, i) => (
        <path
          key={zone.label}
          d={arcPath(i * step + 0.004, (i + 1) * step - 0.004)}
          fill="none"
          stroke={zone.color}
          strokeWidth={22}
          strokeLinecap="butt"
        />
      ))}
      {ZONES.map((zone, i) => {
        const p = arcPoint((i + 0.5) * step, R - 30);
        return (
          <text
            key={zone.label}
            x={p.x}
            y={p.y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-ink/60 font-display text-[10px] font-semibold uppercase"
          >
            {zone.label}
          </text>
        );
      })}
      <g className="gauge-needle" style={needleStyle}>
        <path d={`M ${CX - 6} ${CY} L ${CX} ${CY - R + 4} L ${CX + 6} ${CY} Z`} fill="#1b1035" />
      </g>
      <circle cx={CX} cy={CY} r={12} fill="#ff4f9a" stroke="#1b1035" strokeWidth={4} />
    </svg>
  );
}
