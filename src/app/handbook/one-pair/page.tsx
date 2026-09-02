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
              Комбинация Пара (One Pair) в покере
            </h1>
            <p className="text-lg text-slate-600 navy:text-[#9BA1A6]">
              Девятая по силе рука в покере, с которой выигрывается огромное
              количество раздач на постфлопе. Разбираем правила составления,
              критически важную роль кикеров и математическую вероятность на
              разных улицах.
            </p>
          </header>

          {/* Главная карточка комбинации */}
          <section className="bg-white navy:bg-[#1C2541] rounded-2xl shadow-sm border border-slate-200 navy:border-slate-800 p-6 mb-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <span className="bg-emerald-100 navy:bg-cyan-950 text-emerald-800 navy:text-cyan-300 font-bold px-3 py-1 rounded-md text-sm">
                  Ранг #9
                </span>
                <h2 className="text-xl font-bold">Что такое Пара?</h2>
              </div>
              <span className="text-sm text-slate-500 navy:text-slate-400 font-medium">
                Старше Старшей карты / Уступает Двум парам
              </span>
            </div>

            <p className="mb-4">
              <strong>Пара (One Pair)</strong> — это комбинация, которая состоит
              из <strong>двух карт одного номинала</strong> и трех
              дополнительных карт, которые называются <strong>кикерами</strong>.
              Масти двух основных карт не имеют значения.
            </p>

            {/* Визуализация карт (Пара Тузов со старшим Королем) */}
            <div className="bg-slate-100 navy:bg-[#0B132B] rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-sm font-semibold text-slate-500 navy:text-slate-400">
                Пример (Пара Тузов с кикерами K, J, 4):
              </span>
              <div className="flex gap-2 text-xl sm:text-2xl font-mono font-bold tracking-wider">
                <span className="bg-white navy:bg-[#1C2541] px-3 py-1.5 rounded-lg shadow-sm text-red-500">
                  A♥️
                </span>
                <span className="bg-white navy:bg-[#1C2541] px-3 py-1.5 rounded-lg shadow-sm text-red-500">
                  A♦️
                </span>
                <span className="border-l border-slate-300 navy:border-slate-700 pl-2 flex gap-2">
                  <span className="bg-white navy:bg-[#1C2541] px-3 py-1.5 rounded-lg shadow-sm text-slate-900 navy:text-white">
                    K♠️
                  </span>
                  <span className="bg-white navy:bg-[#1C2541] px-3 py-1.5 rounded-lg shadow-sm text-slate-900 navy:text-white">
                    J♣️
                  </span>
                  <span className="bg-white navy:bg-[#1C2541] px-3 py-1.5 rounded-lg shadow-sm text-slate-900 navy:text-white">
                    4♠️
                  </span>
                </span>
              </div>
            </div>
          </section>

          {/* Раздел: Роль кикера */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 navy:text-white mb-4">
              Когда кикер определяет победителя
            </h2>
            <p className="mb-4">
              В Техасском Холдеме совпадение одной пары у двух или более игроков
              — самая частая ситуация на шоудауне. Поскольку итоговая рука
              всегда состоит из пяти карт, остальные три карты (кикеры) играют
              решающую роль в определении победителя.
            </p>

            {/* Пример со сравнением кикеров */}
            <div className="p-5 rounded-xl border border-slate-200 navy:border-slate-800 bg-white navy:bg-[#1C2541]">
              <h3 className="font-bold text-slate-900 navy:text-white mb-2">
                Пример шоудауна с одинаковыми парами
              </h3>
              <p className="text-sm mb-3 text-slate-600 navy:text-slate-400">
                На общем столе лежат карты:{" "}
                <span className="font-mono bg-slate-100 dark:bg-slate-900 p-0.5 rounded">
                  J-8-4-2-9
                </span>{" "}
                (разные масти).
              </p>
              <ul className="text-sm space-y-2 list-disc pl-5 text-slate-700 navy:text-[#E0E1DD]">
                <li>
                  <strong>Игрок 1</strong> удерживает карманные{" "}
                  <span className="font-mono font-bold text-red-500">
                    A♣️ J♦️
                  </span>
                  . Его лучшая пятикарточная рука — это пара валетов со старшим
                  кикером Тузом:{" "}
                  <span className="font-mono font-bold">J-J-A-9-8</span>.
                </li>
                <li>
                  <strong>Игрок 2</strong> удерживает карманные{" "}
                  <span className="font-mono font-bold text-slate-900 dark:text-white">
                    K♠️ J♣️
                  </span>
                  . Его лучшая рука — пара валетов с кикером Королем:{" "}
                  <span className="font-mono font-bold">J-J-K-9-8</span>.
                </li>
                <li>
                  <strong>Побеждает Игрок 1</strong>. Несмотря на то, что у
                  обоих пара валетов, Туз Игрока 1 бьет Короля Игрока 2 по праву
                  старшего кикера.
                </li>
              </ul>
            </div>
          </section>

          {/* Раздел: Тай-брейки */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 navy:text-white mb-4">
              Правила разрешения споров (Тай-брейки)
            </h2>

            <ul className="space-y-4 list-none pl-0 text-slate-700 navy:text-[#E0E1DD]">
              <li className="flex gap-3">
                <span className="text-emerald-500 navy:text-cyan-400 font-bold">
                  ✓
                </span>
                <span>
                  <strong>Номинал самой пары:</strong> Если у игроков разные
                  пары, побеждает тот, чья пара выше по рангу. Пара Дам (
                  <span className="font-mono text-sm bg-slate-100 navy:bg-[#0B132B] px-1 rounded">
                    Q-Q-x-x-x
                  </span>
                  ) всегда сильнее пары Десяток (
                  <span className="font-mono text-sm bg-slate-100 navy:bg-[#0B132B] px-1 rounded">
                    10-10-x-x-x
                  </span>
                  ).
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 navy:text-cyan-400 font-bold">
                  ✓
                </span>
                <span>
                  <strong>Последовательное сравнение кикеров:</strong> Если
                  номинал пары совпадает, сначала сравнивают первый старший
                  кикер. При их равенстве оценивают второй кикер, а затем и
                  третий.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 navy:text-cyan-400 font-bold">
                  ✓
                </span>
                <span>
                  <strong>Полный раздел банка (Split Pot):</strong> Если у
                  игроков одинаковая пара и полностью совпадают по номиналам все
                  три кикера (например, они используют общие кикеры с борда),
                  банк делится поровну. Масти карт не имеют приоритета.
                </span>
              </li>
            </ul>
          </section>

          {/* Раздел: Математика */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 navy:text-white mb-4">
              Теория вероятностей: Шансы сбора одной пары
            </h2>
            <p className="mb-4">
              Пара — базовая и наиболее математически частая рука, с которой вы
              будете сталкиваться в каждой игровой сессии:
            </p>

            <div className="overflow-x-auto border border-slate-200 navy:border-slate-800 rounded-xl">
              <table className="w-full border-collapse text-left bg-white navy:bg-[#1C2541] text-sm">
                <thead className="bg-slate-100 navy:bg-[#0B132B] text-slate-700 navy:text-slate-300 font-semibold">
                  <tr>
                    <th className="p-4">Игровой этап (Техасский Холдем)</th>
                    <th className="p-4">Вероятность</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 navy:divide-slate-800">
                  <tr>
                    <td className="p-4 font-medium">
                      Шанс получить карманную пару на префлопе (например, А-А
                      или 5-5)
                    </td>
                    <td className="p-4 text-emerald-600 navy:text-cyan-400 font-bold">
                      5.88% (1 раз из 17)
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">
                      Поймать пару на флопе, имея две непарные карты на руках
                      (например, поймать А с рукой А-К)
                    </td>
                    <td className="p-4 text-emerald-600 navy:text-cyan-400 font-bold">
                      29.0%
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">
                      Общая вероятность собрать хотя бы одну пару к риверу из 7
                      карт
                    </td>
                    <td className="p-4 text-emerald-600 navy:text-cyan-400 font-bold">
                      43.8%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Стратегический совет */}
          <footer className="p-6 rounded-2xl bg-emerald-50 navy:bg-[#1C2541] border border-emerald-200 navy:border-cyan-900/50">
            <h3 className="text-lg font-bold text-emerald-900 navy:text-cyan-400 mb-2">
              💡 Совет школы покера: Градация пар на постфлопе
            </h3>
            <p className="text-sm text-emerald-950 navy:text-slate-300">
              В зависимости от того, как соотносится ваша пара с картами на
              столе, ее сила сильно меняется. Принято выделять три категории:
              <br />• <strong>Топ-пара (Top Pair):</strong> Вы составили пару с
              самой старшей картой на столе. Это сильная готовая рука, с которой
              часто нужно делать ставки на велью.
              <br />• <strong>Вторая/Средняя пара (Middle Pair):</strong>{" "}
              Совпадение со второй по старшинству картой борда. Рука средней
              силы, больше подходящая для пот-контроля и чека.
              <br />• <strong>Младшая пара (Bottom Pair):</strong> Совпадение с
              самой мелкой картой стола. Очень уязвимая рука, которую легко
              сбросить при агрессии оппонента.
            </p>
          </footer>
        </article>
      </div>
      <Footer />
    </div>
  );
}
