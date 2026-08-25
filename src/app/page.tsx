"use client";

import { useEffect, useState } from "react";
import Link from "next/link"; 
import { usePokerStore } from "@/store/usePokerStore";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function MainMenu() {
  const [isMounted, setIsMounted] = useState(false);
  const theme = usePokerStore((state) => state.theme);
  const _hasHydrated = usePokerStore((state) => state._hasHydrated);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Включаем ручную гидратацию Zustand строго в браузере
    usePokerStore.persist.rehydrate();
    setIsClient(true);
  }, []);

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
        <Header/>
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
        <Footer/>
      </div>
    </div>
  );
}
