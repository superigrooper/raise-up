"use client";

import { useEffect, useRef } from "react";
import { usePokerStore } from "@/store/usePokerStore";
import { TournamentRow } from "@/types/poker";
import { useTimer } from "@/hooks/useTimer";

interface TimerDisplayProps {
  isTheaterMode: boolean;
  onToggleTheater: () => void;
}

const playFinalBeep = () => {
  if (typeof window === "undefined") return;
  try {
    const audioCtx = new (
      window.AudioContext || (window as any).webkitAudioContext
    )();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(580, audioCtx.currentTime);
    gainNode.gain.setValueAtTime(0.6, audioCtx.currentTime);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.8);
  } catch (e) {
    console.error(e);
  }
};

const playWarningBeep = () => {
  if (typeof window === "undefined") return;
  try {
    const audioCtx = new (
      window.AudioContext || (window as any).webkitAudioContext
    )();
    const playTone = (delay: number) => {
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(980, audioCtx.currentTime + delay);
      gainNode.gain.setValueAtTime(0.4, audioCtx.currentTime + delay);

      oscillator.start(audioCtx.currentTime + delay);
      oscillator.stop(audioCtx.currentTime + delay + 0.15);
    };
    playTone(0);
    playTone(0.25);
  } catch (e) {
    console.error(e);
  }
};

