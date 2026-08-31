"use client";

import Link from "next/link";
import { usePokerStore } from "@/store/usePokerStore";
import getThemeClass from "@/utils/getThemeClass";
import { Theme } from "@/types/poker";

export default function CalculatorPage() {
  const theme: Theme = usePokerStore((state) => state.theme);

  return (
    <div
      className={`min-h-screen transition-colors duration-200 p-4 md:p-8 flex flex-col items-center justify-center font-sans ${getThemeClass(theme)}`}
    >
      <div className="w-full max-w-2xl bg-white navy:bg-[#121224] p-6 rounded-2xl shadow-lg border border-gray-200 navy:border-slate-800">
        {/* Шапка страницы */}
        <header className="mb-6 flex items-center justify-between border-b pb-4 border-gray-100 navy:border-slate-900/60">
          <h1 className="text-2xl font-black">🧮 Покерный калькулятор</h1>
          <Link
            href="/"
            className="text-sm font-bold text-[#e94560] hover:underline cursor-pointer"
          >
            ◀ В меню
          </Link>
        </header>

        {/* Стильный блок-заглушка */}
        <div className="py-16 text-center text-gray-400 navy:text-slate-500">
          <div className="text-5xl mb-4 animate-pulse">🚧</div>
          <div className="text-sm font-bold uppercase tracking-wider text-gray-800 navy:text-slate-200">
            Раздел в разработке
          </div>
          <p className="text-xs mt-2 opacity-70 max-w-sm mx-auto leading-relaxed">
            В будущих обновлениях здесь появится калькулятор распределения
            призового фонда и расчет эквити стартовых рук.
          </p>
        </div>

        {/* Подвал */}
        <footer className="mt-6 border-t pt-4 border-gray-100 navy:border-slate-900/40 text-center text-[10px] tracking-wider uppercase text-gray-400 navy:text-slate-600 font-medium select-none">
          <span>RAISE -UP</span>
          <span className="mx-2">•</span>
          <span>v{process.env.NEXT_PUBLIC_APP_VERSION || "1.5.0"}</span>
        </footer>
      </div>
    </div>
  );
}
