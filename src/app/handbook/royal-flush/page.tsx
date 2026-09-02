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
              Роял-Флеш (Royal Flush) в покере: Сильнейшая рука
            </h1>
            <p className="text-lg text-slate-600 navy:text-[#9BA1A6]">
              Вершина покерной иерархии и символ абсолютной победы. Разбираем
              правила составления, математическую редкость этого сочетания и
              правильную стратегию извлечения максимальной прибыли.
            </p>
          </header>

          {/* Главная карточка комбинации */}
          <section className="bg-white navy:bg-[#1C2541] rounded-2xl shadow-sm border border-slate-200 navy:border-slate-800 p-6 mb-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <span className="bg-emerald-100 navy:bg-cyan-950 text-emerald-800 navy:text-cyan-300 font-bold px-3 py-1 rounded-md text-sm">
                  Ранг #1
                </span>
                <h2 className="text-xl font-bold">Что такое Роял-Флеш?</h2>
              </div>
              <span className="text-sm text-slate-500 navy:text-slate-400 font-medium">
                Абсолютный натс / Непобедимая комбинация
              </span>
            </div>

            <p className="mb-4">
              <strong>Роял-Флеш (Royal Flush / Королевский Флеш)</strong> — это
              самая сильная и редкая комбинация в классических видах покера
              (Техасский Холдем, Омаха). Она состоит из **пяти старших
              одномастных карт от Десятки до Туза**. По своей сути это просто
              самый старший вариант *Стрит-Флеша*, однако из-за своей
              уникальности он вынесен на первое место в табели о рангах.
            </p>

            {/* Визуализация карт (Червовый Роял-Флеш) */}
            <div className="bg-slate-100 navy:bg-[#0B132B] rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-sm font-semibold text-slate-500 navy:text-slate-400">
                Пример (Червовый Роял-Флеш):
              </span>
              <div className="flex gap-2 text-xl sm:text-2xl font-mono font-bold tracking-wider">
                <span className="bg-white navy:bg-[#1C2541] px-3 py-1.5 rounded-lg shadow-sm text-red-500">
                  10♥️
                </span>
                <span className="bg-white navy:bg-[#1C2541] px-3 py-1.5 rounded-lg shadow-sm text-red-500">
                  J♥️
                </span>
                <span className="bg-white navy:bg-[#1C2541] px-3 py-1.5 rounded-lg shadow-sm text-red-500">
                  Q♥️
                </span>
                <span className="bg-white navy:bg-[#1C2541] px-3 py-1.5 rounded-lg shadow-sm text-red-500">
                  K♥️
                </span>
                <span className="bg-white navy:bg-[#1C2541] px-3 py-1.5 rounded-lg shadow-sm text-red-500">
                  A♥️
                </span>
              </div>
            </div>
          </section>

          {/* Раздел: Разрешение споров */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 navy:text-white mb-4">
              Правила на шоудауне (Тай-брейки)
            </h2>
            <p className="mb-4">
              Поскольку Роял-Флеш является абсолютно сильнейшей рукой, проиграть
              с ней невозможно. Однако правила покера предусматривают редчайшие
              спорные ситуации:
            </p>

            <div className="p-5 rounded-xl border border-slate-200 navy:border-slate-800 bg-white navy:bg-[#1C2541] space-y-4">
              <div>
                <h3 className="font-bold text-slate-900 navy:text-white text-base mb-1">
                  1. Роял-Флеш на общем столе (Борде)
                </h3>
                <p className="text-sm text-slate-600 navy:text-slate-400">
                  Если все пять карт комбинации (
                  <span className="font-mono bg-slate-100 navy:bg-[#0B132B] px-1 rounded text-red-500">
                    10-J-Q-K-A
                  </span>{" "}
                  одной масти) ложатся на стол в качестве общих карт борда,
                  раздача завершается безоговорочной ничьей. Банк делится строго
                  поровну (Chop-Chop) между всеми игроками, которые не сбросили
                  карты до ривера. Никакие карманные карты не могут улучшить эту
                  руку.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 navy:text-white text-base mb-1">
                  2. Равенство мастей
                </h3>
                <p className="text-sm text-slate-600 navy:text-slate-400">
                  В покере все масти равны по силе. Если в таких играх, как
                  Омаха или Стад, два игрока одновременно соберут Роял-Флеш
                  разных мастей (например, один пиковый, другой — бубновый), они
                  также разделят банк ровно пополам.
                </p>
              </div>
            </div>
          </section>

          {/* Раздел: Математика */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 navy:text-white mb-4">
              Математическая редкость: Шансы и цифры
            </h2>
            <p className="mb-4">
              Роял-Флеш — желанное событие для любого игрока именно из-за своей
              экстремальной математической редкости:
            </p>

            <div className="overflow-x-auto border border-slate-200 navy:border-slate-800 rounded-xl">
              <table className="w-full border-collapse text-left bg-white navy:bg-[#1C2541] text-sm">
                <thead className="bg-slate-100 navy:bg-[#0B132B] text-slate-700 navy:text-slate-300 font-semibold">
                  <tr>
                    <th className="p-4">Игровая ситуация (Техасский Холдем)</th>
                    <th className="p-4">Вероятность / Математический шанс</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 navy:divide-slate-800">
                  <tr>
                    <td className="p-4 font-medium">
                      Шанс получить готовый Роял-Флеш сразу на флопе (первые 3
                      общие карты)
                    </td>
                    <td className="p-4 text-emerald-600 navy:text-cyan-400 font-bold">
                      0.00005% (1 к 1 960 000)
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">
                      Общая вероятность собрать комбинацию к риверу (из 7
                      случайных карт)
                    </td>
                    <td className="p-4 text-emerald-600 navy:text-cyan-400 font-bold">
                      0.0032% (1 к 30 940)
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">
                      Количество возможных буквенно-мастных комбинаций в колоде
                      из 52 карт
                    </td>
                    <td className="p-4 text-slate-700 navy:text-[#E0E1DD] font-bold">
                      Всего 4 варианта (по одному на каждую масть)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Стратегический совет */}
          <footer className="p-6 rounded-2xl bg-emerald-50 navy:bg-[#1C2541] border border-emerald-200 navy:border-cyan-900/50">
            <h3 className="text-lg font-bold text-emerald-900 navy:text-cyan-400 mb-2">
              💡 Совет школы покера: Искусство скрытого розыгрыша
            </h3>
            <p className="text-sm text-emerald-950 navy:text-slate-300">
              Собрать Роял-Флеш — грандиозное событие, но ваша главная задача за
              столом — сделать так, чтобы соперники оплатили вашу идеальную
              руку. Главная ошибка новичков при получении такой руки —
              моментальная крупная ставка (донк-бет) или резкий олл-ин, который
              пугает стол и заставляет всех нажать кнопку «Пас» (Fold).
              <br />
              <br />
              Используйте исключительно <strong>слоуплей (Slowplay)</strong> —
              чекайте, имитируйте слабость или неуверенность, давайте оппонентам
              с их Тройками, Стритами или Флешами проявить агрессию и самим
              разгонять размер банка. Ваша цель — спровоцировать соперника на
              блеф к моменту ривера.
            </p>
          </footer>
        </article>
      </div>
      <Footer />
    </div>
  );
}
