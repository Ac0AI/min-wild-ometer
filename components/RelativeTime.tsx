"use client";

import { useEffect, useState } from "react";
import { formatSightingRelative } from "@/lib/format";

const REFRESH_MS = 60_000;

/**
 * "3d ago" label that stays fresh: the static page ships the build-time label,
 * then the browser recomputes it on load and every minute after.
 */
export default function RelativeTime({
  iso,
  initial,
  fallback,
}: {
  iso: string;
  initial: string;
  fallback: string;
}) {
  const [label, setLabel] = useState(initial || fallback);

  useEffect(() => {
    const update = () => setLabel(formatSightingRelative(iso) || fallback);
    update();
    const id = setInterval(update, REFRESH_MS);
    return () => clearInterval(id);
  }, [iso, fallback]);

  return <>{label}</>;
}
