"use client";

import { useEffect } from "react";
import { playClickSound } from "@/lib/sounds";

export default function ClickSoundProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isButton = target.closest("button, a");

      if (isButton) {
        playClickSound();
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return <>{children}</>;
}