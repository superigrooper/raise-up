"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePokerStore } from "@/store/usePokerStore";
import getThemeClass from "@/utils/getThemeClass";
import { Theme } from "@/types/poker";
import Footer from "@/components/Footer";
import { Tab } from "@/types/poker";
import { combinations } from "@/db/combinations";
import { positionCharts } from "@/db/positionCharts";
import { terms } from "@/db/terms";

export default function HandbookPage() {
  const theme: Theme = usePokerStore((state) => state.theme);

  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("combinations");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div
      className={`min-h-screen transition-colors duration-200 p-4 md:p-8 flex flex-col items-center font-sans ${getThemeClass(theme)}`}
    >
      <div className="w-full max-w-3xl bg-white navy:bg-[#121224] p-5 md:p-6 rounded-2xl shadow-lg border border-gray-200 navy:border-slate-800">
        {/* Шапка справочника */}
        <header className="mb-6 flex items-center justify-between border-b pb-4 border-gray-100 navy:border-slate-900/60">
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
        <div className="grid grid-cols-3 gap-2 bg-gray-100 navy:bg-[#0b0b14] p-1.5 rounded-xl mb-6 border border-gray-200/50 navy:border-slate-900/30">
          <button
            onClick={() => setActiveTab("combinations")}
            className={`py-2 px-1 text-center text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === "combinations"
                ? "bg-[#e94560] text-white shadow-sm"
                : "text-gray-500 hover:text-gray-900 navy:hover:text-slate-200"
            }`}
          >
            🙌 Комбинации
          </button>
          <button
            onClick={() => setActiveTab("charts")}
            className={`py-2 px-1 text-center text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === "charts"
                ? "bg-[#e94560] text-white shadow-sm"
                : "text-gray-500 hover:text-gray-900 navy:hover:text-slate-200"
            }`}
          >
            📈 Чарты рук
          </button>
          <button
            onClick={() => setActiveTab("dictionary")}
            className={`py-2 px-1 text-center text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === "dictionary"
                ? "bg-[#e94560] text-white shadow-sm"
                : "text-gray-500 hover:text-gray-900 navy:hover:text-slate-200"
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
                  className="p-3 rounded-xl border border-gray-100 navy:border-slate-900/30 bg-gray-50/50 navy:bg-[#0b0b14]/30 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
                >
                  <div>
                    <h3 className="text-sm font-black text-gray-900 navy:text-slate-100">
                      {c.name}
                    </h3>
                    <p className="text-xs text-gray-400 navy:text-slate-400 mt-0.5">
                      {c.desc}
                    </p>
                  </div>
                  <div className="font-mono text-xs font-bold bg-white navy:bg-[#0b0b14] px-2.5 py-1 rounded-md border border-gray-200 navy:border-slate-800 text-[#e94560] self-start sm:self-center">
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
                  className="p-4 rounded-xl border border-gray-100  navy:border-slate-900/40 bg-gray-50/50 navy:bg-[#0b0b14]/30"
                >
                  <h3 className="text-sm font-black mb-1.5">{item.pos}</h3>
                  <div className="text-xs font-mono text-[#e94560] bg-white navy:bg-[#0b0b14] p-2.5 rounded-lg border border-gray-100 navy:border-slate-800 mb-2 font-bold break-all">
                    Что играть: {item.hands}
                  </div>
                  <p className="text-xs text-gray-500 navy:text-slate-400 leading-relaxed font-medium">
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
                  className="p-3.5 rounded-xl border border-gray-100 navy:border-slate-900/30 bg-gray-50/50 navy:bg-[#0b0b14]/30"
                >
                  <h3 className="text-sm font-black text-[#e94560] mb-0.5">
                    {item.term}
                  </h3>
                  <p className="text-xs text-gray-500 navy:text-slate-400 leading-relaxed font-medium">
                    {item.def}
                  </p>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}
