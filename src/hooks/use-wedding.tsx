"use client";
import { createContext, useContext, useRef, useState, useCallback, useEffect, ReactNode } from "react";
import { CALENDAR_EVENT } from "../constants/data";
import { ICalenderDetails } from "../constants/interfaces";

declare global {
  interface Window {
    confetti: any;
  }
}
// ── Types ──────────────────────────────────────────────────────
interface WeddingContextType {
  // Audio
  isPlaying: boolean;
  toggleAudio: () => void;
  startAudio: () => void;
  // Confetti
  fireOpenAnimation: (seconds?: number) => void;
  fireTapTap: (element: HTMLElement) => void;
  // Calendar
  saveToGoogleCalendar: (details: ICalenderDetails) => void;
}

// ── Context ────────────────────────────────────────────────────
const WeddingContext = createContext<WeddingContextType | null>(null);

// ── Provider ───────────────────────────────────────────────────
export function WeddingProvider({
  children,
  audioUrl = "https://cdn.pixabay.com/audio/2024/03/13/audio_72b52da7c7.mp3",
}: {
  children: ReactNode;
  audioUrl?: string;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // ── Audio helpers ──────────────────────────────────────────
  const initAudio = useCallback(() => {
    if (audioRef.current) return;
    audioRef.current = new Audio(audioUrl);
    audioRef.current.loop = true;
  }, [audioUrl]);

  const startAudio = useCallback(() => {
    initAudio();
    audioRef
      .current!.play()
      .then(() => setIsPlaying(true))
      .catch(() => {});
  }, [initAudio]);

  const toggleAudio = useCallback(() => {
    initAudio();
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  }, [isPlaying, initAudio]);

  // Pause when tab is hidden, resume when visible
  useEffect(() => {
    const handleVisibility = () => {
      if (!audioRef.current) return;
      if (document.hidden) {
        audioRef.current.pause();
      } else if (isPlaying) {
        audioRef.current.play().catch(() => {});
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [isPlaying]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  // ── Confetti helpers ───────────────────────────────────────
  const heartShape = useCallback(() => {
    if (!window.confetti) return null;
    return window.confetti.shapeFromPath({
      path: "M167 72c19,-38 37,-56 75,-56 42,0 76,33 76,75 0,76 -76,151 -151,227 -76,-76 -151,-151 -151,-227 0,-42 33,-75 75,-75 38,0 57,18 76,56z",
      matrix: [0.03333333333333333, 0, 0, 0.03333333333333333, -5.566666666666666, -5.533333333333333],
    });
  }, []);

  const fireOpenAnimation = useCallback(
    (seconds = 15) => {
      if (!window.confetti) return;
      const duration = seconds * 1000;
      const animationEnd = Date.now() + duration;
      const heart = heartShape();
      const colors = ["#FFC0CB", "#FF1493", "#C71585"];
      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const frame = () => {
        const timeLeft = animationEnd - Date.now();
        colors.forEach((color) => {
          window.confetti({
            particleCount: 1,
            startVelocity: 0,
            ticks: Math.max(50, 75 * (timeLeft / duration)),
            origin: {
              x: Math.random(),
              y: Math.abs(Math.random() - timeLeft / duration),
            },
            zIndex: 1057,
            colors: [color],
            shapes: [heart],
            drift: randomInRange(-0.5, 0.5),
            gravity: randomInRange(0.5, 1),
            scalar: randomInRange(0.5, 1),
          });
        });
        if (timeLeft > 0) requestAnimationFrame(frame);
      };

      requestAnimationFrame(frame);
    },
    [heartShape],
  );

  const fireTapTap = useCallback(
    (element: HTMLElement) => {
      if (!window.confetti) return;
      const end = Date.now() + 50;
      const rect = element.getBoundingClientRect();
      const yPos = Math.max(0.3, Math.min(1, rect.top / window.innerHeight + 0.2));
      const heart = heartShape();
      const colors = ["#FF69B4", "#FF1493"];

      const frame = () => {
        colors.forEach((color) => {
          window.confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            shapes: [heart],
            origin: { x: rect.left / window.innerWidth, y: yPos },
            zIndex: 1057,
            colors: [color],
          });
          window.confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            shapes: [heart],
            origin: { x: rect.right / window.innerWidth, y: yPos },
            zIndex: 1057,
            colors: [color],
          });
        });
        if (Date.now() < end) requestAnimationFrame(frame);
      };

      requestAnimationFrame(frame);
    },
    [heartShape],
  );

  const saveToGoogleCalendar = useCallback((details: ICalenderDetails) => {
    const { title, description, location, startDateTime, endDateTime } = details;
    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: title,
      details: description,
      location: location,
      dates: `${startDateTime}/${endDateTime}`,
      ctz: "Asia/Karachi",
    });

    window.open(`https://calendar.google.com/calendar/render?${params.toString()}`, "_blank", "noopener,noreferrer");
  }, []);

  return (
    <WeddingContext.Provider
      value={{ isPlaying, toggleAudio, startAudio, fireOpenAnimation, fireTapTap, saveToGoogleCalendar }}
    >
      {children}
    </WeddingContext.Provider>
  );
}

// ── Hook ───────────────────────────────────────────────────────
export function useWedding() {
  const ctx = useContext(WeddingContext);
  if (!ctx) throw new Error("useWedding must be used inside <WeddingProvider>");
  return ctx;
}
