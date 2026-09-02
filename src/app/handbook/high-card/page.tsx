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
              Старшая карта (High Card) в покере
            </h1>
            <p className="text-lg text-slate-600 navy:text-[#9BA1A6]">
              Самая базовая и слабая рука в иерархии покерных комбинаций.
              Разбираем правила её оценки на шоудауне, поочередное сравнение
              кикеров и математический шанс остаться без готовой руки.
            </p>
          </header>

          {/* Главная карточка комбинации */}
          <section className="bg-white navy:bg-[#1C2541] rounded-2xl shadow-sm border border-slate-200 navy:border-slate-800 p-6 mb-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <span className="bg-emerald-100 navy:bg-cyan-950 text-emerald-800 navy:text-cyan-300 font-bold px-3 py-1 rounded-md text-sm">
                  Ранг #10
                </span>
                <h2 className="text-xl font-bold">Что такое Старшая карта?</h2>
              </div>
              <span className="text-sm text-slate-500 navy:text-slate-400 font-medium">
                Самая слабая рука / Уступает Паре
              </span>
            </div>

            <p className="mb-4">
              <strong>Старшая карта (High Card)</strong> — это ситуация, когда
              пятикарточная рука игрока не содержит ни одного совпадения по
              номиналу, карты принадлежат к разным мастям (нет Флеша) и не идут
              подряд по значению (нет Стрита). Сила такой руки определяется
              исключительно **номиналом самой высокой карты** в наборе.
            </p>

            {/* Визуализация карт (Старший Туз) */}
            <div className="bg-slate-100 navy:bg-[#0B132B] rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-sm font-semibold text-slate-500 navy:text-slate-400">
                Пример (Старшая карта Туз):
              </span>
              <div className="flex gap-2 text-xl sm:text-2xl font-mono font-bold tracking-wider">
                <span className="bg-white navy:bg-[#1C2541] px-3 py-1.5 rounded-lg shadow-sm text-red-500">
                  A♥️
                </span>
                <span className="bg-white navy:bg-[#1C2541] px-3 py-1.5 rounded-lg shadow-sm text-slate-900 navy:text-white">
                  K♠️
                </span>
                <span className="bg-white navy:bg-[#1C2541] px-3 py-1.5 rounded-lg shadow-sm text-slate-900 navy:text-white">
                  J♣️
                </span>
                <span className="bg-white navy:bg-[#1C2541] px-3 py-1.5 rounded-lg shadow-sm text-red-500">
                  7♦️
                </span>
                <span className="bg-white navy:bg-[#1C2541] px-3 py-1.5 rounded-lg shadow-sm text-slate-900 navy:text-white">
                  4♠️
                </span>
              </div>
            </div>
          </section>

          {/* Раздел: Логика тай-брейка */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 navy:text-white mb-4">
              Как разрешаются споры: Сравнение кикеров
            </h2>
            <p className="mb-4">
              Если на вскрытии (шоудауне) ни у одного из оставшихся участников
              раздачи нет ни одной пары или более сильной комбинации, победитель
              определяется методом **поэтапного сравнения всех пяти карт**:
            </p>

            <div className="p-5 rounded-xl border border-slate-200 navy:border-slate-800 bg-white navy:bg-[#1C2541] space-y-4">
              <div>
                <h3 className="font-bold text-slate-900 navy:text-white text-base mb-1">
                  1. Сравнение по первой карте
                </h3>
                <p className="text-sm text-slate-600 navy:text-slate-400">
                  Сначала оценивается самая высокая карта. Игрок со старшим
                  Тузом на руках бьет игрока со старшим Королем, независимо от
                  номинала их остальных четырех карт.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 navy:text-white text-base mb-1">
                  2. Последовательное сравнение
                </h3>
                <p className="text-sm text-slate-600 navy:text-slate-400">
                  Если самые старшие карты одинаковы (например, у обоих игроков
                  старший Туз), система начинает последовательно сравнивать
                  вторую, третью, четвертую и пятую карты.
                  <br />
                  <span className="italic font-semibold text-emerald-600 navy:text-cyan-400">
                    Рука{" "}
                    <span className="font-mono bg-slate-100 navy:bg-[#0B132B] px-1 rounded text-sm font-bold">
                      A-K-J-8-3
                    </span>{" "}
                    побеждает руку{" "}
                    <span className="font-mono bg-slate-100 navy:bg-[#0B132B] px-1 rounded text-sm font-bold">
                      A-K-10-9-7
                    </span>
                    , так как третья карта (Валет) старше Десятки.
                  </span>
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 navy:text-white text-base mb-1">
                  3. Раздел банка (Split)
                </h3>
                <p className="text-sm text-slate-600 navy:text-slate-400">
                  Если все пять лучших карт у оппонентов абсолютно идентичны по
                  номиналам (например, они используют пять старших карт с общего
                  стола), фиксируется ничья, а банк делится поровну. Масти карт
                  традиционно не имеют значения.
                </p>
              </div>
            </div>
          </section>

          {/* Раздел: Математика */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 navy:text-white mb-4">
              Теория вероятностей: Как часто вы остаетесь со Старшей картой
            </h2>
            <p className="mb-4">
              В Техасском Холдеме вероятность дойти до ривера и не собрать
              вообще ничего относительно невысока, так как общие 5 карт на столе
              часто образуют пары сами по себе:
            </p>

            <div className="overflow-x-auto border border-slate-200 navy:border-slate-800 rounded-xl">
              <table className="w-full border-collapse text-left bg-white navy:bg-[#1C2541] text-sm">
                <thead className="bg-slate-100 navy:bg-[#0B132B] text-slate-700 navy:text-slate-300 font-semibold">
                  <tr>
                    <th className="p-4">Сценарий раздачи</th>
                    <th className="p-4">Вероятность (%)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 navy:divide-slate-800">
                  <tr>
                    <td className="p-4 font-medium">
                      Шанс получить непарные разномастные карты на префлопе
                      (например, Т-В разномастные)
                    </td>
                    <td className="p-4 text-emerald-600 navy:text-cyan-400 font-bold">
                      71.0%
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">
                      Вероятность не собрать абсолютно ничего к риверу (из всех
                      7 доступных карт)
                    </td>
                    <td className="p-4 text-emerald-600 navy:text-cyan-400 font-bold">
                      17.4%
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">
                      Шанс выиграть раздачу на вскрытии, имея только Старшую
                      карту
                    </td>
                    <td className="p-4 text-amber-600 navy:text-amber-400 font-bold">
                      Крайне мал (обычно в банках без торгов)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Стратегический совет */}
          <footer className="p-6 rounded-2xl bg-emerald-50 navy:bg-[#1C2541] border border-emerald-200 navy:border-cyan-900/50">
            <h3 className="text-lg font-bold text-emerald-900 navy:text-cyan-400 mb-2">
              💡 Совет школы покера: Стратегия блефа и шоудаун-велью
            </h3>
            <p className="text-sm text-emerald-950 navy:text-slate-300">
              Имея на руках только Старшую карту к риверу, выиграть на вскрытии
              «честным» путем практически невозможно. У вас остаются два пути:
              <br />• <strong>Превратить руку в блеф:</strong> Если структура
              стола сухая и вы демонстрировали силу на предыдущих улицах,
              крупная ставка может заставить оппонента выбросить его слабую
              среднюю или младшую пару.
              <br />• <strong>Шоудаун-велью (Showdown Value):</strong> В редких
              случаях, когда торгов на терне и ривере не было, ваша рука типа
              «Старший Туз» или «Старший Король» может оказаться впереди
              «пустых» недостроенных дро-комбинаций соперника (например,
              промазавших Стрит- или Флеш-дро). Если оппонент чекнет, вам также
              стоит зачекать позади и бесплатно забрать банк на вскрытии.
            </p>
          </footer>
        </article>
      </div>
      <Footer />
    </div>
  );
}
