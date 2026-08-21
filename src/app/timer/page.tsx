"use client";
import { useEffect, useState } from "react";
import { usePokerStore } from "@/store/usePokerStore";
import { ConfigForm } from "@/components/ConfigForm";
import { TimerDisplay } from "@/components/TimerDisplay";
import { ThemeSelector } from "@/components/ThemeSelector";

export default function Timer() {
  const [isMounted, setIsMounted] = useState(false);
  const [isTheaterMode, setIsTheaterMode] = useState(false); // Состояние полноэкранного режима
  const buildTournament = usePokerStore((state) => state.buildTournament);
  const theme = usePokerStore((state) => state.theme);

  useEffect(() => {
    setIsMounted(true);
    if (usePokerStore.getState().grid.length === 0) {
      buildTournament();
    }
  }, [buildTournament]);

  if (!isMounted) return null;

  const getThemeClass = () => {
    if (theme === "navy") return "navy bg-[#090916] text-white";
    return "bg-gray-100 text-gray-900";
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-200 p-4 md:p-8 flex flex-col items-center ${getThemeClass()}`}
    >
      {/* Шапка приложения (скрывается или видоизменяется в режиме Theater Mode) */}
      <header
        className={`mb-6 md:mb-8 w-full border-b pb-4 border-gray-200 dark:border-gray-800 navy:border-slate-850 flex flex-col sm:flex-row justify-between items-center gap-4 ${
          isTheaterMode ? "max-w-6xl" : "max-w-2xl" // ИСПРАВЛЕНО: max-w-6xl вместо max-w-4xl
        }`}
      >
        <div className="text-center sm:text-left">
          <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 navy:from-slate-100 navy:to-slate-400 bg-clip-text text-transparent">
            {isTheaterMode ? "📋 Табло турнира" : "RAISE -UP"}
          </h1>
          {!isTheaterMode && (
            <p className="text-xs text-gray-500 dark:text-gray-400 navy:text-slate-400 mt-0.5 uppercase tracking-widest">
              <span>v{process.env.NEXT_PUBLIC_APP_VERSION || "1.0.0"}</span>
            </p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <ThemeSelector />
          {/* Кнопка выхода из полноэкранного режима, показывается только в нем */}
          {isTheaterMode && (
            <button
              onClick={() => setIsTheaterMode(false)}
              className="px-4 py-1.5 text-xs font-bold rounded-lg border border-[#e94560] text-[#e94560] hover:bg-[#e94560] hover:text-white transition-all cursor-pointer"
            >
              ↩ Выйти из полноэкранного режима
            </button>
          )}
        </div>
      </header>

      {/* Адаптивный контейнер */}
      <main
        className={`w-full flex flex-col gap-6 transition-all duration-300 ${
          isTheaterMode ? "max-w-6xl" : "max-w-2xl" // ИСПРАВЛЕНО: max-w-6xl вместо max-w-4xl
        }`}
      >
        {/* Форма настроек рендерится только если режим "полного экрана" выключен */}
        {!isTheaterMode && <ConfigForm />}

        {/* Передаем состояние и сеттер внутрь таймера */}
        <TimerDisplay
          isTheaterMode={isTheaterMode}
          onToggleTheater={() => setIsTheaterMode(true)}
        />
      </main>
    </div>
  );
}

