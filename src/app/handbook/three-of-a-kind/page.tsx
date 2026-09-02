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
              Тройка, Сет и Трипс в покере: В чем разница?
            </h1>
            <p className="text-lg text-slate-600 navy:text-[#9BA1A6]">
              Седьмая по силе покерная рука. Разбираем фундаментальное различие
              между понятиями «Сет» и «Трипс», правила оценки кикеров и
              математические шансы на сбор комбинации.
            </p>
          </header>

          {/* Главная карточка комбинации */}
          <section className="bg-white navy:bg-[#1C2541] rounded-2xl shadow-sm border border-slate-200 navy:border-slate-800 p-6 mb-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <span className="bg-emerald-100 navy:bg-cyan-950 text-emerald-800 navy:text-cyan-300 font-bold px-3 py-1 rounded-md text-sm">
                  Ранг #7
                </span>
                <h2 className="text-xl font-bold">
                  Что такое Тройка (Three of a Kind)?
                </h2>
              </div>
              <span className="text-sm text-slate-500 navy:text-slate-400 font-medium">
                Старше Двух пар / Уступает Стриту
              </span>
            </div>

            <p className="mb-4">
              <strong>Тройка (Three of a Kind / Сет / Трипс)</strong> — это
              комбинация, состоящая из{" "}
              <strong>трех карт одного номинала</strong> и двух дополнительных
              карт (кикеров). В зависимости от того, каким именно образом карты
              сочетаются с общим столом (бордом), тройка разделяется на два
              важнейших стратегических типа: **Сет** и **Трипс**.
            </p>

            {/* Визуализация карт (Тройка Валетов) */}
            <div className="bg-slate-100 navy:bg-[#0B132B] rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-sm font-semibold text-slate-500 navy:text-slate-400">
                Пример (Тройка Валетов со старшим кикером Тузом):
              </span>
              <div className="flex gap-2 text-xl sm:text-2xl font-mono font-bold tracking-wider">
                <span className="bg-white navy:bg-[#1C2541] px-3 py-1.5 rounded-lg shadow-sm text-slate-900 navy:text-white">
                  J♠️
                </span>
                <span className="bg-white navy:bg-[#1C2541] px-3 py-1.5 rounded-lg shadow-sm text-red-500">
                  J♥️
                </span>
                <span className="bg-white navy:bg-[#1C2541] px-3 py-1.5 rounded-lg shadow-sm text-red-500">
                  J♦️
                </span>
                <span className="border-l border-slate-300 navy:border-slate-700 pl-2 flex gap-2">
                  <span className="bg-white navy:bg-[#1C2541] px-3 py-1.5 rounded-lg shadow-sm text-red-500">
                    A♥️
                  </span>
                  <span className="bg-white navy:bg-[#1C2541] px-3 py-1.5 rounded-lg shadow-sm text-slate-900 navy:text-white">
                    5♣️
                  </span>
                </span>
              </div>
            </div>
          </section>

          {/* Раздел: Сет против Трипса */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 navy:text-white mb-4">
              Принципиальное отличие: Сет vs Трипс
            </h2>
            <p className="mb-4">
              Хотя на вскрытии обе руки имеют абсолютно одинаковую силу, в
              процессе торгов они разыгрываются совершенно по-разному из-за
              степени скрытности комбинации:
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl border border-slate-200 navy:border-slate-800 bg-white navy:bg-[#1C2541]">
                <h3 className="font-bold text-emerald-700 navy:text-cyan-400 mb-2">
                  1. Сет (Set)
                </h3>
                <p className="text-sm text-slate-600 navy:text-slate-400 mb-3">
                  Вы держите в руках **карманную пару**, а третья карта такого
                  же номинала выходит на общий стол.
                </p>
                <div className="text-xs space-y-1 bg-slate-50 navy:bg-[#0B132B] p-3 rounded">
                  <div>
                    <span className="font-semibold">Ваши карты:</span>{" "}
                    <span className="font-mono">7♣️ 7♦️</span>
                  </div>
                  <div>
                    <span className="font-semibold">Стол (Флоп):</span>{" "}
                    <span className="font-mono">7♠️ K♥️ 2♣️</span>
                  </div>
                  <div className="text-emerald-600 dark:text-cyan-400 font-medium mt-1">
                    Итог: Скрытая, мощная ловушка для оппонента.
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-xl border border-slate-200 navy:border-slate-800 bg-white navy:bg-[#1C2541]">
                <h3 className="font-bold text-amber-700 navy:text-amber-400 mb-2">
                  2. Трипс (Trips)
                </h3>
                <p className="text-sm text-slate-600 navy:text-slate-400 mb-3">
                  На общем столе лежит **пара одинаковых карт**, а третья карта
                  находится у вас в руке.
                </p>
                <div className="text-xs space-y-1 bg-slate-50 navy:bg-[#0B132B] p-3 rounded">
                  <div>
                    <span className="font-semibold">Ваши карты:</span>{" "}
                    <span className="font-mono">A♠️ J♣️</span>
                  </div>
                  <div>
                    <span className="font-semibold">Стол (Флоп):</span>{" "}
                    <span className="font-mono">J♥️ J♦️ 4♠️</span>
                  </div>
                  <div className="text-amber-600 dark:text-amber-400 font-medium mt-1">
                    Итог: Очевидная рука. Оппоненты видят пару и играют
                    осторожно.
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Раздел: Тай-брейки */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 navy:text-white mb-4">
              Правила разрешения споров (Тай-брейки)
            </h2>
            <p className="mb-4">
              При совпадении Тройки у нескольких игроков (что регулярно
              случается в ситуациях с Трипсом), победитель определяется по
              следующим критериям:
            </p>

            <div className="p-5 rounded-xl border border-slate-200 navy:border-slate-800 bg-white navy:bg-[#1C2541] space-y-4">
              <div>
                <h3 className="font-bold text-slate-900 navy:text-white text-base mb-1">
                  1. Ранг самой Тройки
                </h3>
                <p className="text-sm text-slate-600 navy:text-slate-400">
                  Побеждает игрок с более высоким номиналом карт в тройке.
                  Тройка Дам (
                  <span className="font-mono bg-slate-100 navy:bg-[#0B132B] px-1 rounded">
                    Q-Q-Q-x-x
                  </span>
                  ) безоговорочно сильнее тройки Десяток (
                  <span className="font-mono bg-slate-100 navy:bg-[#0B132B] px-1 rounded">
                    10-10-10-x-x
                  </span>
                  ).
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 navy:text-white text-base mb-1">
                  2. Первый (старший) кикер
                </h3>
                <p className="text-sm text-slate-600 navy:text-slate-400">
                  Если у игроков одинаковый Трипс (например, на столе лежат{" "}
                  <span className="font-mono">9-9-2</span>, а у обоих игроков по
                  девятке), оценивается их первая старшая свободная карта.
                  <br />
                  <span className="italic font-semibold text-emerald-600 navy:text-cyan-400">
                    Рука{" "}
                    <span className="font-mono bg-slate-100 navy:bg-[#0B132B] px-1 rounded">
                      9-9-9 + A-5
                    </span>{" "}
                    бьет руку{" "}
                    <span className="font-mono bg-slate-100 navy:bg-[#0B132B] px-1 rounded">
                      9-9-9 + K-Q
                    </span>
                    , так как Туз (A) старше Короля (K).
                  </span>
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 navy:text-white text-base mb-1">
                  3. Второй кикер
                </h3>
                <p className="text-sm text-slate-600 navy:text-slate-400">
                  Если первые кикеры равны, сравниваются вторые кикеры (пятая
                  карта руки). Если и они полностью совпадают по номиналу, банк
                  делится поровну.
                </p>
              </div>
            </div>
          </section>

          {/* Раздел: Математика */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 navy:text-white mb-4">
              Теория вероятностей: Попадание в Тройку
            </h2>
            <p className="mb-4">
              Понимание математики сетов — основа успешной игры на префлопе с
              карманными парами (так называемый «сет-майнинг»):
            </p>

            <div className="overflow-x-auto border border-slate-200 navy:border-slate-800 rounded-xl">
              <table className="w-full border-collapse text-left bg-white navy:bg-[#1C2541] text-sm">
                <thead className="bg-slate-100 navy:bg-[#0B132B] text-slate-700 navy:text-slate-300 font-semibold">
                  <tr>
                    <th className="p-4">
                      Математический сценарий (Техасский Холдем)
                    </th>
                    <th className="p-4">Вероятность (%)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 navy:divide-slate-800">
                  <tr>
                    <td className="p-4 font-medium">
                      Общий шанс собрать Тройку на ривере (из 7 случайных карт)
                    </td>
                    <td className="p-4 text-emerald-600 navy:text-cyan-400 font-bold">
                      4.83%
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">
                      Поймать Сет на флопе, имея карманную пару (шанс 1 к 8)
                    </td>
                    <td className="p-4 text-emerald-600 navy:text-cyan-400 font-bold">
                      11.8%
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">
                      Поймать Трипс на флопе с двумя некорневыми картами
                      (например, A-K)
                    </td>
                    <td className="p-4 text-emerald-600 navy:text-cyan-400 font-bold">
                      1.35%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <footer className="p-6 rounded-2xl bg-emerald-50 navy:bg-[#1C2541] border border-emerald-200 navy:border-cyan-900/50">
            <h3 className="text-lg font-bold text-emerald-900 navy:text-cyan-400 mb-2">
              💡 Совет школы покера: Коварство Трипса со слабым кикером
            </h3>
            <p className="text-sm text-emerald-950 navy:text-slate-300">
              Главная ловушка для новичков — это розыгрыш Трипса со слабым
              кикером. Если вы зашли в раздачу с картами K♣️ 4♣️, а на флоп вышли
              K♥ K♦️ 8♠️, радоваться рано. У вас Трипс королей, но ваш кикер —
              четверка. Если у любого другого соперника окажется король с более
              высокой картой (например, K-Q или K-10), вы проиграете огромный
              стек. Именно поэтому Сет (на карманной паре) разыгрывать гораздо
              выгоднее и безопаснее, чем Трипс.
            </p>
          </footer>
        </article>
      </div>
      <Footer />
    </div>
  );
}
