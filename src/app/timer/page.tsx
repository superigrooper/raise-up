"use client";

import { useEffect, useState } from "react";
import { usePokerStore } from "@/store/usePokerStore";
import ConfigForm from "@/components/ConfigForm";
import { TimerDisplay } from "@/components/TimerDisplay";
import { ThemeSelector } from "@/components/ThemeSelector";
import Footer from "@/components/Footer";
import Link from "next/link";
import getThemeClass from "@/utils/getThemeClass";
import { Theme } from "@/types/poker";

export default function Home() {
  const theme: Theme = usePokerStore((state) => state.theme);
  const [isMounted, setIsMounted] = useState(false);
  const [isTheaterMode, setIsTheaterMode] = useState(false);
  const buildTournament = usePokerStore((state) => state.buildTournament);

  useEffect(() => {
    setIsMounted(true);
    if (usePokerStore.getState().grid.length === 0) {
      buildTournament();
    }
  }, [buildTournament]);

  if (!isMounted) return null;

  return (
    <div
      className={`min-h-screen 
      transition-colors 
      duration-200 
      p-4 
      md:p-8 
      flex 
      flex-col 
      items-center ${getThemeClass(theme)}`}
    >
      <div
        className={`mb-6 
        md:mb-8 
        w-full 
        border-b 
        pb-4 
        border-gray-200 
        navy:border-slate-850 
        flex 
        flex-col 
        sm:flex-row 
        justify-between 
        items-center 
        gap-4 ${isTheaterMode ? "max-w-7xl" : "max-w-4xl"}`}
      >
        <div className="text-center sm:text-left">
          <div className="flex items-center gap-2">
            {!isTheaterMode && (
              <Link
                href="/"
                className="text-xs font-bold text-[#e94560] hover:underline mr-1 cursor-pointer"
              >
                ◀ В меню
              </Link>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ThemeSelector />
          {isTheaterMode && (
            <button
              onClick={() => setIsTheaterMode(false)}
              className="px-4 py-1.5 text-xs font-bold rounded-lg border border-[#e94560] text-[#e94560] hover:bg-[#e94560] hover:text-white transition-all cursor-pointer"
            >
              ↩ Выйти из полноэкранного режима
            </button>
          )}
        </div>
      </div>

      <main
        className={`w-full 
        flex 
        flex-col 
        gap-6 
        transition-all 
        duration-300 ${isTheaterMode ? "max-w-7xl" : "max-w-4xl"}`}
      >
        {!isTheaterMode && <ConfigForm />}

        <TimerDisplay
          isTheaterMode={isTheaterMode}
          onToggleTheater={() => setIsTheaterMode(true)}
        />
      </main>

      <Footer />
    </div>
  );
}
