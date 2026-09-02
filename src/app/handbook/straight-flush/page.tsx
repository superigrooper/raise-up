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
          {/* Заголовок статьи */}
          <header className="border-b border-slate-200 navy:border-slate-700 pb-6 mb-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 navy:text-white tracking-tight mb-4">
              Стрит-Флеш (Straight Flush)
            </h1>
            <p className="text-lg text-slate-600 navy:text-[#9BA1A6]">
              Вторая по силе рука в покере, уступающая лишь легендарному
              Роял-Флешу. Разбираем правила построения, математическую
              вероятность и скрытые нюансы разрешения споров на шоудауне.
            </p>
          </header>

          {/* Главная карточка комбинации */}
          <section className="bg-white navy:bg-[#1C2541] rounded-2xl shadow-sm border border-slate-200 navy:border-slate-800 p-6 mb-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <span className="bg-emerald-100 navy:bg-cyan-950 text-emerald-800 navy:text-cyan-300 font-bold px-3 py-1 rounded-md text-sm">
                  Ранг #2
                </span>
                <h2 className="text-xl font-bold">Что такое Стрит-Флеш?</h2>
              </div>
              <span className="text-sm text-slate-500 navy:text-slate-400 font-medium">
                Старше Каре / Уступает только Роял-Флешу
              </span>
            </div>

            <p className="mb-4">
              <strong>Стрит-Флеш (Straight Flush)</strong> — это элитная
              покерная рука, которая одновременно сочетает в себе свойства
              Стрита и Флеша. Она состоит из{" "}
              <strong>пяти последовательных карт строго одной масти</strong>.
            </p>

            {/* Визуализация карт (Черви) */}
            <div className="bg-slate-100 navy:bg-[#0B132B] rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-sm font-semibold text-slate-500 navy:text-slate-400">
                Пример (червовый Стрит-Флеш):
              </span>
              <div className="flex gap-2 text-xl sm:text-2xl font-mono font-bold tracking-wider">
                <span className="bg-white navy:bg-[#1C2541] px-3 py-1.5 rounded-lg shadow-sm text-red-500">
                  5♥️
                </span>
                <span className="bg-white navy:bg-[#1C2541] px-3 py-1.5 rounded-lg shadow-sm text-red-500">
                  6♥️
                </span>
                <span className="bg-white navy:bg-[#1C2541] px-3 py-1.5 rounded-lg shadow-sm text-red-500">
                  7♥️
                </span>
                <span className="bg-white navy:bg-[#1C2541] px-3 py-1.5 rounded-lg shadow-sm text-red-500">
                  8♥️
                </span>
                <span className="bg-white navy:bg-[#1C2541] px-3 py-1.5 rounded-lg shadow-sm text-red-500">
                  9♥️
                </span>
              </div>
            </div>
          </section>

          {/* Раздел: Роял-Флеш как частный случай */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 navy:text-white mb-4">
              Стрит-Флеш против Роял-Флеша
            </h2>
            <p className="mb-4">
              Математически <strong>Роял-Флеш (Royal Flush)</strong> не является
              отдельной комбинацией, это просто самый старший из возможных
              Стрит-Флешей — от десятки до Туза (
              <span className="font-mono bg-slate-200/60 navy:bg-[#0B132B] px-1 rounded font-bold text-red-500">
                10-J-Q-K-A
              </span>{" "}
              одинаковой масти). Из-за его абсолютной силы и культурного статуса
              его вынесли на первое место, оставив за обычным Стрит-Флешем все
              остальные одномастные последовательности.
            </p>

            {/* Пример со стальной пиковой мастью */}
            <div className="p-5 rounded-xl border border-slate-200 navy:border-slate-800 bg-white navy:bg-[#1C2541]">
              <h3 className="font-bold text-slate-900 navy:text-white mb-2">
                Младший Стрит-Флеш («Стальной ручей»)
              </h3>
              <p className="text-sm mb-3 text-slate-600 navy:text-slate-400">
                По аналогии с обычным Стритом, Туз может открывать комбинацию и
                считаться за единицу. Самый младший Стрит-Флеш называется
                «Стальным колесом» (Steel Wheel) и идет от Туза до пятерки.
              </p>
              <div className="font-mono font-bold text-sm bg-slate-50 navy:bg-[#0B132B] p-3 rounded text-center text-slate-900 navy:text-white flex justify-center gap-2">
                <span>5♠️</span> <span>4♠️</span> <span>3♠️</span> <span>2♠️</span>{" "}
                <span>A♠️</span>
              </div>
            </div>
          </section>

          {/* Раздел: Тай-брейки */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 navy:text-white mb-4">
              Правила разрешения споров (Тай-брейки)
            </h2>
            <p className="mb-4">
              Ситуации, когда два игрока за одним столом собирают Стрит-Флеш,
              происходят невероятно редко (особенно в Техасском Холдеме), но
              правила покера четко регламентируют финал такой раздачи:
            </p>

            <ul className="space-y-4 list-none pl-0 text-slate-700 navy:text-[#E0E1DD]">
              <li className="flex gap-3">
                <span className="text-emerald-500 navy:text-cyan-400 font-bold">
                  ✓
                </span>
                <span>
                  <strong>Старшинство по верхней карте:</strong> Если у двух
                  оппонентов Стрит-Флеш, выигрывает тот, у кого замыкающая карта
                  номинально выше. Например, Стрит-Флеш до Валета (
                  <span className="font-mono text-sm bg-slate-100 navy:bg-[#0B132B] px-1 rounded">
                    7-8-9-10-J
                  </span>
                  ) бьет Стрит-Флеш до девятки (
                  <span className="font-mono text-sm bg-slate-100 navy:bg-[#0B132B] px-1 rounded">
                    5-6-7-8-9
                  </span>
                  ).
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 navy:text-cyan-400 font-bold">
                  ✓
                </span>
                <span>
                  <strong>Кикер отсутствует:</strong> Так как комбинация
                  задействует все 5 карт без остатка, понятия «кикер» здесь нет.
                  Если у игроков одинаковый Стрит-Флеш (например, на общем столе
                  легли <span className="font-mono">6-7-8-9-10</span> бубей),
                  банк делится поровну между всеми участниками шоудауна. Личные
                  карты игроков в этом случае не имеют веса.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 navy:text-cyan-400 font-bold">
                  ✓
                </span>
                <span>
                  <strong>Масти абсолютно равны:</strong> Если в Омахе или
                  других редких вариациях покера два игрока собрали одинаковый
                  по номиналу Стрит-Флеш разных мастей (например, один пиковый
                  до Дамы, другой червовый до Дамы), они делят банк 50/50.
                </span>
              </li>
            </ul>
          </section>

          {/* Раздел: Математика */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 navy:text-white mb-4">
              Математическая вероятность сбора
            </h2>
            <p className="mb-4">
              Стрит-Флеш — желанная рука любого покериста из-за её невероятной
              математической редкости:
            </p>

            <div className="overflow-x-auto border border-slate-200 navy:border-slate-800 rounded-xl">
              <table className="w-full border-collapse text-left bg-white navy:bg-[#1C2541] text-sm">
                <thead className="bg-slate-100 navy:bg-[#0B132B] text-slate-700 navy:text-slate-300 font-semibold">
                  <tr>
                    <th className="p-4">Сценарий в Техасском Холдеме</th>
                    <th className="p-4">Вероятность в % / Шансы</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 navy:divide-slate-800">
                  <tr>
                    <td className="p-4 font-medium">
                      Собрать готовый Стрит-Флеш на флопе (с одномастными
                      коннекторами)
                    </td>
                    <td className="p-4 text-emerald-600 navy:text-cyan-400 font-bold">
                      0.002%
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">
                      Общий шанс собрать руку на ривере (из 7 случайных карт)
                    </td>
                    <td className="p-4 text-emerald-600 navy:text-cyan-400 font-bold">
                      0.0279% (1 из 3 590)
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">
                      Имея Стрит-Флеш Дро на флопе (например,{" "}
                      <span className="font-mono">6♥️ 7♥️ 8♥️ 9♥️</span>), достроить
                      его к риверу
                    </td>
                    <td className="p-4 text-emerald-600 navy:text-cyan-400 font-bold">
                      ~8.5% (2 аута)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Стратегический совет */}
          <footer className="p-6 rounded-2xl bg-emerald-50 navy:bg-[#1C2541] border border-emerald-200 navy:border-cyan-900/50">
            <h3 className="text-lg font-bold text-emerald-900 navy:text-cyan-400 mb-2">
              💡 Совет: Как разыгрывать монстр-руку
            </h3>
            <p className="text-sm text-emerald-950 navy:text-slate-300">
              Собрать Стрит-Флеш — это огромная удача, но ваша главная задача за
              столом — заставить оппонентов оплатить её. Никогда не играйте
              агрессивным «лид-бетом» или резким олл-ином, если у вас на руках
              Стрит-Флеш. Дайте соперникам со своей Тройкой, Стритом или обычным
              Флешем проявить инициативу. Используйте слоуплей (медленный
              розыгрыш) и чек-колл на ранних улицах, чтобы разогнать банк к
              риверу.
            </p>
          </footer>
        </article>
      </div>
      <Footer />
    </div>
  );
}
