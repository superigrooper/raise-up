"use client";

import React, { useEffect } from "react";
import { usePokerStore } from "@/store/usePokerStore";

interface TimerDisplayProps {
  isTheaterMode: boolean;
  onToggleTheater: () => void;
}

export const TimerDisplay: React.FC<TimerDisplayProps> = ({
  isTheaterMode,
  onToggleTheater,
}) => {
  const {
    grid,
    currentIndex,
    secondsLeft,
    isPaused,
    setIsPaused,
    setSecondsLeft,
    nextLevel,
  } = usePokerStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
      if (e.code === "Space") {
        e.preventDefault();
        setIsPaused(!isPaused);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPaused, setIsPaused]);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev: number) => {
        // 2. Если время еще есть — просто уменьшаем на 1 секунду
        if (prev > 1) {
          return prev - 1;
        }

        // 3. Ровно в момент перехода 1 -> 0 (время вышло):
        clearInterval(interval);
        setTimeout(() => {
          nextLevel();
        }, 0);

        return 0;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isPaused, currentIndex, nextLevel, setSecondsLeft]);

  const formatTime = (totalSeconds: number): string => {
    const m = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (totalSeconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const currentData = grid[currentIndex];
  let nextGridIndex = currentIndex + 1;
  if (grid[nextGridIndex] && grid[nextGridIndex].isBreak) nextGridIndex++;
  const nextData = grid[nextGridIndex];

  return (
    <div
      className={`p-6 rounded-xl flex flex-col items-center shadow-lg border transition-all duration-300 bg-white dark:bg-[#161625] navy:bg-[#121224] border-gray-200 dark:border-gray-800 navy:border-slate-800 w-full ${
        isTheaterMode ? "py-16 px-10" : "py-6"
      }`}
    >
      {currentData ? (
        <>
          <div
            className={`font-bold tracking-widest text-gray-400 dark:text-gray-500 navy:text-slate-500 uppercase ${
              isTheaterMode ? "text-xl tracking-[0.2em]" : "text-sm"
            }`}
          >
            {currentData.isBreak
              ? "⏱️ СЕЙЧАС ПЕРЕРЫВ"
              : `🎯 Уровень ${currentData.levelNum}`}
          </div>

          <div
            className={`font-extrabold my-4 tracking-tight text-gray-900 dark:text-white navy:text-slate-100 transition-all text-center leading-none ${
              isTheaterMode
                ? "text-6xl sm:text-7xl lg:text-8xl my-6"
                : "text-4xl md:text-5xl"
            }`}
          >
            {currentData.isBreak
              ? "ОТДЫХ"
              : `${currentData.sb} / ${currentData.bb}`}
          </div>

          <div
            className={`text-yellow-600 dark:text-yellow-500 navy:text-amber-500 font-semibold min-h-[24px] ${
              isTheaterMode ? "text-2xl mb-12" : "text-base mb-6"
            }`}
          >
            {currentData.isBreak
              ? `Длительность: ${currentData.duration} мин`
              : typeof currentData.ante === "number" && currentData.ante > 0
                ? `Анте (ББ Ante): ${currentData.ante}`
                : "Без анте"}
          </div>
        </>
      ) : (
        <div className="text-3xl font-bold text-gray-400 my-12">
          ТУРНИР ЗАВЕРШЕН
        </div>
      )}

      <div
        className={`font-mono text-[#e94560] drop-shadow-[0_0_35px_rgba(233,69,96,0.4)] font-black select-none transition-all leading-none ${
          isTheaterMode
            ? "text-9xl sm:text-[12rem] lg:text-[15rem] mb-12"
            : "text-7xl md:text-8xl mb-6"
        }`}
      >
        {formatTime(secondsLeft)}
      </div>

      <div
        className={`flex gap-4 w-full transition-all ${
          isTheaterMode ? "max-w-2xl" : "max-w-xl"
        }`}
      >
        <button
          className={`flex-1 py-4 font-bold rounded-xl transition-colors text-sm md:text-base uppercase tracking-wider cursor-pointer shadow-md ${
            isPaused
              ? "bg-emerald-600 hover:bg-emerald-500 text-white"
              : "bg-amber-600 hover:bg-amber-500 text-white"
          }`}
          onClick={() => setIsPaused(!isPaused)}
        >
          {isPaused ? "Старт" : "Пауза"}
        </button>

        <button
          className="flex-1 py-4 bg-gray-300 dark:bg-[#4a1525] navy:bg-[#521929] text-gray-800 dark:text-white navy:text-slate-200 hover:bg-gray-400 dark:hover:bg-[#611c31] navy:hover:bg-[#6e2137] font-bold rounded-xl transition-colors text-xs md:text-sm uppercase tracking-wider cursor-pointer shadow-md"
          onClick={nextLevel}
        >
          След. Ур.
        </button>

        {!isTheaterMode && (
          <button
            className="px-5 py-4 bg-gray-100 dark:bg-gray-900 navy:bg-[#0b0b14] text-gray-600 dark:text-gray-400 navy:text-slate-400 border border-gray-300 dark:border-gray-800 navy:border-slate-800 hover:text-gray-950 dark:hover:text-white font-bold rounded-xl transition-colors text-base cursor-pointer"
            onClick={onToggleTheater}
            title="Развернуть на весь экран"
          >
            📺
          </button>
        )}
      </div>

      <div
        className={`w-full border-t border-gray-200 dark:border-gray-900/60 navy:border-slate-900/60 pt-5 space-y-2 text-gray-500 dark:text-gray-400 navy:text-slate-400 transition-all ${
          isTheaterMode ? "max-w-2xl text-sm" : "max-w-xl text-xs"
        }`}
      >
        <div
          className={`w-full border-t border-gray-200 dark:border-gray-900/60 navy:border-slate-900/60 pt-5 space-y-3 text-gray-500 dark:text-gray-400 navy:text-slate-400 transition-all ${
            isTheaterMode ? "text-lg" : "text-sm"
          }`}
        >
          <div className="w-full flex justify-between items-center bg-gray-50 dark:bg-gray-900/40 navy:bg-[#0b0b14]/40 p-3 rounded-xl border border-gray-100 dark:border-gray-900/30 navy:border-slate-900/30">
            <span className="font-medium tracking-wide">
              Следующий уровень:
            </span>
            <span
              className={`text-gray-900 dark:text-white navy:text-slate-200 font-extrabold transition-all ${
                isTheaterMode
                  ? "text-3xl tracking-tight text-[#e94560]"
                  : "text-xl"
              }`}
            >
              {nextData ? `${nextData.sb} / ${nextData.bb}` : "Финальный раунд"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
