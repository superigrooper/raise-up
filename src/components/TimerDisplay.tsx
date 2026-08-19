// components/TimerDisplay.tsx
"use client";

import React, { useEffect } from 'react';
import { usePokerStore } from '@/store/usePokerStore';

interface TimerDisplayProps {
  isTheaterMode: boolean;
  onToggleTheater: () => void;
}

export const TimerDisplay: React.FC<TimerDisplayProps> = ({ isTheaterMode, onToggleTheater }) => {
  const { 
    grid, currentIndex, secondsLeft, isPaused, totalDurationStr, config, // достаем config из стора
    setIsPaused, setSecondsLeft, nextLevel 
  } = usePokerStore();

  const playFinalBeep = () => {
    if (typeof window === 'undefined') return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(580, audioCtx.currentTime);
      gainNode.gain.setValueAtTime(0.6, audioCtx.currentTime);
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.8);
    } catch (e) {
      console.error(e);
    }
  };

  const playWarningBeep = () => {
    if (typeof window === 'undefined') return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const playTone = (delay: number) => {
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.type = 'sine';
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
      if (e.code === 'Space') {
        e.preventDefault();
        setIsPaused(!isPaused);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPaused, setIsPaused]);

  // Логика отсчета с динамическим предупреждением
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        // ДИНАМИЧЕСКИЙ ТРИГГЕР: проверяем, включено ли предупреждение (warningTime > 0)
        // и совпадает ли текущая секунда с настроенным порогом
        if (config.warningTime > 0 && prev === config.warningTime + 1) {
          playWarningBeep();
        }

        if (prev > 1) {
          return prev - 1;
        } else {
          playFinalBeep();
          nextLevel();
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused, currentIndex, grid, nextLevel, setSecondsLeft, config.warningTime]);

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
    <div className={`p-6 rounded-xl flex flex-col items-center shadow-lg border transition-all duration-300 bg-white dark:bg-[#161625] navy:bg-[#121224] border-gray-200 dark:border-gray-800 navy:border-slate-800 ${
      isTheaterMode ? 'py-12' : 'py-6'
    }`}>
      {currentData ? (
        <>
          <div className={`font-bold tracking-widest text-gray-400 dark:text-gray-500 navy:text-slate-500 uppercase ${isTheaterMode ? 'text-base' : 'text-sm'}`}>
            {currentData.isBreak ? '⏱️ СЕЙЧАС ПЕРЕРЫВ' : `🎯 Уровень ${currentData.levelNum}`}
          </div>
          <div className={`font-extrabold my-3 tracking-tight text-gray-900 dark:text-white navy:text-slate-100 transition-all ${isTheaterMode ? 'text-6xl md:text-7xl' : 'text-4xl md:text-5xl'}`}>
            {currentData.isBreak ? 'ОТДЫХ' : `${currentData.sb} / ${currentData.bb}`}
          </div>
          <div className={`text-yellow-600 dark:text-yellow-500 navy:text-amber-500 font-medium min-h-[24px] ${isTheaterMode ? 'text-xl mb-10' : 'text-base mb-6'}`}>
            {currentData.isBreak ? (
              `Длительность: ${currentData.duration} мин`
            ) : typeof currentData.ante === 'number' && currentData.ante > 0 ? (
              `Анте (ББ Ante): ${currentData.ante}`
            ) : (
              'Без анте'
            )}
          </div>
        </>
      ) : (
        <div className="text-2xl font-bold text-gray-400 my-10">ТУРНИР ЗАВЕРШЕН</div>
      )}

      <div className={`font-mono text-[#e94560] drop-shadow-[0_0_25px_rgba(233,69,96,0.25)] font-bold select-none transition-all ${isTheaterMode ? 'text-9xl md:text-[11rem] mb-10' : 'text-7xl md:text-8xl mb-6'}`}>
        {formatTime(secondsLeft)}
      </div>

      <div className="flex gap-3 w-full max-w-xl">
        <button 
          className={`flex-1 py-3 font-bold rounded-lg transition-colors text-sm uppercase tracking-wider cursor-pointer ${isPaused ? 'bg-emerald-600 hover:bg-emerald-500 text-white' : 'bg-amber-600 hover:bg-amber-500 text-white'}`}
          onClick={() => setIsPaused(!isPaused)}
        >
          {isPaused ? 'Старт (Пробел)' : 'Пауза (Пробел)'}
        </button>
        <button className="flex-1 py-3 bg-gray-300 dark:bg-[#4a1525] navy:bg-[#521929] text-gray-800 dark:text-white navy:text-slate-200 hover:bg-gray-400 dark:hover:bg-[#611c31] navy:hover:bg-[#6e2137] font-bold rounded-lg transition-colors text-xs uppercase tracking-wider cursor-pointer" onClick={nextLevel}>След. Ур.</button>
        
        {!isTheaterMode && (
          <button 
            className="px-4 py-3 bg-gray-100 dark:bg-gray-900 navy:bg-[#0b0b14] text-gray-600 dark:text-gray-400 navy:text-slate-400 border border-gray-300 dark:border-gray-800 navy:border-slate-800 hover:text-gray-950 dark:hover:text-white font-bold rounded-lg transition-colors text-sm cursor-pointer"
            onClick={onToggleTheater}
            title="Развернуть на весь экран"
          >
            📺
          </button>
        )}
      </div>

      <div className="mt-8 w-full border-t border-gray-200 dark:border-gray-900/60 navy:border-slate-900/60 pt-4 text-xs space-y-1.5 text-gray-500 dark:text-gray-400 navy:text-slate-400 max-w-xl">
        <div className="flex justify-between">
          <span>Следующий уровень:</span>
          <span className="text-gray-900 dark:text-white navy:text-slate-200 font-bold">
            {nextData ? `${nextData.sb} / ${nextData.bb}` : 'Финальный раунд'}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Общая длина сетки:</span>
          <span className="text-gray-900 dark:text-white navy:text-slate-200 font-bold">{totalDurationStr}</span>
        </div>
      </div>
    </div>
  );
};
