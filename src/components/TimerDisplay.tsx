"use client";

import { useTimerStore } from "@/store/timerStore";
import { formatTime } from "@/lib/time";

export function TimerDisplay() {
  const remainingSec = useTimerStore((state) => state.remainingSec);
  const status = useTimerStore((state) => state.status);

  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-950 p-8 text-center shadow-2xl">
      <div className="text-sm uppercase tracking-[0.3em] text-zinc-500">
        ОСТАЛОСЬ ВРЕМЕНИ:
      </div>

      <div className="mt-4 font-mono text-7xl font-bold tabular-nums text-white md:text-9xl">
        {formatTime(remainingSec)}
      </div>

      <div className="mt-4 text-sm text-zinc-500">
        Статус: <span className="text-zinc-300">{status}</span>
      </div>
    </section>
  );
}
