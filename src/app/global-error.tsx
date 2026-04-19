"use client";
import { useEffect } from "react";

export default function GlobalError({ error }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("[Global Error]", error);
    window.location.replace("/not-found");
  }, [error]);

  return (
    <html>
      <body />
    </html>
  );
}
