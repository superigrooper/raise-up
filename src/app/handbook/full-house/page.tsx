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
              Фулл-Хаус (Full House)
            </h1>
            <p className="text-lg text-slate-600 navy:text-[#9BA1A6]">
              Четвертая по силе рука, способная принести огромные банки.
              Разбираем правила построения из тройки и пары, тонкости
              тай-брейков при пересечении комбинаций и математику сбора на
              борде.
            </p>
          </header>

          {/* Главная карточка комбинации */}
          <section className="bg-white navy:bg-[#1C2541] rounded-2xl shadow-sm border border-slate-200 navy:border-slate-800 p-6 mb-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <span className="bg-emerald-100 navy:bg-cyan-950 text-emerald-800 navy:text-cyan-300 font-bold px-3 py-1 rounded-md text-sm">
                  Ранг #4
                </span>
                <h2 className="text-xl font-bold">Что такое Фулл-Хаус?</h2>
              </div>
              <span className="text-sm text-slate-500 navy:text-slate-400 font-medium">
                Старше Флеша / Уступает только Каре и Стрит-Флешам
              </span>
            </div>

            <p className="mb-4">
              <strong>Фулл-Хаус (Full House / Полный дом)</strong> — это
              классическая пятикарточная рука, которая состоит из{" "}
              <strong>
                трех карт одного номинала (тройки) и двух карт другого номинала
                (пары)
              </strong>
              . В устной речи название комбинации произносят, озвучивая сначала
              тройку, а затем пару. Например: «Короли, полные десяток».
            </p>

            {/* Визуализация карт (Короли и Десятки) */}
            <div className="bg-slate-100 navy:bg-[#0B132B] rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-sm font-semibold text-slate-500 navy:text-slate-400">
                Пример («Короли, полные десяток»):
              </span>
              <div className="flex gap-2 text-xl sm:text-2xl font-mono font-bold tracking-wider">
                <span className="bg-white navy:bg-[#1C2541] px-3 py-1.5 rounded-lg shadow-sm text-slate-900 navy:text-white">
                  K♠️
                </span>
                <span className="bg-white navy:bg-[#1C2541] px-3 py-1.5 rounded-lg shadow-sm text-red-500">
                  K♥️
                </span>
                <span className="bg-white navy:bg-[#1C2541] px-3 py-1.5 rounded-lg shadow-sm text-red-500">
                  K♦️
                </span>
                <span className="border-l border-slate-300 navy:border-slate-700 pl-2 flex gap-2">
                  <span className="bg-white navy:bg-[#1C2541] px-3 py-1.5 rounded-lg shadow-sm text-slate-900 navy:text-white">
                    10♣️
                  </span>
                  <span className="bg-white navy:bg-[#1C2541] px-3 py-1.5 rounded-lg shadow-sm text-red-500">
                    10♥️
                  </span>
                </span>
              </div>
            </div>
          </section>

          {/* Раздел: Тонкости тай-брейка */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 navy:text-white mb-4">
              Правила разрешения споров (Тай-брейки)
            </h2>
            <p className="mb-4">
              Ситуации, когда сразу несколько игроков за столом собирают
              Фулл-Хаус, происходят довольно часто (особенно при спаренных
              картах на общем борде). Победитель выявляется по строгому
              алгоритму:
            </p>

            <div className="p-5 rounded-xl border border-slate-200 navy:border-slate-800 bg-white navy:bg-[#1C2541] space-y-4">
              <div>
                <h3 className="font-bold text-slate-900 navy:text-white text-base mb-1">
                  1. Приоритет тройки
                </h3>
                <p className="text-sm text-slate-600 navy:text-slate-400">
                  В первую очередь сила Фулл-Хауса определяется номиналом трех
                  составляющих его карт. Любая старшая тройка мгновенно
                  сокрушает младшую, вне зависимости от силы пары.
                  <br />
                  <span className="italic font-semibold text-emerald-600 navy:text-cyan-400">
                    Фулл-Хаус{" "}
                    <span className="font-mono bg-slate-100 navy:bg-[#0B132B] px-1 rounded">
                      10-10-10-2-2
                    </span>{" "}
                    старше, чем{" "}
                    <span className="font-mono bg-slate-100 navy:bg-[#0B132B] px-1 rounded">
                      9-9-9-A-A
                    </span>
                    .
                  </span>
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 navy:text-white text-base mb-1">
                  2. Сравнение по паре
                </h3>
                <p className="text-sm text-slate-600 navy:text-slate-400">
                  Если у игроков образовались абсолютно идентичные тройки
                  (например, три общие карты лежат на столе), в силу вступает
                  сравнение номинала пары.
                  <br />
                  <span className="italic font-semibold text-emerald-600 navy:text-cyan-400">
                    Комбинация{" "}
                    <span className="font-mono bg-slate-100 navy:bg-[#0B132B] px-1 rounded">
                      J-J-J-K-K
                    </span>{" "}
                    бьет руку{" "}
                    <span className="font-mono bg-slate-100 navy:bg-[#0B132B] px-1 rounded">
                      J-J-J-Q-Q
                    </span>
                    .
                  </span>
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 navy:text-white text-base mb-1">
                  3. Полная дележка (Chop-Chop)
                </h3>
                <p className="text-sm text-slate-600 navy:text-slate-400">
                  Если весь Фулл-Хаус целиком лег на общий стол (борд), и ни
                  один из игроков не имеет карманных карт для улучшения тройки
                  или пары, банк делится поровну между всеми участниками
                  шоудауна. Кикера в Фулл-Хаусе нет, так как задействованы все 5
                  карт.
                </p>
              </div>
            </div>
          </section>

          {/* Раздел: Математика */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 navy:text-white mb-4">
              Теория вероятностей: Шансы сбора Фулл-Хауса
            </h2>
            <p className="mb-4">
              Фулл-Хаус чаще всего собирается при усилении уже готовых на флопе
              комбинаций — Тройки (Сета) или Двух пар:
            </p>

            <div className="overflow-x-auto border border-slate-200 navy:border-slate-800 rounded-xl">
              <table className="w-full border-collapse text-left bg-white navy:bg-[#1C2541] text-sm">
                <thead className="bg-slate-100 navy:bg-[#0B132B] text-slate-700 navy:text-slate-300 font-semibold">
                  <tr>
                    <th className="p-4">Игровая ситуация (Техасский Холдем)</th>
                    <th className="p-4">Вероятность (%)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 navy:divide-slate-800">
                  <tr>
                    <td className="p-4 font-medium">
                      Общий шанс собрать Фулл-Хаус на ривере из 7 случайных карт
                    </td>
                    <td className="p-4 text-emerald-600 navy:text-cyan-400 font-bold">
                      2.60%
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">
                      Имея Сет (Тройку) на флопе, усилиться до Фулл-Хауса на
                      терне
                    </td>
                    <td className="p-4 text-emerald-600 navy:text-cyan-400 font-bold">
                      12.8%
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">
                      Имея Сет (Тройку) на флопе, достроить Фулл-Хаус к риверу
                    </td>
                    <td className="p-4 text-emerald-600 navy:text-cyan-400 font-bold">
                      33.4%
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">
                      Имея Две пары на флопе, поймать одну из своих карт на
                      терне или ривере
                    </td>
                    <td className="p-4 text-amber-600 navy:text-amber-400 font-bold">
                      16.7%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Стратегический совет */}
          <footer className="p-6 rounded-2xl bg-emerald-50 navy:bg-[#1C2541] border border-emerald-200 navy:border-cyan-900/50">
            <h3 className="text-lg font-bold text-emerald-900 navy:text-cyan-400 mb-2">
              💡 Совет: Ловушка общего стола
            </h3>
            <p className="text-sm text-emerald-950 navy:text-slate-300">
              Особую осторожность стоит проявлять, когда спаренные карты лежат
              на борде. Если на столе лежат карты{" "}
              <span className="font-mono font-bold">Q-Q-7-4-7</span> (у вас на
              руках <span className="font-mono">A-4</span>, что дает Фулл-Хаус
              на семерках и семерки полные дам), вы легко можете проиграть.
              Любой соперник с карманной Дамой (
              <span className="font-mono">Q</span>) или Семеркой (
              <span className="font-mono">7</span>) соберет Фулл-Хаус гораздо
              выше вашего. Помните: Фулл-Хаус, построенный на основе вашей
              скрытой карманной пары (Сет с флопа), ценится в разы выше и
              приносит максимальную прибыль, так как соперники не могут его
              прочитать.
            </p>
          </footer>
        </article>
      </div>
      <Footer />
    </div>
  );
}
