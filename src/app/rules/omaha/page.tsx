"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePokerStore } from "@/store/usePokerStore";
import getThemeClass from "@/utils/getThemeClass";
import { Theme } from "@/types/poker";
import Footer from "@/components/Footer";

export default function OmahaRules() {
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
          <h1 className="text-xl font-black">🍇 Пот-Лимит Омаха (PLO)</h1>
          <Link
            href="/rules"
            className="text-sm font-bold text-[#e94560] hover:underline"
          >
            ◀ К списку
          </Link>
        </header>
        <article className="space-y-4 text-xs md:text-sm text-gray-600 navy:text-slate-300 leading-relaxed">
          {/* Заголовок страницы */}
          <header className="border-b border-slate-200 navy:border-slate-700 pb-6 mb-8">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 navy:text-white tracking-tight mb-4">
              Правила Пот-Лимитной Омахи (PLO)
            </h2>
            <p className="text-lg text-slate-600 navy:text-[#9BA1A6]">
              Вторая по популярности покерная дисциплина в мире. Узнайте главные
              отличия от Холдема, золотое «правило двух карт» и механику расчета
              пот-лимитных ставок.
            </p>
          </header>

          {/* Раздел 1: Главное отличие */}
          <section className="bg-white navy:bg-[#1C2541] rounded-2xl shadow-sm border border-slate-200 navy:border-slate-800 p-6 mb-8">
            <h2 className="text-xl font-bold mb-4 text-slate-900 navy:text-white flex items-center gap-2">
              <span className="bg-emerald-100 navy:bg-cyan-950 text-emerald-800 navy:text-cyan-300 font-bold px-2 py-0.5 rounded text-sm">
                Отличие #1
              </span>
              Четыре карты на руках вместо двух
            </h2>
            <p className="mb-4">
              В Омахе каждому игроку на префлопе сдается{" "}
              <strong>четыре карманные карты (Hole Cards)</strong> в закрытую.
              На стол, как и в Холдеме, выкладываются пять общих карт. Раунды
              торговли проходят по тем же улицам: Префлоп, Флоп, Терн и Ривер.
            </p>
            <div className="p-4 rounded-xl bg-slate-100 navy:bg-[#0B132B] text-sm border-l-4 border-emerald-500">
              <strong>Количество эквити:</strong> Из-за наличия четырех карт на
              руках у каждого игрока за столом генерируется в разы больше
              комбинаций и дро-рук. Средняя сила выигрышных комбинаций на
              вскрытии в Омахе значительно выше, чем в Холдеме.
            </div>
          </section>

          {/* Раздел 2: Главное и коварное правило Омахи */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 navy:text-white mb-4">
              Жесткое правило составления комбинаций
            </h2>
            <p className="mb-4">
              Это главный камень преткновения для всех новичков, переходящих из
              Техасского Холдема. Запомните его раз и навсегда:
            </p>

            <div className="p-6 rounded-2xl bg-amber-50 navy:bg-amber-950/20 border border-amber-200 navy:border-amber-900/50 mb-6">
              <h3 className="text-lg font-bold text-amber-900 navy:text-amber-200 mb-2">
                Правило «2 из руки + 3 со стола»
              </h3>
              <p className="text-sm leading-relaxed text-amber-950 navy:text-slate-300">
                Вы обязаны составить свою финальную пятикарточную комбинацию,
                используя{" "}
                <strong>строго две (и только две) карты из руки</strong> и{" "}
                <strong>строго три (и только три) карты с общего стола</strong>.
                Ни больше, ни меньше.
              </p>
            </div>

            {/* Пример ловушки для новичка */}
            <div className="p-5 rounded-xl border border-slate-200 navy:border-slate-800 bg-white navy:bg-[#1C2541]">
              <h3 className="font-bold text-red-500 navy:text-red-400 mb-2">
                ❌ Классическая ловушка для новичков
              </h3>
              <p className="text-sm mb-3 text-slate-600 navy:text-slate-400">
                На доске лежат 4 пиковые карты:{" "}
                <span className="font-mono bg-slate-100 dark:bg-slate-900 p-0.5 rounded">
                  A♠️ - K♠️ - 8♠️ - 2♠️ - J♣️
                </span>
                .
                <br />У вас на руках одна пиковая карта:{" "}
                <span className="font-mono bg-slate-100 dark:bg-slate-900 p-0.5 rounded">
                  Q♠️ - 10♣️ - 7♥️ - 4♦️
                </span>
                .
              </p>
              <p className="text-sm text-slate-700 navy:text-[#E0E1DD]">
                В Холдеме у вас был бы Флеш со старшей Дамой.{" "}
                <strong>В Омахе у вас НЕТ Флеша!</strong> Вы не можете взять
                четыре карты пик со стола и одну из руки. Вам обязательно нужно
                задействовать две карты из руки. В этой раздаче у вас будет лишь
                Старшая карта или Пара.
              </p>
            </div>
          </section>

          {/* Раздел 3: Пот-Лимит формат */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 navy:text-white mb-4">
              Формат Пот-Лимит (Pot-Limit)
            </h2>
            <p className="mb-4">
              В отличие от Безлимитного Холдема, в PLO вы не можете объявить
              «Олл-ин» в любой момент, если размер вашего стека превышает
              текущий размер банка. Максимальный размер ставки ограничен
              **текущим размером общего банка**.
            </p>

            <div className="overflow-x-auto border border-slate-200 navy:border-slate-800 rounded-xl mb-4">
              <table className="w-full border-collapse text-left bg-white navy:bg-[#1C2541] text-sm">
                <thead className="bg-slate-100 navy:bg-[#0B132B] text-slate-700 navy:text-slate-300 font-semibold">
                  <tr>
                    <th className="p-4">Понятие</th>
                    <th className="p-4">
                      Как рассчитывается максимальный рейз «в размер банка»
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 navy:divide-slate-800">
                  <tr>
                    <td className="p-4 font-bold text-emerald-600 navy:text-cyan-400">
                      Формула Пота
                    </td>
                    <td className="p-4 text-slate-600 navy:text-slate-300">
                      Сумма всех фишек в центре стола + все ставки на текущей
                      улице + сумма вашего колла, которую вы должны внести перед
                      повышением.
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-700 navy:text-slate-300">
                      Пример расчета
                    </td>
                    <td className="p-4 text-slate-600 navy:text-slate-300">
                      В банке $100. Оппонент делает ставку $50. Общий банк стал
                      $150. Если вы хотите сделать максимальный рейз (Pot), вы
                      мысленно доставляете $50 (колл), банк становится $200. Ваш
                      максимальный рейз составит: $50 (ваш колл) + $200 (новый
                      банк) = <strong>$250</strong>.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Раздел 4: Стартовые руки */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 navy:text-white mb-4">
              Специфика стартовых рук
            </h2>
            <p className="mb-4">
              В Омахе ценятся руки, где все 4 карты связаны между собой по
              номиналу или масти:
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 navy:border-slate-800 bg-white navy:bg-[#1C2541]">
                <h4 className="font-bold text-emerald-600 navy:text-cyan-400 mb-1">
                  Двумастные руки (Double-Suited)
                </h4>
                <p className="text-xs text-slate-600 navy:text-slate-400">
                  Лучшие стартеры имеют формат{" "}
                  <span className="font-mono">A♠️ K♠️ Q♥️ J♥️</span>. Это дает вам
                  сразу две возможности собрать старший Флеш.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 navy:border-slate-800 bg-white navy:bg-[#1C2541]">
                <h4 className="font-bold text-red-500 navy:text-red-400 mb-1">
                  Опасность трех/четырех карт одной масти
                </h4>
                <p className="text-xs text-slate-600 navy:text-slate-400">
                  Рука вроде <span className="font-mono">A♠️ Q♠️ 10♠️ 2♠️</span> на
                  самом деле слабее, так как вы «сжигаете» свои собственные ауты
                  на Флеш.
                </p>
              </div>
            </div>
          </section>

          {/* Стратегический совет */}
          <footer className="p-6 rounded-2xl bg-emerald-50 navy:bg-[#1C2541] border border-emerald-200 navy:border-cyan-900/50">
            <h3 className="text-lg font-bold text-emerald-900 navy:text-cyan-400 mb-2">
              💡 Ключевой совет школы покера по PLO
            </h3>
            <p className="text-sm text-emerald-950 navy:text-slate-300">
              В Омахе никогда не переоценивайте «голые» младшие стриты или флеши
              без дополнительных дро-возможностей. Если в Холдеме обычный Флеш
              со старшей девяткой почти всегда приносит победу, то в PLO на
              вскрытии у кого-то из оппонентов с колоссальной вероятностью
              окажется Флеш старше вашего (по Королю или Тузу). Играйте в Омахе
              строго на «натсовые» (абсолютно лучшие) комбинации.
            </p>
          </footer>
        </article>
      </div>
      <Footer />
    </div>
  );
}
