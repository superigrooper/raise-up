"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePokerStore } from "@/store/usePokerStore";
import getThemeClass from "@/utils/getThemeClass";
import { Theme } from "@/types/poker";
import Footer from "@/components/Footer";

export default function OmahaRules() {
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
          <h1 className="text-xl font-black">🍇 Пот-Лимит Омаха (PLO)</h1>
          <Link
            href="/rules"
            className="text-sm font-bold text-[#e94560] hover:underline"
          >
            ◀ К списку
          </Link>
        </header>
        <article className="space-y-4 text-xs md:text-sm text-gray-600 navy:text-slate-300 leading-relaxed">
          <p>
            <strong>Раздача:</strong> Каждый игрок получает по 4 закрытые карты.
          </p>
          <p>
            <strong>Золотое правило Омахи:</strong> Для составления итоговой
            пятикарточной комбинации вы ОБЯЗАНЫ использовать{" "}
            <strong>ровно 2 карты с руки</strong> и{" "}
            <strong>ровно 3 карты с доски</strong>. Ни больше, ни меньше.
          </p>
          <p>
            <strong>Формат ставок:</strong> Чаще всего играется в формате
            Пот-Лимит — максимальный размер ставки ограничен текущим размером
            банка (потом).
          </p>
        </article>
      </div>
      <Footer />
    </div>
  );
}
