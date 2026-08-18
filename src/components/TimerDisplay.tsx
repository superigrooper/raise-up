"use client";

import React, { useEffect } from 'react';
import { usePokerStore } from '@/store/usePokerStore';

export const TimerDisplay: React.FC = () => {
  const { 
    grid, currentIndex, secondsLeft, isPaused, totalDurationStr,
    setIsPaused, setSecondsLeft, nextLevel 
  } = usePokerStore();

  const playBeep = () => {
    if (typeof window === 'undefined') return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = createGainNode(audioCtx);
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(880, audioCtx.currentTime);
      gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime);
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.5);
    } catch (e) {
      console.error(e);
    }
  };

  function createGainNode(ctx: AudioContext) {
    return ctx.createGain();
  }

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev > 1) return prev - 1;
        playBeep();
        nextLevel();
        return 0;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused, currentIndex, grid, nextLevel, setSecondsLeft]);

  const formatTime = (totalSeconds: number): string => {
    const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const currentData = grid[currentIndex];
  let nextGridIndex = currentIndex + 1;
  if (grid[nextGridIndex] && grid[nextGridIndex].isBreak) nextGridIndex++;
  const nextData = grid[nextGridIndex];

  return (
    <div className="flex-[1.2] bg-[#161625] p-6 rounded-xl flex flex-col items-center shadow-lg border border-gray-800">
      {currentData ? (
        <>
          <div className="text-sm font-bold tracking-widest text-gray-500 uppercase">
            {currentData.isBreak ? '⏱️ СЕЙЧАС ПЕРЕРЫВ' : `🎯 Уровень ${currentData.levelNum}`}
          </div>
          <div className="text-4xl md:text-5xl font-extrabold my-3 text-white tracking-tight">
            {currentData.isBreak ? 'ОТДЫХ' : `${currentData.sb} / ${currentData.bb}`}
          </div>
          <div className="text-base text-yellow-500 font-medium mb-6">
            {currentData.isBreak ? `Длительность: ${currentData.duration} мин` : `Анте (ББ Ante): ${currentData.ante}`}
          </div>
        </>
      ) : (
        <div className="text-2xl font-bold text-gray-400 my-10">ТУРНИР ЗАВЕРШЕН</div>
      )}

      {/* Экран часов */}
      <div className="font-mono text-7xl md:text-8xl text-[#e94560] drop-shadow-[0_0_25px_rgba(233,69,96,0.35)] font-bold mb-6 select-none">
        {formatTime(secondsLeft)}
      </div>

      {/* Кнопки управления */}
      <div className="flex gap-3 w-full">
        <button 
          className="flex-1 py-3 bg-[#e94560] hover:bg-[#ff5270] text-white font-bold rounded-lg transition-colors text-sm uppercase tracking-wider" 
          onClick={() => setIsPaused(false)}
        >
          Старт
        </button>
        <button 
          className="flex-1 py-3 bg-[#3a3a52] hover:bg-[#4e4e6e] text-white font-bold rounded-lg transition-colors text-sm uppercase tracking-wider" 
          onClick={() => setIsPaused(true)}
        >
          Пауза
        </button>
        <button 
          className="flex-1 py-3 bg-[#4a1525] hover:bg-[#611c31] text-white font-bold rounded-lg transition-colors text-xs uppercase tracking-wider" 
          onClick={nextLevel}
        >
          След. Ур.
        </button>
      </div>

      {/* Информация о будущем */}
      <div className="mt-8 w-full border-t border-gray-900/60 pt-4 text-xs space-y-1.5 text-gray-400">
        <div className="flex justify-between">
          <span>Следующий уровень:</span>
          <span className="text-white font-bold">
            {nextData ? `${nextData.sb} / ${nextData.bb}` : 'Финальный раунд'}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Общая длина сетки:</span>
          <span className="text-white font-bold">{totalDurationStr}</span>
        </div>
      </div>
    </div>
  );
};
