"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePokerStore } from "@/store/usePokerStore";
import getThemeClass from "@/utils/getThemeClass";
import { Theme } from "@/types/poker";
import Footer from "@/components/Footer";

export default function StudRules() {
  const theme: Theme = usePokerStore((state) => state.theme);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div
      className={`min-h-screen transition-colors duration-200 p-4 md:p-8 flex flex-col items-center justify-center font-sans ${getThemeClass(theme)}`}
    >
      <div className="w-full max-w-2xl bg-white navy:bg-[#121224] p-6 rounded-2xl shadow-lg border border-gray-200 navy:border-slate-800">
        <header className="mb-6 flex items-center justify-between border-b pb-4 border-gray-100 navy:border-slate-900/60">
          <h1 className="text-xl font-black">🐴 Семикарточный Стад (Stud)</h1>
          <Link
            href="/rules"
            className="text-sm font-bold text-[#e94560] hover:underline"
          >
            ◀ К списку
          </Link>
        </header>
        <article className="space-y-4 text-xs md:text-sm text-gray-600 navy:text-slate-300 leading-relaxed">
          <p>
            <strong>Общие карты:</strong> Отсутствуют. Каждый игрок собирает
            комбинацию только из своих карт.
          </p>
          <p>
            <strong>Раздача:</strong> В процессе раундов каждый игрок получает 7
            карт: 3 в закрытую и 4 в открытую для всего стола.
          </p>
          <p>
            <strong>Ход игры:</strong> Перед раздачей все вносят анте. В первом
            раунде игрок с самой младшей открытой картой делает обязательную
            ставку (бринг-ин). На вскрытии выбираются 5 лучших карт из 7
            персональных.
          </p>
        </article>
      </div>
      <Footer />
    </div>
  );
}
