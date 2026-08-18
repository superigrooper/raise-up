"use client";

import { CurrentStageCard } from "@/components/CurrentStageCard";
import { NextStageCard } from "@/components/NextStageCard";
import { PresetSelector } from "@/components/PresetSelector";
import { TimerControls } from "@/components/TimerControls";
import { TimerDisplay } from "@/components/TimerDisplay";
import { useTimerTicker } from "@/lib/useTimerTicker";

export function TimerRoot() {
  useTimerTicker();

  return (
    <main className="min-h-screen bg-black px-4 py-6 text-zinc-100 md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <header>
          <div className="text-sm uppercase tracking-[0.35em] text-zinc-500">
            место,где любят покер
          </div>
          <h1 className="mt-2 text-3xl font-bold text-white md:text-5xl">
            RAISE UP
          </h1>
        </header>
        <PresetSelector />
        <TimerDisplay />
        <div className="grid gap-6 md:grid-cols-2">
          <CurrentStageCard />
          <NextStageCard />
        </div>
        <TimerControls />
      </div>
    </main>
  );
}
