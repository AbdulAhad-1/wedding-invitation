"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Error({ error }: { error: Error & { digest?: string }; reset: () => void }) {
  const router = useRouter();

  useEffect(() => {
    console.error("[App Error]", error);
    router.replace("/not-found");
  }, [error, router]);

  return null;
}
