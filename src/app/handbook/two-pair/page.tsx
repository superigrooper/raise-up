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
              Комбинация Две пары (Two Pair) в покере
            </h1>
            <p className="text-lg text-slate-600 navy:text-[#9BA1A6]">
              Одна из самых частых и коварных рук на шоудауне. Разбираем три
              способа её составления, жесткую иерархию сравнения пар и ключевую
              роль пятой карты (кикера).
            </p>
          </header>

          {/* Главная карточка комбинации */}
          <section className="bg-white navy:bg-[#1C2541] rounded-2xl shadow-sm border border-slate-200 navy:border-slate-800 p-6 mb-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <span className="bg-emerald-100 navy:bg-cyan-950 text-emerald-800 navy:text-cyan-300 font-bold px-3 py-1 rounded-md text-sm">
                  Ранг #8
                </span>
                <h2 className="text-xl font-bold">Что такое Две пары?</h2>
              </div>
              <span className="text-sm text-slate-500 navy:text-slate-400 font-medium">
                Старше Одной пары / Уступает Тройке (Сету)
              </span>
            </div>

            <p className="mb-4">
              <strong>Две пары (Two Pair)</strong> — это пятикарточная рука,
              состоящая из{" "}
              <strong>
                двух карт одного номинала, двух карт другого номинала и одной
                свободной карты (кикера)
              </strong>
              . Масти карт внутри пар значения не имеют.
            </p>

            {/* Визуализация карт (Тузы и Десятки с Королем) */}
            <div className="bg-slate-100 navy:bg-[#0B132B] rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-sm font-semibold text-slate-500 navy:text-slate-400">
                Пример («Тузы и десятки»):
              </span>
              <div className="flex gap-2 text-xl sm:text-2xl font-mono font-bold tracking-wider">
                <span className="bg-white navy:bg-[#1C2541] px-3 py-1.5 rounded-lg shadow-sm text-red-500">
                  A♥️
                </span>
                <span className="bg-white navy:bg-[#1C2541] px-3 py-1.5 rounded-lg shadow-sm text-slate-900 navy:text-white">
                  A♠️
                </span>
                <span className="border-l border-slate-300 navy:border-slate-700 pl-2 flex gap-2">
                  <span className="bg-white navy:bg-[#1C2541] px-3 py-1.5 rounded-lg shadow-sm text-slate-900 navy:text-white">
                    10♣️
                  </span>
                  <span className="bg-white navy:bg-[#1C2541] px-3 py-1.5 rounded-lg shadow-sm text-red-500">
                    10♥️
                  </span>
                </span>
                <span className="border-l border-slate-300 navy:border-slate-700 pl-2 text-amber-600 navy:text-amber-400 bg-white navy:bg-[#1C2541] px-3 py-1.5 rounded-lg shadow-sm">
                  K♠️
                </span>
              </div>
            </div>
          </section>

          {/* Раздел: Способы составления */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 navy:text-white mb-4">
              Три пути собрать Две пары
            </h2>
            <p className="mb-4">
              В Техасском Холдеме эта комбинация может сформироваться тремя
              совершенно разными путями, от которых напрямую зависит сила вашей
              скрытой руки:
            </p>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-white navy:bg-[#1C2541] border border-slate-200 navy:border-slate-800">
                <span className="font-bold text-emerald-600 navy:text-cyan-400">
                  1. Две карманные карты совпали с бордом:
                </span>{" "}
                У вас на руках <span className="font-mono">A-K</span>, а на стол
                выходят <span className="font-mono">A-K-5</span>. Это самый
                сильный и надежный вариант Двух пар.
              </div>
              <div className="p-4 rounded-xl bg-white navy:bg-[#1C2541] border border-slate-200 navy:border-slate-800">
                <span className="font-bold text-emerald-600 navy:text-cyan-400">
                  2. Карманная пара + спарка на столе:
                </span>{" "}
                Вы держите <span className="font-mono">10-10</span>, а на доске
                открывается <span className="font-mono">7-7-2</span>. Будьте
                осторожны — любой соперник с семеркой соберет Тройку (Трипс).
              </div>
              <div className="p-4 rounded-xl bg-white navy:bg-[#1C2541] border border-slate-200 navy:border-slate-800">
                <span className="font-bold text-emerald-600 navy:text-cyan-400">
                  3. Две спаренные карты на столе:
                </span>{" "}
                На борде лежать <span className="font-mono">J-J-9-9-4</span>.
                Две пары автоматически есть у всех игроков за столом. Победителя
                определит старшая карта в руке.
              </div>
            </div>
          </section>

          {/* Раздел: Тай-брейки */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 navy:text-white mb-4">
              Правила разрешения споров (Тай-брейки)
            </h2>
            <p className="mb-4">
              При сравнении Двух пар на вскрытии покерный софт или дилер следуют
              строгому пошаговому протоколу:
            </p>

            <div className="p-5 rounded-xl border border-slate-200 navy:border-slate-800 bg-white navy:bg-[#1C2541] space-y-4">
              <div>
                <h3 className="font-bold text-slate-900 navy:text-white text-base mb-1">
                  1. Сравнение высшей пары
                </h3>
                <p className="text-sm text-slate-600 navy:text-slate-400">
                  Сначала оценивается номинал самой старшей пары. Высшая пара
                  бьет всё остальное.
                  <br />
                  <span className="italic font-semibold text-emerald-600 navy:text-cyan-400">
                    Рука{" "}
                    <span className="font-mono bg-slate-100 navy:bg-[#0B132B] px-1 rounded">
                      A-A-2-2
                    </span>{" "}
                    гарантированно побеждает руку{" "}
                    <span className="font-mono bg-slate-100 navy:bg-[#0B132B] px-1 rounded">
                      K-K-Q-Q
                    </span>
                    .
                  </span>
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 navy:text-white text-base mb-1">
                  2. Сравнение низшей пары
                </h3>
                <p className="text-sm text-slate-600 navy:text-slate-400">
                  Если высшие пары полностью совпали, то судьи смотрят на ранг
                  второй (младшей) пары.
                  <br />
                  <span className="italic font-semibold text-emerald-600 navy:text-cyan-400">
                    Рука{" "}
                    <span className="font-mono bg-slate-100 navy:bg-[#0B132B] px-1 rounded">
                      A-A-J-J
                    </span>{" "}
                    окажется сильнее руки{" "}
                    <span className="font-mono bg-slate-100 navy:bg-[#0B132B] px-1 rounded">
                      A-A-10-10
                    </span>
                    .
                  </span>
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 navy:text-white text-base mb-1">
                  3. Битва кикеров
                </h3>
                <p className="text-sm text-slate-600 navy:text-slate-400">
                  Если обе пары идентичны у двух или более игроков, в силу
                  вступает пятая карта — **кикер**. Банк достается владельцу
                  более сильного кикера.
                  <br />
                  <span className="italic font-semibold text-emerald-600 navy:text-cyan-400">
                    У Игрока 1: <span className="font-mono">K-K-Q-Q-A</span>{" "}
                    (кикер Туз). У Игрока 2:{" "}
                    <span className="font-mono">K-K-Q-Q-J</span> (кикер Валет).
                    Игрок 1 забирает весь банк.
                  </span>
                </p>
              </div>
            </div>
          </section>

          {/* Раздел: Математика */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 navy:text-white mb-4">
              Теория вероятностей: Шансы на Две пары
            </h2>
            <p className="mb-4">
              Две пары — частый гость за покерным столом. Ниже приведены
              математические вероятности её выпадения:
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
                      Общий шанс собрать Две пары на ривере (из 7 карт)
                    </td>
                    <td className="p-4 text-emerald-600 navy:text-cyan-400 font-bold">
                      23.5%
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">
                      Имея две непарные карты (например, A-10), поймать Две пары
                      на флопе
                    </td>
                    <td className="p-4 text-emerald-600 navy:text-cyan-400 font-bold">
                      2.0%
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">
                      Имея Одну пару на флопе, улучшиться до Двух пар к риверу
                    </td>
                    <td className="p-4 text-emerald-600 navy:text-cyan-400 font-bold">
                      ~16.0%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <footer className="p-6 rounded-2xl bg-emerald-50 navy:bg-[#1C2541] border border-emerald-200 navy:border-cyan-900/50">
            <h3 className="text-lg font-bold text-emerald-900 navy:text-cyan-400 mb-2">
              💡 Совет школы покера: Обманчивая сила руки
            </h3>
            <p className="text-sm text-emerald-950 navy:text-slate-300">
              Две пары часто называют «рукой для проигрыша больших стеков».
              Новички склонны переоценивать её силу на опасных досках. Если вы
              собрали младшие Две пары (например, у вас 5-6 на столе A-6-5),
              помните, что любая старшая карта на терне или ривере (K, Q, J)
              может дать оппоненту более сильные Две пары. Кроме того, ваша рука
              легко уязвима перед Сетами и готовыми Стритами. Не бойтесь
              коллировать, но при встречной агрессии на глубоких улицах умейте
              вовремя нажать кнопку «Фолд».
            </p>
          </footer>
        </article>
      </div>
      <Footer />
    </div>
  );
}
