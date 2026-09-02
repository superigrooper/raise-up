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
              Флеш (Flush)
            </h1>
            <p className="text-lg text-slate-600 navy:text-[#9BA1A6]">
              Пятая по силе покерная рука. Разбираем правила её формирования,
              тонкости сравнения одинаковых Флешей по старшим картам и
              математические шансы на закрытие дро-комбинаций.
            </p>
          </header>

          {/* Главная карточка комбинации */}
          <section className="bg-white navy:bg-[#1C2541] rounded-2xl shadow-sm border border-slate-200 navy:border-slate-800 p-6 mb-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <span className="bg-emerald-100 navy:bg-cyan-950 text-emerald-800 navy:text-cyan-300 font-bold px-3 py-1 rounded-md text-sm">
                  Ранг #5
                </span>
                <h2 className="text-xl font-bold">Что такое Флеш?</h2>
              </div>
              <span className="text-sm text-slate-500 navy:text-slate-400 font-medium">
                Старше Стрита / Уступает Фулл-Хаусу
              </span>
            </div>

            <p className="mb-4">
              <strong>Флеш (Flush)</strong> — это комбинация, которая состоит из{" "}
              <strong>пяти карт одной масти</strong>. При этом номиналы карт не
              должны идти по порядку (иначе рука превратится в Стрит-Флеш).
              Масть может быть абсолютно любой: пики ♠️, черви ♥️, бубны ♦️ или
              трефы ♣️.
            </p>

            {/* Визуализация карт (Бубновый Флеш с Тузом) */}
            <div className="bg-slate-100 navy:bg-[#0B132B] rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-sm font-semibold text-slate-500 navy:text-slate-400">
                Пример (Бубновый Флеш со старшим Тузом):
              </span>
              <div className="flex gap-2 text-xl sm:text-2xl font-mono font-bold tracking-wider">
                <span className="bg-white navy:bg-[#1C2541] px-3 py-1.5 rounded-lg shadow-sm text-red-500">
                  A♦️
                </span>
                <span className="bg-white navy:bg-[#1C2541] px-3 py-1.5 rounded-lg shadow-sm text-red-500">
                  J♦️
                </span>
                <span className="bg-white navy:bg-[#1C2541] px-3 py-1.5 rounded-lg shadow-sm text-red-500">
                  9♦️
                </span>
                <span className="bg-white navy:bg-[#1C2541] px-3 py-1.5 rounded-lg shadow-sm text-red-500">
                  6♦️
                </span>
                <span className="bg-white navy:bg-[#1C2541] px-3 py-1.5 rounded-lg shadow-sm text-red-500">
                  3♦️
                </span>
              </div>
            </div>
          </section>

          {/* Раздел: Тонкости тай-брейка */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 navy:text-white mb-4">
              Как правильно сравнивать Флеши
            </h2>
            <p className="mb-4">
              Поскольку в покере часто играют одномастные карты, ситуации с
              двумя Флешами за столом возникают регулярно. Победитель в таких
              спорах определяется по строгой иерархии номиналов, а не по масти:
            </p>

            <div className="p-5 rounded-xl border border-slate-200 navy:border-slate-800 bg-white navy:bg-[#1C2541] space-y-4">
              <div>
                <h3 className="font-bold text-slate-900 navy:text-white text-base mb-1">
                  1. Сравнение по первой (старшей) карте
                </h3>
                <p className="text-sm text-slate-600 navy:text-slate-400">
                  Выигрывает тот, у кого номинал самой высокой карты Флеша выше.
                  Флеш со старшим Королем (
                  <span className="font-mono bg-slate-100 navy:bg-[#0B132B] px-1 rounded">
                    K-10-8-5-2
                  </span>
                  ) всегда проигрывает Флешу со старшим Тузом (
                  <span className="font-mono bg-slate-100 navy:bg-[#0B132B] px-1 rounded">
                    A-7-5-4-3
                  </span>
                  ).
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 navy:text-white text-base mb-1">
                  2. Сравнение по последующим картам
                </h3>
                <p className="text-sm text-slate-600 navy:text-slate-400">
                  Если самые старшие карты у игроков одинаковые (например,
                  четыре карты масти лежат на столе, а у обоих игроков по Тузу
                  этой масти в руках), покер-рум начинает поочередно сравнивать
                  вторую, третью, четвертую и пятую карты комбинации.
                  <br />
                  <span className="italic">
                    Рука <span className="font-mono font-bold">A-K-J-5-2</span>{" "}
                    бьет руку{" "}
                    <span className="font-mono font-bold">A-K-10-9-8</span>, так
                    как Валет (J) старше Десятки (10).
                  </span>
                </p>
              </div>
            </div>
          </section>

          {/* Раздел: Тай-брейки списком */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 navy:text-white mb-4">
              Главные правила шоудауна
            </h2>
            <ul className="space-y-3 list-none pl-0 text-slate-700 navy:text-[#E0E1DD]">
              <li className="flex gap-3">
                <span className="text-emerald-500 navy:text-cyan-400 font-bold">
                  ✓
                </span>
                <span>
                  <strong>Масти абсолютно равны:</strong> Червовый Флеш до Туза
                  имеет ровно такую же силу, как и пиковый Флеш до Туза. Никакая
                  масть не дает преимущества.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 navy:text-cyan-400 font-bold">
                  ✓
                </span>
                <span>
                  <strong>Дележка банка (Chop-Chop):</strong> Если на столе
                  лежат 5 карт одной масти (например,{" "}
                  <span className="font-mono">A-Q-10-7-4</span> пик), и ни у
                  одного из игроков нет на руках пиковой карты старше четверки,
                  все участники делят банк поровну. Личные разномастные карты
                  игроков никак не влияют на исход.
                </span>
              </li>
            </ul>
          </section>

          {/* Раздел: Математика */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 navy:text-white mb-4">
              Теория вероятностей: Шансы на закрытие Флеша
            </h2>
            <p className="mb-4">
              В Техасском Холдеме Флеш чаще всего собирается из состояния
              «Флеш-дро» (когда у вас есть 4 карты одной масти на флопе или
              терне):
            </p>

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
                      Получить две одномастные карты (Suited) на префлопе
                    </td>
                    <td className="p-4 text-emerald-600 navy:text-cyan-400 font-bold">
                      23.5%
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">
                      Поймать готовый Флеш на флопе с двумя одномастными картами
                      в руке
                    </td>
                    <td className="p-4 text-emerald-600 navy:text-cyan-400 font-bold">
                      0.84%
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">
                      Закрыть Флеш-дро на терне, имея 4 карты масти на флопе (9
                      аутов)
                    </td>
                    <td className="p-4 text-emerald-600 navy:text-cyan-400 font-bold">
                      19.1%
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">
                      Общий шанс достроить Флеш-дро от флопа к риверу (две
                      улицы)
                    </td>
                    <td className="p-4 text-emerald-600 navy:text-cyan-400 font-bold">
                      35.0%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Стратегический совет */}
          <footer className="p-6 rounded-2xl bg-emerald-50 navy:bg-[#1C2541] border border-emerald-200 navy:border-cyan-900/50">
            <h3 className="text-lg font-bold text-emerald-900 navy:text-cyan-400 mb-2">
              💡 Совет: Коварство младших Флешей
            </h3>
            <p className="text-sm text-emerald-950 navy:text-slate-300">
              Для новичков одномастные карты вроде{" "}
              <span className="font-mono font-bold text-red-500">3♥️ 4♥️</span>{" "}
              выглядят привлекательно, но они таят в себе скрытую угрозу. Если
              вы соберете Флеш со столь низкими картами, вы рискуете попасть под
              «кулер» — ситуацию, когда у вашего оппонента окажется Флеш той же
              масти, но с более старшей картой (например, с Дамой или Тузом).
              Разыгрывайте ненатсовые (младшие) Флеш-дро максимально осторожно и
              не разгоняйте банк без крайней необходимости.
            </p>
          </footer>
        </article>
      </div>
      <Footer />
    </div>
  );
}
