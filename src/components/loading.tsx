import { useEffect, useState } from "react";

import { data } from "@/constants/config";
import type { IPhase } from "@/constants/interfaces";

export const LoadingPage = ({ setPhase }: { setPhase: (phase: IPhase) => void }) => {
  const [loadPct, setLoadPct] = useState(0);
  // Loading simulation
  useEffect(() => {
    let pct = 0;
    const t = setInterval(() => {
      pct += Math.random() * 18 + 4;
      if (pct >= 100) {
        pct = 100;
        clearInterval(t);
        setLoadPct(100);
        setTimeout(() => setPhase("welcome"), 400);
      }
      setLoadPct(Math.round(pct));
    }, 120);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="loading-page" style={{ flexDirection: "column", gap: "1rem" }}>
      <img
        alt="icon"
        src={data.heroImage}
        style={{ width: "3.5rem", height: "3.5rem", borderRadius: "50%", objectFit: "cover", opacity: 0.8 }}
      />
      <div className="progress-bar-wrap" style={{ width: "25vw", minWidth: 180 }}>
        <div className="progress-bar-fill" style={{ width: `${loadPct}%` }} />
      </div>
      <small style={{ color: "var(--text-secondary)", fontSize: "0.8rem" }}>Bootstarping application...</small>
      {/* <div style={{ position: "absolute", bottom: "8%", width: "100%", textAlign: "center" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <small style={{ color: "var(--text-secondary)" }}>from</small>
          <small style={{ color: "var(--text-primary)" }}>
            <i className="fa-brands fa-github" style={{ marginRight: 4 }} />
            dewanakl
          </small>
        </div>
      </div> */}
    </div>
  );
};
