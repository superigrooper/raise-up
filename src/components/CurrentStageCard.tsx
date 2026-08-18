"use client";

import { useTimerStore } from "@/store/timerStore";
import { formatTime } from "@/lib/time";

export function CurrentStageCard() {
  const tournament = useTimerStore((state) => state.tournament);
  const currentStageIndex = useTimerStore((state) => state.currentStageIndex);

  if (!tournament) {
    return (
      <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
        <div className="text-zinc-400">Турнир не выбран</div>
      </section>
    );
  }

  const stage = tournament.stages[currentStageIndex];

  if (!stage) {
    return (
      <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
        <div className="text-zinc-400">No current stage</div>
      </section>
    );
  }

  if (stage.type === "break") {
    return (
      <section className="rounded-2xl border border-amber-500/30 bg-amber-950/20 p-6">
        <div className="text-sm uppercase tracking-[0.25em] text-amber-400">
          Break
        </div>
        <div className="mt-3 text-3xl font-bold text-white">{stage.title}</div>
        <div className="mt-2 text-zinc-400">
          Duration: {formatTime(stage.durationSec)}
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
      <div className="text-sm uppercase tracking-[0.25em] text-zinc-500">
        Уровень {stage.levelNumber}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <div className="text-xs uppercase text-zinc-500">SB</div>
          <div className="text-4xl font-bold text-white">
            {stage.smallBlind}
          </div>
        </div>

        <div>
          <div className="text-xs uppercase text-zinc-500">BB</div>
          <div className="text-4xl font-bold text-white">{stage.bigBlind}</div>
        </div>

        {stage.ante !== undefined && (
          <div className="col-span-2">
            <div className="text-xs uppercase text-zinc-500">Ante</div>
            <div className="text-3xl font-bold text-white">{stage.ante}</div>
          </div>
        )}
      </div>

      <div className="mt-4 text-zinc-400">
        Длительность: {formatTime(stage.durationSec)}
      </div>
    </section>
  );
}
