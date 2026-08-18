"use client";

import { useTimerStore } from "@/store/timerStore";

export function TimerControls() {
  const status = useTimerStore((state) => state.status);
  const autoAdvance = useTimerStore((state) => state.autoAdvance);

  const start = useTimerStore((state) => state.start);
  const pause = useTimerStore((state) => state.pause);
  const resume = useTimerStore((state) => state.resume);
  const resetStage = useTimerStore((state) => state.reset);
  const goToNextStage = useTimerStore((state) => state.goToNextStage);
  const goToPreviousStage = useTimerStore((state) => state.goToPreviousStage);

  const toggleAutoAdvance = () => {
    useTimerStore.setState((state) => ({
      autoAdvance: !state.autoAdvance,
    }));
  };

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        {/* Три состояния кнопки обработки таймера:

          Старт - по умолчанию
          Пауза - если таймер запущен
          Продолжить - если таймер на паузе

        */}
        {status === "running" ? (
          <button
            type="button"
            onClick={pause}
            className="rounded-xl bg-amber-500 px-4 py-3 font-semibold text-black hover:bg-amber-400"
          >
            ПАУЗА
          </button>
        ) : status === "paused" ? (
          <button
            type="button"
            onClick={resume}
            className="rounded-xl bg-emerald-500 px-4 py-3 font-semibold text-black hover:bg-emerald-400"
          >
            ПРОДОЛЖИТЬ
          </button>
        ) : (
          <button
            onClick={start}
            className="rounded-lg bg-green-600 px-5 py-3 text-white"
          >
            СТАРТ
          </button>
        )}

        <button
          type="button"
          onClick={resetStage}
          className="rounded-xl bg-zinc-800 px-4 py-3 font-semibold text-white hover:bg-zinc-700"
        >
          СБРОС
        </button>

        <button
          type="button"
          onClick={goToPreviousStage}
          className="rounded-xl bg-zinc-800 px-4 py-3 font-semibold text-white hover:bg-zinc-700"
        >
          НАЗАД
        </button>

        <button
          type="button"
          onClick={goToNextStage}
          className="rounded-xl bg-zinc-800 px-4 py-3 font-semibold text-white hover:bg-zinc-700"
        >
          ВПЕРЁД
        </button>

        <button
          type="button"
          onClick={toggleAutoAdvance}
          className={
            autoAdvance
              ? "rounded-xl bg-sky-500 px-4 py-3 font-semibold text-black hover:bg-sky-400"
              : "rounded-xl bg-zinc-800 px-4 py-3 font-semibold text-white hover:bg-zinc-700"
          }
        >
          АВТО: {autoAdvance ? "ДА" : "НЕТ"}
        </button>
      </div>
    </section>
  );
}
