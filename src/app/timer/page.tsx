"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePokerStore } from '@/store/usePokerStore';
import { ConfigForm } from '@/components/ConfigForm';
import { TimerDisplay } from '@/components/TimerDisplay';
import { ThemeSelector } from '@/components/ThemeSelector';

export default function TimerPage() {
  const [isTheaterMode, setIsTheaterMode] = useState(false);
  const theme = usePokerStore((state) => state.theme);
  const _hasHydrated = usePokerStore((state) => state._hasHydrated);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const handleKeyDown = (e: KeyboardEvent) => { if (e.code === 'Escape') setIsTheaterMode(false); };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const getThemeClass = () => {
    if (!isClient || !_hasHydrated || theme === "navy") return "dark navy bg-[#090916] text-white";
    return "bg-gray-100 text-gray-900";
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 p-4 md:p-8 flex flex-col items-center font-sans ${getThemeClass()}`}>
      <header className={`mb-6 md:mb-8 w-full border-b pb-4 border-gray-200 dark:border-gray-800 navy:border-slate-850 flex flex-col sm:flex-row justify-between items-center gap-4 ${isTheaterMode ? "max-w-4xl" : "max-w-2xl"}`}>
        <div className="text-center sm:text-left">
          <div className="flex items-center gap-2">
            {!isTheaterMode && <Link href="/" className="text-xs font-bold text-[#e94560] hover:underline mr-1">◀ В меню</Link>}
            <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 navy:from-slate-100 navy:to-slate-400 bg-clip-text text-transparent">
              {isTheaterMode ? '📋 Табло турнира' : 'Турнирный таймер'}
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-3">{isClient && _hasHydrated && <ThemeSelector />}</div>
      </header>

      <main className={`w-full flex flex-col gap-6 transition-all duration-300 ${isTheaterMode ? "max-w-4xl" : "max-w-2xl"}`}>
        {isClient && _hasHydrated && (
          <>
            {!isTheaterMode && <ConfigForm />}
            <TimerDisplay isTheaterMode={isTheaterMode} onToggleTheater={() => setIsTheaterMode(true)} />
          </>
        )}
      </main>
    </div>
  );
}
