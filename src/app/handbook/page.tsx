// src/app/handbook/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePokerStore } from "@/store/usePokerStore";

type Tab = "combinations" | "charts" | "dictionary";

export default function HandbookPage() {
  const theme = usePokerStore((state) => state.theme);
  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("combinations");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const getThemeClass = () => {
    if (theme === "navy") return "navy bg-[#090916] text-white";
    return "bg-gray-100 text-gray-900";
  };

  // Данные: Комбинации
  const combinations = [
    {
      name: "👑 Роял-Флэш",
      desc: "Старшие 5 карт одной масти от десятки до туза.",
      example: "A♠ K♠ Q♠ J♠ 10♠",
    },
    {
      name: "🎨 Стрит-Флэш",
      desc: "Пять последовательных карт одной масти.",
      example: "9♥ 8🎨 7♥ 6♥ 5♥",
    },
    {
      name: "🦁 Каре",
      desc: "Четыре карты одного достоинства.",
      example: "A♣ A♦ A♥ A♠",
    },
    {
      name: "🏠 Фулл-Хаус",
      desc: "Тройка + Пара одновременно.",
      example: "K♣ K♦ K♠ / 10♥ 10♠",
    },
    {
      name: "🌊 Флэш",
      desc: "Пять любых карт одной масти в любом порядке.",
      example: "A♦ J♦ 8♦ 5♦ 2♦",
    },
    {
      name: "🪜 Стрит",
      desc: "Пять последовательных карт разных мастей.",
      example: "5♣ 6♦ 7♥ 8♠ 9♣",
    },
    {
      name: "⚡ Сет / Тройка",
      desc: "Три карты одного достоинства.",
      example: "Q♣ Q♦ Q♠",
    },
    {
      name: "👬 Две пары",
      desc: "Две разные пары карт.",
      example: "J♣ J♦ / 4♥ 4♠",
    },
    {
      name: "👫 Пара",
      desc: "Две карты одного достоинства.",
      example: "10♣ 10♦",
    },
    {
      name: "🃏 Старшая карта",
      desc: "Если ни у кого нет комбинаций, решает номинал.",
      example: "Туз (А) или Король (К)",
    },
  ];

  // Данные: Чарты стартовых рук
  const positionCharts = [
    {
      pos: "🔴 Ранняя позиция (UTG)",
      hands: "AA, KK, QQ, JJ, TT, AKs, AQs, AKo",
      strategy:
        "Играйте максимально аккуратно. Диапазон должен быть узким и сильным, так как за вами ходит весь стол.",
    },
    {
      pos: "🟡 Средняя позиция (MP)",
      hands: "99, 88, AJs, ATs, KQs, AQo, AJo",
      strategy:
        "Можно немного расширить диапазон разыгрываемых рук. Появляется возможность заходить с одномастными коннекторами.",
    },
    {
      pos: "🟢 Поздняя позиция (Button, CO)",
      hands: "77-22, A9s-A2s, KJs, QJs, JTs, T9s, ATo, KTo",
      strategy:
        "Самая выгодная позиция! Стиль должен быть агрессивным. Воруйте блайнды и заходите в банк широким диапазоном.",
    },
  ];

  // Данные: Краткий покерный словарь
  const terms = [
    {
      term: "Аут (Out)",
      def: "Карта, которая ещё осталась в колоде и может улучшить вашу руку до победной комбинации.",
    },
    {
      term: "Натс (Nuts)",
      def: "Абсолютно лучшая, непобедимая комбинация на текущей стадии раздачи.",
    },
    {
      term: "Лимп (Limp)",
      def: "Пассивный заход в игру простым коллом на префлопе в размере одного большого блайнда.",
    },
    {
      term: "Блеф (Bluff)",
      def: "Ставка со слабой рукой, цель которой — заставить соперников сбросить карты сильнее вашей.",
    },
    {
      term: "Дро (Draw)",
      def: "Недостроенная комбинация (н-р: Флэш-дро), которой не хватает одной карты до полной силы.",
    },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-200 p-4 md:p-8 flex flex-col items-center font-sans ${getThemeClass()}`}
    >
      <div className="w-full max-w-3xl bg-white dark:bg-[#161625] navy:bg-[#121224] p-5 md:p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 navy:border-slate-800">
        {/* Шапка справочника */}
        <header className="mb-6 flex items-center justify-between border-b pb-4 border-gray-100 dark:border-gray-900/60 navy:border-slate-900/60">
          <div>
            <h1 className="text-2xl font-black">📚 Справочник игрока</h1>
            <p className="text-xs text-gray-400 mt-0.5">
              Шпаргалка по комбинациям, позициям и терминологии
            </p>
          </div>
          <Link
            href="/"
            className="text-sm font-bold text-[#e94560] hover:underline cursor-pointer"
          >
            ◀ В меню
          </Link>
        </header>

        {/* Меню переключения вкладок (Табы) */}
        <div className="grid grid-cols-3 gap-2 bg-gray-100 dark:bg-[#0f0f1b] navy:bg-[#0b0b14] p-1.5 rounded-xl mb-6 border border-gray-200/50 dark:border-gray-900/30 navy:border-slate-900/30">
          <button
            onClick={() => setActiveTab("combinations")}
            className={`py-2 px-1 text-center text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === "combinations"
                ? "bg-[#e94560] text-white shadow-sm"
                : "text-gray-500 hover:text-gray-900 dark:hover:text-white navy:hover:text-slate-200"
            }`}
          >
            🙌 Комбинации
          </button>
          <button
            onClick={() => setActiveTab("charts")}
            className={`py-2 px-1 text-center text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === "charts"
                ? "bg-[#e94560] text-white shadow-sm"
                : "text-gray-500 hover:text-gray-900 dark:hover:text-white navy:hover:text-slate-200"
            }`}
          >
            📈 Чарты рук
          </button>
          <button
            onClick={() => setActiveTab("dictionary")}
            className={`py-2 px-1 text-center text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === "dictionary"
                ? "bg-[#e94560] text-white shadow-sm"
                : "text-gray-500 hover:text-gray-900 dark:hover:text-white navy:hover:text-slate-200"
            }`}
          >
            📖 Словарь
          </button>
        </div>

        {/* КОНТЕНТ ВКЛАДОК */}
        <main className="min-h-[350px]">
          {/* ВКЛАДКА 1: КОМБИНАЦИИ */}
          {activeTab === "combinations" && (
            <div className="space-y-3 animate-fadeIn">
              {combinations.map((c, index) => (
                <div
                  key={index}
                  className="p-3 rounded-xl border border-gray-100 dark:border-gray-900/30 navy:border-slate-900/30 bg-gray-50/50 dark:bg-gray-900/30 navy:bg-[#0b0b14]/30 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
                >
                  <div>
                    <h3 className="text-sm font-black text-gray-900 dark:text-white navy:text-slate-100">
                      {c.name}
                    </h3>
                    <p className="text-xs text-gray-400 dark:text-gray-400 navy:text-slate-400 mt-0.5">
                      {c.desc}
                    </p>
                  </div>
                  <div className="font-mono text-xs font-bold bg-white dark:bg-[#0f0f1b] navy:bg-[#0b0b14] px-2.5 py-1 rounded-md border border-gray-200 dark:border-gray-800 navy:border-slate-800 text-[#e94560] self-start sm:self-center">
                    {c.example}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ВКЛАДКА 2: ЧАРТЫ РУК */}
          {activeTab === "charts" && (
            <div className="space-y-5 animate-fadeIn">
              {positionCharts.map((item, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl border border-gray-100 dark:border-gray-900/40 navy:border-slate-900/40 bg-gray-50/50 dark:bg-gray-900/30 navy:bg-[#0b0b14]/30"
                >
                  <h3 className="text-sm font-black mb-1.5">{item.pos}</h3>
                  <div className="text-xs font-mono text-[#e94560] bg-white dark:bg-[#0f0f1b] navy:bg-[#0b0b14] p-2.5 rounded-lg border border-gray-100 dark:border-gray-800 navy:border-slate-800 mb-2 font-bold break-all">
                    Что играть: {item.hands}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 navy:text-slate-400 leading-relaxed font-medium">
                    {item.strategy}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* ВКЛАДКА 3: СЛОВАРЬ */}
          {activeTab === "dictionary" && (
            <div className="space-y-3 animate-fadeIn">
              {terms.map((item, index) => (
                <div
                  key={index}
                  className="p-3.5 rounded-xl border border-gray-100 dark:border-gray-900/30 navy:border-slate-900/30 bg-gray-50/50 dark:bg-gray-900/30 navy:bg-[#0b0b14]/30"
                >
                  <h3 className="text-sm font-black text-[#e94560] mb-0.5">
                    {item.term}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 navy:text-slate-400 leading-relaxed font-medium">
                    {item.def}
                  </p>
                </div>
              ))}
            </div>
          )}
        </main>

        {/* Подвал */}
        <footer className="mt-8 border-t pt-4 border-gray-100 dark:border-gray-900/40 navy:border-slate-900/40 text-center text-[10px] tracking-wider uppercase text-gray-400 dark:text-gray-600 navy:text-slate-600 font-medium select-none">
          <span>RAISE -UP</span>
          <span className="mx-2">•</span>
          <span>v{process.env.NEXT_PUBLIC_APP_VERSION || "1.5.0"}</span>
        </footer>
      </div>
    </div>
  );
}
