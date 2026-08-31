"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePokerStore } from "@/store/usePokerStore";
import getThemeClass from "@/utils/getThemeClass";
import { Theme } from "@/types/poker";
import Footer from "@/components/Footer";

export default function HoldemRules() {
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
          <h1 className="text-xl font-black">
            🃏 Безлимитный Техасский Холдем
          </h1>
          <Link
            href="/rules"
            className="text-sm font-bold text-[#e94560] hover:underline"
          >
            ◀ К списку
          </Link>
        </header>
        <article className="space-y-4 text-xs md:text-sm text-gray-600 navy:text-slate-300 leading-relaxed">
          <p>
            <strong>Раздача:</strong> Каждый игрок получает по 2 закрытые карты
            (карманные карты).
          </p>
          <p>
            <strong>Торговля:</strong> Проходит в 4 раунда: Префлоп (до общих
            карт), Флоп (первые 3 общие карты), Терн (4-я карта) и Ривер (5-я
            финальная карта).
          </p>
          <p>
            <strong>Цель игры:</strong> Собрать наилучшую пятикарточную
            комбинацию, используя любые свои 2 карты и 5 карт на доске в любых
            комбинациях (можно использовать обе карманные, одну или вообще
            играть только на доске).
          </p>
        </article>
      </div>
      <Footer />
    </div>
  );
}