export function TimerDisplay({
  isTheaterMode,
  onToggleTheater,
}: TimerDisplayProps) {
  const {
    grid,
    currentIndex,
    secondsLeft,
    isPaused,
    // autoStart,
    setIsPaused,
    setSecondsLeft,
    nextLevel,
    // setAutoStart,
    config,
  } = usePokerStore();

  const onTickRef = useRef(setSecondsLeft);

  const onCompleteRef = useRef(() => {
    playFinalBeep();
    nextLevel(true);
  });

  useEffect(() => {
    onTickRef.current = setSecondsLeft;
  }, [setSecondsLeft]);

  useEffect(() => {
    onCompleteRef.current = () => {
      playFinalBeep();
      nextLevel(true);
    };
  }, [nextLevel]);

  useEffect(() => {
    if (isPaused) return;

    // Если на часах осталось ровно настроенное время — запускаем пики
    if (config?.warningTime > 0 && secondsLeft === config.warningTime) {
      playWarningBeep();
    }
  }, [secondsLeft, isPaused, config?.warningTime]);

  useTimer({
    secondsLeft,
    isPaused,
    onTick: (s) => onTickRef.current(s),
    onComplete: () => onCompleteRef.current(),
  });

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

  const formatTime = (totalSeconds: number): string => {
    const m = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (totalSeconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const currentData = grid[currentIndex] ?? null;

  if (!currentData) {
    return (
      <div
        className="
        w-full p-6 text-center text-gray-400
        bg-white navy:bg-[#121224]
        rounded-xl border border-gray-800"
      >
        Генерация сетки...
      </div>
    );
  }

  // Ищем следующий игровой уровень (пропускаем перерывы)
  const getNextPlayingLevel = (): TournamentRow | null => {
    for (let i = currentIndex + 1; i < grid.length; i++) {
      if (!grid[i].isBreak) return grid[i];
    }
    return null;
  };
  const nextData = getNextPlayingLevel();
  const theater = isTheaterMode;

  return (
    <div
      className={`
      p-6 rounded-xl flex flex-col items-center shadow-lg border
      transition-all duration-300
      bg-white bg-[#161625] navy:bg-[#121224]
      border-gray-200 navy:border-slate-800
      w-full ${theater ? "py-12 px-10" : "py-6"}`}
    >
      {/* Заголовок уровня */}
      <div
        className={`
        font-bold tracking-widest uppercase
        text-gray-400 navy:text-slate-500
        ${theater ? "text-xl tracking-[0.2em]" : "text-sm"}`}
      >
        {currentData.isBreak
          ? "⏱️ СЕЙЧАС ПЕРЕРЫВ"
          : `🎯 Уровень ${currentData.levelNum}`}
      </div>

      {/* Блайнды / ОТДЫХ */}
      <div
        className={`
        font-extrabold my-4 tracking-tight leading-none text-center
        text-gray-900 navy:text-slate-100
        ${theater ? "text-6xl sm:text-7xl lg:text-8xl my-6" : "text-4xl md:text-5xl"}`}
      >
        {currentData.isBreak
          ? "ОТДЫХ"
          : `${currentData.sb} / ${currentData.bb}`}
      </div>

      {/* Анте / Длительность перерыва */}
      <div
        className={`
        text-yellow-600 navy:text-amber-500
        font-semibold min-h-[24px]
        ${theater ? "text-2xl mb-12" : "text-base mb-6"}`}
      >
        {currentData.isBreak
          ? `Длительность: ${currentData.duration} мин`
          : typeof currentData.ante === "number" && currentData.ante > 0
            ? `Анте (BB Ante): ${currentData.ante}`
            : "Без анте"}
      </div>

      {/* Таймер */}
      <div
        className={`
        font-mono text-[#e94560] font-black select-none leading-none
        drop-shadow-[0_0_35px_rgba(233,69,96,0.4)]
        transition-all
        ${theater ? "text-9xl sm:text-[12rem] lg:text-[15rem] mb-12" : "text-7xl md:text-8xl mb-6"}`}
      >
        {formatTime(secondsLeft)}
      </div>

      {/* Кнопки управления */}
      <div
        className={`flex gap-4 w-full ${theater ? "max-w-2xl" : "max-w-xl"}`}
      >
        <button
          className={`
            flex-1 py-4 font-bold rounded-xl transition-colors
            text-sm md:text-base uppercase tracking-wider cursor-pointer shadow-md
            ${
              isPaused
                ? "bg-emerald-600 hover:bg-emerald-500 text-white"
                : "bg-amber-600 hover:bg-amber-500 text-white"
            }`}
          onClick={() => setIsPaused(!isPaused)}
        >
          {isPaused ? "Старт" : "Пауза"}
        </button>

        <button
          className="
            flex-1 py-4 font-bold rounded-xl transition-colors
            text-xs md:text-sm uppercase tracking-wider cursor-pointer shadow-md
            bg-gray-300 navy:bg-[#521929]
            text-gray-800 navy:text-slate-200
            hover:bg-gray-400 navy:hover:bg-[#6e2137]"
          onClick={() => nextLevel(false)}
        >
          След. Ур.
        </button>

        {!theater && (
          <button
            className="
              px-5 py-4 font-bold rounded-xl transition-colors
              text-base cursor-pointer
              bg-gray-100 navy:bg-[#0b0b14]
              text-gray-600 navy:text-slate-400
              border border-gray-300 navy:border-slate-800
              hover:text-gray-950"
            onClick={onToggleTheater}
          >
            📺
          </button>
        )}
      </div>

      {/* Следующий уровень */}
      <div
        className={`
        w-full border-t pt-5 space-y-3 transition-all max-w-xl
        border-gray-200 navy:border-slate-900/60
        text-gray-500 navy:text-slate-400
        ${theater ? "mt-12 text-lg" : "mt-8 text-sm"}`}
      >
        <div
          className="
          flex justify-between items-center p-3 rounded-xl border
          bg-gray-50 navy:bg-[#0b0b14]/40
          border-gray-100 navy:border-slate-900/30"
        >
          <span className="font-medium tracking-wide">Следующий уровень:</span>
          <span
            className={`
            font-extrabold transition-all
            text-gray-900 navy:text-slate-200
            ${theater ? "text-3xl tracking-tight text-[#e94560]" : "text-xl"}`}
          >
            {nextData ? `${nextData.sb} / ${nextData.bb}` : "Финальный раунд"}
          </span>
        </div>
      </div>
    </div>
  );
}
