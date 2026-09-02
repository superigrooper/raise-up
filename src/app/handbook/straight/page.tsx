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
      <div className="w-full max-w-5xl bg-white navy:bg-[#121224] p-6 rounded-2xl shadow-lg border border-gray-200 navy:border-slate-800">
        <header className="mb-6 flex items-center justify-between border-b pb-4 border-gray-100 navy:border-slate-900/60">
          <Link
            href="/handbook"
            className="text-sm font-bold text-[#e94560] hover:underline"
          >
            ◀ К списку
          </Link>
        </header>
        <article className="space-y-4 text-xs md:text-sm text-gray-600 navy:text-slate-300 leading-relaxed">
          <header className="border-b border-slate-200 navy:border-slate-700 pb-6 mb-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 navy:text-white tracking-tight mb-4">
              Стрит (Straight)
            </h1>
            <p className="text-lg text-slate-600 navy:text-[#9BA1A6]">
              Шестая по силе рука в классическом покере. Разбираем правила
              составления, скрытые нюансы Туза, теорию тай-брейков и
              математические шансы для вашего успеха за столом.
            </p>
          </header>

          {/* Главная карточка комбинации */}
          <section className="bg-white navy:bg-[#1C2541] rounded-2xl shadow-sm border border-slate-200 navy:border-slate-800 p-6 mb-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <span className="bg-emerald-100 navy:bg-cyan-950 text-emerald-800 navy:text-cyan-300 font-bold px-3 py-1 rounded-md text-sm">
                  Ранг #6
                </span>
                <h2 className="text-xl font-bold">Что такое Стрит?</h2>
              </div>
              <span className="text-sm text-slate-500 navy:text-slate-400 font-medium">
                Сильнее Тройки / Свежее Флеша
              </span>
            </div>

            <p className="mb-4">
              <strong>Стрит (Straight)</strong> — это комбинация, состоящая из{" "}
              <strong>пяти последовательных карт любых мастей</strong>. Главное
              условие — номиналы должны идти строго друг за другом без разрывов,
              а карты обязаны содержать как минимум две разные масти.
            </p>

            {/* Пример визуализации карт */}
            <div className="bg-slate-100 navy:bg-[#0B132B] rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-sm font-semibold text-slate-500 navy:text-slate-400">
                Наглядный пример:
              </span>
              <div className="flex gap-2 text-xl sm:text-2xl font-mono font-bold tracking-wider">
                <span className="bg-white navy:bg-[#1C2541] px-3 py-1.5 rounded-lg shadow-sm text-slate-900 navy:text-white">
                  5♣️
                </span>
                <span className="bg-white navy:bg-[#1C2541] px-3 py-1.5 rounded-lg shadow-sm text-red-500">
                  6♥️
                </span>
                <span className="bg-white navy:bg-[#1C2541] px-3 py-1.5 rounded-lg shadow-sm text-red-500">
                  7♦️
                </span>
                <span className="bg-white navy:bg-[#1C2541] px-3 py-1.5 rounded-lg shadow-sm text-slate-900 navy:text-white">
                  8♠️
                </span>
                <span className="bg-white navy:bg-[#1C2541] px-3 py-1.5 rounded-lg shadow-sm text-red-500">
                  9♥️
                </span>
              </div>
            </div>
          </section>

          {/* Раздел: Роль Туза */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 navy:text-white mb-4">
              Уникальная роль Туза: Старший и Младший
            </h2>
            <p className="mb-4">
              В правилах построения Стрита Туз (A) является единственной
              «двуличной» картой. Он может выступать как в роли самой высокой,
              так и в роли самой низкой карты в последовательности.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl border border-slate-200 navy:border-slate-800 bg-white navy:bg-[#1C2541]">
                <h3 className="font-bold text-emerald-700 navy:text-cyan-400 mb-2">
                  «Бродвей» (Broadway)
                </h3>
                <p className="text-sm mb-3 text-slate-600 navy:text-slate-400">
                  Старший Стрит от десятки до Туза.
                </p>
                <div className="font-mono font-bold text-sm bg-slate-50 navy:bg-[#0B132B] p-2 rounded text-center">
                  A - K - Q - J - 10
                </div>
              </div>

              <div className="p-5 rounded-xl border border-slate-200 navy:border-slate-800 bg-white navy:bg-[#1C2541]">
                <h3 className="font-bold text-amber-700 navy:text-amber-400 mb-2">
                  «Колесо» (The Wheel)
                </h3>
                <p className="text-sm mb-3 text-slate-600 navy:text-slate-400">
                  Самый младший Стрит. Туз здесь считается за единицу.
                </p>
                <div className="font-mono font-bold text-sm bg-slate-50 navy:bg-[#0B132B] p-2 rounded text-center">
                  5 - 4 - 3 - 2 - A
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 rounded-xl bg-amber-50 navy:bg-amber-950/20 border-l-4 border-amber-500 text-sm text-amber-900 navy:text-amber-200">
              <strong>⚠️ Круговые стриты строго запрещены!</strong>{" "}
              Последовательность карт не может перешагивать через Туза посреди
              цепочки. Руки вида{" "}
              <code className="bg-amber-100 navy:bg-amber-900/40 px-1 rounded font-mono font-bold">
                Q-K-A-2-3
              </code>{" "}
              стритом не являются.
            </div>
          </section>

          {/* Раздел: Тай-брейки */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 navy:text-white mb-4">
              Правила разрешения споров (Тай-брейки)
            </h2>

            <ul className="space-y-3 list-none pl-0 text-slate-700 navy:text-[#E0E1DD]">
              <li className="flex gap-3">
                <span className="text-emerald-500 navy:text-cyan-400 font-bold">
                  ✓
                </span>
                <span>
                  <strong>Старшинство верхней карты:</strong> Сравниваются самые
                  старшие карты в цепочке. Стрит до Валета (
                  <span className="font-mono text-sm bg-slate-100 navy:bg-[#0B132B] px-1 rounded">
                    7-8-9-10-J
                  </span>
                  ) бьет Стрит до десятки.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 navy:text-cyan-400 font-bold">
                  ✓
                </span>
                <span>
                  <strong>Отсутствие кикера:</strong> Стрит состоит строго из 5
                  карт. Если у двух игроков одинаковый Стрит, банк делится
                  поровну, независимо от их остальных карт.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 navy:text-cyan-400 font-bold">
                  ✓
                </span>
                <span>
                  <strong>Равенство мастей:</strong> Масти не дают преимущества.
                  Стрит пиковой масти делит банк со Стритом червовой масти при
                  одинаковых номиналах.
                </span>
              </li>
            </ul>
          </section>

          {/* Раздел: Математика */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 navy:text-white mb-4">
              Теория вероятностей: Шансы сбора
            </h2>

            <div className="overflow-x-auto border border-slate-200 navy:border-slate-800 rounded-xl">
              <table className="w-full border-collapse text-left bg-white navy:bg-[#1C2541] text-sm">
                <thead className="bg-slate-100 navy:bg-[#0B132B] text-slate-700 navy:text-slate-300 font-semibold">
                  <tr>
                    <th className="p-4">Игровая ситуация</th>
                    <th className="p-4">Вероятность (%)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 navy:divide-slate-800">
                  <tr>
                    <td className="p-4 font-medium">
                      Собрать Стрит на флопе с карманными коннекторами
                      (например, 8-9)
                    </td>
                    <td className="p-4 text-emerald-600 navy:text-cyan-400 font-bold">
                      1.3%
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">
                      Двустороннее стрит-дро (OESD) от флопа к терну (8 аутов)
                    </td>
                    <td className="p-4 text-emerald-600 navy:text-cyan-400 font-bold">
                      17.4%
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">
                      Двустороннее стрит-дро (OESD) от флопа к риверу
                    </td>
                    <td className="p-4 text-emerald-600 navy:text-cyan-400 font-bold">
                      31.5%
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">
                      Гатшот (дырявое дро, 4 аута) от флопа к риверу
                    </td>
                    <td className="p-4 text-amber-600 navy:text-amber-400 font-bold">
                      16.5%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Стратегический совет */}
          <footer className="p-6 rounded-2xl bg-emerald-50 navy:bg-[#1C2541] border border-emerald-200 navy:border-cyan-900/50">
            <h3 className="text-lg font-bold text-emerald-900 navy:text-cyan-400 mb-2">
              💡 Совет: Осторожность
            </h3>
            <p className="text-sm text-emerald-950 navy:text-slate-300">
              Будьте предельно осторожны, когда на доске лежит Стрит из четырех
              карт (например, <span className="font-mono">5-6-7-8</span>), а у
              вас в руках младшая карта для этой последовательности (
              <span className="font-mono">4</span>). Любой игрок, у которого
              окажется <span className="font-mono">9</span>, заберет весь ваш
              стек. Подобные ситуации называют «доминируемым стритом».
            </p>
          </footer>
        </article>
      </div>
      <Footer />
    </div>
  );
}
