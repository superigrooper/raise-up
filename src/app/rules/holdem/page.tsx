"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePokerStore } from "@/store/usePokerStore";
import getThemeClass from "@/utils/getThemeClass";
import { Theme } from "@/types/poker";
import Footer from "@/components/Footer";

export default function HoldemRules() {
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
          <h1 className="text-xl font-black">
            🃏 Безлимитный Техасский Холдем
          </h1>
          <Link
            href="/rules"
            className="text-sm font-bold text-[#e94560] hover:underline"
          >
            ◀ К списку
          </Link>
        </header>
        <article className="space-y-4 text-xs md:text-sm text-gray-600 navy:text-slate-300 leading-relaxed">
          <header className="border-b border-slate-200 navy:border-slate-700 pb-6 mb-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 navy:text-white tracking-tight mb-4">
              Правила Безлимитного Холдема
            </h1>
            <p className="text-lg text-slate-600 navy:text-[#9BA1A6]">
              Основы самой популярной покерной дисциплины в мире. Позиции за
              столом, механика обязательных ставок (блайндов) и правила игры на
              префлопе.
            </p>
          </header>

          {/* Раздел 1: Суть игры */}
          <section className="bg-white navy:bg-[#1C2541] rounded-2xl shadow-sm border border-slate-200 navy:border-slate-800 p-6 mb-8">
            <h2 className="text-xl font-bold mb-4 text-slate-900 navy:text-white flex items-center gap-2">
              <span className="bg-emerald-100 navy:bg-cyan-950 text-emerald-800 navy:text-cyan-300 font-bold px-2 py-0.5 rounded text-sm">
                Шаг 1
              </span>
              Цель и суть игры
            </h2>
            <p className="mb-4">
              В Техасском Холдеме каждому игроку сдается по{" "}
              <strong>две карманные карты (Hole Cards)</strong> в закрытую.
              Затем на стол поочередно выкладываются{" "}
              <strong>пять общих карт (Community Cards)</strong> в открытую.
            </p>
            <div className="p-4 rounded-xl bg-slate-100 navy:bg-[#0B132B] text-sm border-l-4 border-emerald-500">
              <strong>Главная задача: выиграть банк</strong>, собрав наилучшую
              пятикарточную комбинацию, используя любые доступные карты (свои
              карманные и общие со стола), либо заставить всех оппонентов
              сбросить карты в пас с помощью ставок.
            </div>
          </section>

          {/* Раздел 2: Позиции и Блайнды */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 navy:text-white mb-4">
              Позиции за столом и Обязательные ставки
            </h2>
            <p className="mb-4">
              Покер — игра позиционная. Очередность ходов привязана к фишке
              дилера, которая называется <strong>Баттон (Button / BTN)</strong>.
              Она перемещается по часовой стрелке после каждой раздачи.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="p-5 rounded-xl border border-slate-200 navy:border-slate-800 bg-white navy:bg-[#1C2541]">
                <h3 className="font-bold text-red-500 navy:text-red-400 mb-2">
                  Малый Блайнд (Small Blind / SB)
                </h3>
                <p className="text-sm text-slate-600 navy:text-slate-400">
                  Позиция сразу слева от Баттона. До раздачи карт игрок на SB
                  обязан внести в банк слепую ставку (обычно это половина
                  минимальной ставки).
                </p>
              </div>

              <div className="p-5 rounded-xl border border-slate-200 navy:border-slate-800 bg-white navy:bg-[#1C2541]">
                <h3 className="font-bold text-emerald-600 navy:text-cyan-400 mb-2">
                  Большой Блайнд (Big Blind / BB)
                </h3>
                <p className="text-sm text-slate-600 navy:text-slate-400">
                  Позиция слева от Малого Блайнда. Обязан внести полную слепую
                  ставку (в два раза больше, чем SB). Задает минимальный шаг для
                  торгов в раздаче.
                </p>
              </div>
            </div>
          </section>

          {/* Раздел 3: Префлоп */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 navy:text-white mb-4">
              Первый раунд торгов: Префлоп (Preflop)
            </h2>
            <p className="mb-4">
              После того как блайнды выставлены, дилер раздает всем по 2 карты
              рубашкой вверх. Начинается раунд торговли. Первым ходит игрок,
              сидящий слева от Большого Блайнда (эта позиция называется{" "}
              <em>Under the Gun / UTG</em>).
            </p>

            <div className="overflow-x-auto border border-slate-200 navy:border-slate-800 rounded-xl mb-4">
              <table className="w-full border-collapse text-left bg-white navy:bg-[#1C2541] text-sm">
                <thead className="bg-slate-100 navy:bg-[#0B132B] text-slate-700 navy:text-slate-300 font-semibold">
                  <tr>
                    <th className="p-4">Действие</th>
                    <th className="p-4">Что означает на практике</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 navy:divide-slate-800">
                  <tr>
                    <td className="p-4 font-bold text-red-600 navy:text-red-400">
                      Пас (Fold)
                    </td>
                    <td className="p-4 text-slate-600 navy:text-slate-300">
                      Сбросить карты и выйти из раздачи. Игрок теряет все фишки,
                      которые уже вложил в банк.
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-700 navy:text-slate-300">
                      Колл (Call)
                    </td>
                    <td className="p-4 text-slate-600 navy:text-slate-300">
                      Уравнять текущую максимальную ставку (на префлопе — внести
                      сумму равную BB).
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-emerald-600 navy:text-cyan-400">
                      Рейз (Raise)
                    </td>
                    <td className="p-4 text-slate-600 navy:text-slate-300">
                      Повысить ставку. Минимальный рейз на префлопе должен быть
                      как минимум в два раза больше BB.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-sm text-slate-500 navy:text-slate-400">
              Торги на префлопе идут по часовой стрелке до тех пор, пока все
              участники не внесут в банк одинаковое количество фишек. Последнее
              слово на префлопе всегда остается за игроком на Большом Блайнде
              (BB).
            </p>
          </section>
        </article>

        <article className="space-y-4 text-xs md:text-sm text-gray-600 navy:text-slate-300 leading-relaxed">
          <header className="border-b border-slate-200 navy:border-slate-700 pb-6 mb-8">
            <p className="text-lg text-slate-600 navy:text-[#9BA1A6]">
              Изучаем постфлоп-стадии. Особенности раундов Флоп, Терн и Ривер,
              правила хода «Чек» и условия финального раскрытия карт (Шоудаун).
            </p>
          </header>

          {/* Раздел 1: Улицы Постфлопа */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 navy:text-white mb-4">
              Улицы постфлопа (Postflop)
            </h2>
            <p className="mb-4">
              После завершения торгов на префлопе все фишки собираются в центр
              стола (Пот), а дилер начинает выкладывать общие карты. Начиная с
              флопа, очередность ходов меняется: **первым всегда ходит первый
              активный игрок, сидящий слева от Баттона** (обычно это SB или BB).
            </p>

            <div className="space-y-4">
              <div className="p-5 rounded-xl border border-slate-200 navy:border-slate-800 bg-white navy:bg-[#1C2541]">
                <h3 className="font-bold text-slate-900 navy:text-white mb-1">
                  1. Флоп (Flop)
                </h3>
                <p className="text-sm text-slate-600 navy:text-slate-400">
                  Дилер выкладывает на стол первые **три общие карты** лицом
                  вверх. У игроков появляется первая ясная картина их будущей
                  комбинации. Проводится второй раунд торгов. На этой стадии (и
                  далее) появляется опция <strong>Чек (Check)</strong> —
                  передать ход следующему игроку, не делая ставку, если до вас
                  никто не ставил.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-slate-200 navy:border-slate-800 bg-white navy:bg-[#1C2541]">
                <h3 className="font-bold text-slate-900 navy:text-white mb-1">
                  2. Терн (Turn)
                </h3>
                <p className="text-sm text-slate-600 navy:text-slate-400">
                  На доску выкладывается **четвертая общая карта**. Ситуация на
                  столе может резко измениться (например, закроется Стрит или
                  Флеш). Проводится третий раунд торгов по тем же правилам.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-slate-200 navy:border-slate-800 bg-white navy:bg-[#1C2541]">
                <h3 className="font-bold text-slate-900 navy:text-white mb-1">
                  3. Ривер (River)
                </h3>
                <p className="text-sm text-slate-600 navy:text-slate-400">
                  На стол ложится **пятая, финальная общая карта**. Больше карт
                  не будет. Формируются окончательные комбинации игроков.
                  Проводится четвертый, завершающий раунд торговли.
                </p>
              </div>
            </div>
          </section>

          {/* Раздел 2: Понятие Безлимитного покера */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 navy:text-white mb-4">
              Что значит «Безлимитный» (No-Limit)?
            </h2>
            <div className="p-5 rounded-xl bg-amber-50 navy:bg-amber-950/20 border-l-4 border-amber-500 text-sm text-amber-900 navy:text-amber-200">
              В безлимитных играх максимальный размер ставки ограничен только{" "}
              <strong>количеством фишек в вашем текущем стеке</strong>. В любой
              момент своего хода, когда объявлены торги, вы имеете право
              поставить все свои фишки в центр стола — сделать ставку{" "}
              <strong>Олл-ин (All-in)</strong>. Оппоненты не могут выбить вас из
              игры ставкой, превышающей ваш стек; в таком случае формируется
              побочный банк (Side Pot).
            </div>
          </section>

          {/* Раздел 3: Шоудаун */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 navy:text-white mb-4">
              Финал игры: Вскрытие карт (Showdown)
            </h2>
            <p className="mb-4">
              Если после финальных торгов на ривере в игре остались два или
              более соперников, наступает фаза раскрытия карт.
            </p>
            <ul className="space-y-3 list-none pl-0 text-slate-700 navy:text-[#E0E1DD]">
              <li className="flex gap-3">
                <span className="text-emerald-500 navy:text-cyan-400 font-bold">
                  ✓
                </span>
                <span>
                  Игроки показывают свои карманные карты, и система
                  автоматически собирает лучшую пятикарточную руку из 7
                  доступных карт.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 navy:text-cyan-400 font-bold">
                  ✓
                </span>
                <span>
                  Игрок с самой сильной покерной комбинацией (согласно
                  стандартной таблице рангов от Пара до Роял-Флеш) забирает весь
                  сформированный банк.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 navy:text-cyan-400 font-bold">
                  ✓
                </span>
                <span>
                  Если комбинации игроков абсолютно равны по силе и кикерам,
                  банк делится поровну между победителями.
                </span>
              </li>
            </ul>
          </section>

          {/* Стратегический совет */}
          <footer className="p-6 rounded-2xl bg-emerald-50 navy:bg-[#1C2541] border border-emerald-200 navy:border-cyan-900/50">
            <h3 className="text-lg font-bold text-emerald-900 navy:text-cyan-400 mb-2">
              💡 Альтернативный способ выиграть банк
            </h3>
            <p className="text-sm text-emerald-950 navy:text-slate-300">
              Помните, что доходить до стадии Шоудауна вовсе не обязательно.
              Если вы сделаете ставку на любой из улиц (Префлоп, Флоп, Терн или
              Ривер), и все остальные игроки за столом выбросят свои карты в пас
              (Fold), раздача мгновенно завершается. Вы автоматически
              признаетесь победителем и забираете банк, при этом вы{" "}
              <strong>имеете полное право не показывать свои карты</strong>{" "}
              соперникам. На этом правиле строится вся стратегия покерного
              блефа.
            </p>
          </footer>
        </article>
      </div>
      <Footer />
    </div>
  );
}
