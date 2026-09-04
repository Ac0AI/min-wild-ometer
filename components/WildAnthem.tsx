"use client";

import { useCallback, useRef, useState } from "react";

type Status = "idle" | "playing" | "paused" | "missing";

export default function WildAnthem() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [hint, setHint] = useState<string | null>(null);

  const ensureAudio = useCallback(() => {
    if (!audioRef.current) {
      const a = new Audio("/audio/wild-anthem.mp3");
      a.preload = "none";
      a.addEventListener("ended", () => setStatus("idle"));
      a.addEventListener("error", () => {
        setStatus("missing");
        setHint("drop Suno track here → public/audio/wild-anthem.mp3");
      });
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
      setHint(null);
    } catch {
      setStatus("missing");
      setHint("drop Suno track here → public/audio/wild-anthem.mp3");
    }
  };

  const label =
    status === "playing"
      ? "⏸ PAUSE THE ANTHEM!!!"
      : status === "paused"
        ? "▶ RESUME THE CHAOS!!!"
        : status === "missing"
          ? "🔇 ANTHEM MISSING 😭"
          : "▶ PLAY THE WILD ANTHEM!!!";

  return (
    <div className="relative flex flex-col items-center gap-3 py-2">
      <span className="sticker sticker-new text-sm sm:text-base animate-bounceSoft">
        ★ INSERT COIN ★ HIT ME ★
      </span>
      <button
        type="button"
        onClick={toggle}
        className={`arcade-btn ${status === "playing" ? "playing" : ""}`}
        aria-pressed={status === "playing"}
      >
        <span className="arcade-ring" aria-hidden="true" />
        <span className="relative z-10 flex flex-col items-center leading-none gap-1">
          <span className="text-[0.55em] font-pixel tracking-widest text-neon-yellow drop-shadow-none">
            {status === "playing" ? "NOW PLAYING" : "ARCADE READY"}
          </span>
          <span>{label}</span>
        </span>
      </button>
      <p className="font-pixel text-[8px] uppercase tracking-widest text-neon-cyan/80 sm:text-[10px]">
        🔊 carnival volume · mash the button
      </p>
      {hint && (
        <p className="max-w-sm text-center font-mono text-xs text-neon-yellow/90">
          {hint}
        </p>
      )}
    </div>
  );
}
