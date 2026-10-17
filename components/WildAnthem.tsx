"use client";

import { useCallback, useRef, useState } from "react";

type Status = "idle" | "playing" | "paused" | "missing";

export default function WildAnthem() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [status, setStatus] = useState<Status>("idle");

  const ensureAudio = useCallback(() => {
    if (!audioRef.current) {
      const a = new Audio("/audio/wild-anthem.mp3");
      a.preload = "none";
      a.addEventListener("ended", () => setStatus("idle"));
      a.addEventListener("error", () => setStatus("missing"));
      audioRef.current = a;
    }
    return audioRef.current;
  }, []);

  const toggle = async () => {
    const a = ensureAudio();
    if (status === "missing") return;

    try {
      if (status === "playing") {
        a.pause();
        setStatus("paused");
        return;
      }
      await a.play();
      setStatus("playing");
    } catch {
      setStatus("missing");
    }
  };

  const label =
    status === "playing"
      ? "Pause the anthem"
      : status === "paused"
        ? "Resume the anthem"
        : status === "missing"
          ? "Anthem missing 😭"
          : "Play the wild anthem";

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={status === "missing"}
      aria-pressed={status === "playing"}
      className={`pop-chip pop-button gap-3 py-2 pl-2 pr-5 text-base disabled:opacity-60 ${
        status === "playing" ? "bg-pop-lime" : "bg-white"
      }`}
    >
      <span
        className={`grid h-9 w-9 place-items-center rounded-full border-[2.5px] border-ink text-sm ${
          status === "playing" ? "bg-white" : "bg-pop-pink text-white"
        }`}
        aria-hidden="true"
      >
        {status === "playing" ? "❚❚" : "▶"}
      </span>
      {label}
      {status === "playing" && (
        <span className="inline-block animate-wiggle" aria-hidden="true">
          🎶
        </span>
      )}
    </button>
  );
}
