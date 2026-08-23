"use client";

import { useEffect, useState } from "react";
import Link from "next/link"; // Импортируем встроенный компонент ссылок Next.js
import { usePokerStore } from "@/store/usePokerStore";
import { ThemeSelector } from "@/components/ThemeSelector";

export default function MainMenu() {
  const [isMounted, setIsMounted] = useState(false);
  const theme = usePokerStore((state) => state.theme);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Защитная заглушка для корректного SSR/Hydration
  if (!isMounted) return null;

  const getThemeClass = () => {
    if (theme === "navy") return "navy bg-[#090916] text-white";
    return "bg-gray-100 text-gray-900"; // light
  };

  // Перечень разделов вашего покерного софта
  const menuItems = [
    {
      title: "⏱️ Турнирный таймер",
      desc: "Управление блайндами, анте и перерывами. Полноэкранный режим для ТВ-экранов.",
      path: "/timer",
      color: "hover:border-[#e94560]",
    },
    {
      title: "🧮 Покерный калькулятор",
      desc: "Расчет шансов на победу (эквити) комбинаций и распределения призового фонда.",
      path: "/calculator",
      color: "hover:border-emerald-500",
    },
    {
      title: "📜 Правила игры",
      desc: "Официальный регламент TDA, правила кэш-игр и клубного покерного турнира.",
      path: "/rules",
      color: "hover:border-amber-500",
    },
    {
      title: "📚 Справочник игрока",
      desc: "Таблица комбинаций, покерные термины, чарты стартовых рук и базовые тактики.",
      path: "/handbook",
      color: "hover:border-indigo-500",
    },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-200 p-4 md:p-8 flex flex-col items-center justify-center font-sans ${getThemeClass()}`}
    >
      <div className="w-full max-w-4xl">
        {/* Шапка главного меню */}
        <header className="mb-10 flex flex-col sm:flex-row justify-between items-center gap-4 border-b pb-6 border-gray-200 dark:border-gray-800 navy:border-slate-850">
          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 navy:from-slate-100 navy:to-slate-400 bg-clip-text text-transparent">
              RAISE-UP
            </h1>
            <p className="text-xs text-gray-400 dark:text-gray-500 navy:text-slate-500 mt-1 uppercase tracking-widest font-semibold">
              Универсальный клубный менеджер
            </p>
          </div>
          <ThemeSelector />
        </header>

        {/* Сетка покерных разделов */}
        <main className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {menuItems.map((item, index) => (
            <Link
              href={item.path}
              key={index}
              className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between group cursor-pointer bg-white dark:bg-[#161625] navy:bg-[#121224] border-gray-200 dark:border-gray-800 navy:border-slate-800 hover:shadow-xl ${item.color} hover:-translate-y-1`}
            >
              <div>
                <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white navy:text-slate-100 group-hover:text-[#e94560] transition-colors">
                  {item.title}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 navy:text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <div className="mt-5 text-xs font-bold text-[#e94560] opacity-0 group-hover:opacity-100 transition-all tracking-wider uppercase flex items-center gap-1">
                Открыть раздел <span>➔</span>
              </div>
            </Link>
          ))}
        </main>

        {/* Профессиональный футер приложения */}
        <footer className="mt-12 text-center text-[10px] tracking-wider uppercase text-gray-400 dark:text-gray-600 navy:text-slate-600 font-medium select-none">
          <span>RAISE -UP</span>
          <span className="mx-2">•</span>
          <span>v{process.env.NEXT_PUBLIC_APP_VERSION || "1.0.0"}</span>
        </footer>
      </div>
    </div>
  );
}
