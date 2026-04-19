"use client";
import { useState } from "react";

declare global {
  interface Window {
    confetti: any;
  }
}

import { LoadingPage } from "../../../components/loading";
import { Welcome } from "../../../components/welcome";
import { Main } from "../../../components/main";

import { IPhase } from "../../../constants/interfaces";

export default function WeddingPage() {
  const [phase, setPhase] = useState<IPhase>("loading");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  return (
    <div data-theme={theme} className="text-auto">
      {/* Loading Page */}
      {phase === "loading" && <LoadingPage setPhase={setPhase} />}

      {/* Welcome Page */}
      {(phase === "welcome" || phase === "main") && <Welcome phase={phase} setPhase={setPhase} />}

      {/* Main Content */}
      {phase === "main" && <Main phase={phase} setTheme={setTheme} />}
    </div>
  );
}
