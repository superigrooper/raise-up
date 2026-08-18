"use client";

import { useTimerStore } from "@/store/timerStore";
import { formatTime } from "@/lib/time";

export function NextStageCard() {
  const tournament = useTimerStore((state) => state.tournament);
  const currentStageIndex = useTimerStore((state) => state.currentStageIndex);

  if (!tournament) {
    return (
      <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
        <div className="text-zinc-400">Турнир не выбран</div>
      </section>
    );
  }

  const nextStage = tournament.stages[currentStageIndex + 1];

  if (!nextStage) {
    return (
      <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
        <div className="text-zinc-400">No next stage</div>
      </section>
    );
  }

  if (nextStage.type === "break") {
    return (
      <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
        <div className="text-sm uppercase tracking-[0.25em] text-zinc-500">
          Следующий
        </div>
        <div className="mt-3 text-xl font-bold text-amber-300">
          {nextStage.title}
        </div>
        <div className="mt-2 text-zinc-400">
          Длительность перерыва: {formatTime(nextStage.durationSec)}
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
      <div className="text-sm uppercase tracking-[0.25em] text-zinc-500">
        Следующий уровень {nextStage.levelNumber}
      </div>

      <div className="mt-3 text-2xl font-bold text-white">
        {nextStage.smallBlind} / {nextStage.bigBlind}
        {nextStage.ante !== undefined ? ` / ${nextStage.ante}` : ""}
      </div>

      <div className="mt-2 text-zinc-400">
        Длительность: {formatTime(nextStage.durationSec)}
      </div>
    </section>
  );
}
