export const WILD_GOAL = 1000;

/** Mood tiers shared by the gauge zones and the hero mood chip. */
export const WILD_TIERS = [
  { min: 0, label: "chill", emoji: "😌", color: "#3ddcff" },
  { min: 500, label: "spicy", emoji: "🌶️", color: "#a6f04d" },
  { min: 750, label: "feral", emoji: "🔥", color: "#ffd23f" },
  { min: 900, label: "ultra", emoji: "🌋", color: "#ff4f9a" },
] as const;

export function tierIndex(count: number): number {
  let index = 0;
  WILD_TIERS.forEach((tier, i) => {
    if (count >= tier.min) index = i;
  });
  return index;
}

/**
 * Needle position 0..1 on the gauge. Each tier gets an equal slice of the
 * dial, so the needle always sits in the zone named by the mood chip.
 */
export function gaugePosition(count: number): number {
  const i = tierIndex(count);
  const start = WILD_TIERS[i].min;
  const end = WILD_TIERS[i + 1]?.min ?? WILD_GOAL;
  const within = Math.min(1, Math.max(0, (count - start) / (end - start)));
  return (i + within) / WILD_TIERS.length;
}
