export function formatSightingTime(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleString("en-GB", {
      timeZone: "Europe/Madrid",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

/** Short relative label in Europe/Madrid context (e.g. "3d ago"). */
export function formatSightingRelative(iso: string): string {
  try {
    const d = new Date(iso);
    const diffMs = Date.now() - d.getTime();
    if (Number.isNaN(diffMs)) return "";
    const sec = Math.floor(diffMs / 1000);
    if (sec < 60) return "just now";
    const min = Math.floor(sec / 60);
    if (min < 60) return `${min}m ago`;
    const hr = Math.floor(min / 60);
    if (hr < 48) return `${hr}h ago`;
    const day = Math.floor(hr / 24);
    if (day < 45) return `${day}d ago`;
    const mo = Math.floor(day / 30);
    if (mo < 18) return `${mo}mo ago`;
    return `${Math.floor(day / 365)}y ago`;
  } catch {
    return "";
  }
}
