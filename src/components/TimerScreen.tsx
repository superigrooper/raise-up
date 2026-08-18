"use client";

import Link from "next/link";
import { useTimerStore } from "@/store/timerStore";
import { useTimerTicker } from "@/lib/timer/useTimerTicker";
import {
  formatBlinds,
  formatStageTitle,
  formatTime,
} from "@/lib/timer/timerUtils";

export function TimerScreen() {
  useTimerTicker();

  const status = useTimerStore((state) => state.status);
  const tournament = useTimerStore((state) => state.tournament);
  const currentStageIndex = useTimerStore((state) => state.currentStageIndex);
  const remainingSec = useTimerStore((state) => state.remainingSec);

  const start = useTimerStore((state) => state.start);
  const pause = useTimerStore((state) => state.pause);
  const resume = useTimerStore((state) => state.resume);
  const reset = useTimerStore((state) => state.reset);
  const goToNextStage = useTimerStore((state) => state.goToNextStage);
  const goToPreviousStage = useTimerStore((state) => state.goToPreviousStage);

  const currentStage = tournament?.stages[currentStageIndex] ?? null;
  const nextStage = tournament?.stages[currentStageIndex + 1] ?? null;

  if (!tournament) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Таймер</h1>
        <div className="rounded-xl border p-6">
          <p className="mb-4">Турнир ещё не выбран.</p>
          <div className="flex gap-3">
            <Link
              className="rounded-lg bg-blue-600 px-4 py-2 text-white"
              href="/presets"
            >
              Выбрать пресет
            </Link>
            <Link className="rounded-lg border px-4 py-2" href="/structure">
              Создать вручную
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{tournament.name}</h1>
        <p className="text-gray-500">Статус: {status}</p>
      </div>

      <div className="rounded-2xl border p-8 text-center">
        <div className="mb-2 text-xl text-gray-500">
          {formatStageTitle(currentStage)}
        </div>

        <div className="mb-4 text-7xl font-bold tabular-nums">
          {formatTime(remainingSec)}
        </div>

        <div className="text-4xl font-semibold">
          {formatBlinds(currentStage)}
        </div>

        <div className="mt-6 text-gray-500">
          Следующий: {formatStageTitle(nextStage)} — {formatBlinds(nextStage)}
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {status === "idle" && (
          <button
            onClick={start}
            className="rounded-lg bg-green-600 px-5 py-3 text-white"
          >
            Старт
          </button>
        )}

        {status === "running" && (
          <button
            onClick={pause}
            className="rounded-lg bg-yellow-500 px-5 py-3 text-white"
          >
            Пауза
          </button>
        )}

        {status === "paused" && (
          <button
            onClick={resume}
            className="rounded-lg bg-green-600 px-5 py-3 text-white"
          >
            Продолжить
          </button>
        )}

        <button onClick={reset} className="rounded-lg border px-5 py-3">
          Сброс
        </button>

        <button
          onClick={goToPreviousStage}
          className="rounded-lg border px-5 py-3"
        >
          Назад
        </button>

        <button onClick={goToNextStage} className="rounded-lg border px-5 py-3">
          Следующий уровень
        </button>

        <Link
          href="/timer/fullscreen"
          className="rounded-lg bg-black px-5 py-3 text-white"
        >
          Fullscreen
        </Link>
      </div>
    </section>
  );
}
