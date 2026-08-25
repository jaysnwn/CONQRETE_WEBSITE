"use client";
import { useEffect, useRef } from "react";

export function DynamicTitle() {
  const defaultTitle = "CONQRETE — BUILT FOR YOUR DAILY ABUSE";
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        let isFirstMessage = true;
        document.title = "Rhino Misses You 🦏";
        
        intervalRef.current = setInterval(() => {
          isFirstMessage = !isFirstMessage;
          document.title = isFirstMessage ? "Rhino Misses You 🦏" : "Come Back 👀";
        }, 1800);
      } else {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        document.title = defaultTitle;
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return null;
}

