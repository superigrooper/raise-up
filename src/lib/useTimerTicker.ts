"use client";

import { useEffect } from "react";
import { useTimerStore } from "@/store/timerStore";

export function useTimerTicker() {
  const tick = useTimerStore((state) => state.tick);
  const status = useTimerStore((state) => state.status);

  useEffect(() => {
    if (status !== "running") return;

    const intervalId = window.setInterval(() => {
      tick();
    }, 250);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [status, tick]);
}
