"use client";

import { defaultPresets } from "@/lib/presets";
import { presetTournament } from "@/lib/presetTournament";
import { useTimerStore } from "@/store/timerStore";
import { formatTime } from "@/lib/time";

export function PresetSelector() {
  const setTournament = useTimerStore((state) => state.loadTournament);

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
      Стандартные виды турниров:
      <div className="grid gap-3 md:grid-cols-3">
        {defaultPresets.map((preset) => (
          <button
            key={preset.id}
            type="button"
            onClick={() => setTournament(presetTournament(preset))}
            className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-left hover:border-zinc-600 hover:bg-zinc-800"
          >
            <div className="font-semibold text-white">{preset.name}</div>
            <div className="mt-1 text-sm text-zinc-400">
              {formatTime(preset.stages[0].durationSec)} мин. - продолжительность
              одного уровня
            </div>
            <div className="mt-1 text-sm text-zinc-500">
              {/* {preset.stage} уровней блайндов */}
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
