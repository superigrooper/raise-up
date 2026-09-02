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
          <h1 className="text-xl font-black">🐴 Семикарточный Стад (Stud)</h1>
          <Link
            href="/rules"
            className="text-sm font-bold text-[#e94560] hover:underline"
          >
            ◀ К списку
          </Link>
        </header>
        <article className="space-y-4 text-xs md:text-sm text-gray-600 navy:text-slate-300 leading-relaxed">
        <header className="border-b border-slate-200 navy:border-slate-700 pb-6 mb-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 navy:text-white tracking-tight mb-4">
            Правила 7-карточного Стада (7-Card Stud)
          </h2>
          <p className="text-lg text-slate-600 navy:text-[#9BA1A6]">
            Классика дохолдемной эпохи. Узнайте, как играть без общих карт, зачем нужен Бринг-ин и как правильно использовать открытую информацию о картах соперников.
          </p>
        </header>

        {/* Раздел 1: Главное отличие */}
        <section className="bg-white navy:bg-[#1C2541] rounded-2xl shadow-sm border border-slate-200 navy:border-slate-800 p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-slate-900 navy:text-white flex items-center gap-2">
            <span className="bg-emerald-100 navy:bg-cyan-950 text-emerald-800 navy:text-cyan-300 font-bold px-2 py-0.5 rounded text-sm">Отличие #1</span>
            Никаких общих карт и блайндов
          </h2>
          <p className="mb-4">
            В отличие от Холдема и Омахи, в Стаде <strong>нет общих карт на столе</strong>. Каждому игроку на протяжении раздачи сдается индивидуальный набор из <strong>7 карт</strong>: часть из них видны только владельцу (закрытые), а часть лежат лицом вверх (открытые) для всего стола.
          </p>
          <div className="p-4 rounded-xl bg-slate-100 navy:bg-[#0B132B] text-sm border-l-4 border-emerald-500">
            <strong>Правило пяти карт:</strong> Из 7 полученных карт к моменту финального вскрытия вам нужно выбрать 5, которые образуют наилучшую стандартную комбинацию. Позиция дилера (Баттон) в Стаде отсутствует; порядок ходов меняется каждую улицу.
          </div>
        </section>

        {/* Раздел 2: Механика раздачи по улицам */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 navy:text-white mb-4">Этапы раздачи (Улицы)</h2>
          <p className="mb-4">Игровой процесс в Стаде делится на строго регламентированные раунды:</p>

          <div className="space-y-4">
            {/* 3-я улица */}
            <div className="p-5 rounded-xl border border-slate-200 navy:border-slate-800 bg-white navy:bg-[#1C2541]">
              <h3 className="font-bold text-slate-900 navy:text-white mb-1">3-я улица (Старт раздачи)</h3>
              <p className="text-sm text-slate-600 navy:text-slate-400 mb-2">
                Все игроки ставят обязательную небольшую ставку — <strong>Анте (Ante)</strong>. Дилер сдает каждому по <strong>3 карты</strong>: две в закрытую (рубашкой вверх) и одну в открытую (лицом вверх).
              </p>
              <div className="p-3 rounded-lg bg-amber-50 navy:bg-amber-950/20 text-xs text-amber-900 navy:text-amber-200">
                <strong>Специфика торгов (Бринг-ин):</strong> Игрок с самой <strong>младшей открытой картой</strong> обязан сделать вынужденную ставку — <strong>Бринг-ин (Bring-in)</strong>. Если номиналы равны, младший определяется по масти (от слабой к сильной: трефы ♣️, бубны ♦️, черви ♥️, пики ♠️). Далее торги идут по часовой стрелке.
              </div>
            </div>

            {/* 4-я, 5-я и 6-я улицы */}
            <div className="p-5 rounded-xl border border-slate-200 navy:border-slate-800 bg-white navy:bg-[#1C2541]">
              <h3 className="font-bold text-slate-900 navy:text-white mb-1">4-я, 5-я и 6-я улицы (Развитие руки)</h3>
              <p className="text-sm text-slate-600 navy:text-slate-400">
                В каждом из этих раундов дилер сдает оставшимся в игре участникам по <strong>одной открытой карте</strong>. После каждой новой карты проводятся торги. 
                <br />
                <span className="inline-block mt-2 italic font-semibold text-emerald-600 navy:text-cyan-400">
                  Важно: Начиная с 4-й улицы, первым всегда ходит тот игрок, у которого открытые карты на столе образуют самую сильную комбинацию.
                </span>
              </p>
            </div>

            {/* 7-я улица */}
            <div className="p-5 rounded-xl border border-slate-200 navy:border-slate-800 bg-white navy:bg-[#1C2541]">
              <h3 className="font-bold text-slate-900 navy:text-white mb-1">7-я улица (Финальный аккорд)</h3>
              <p className="text-sm text-slate-600 navy:text-slate-400">
                Каждому сдается последняя, **седьмая карта в закрытую**. Игроки проводят финальный раунд торгов и переходят к шоудауну (вскрытию). В итоге у каждого на руках: 3 закрытых и 4 открытых карты.
              </p>
            </div>
          </div>
        </section>

        {/* Раздел 3: Фиксированный лимит */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 navy:text-white mb-4">Лимитная структура ставок (Fixed Limit)</h2>
          <p className="mb-4">
            В 7-карточный Стад чаще всего играют с фиксированным лимитом ставок. Ставки привязаны к размеру стола (например, лимит $10/$20):
          </p>

          <div className="overflow-x-auto border border-slate-200 navy:border-slate-800 rounded-xl mb-4">
            <table className="w-full border-collapse text-left bg-white navy:bg-[#1C2541] text-sm">
              <thead className="bg-slate-100 navy:bg-[#0B132B] text-slate-700 navy:text-slate-300 font-semibold">
                <tr>
                  <th className="p-4">Этап торгов</th>
                  <th className="p-4">Правило размера ставки</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 navy:divide-slate-800">
                <tr>
                  <td className="p-4 font-bold text-slate-900 navy:text-white">3-я и 4-я улицы</td>
                  <td className="p-4 text-slate-600 navy:text-slate-300">
                    Все ставки и рейзы должны быть равны **малой ставке** лимита (в нашем примере — строго $10).
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-slate-900 navy:text-white">5-я, 6-я и 7-я улицы</td>
                  <td className="p-4 text-slate-600 navy:text-slate-300">
                    Шаг торгов удваивается и становится равен **большой ставке** лимита (строго $20 за шаг).
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-slate-900 navy:text-white">Лимит повышений (Cap)</td>
                  <td className="p-4 text-slate-600 navy:text-slate-300">
                    В каждом раунде торгов разрешено сделать не более 1 ставки и 3 повышений (рейзов). После этого торги «капуются», и игроки могут только коллировать или пасовать.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Стратегический совет */}
        <footer className="p-6 rounded-2xl bg-emerald-50 navy:bg-[#1C2541] border border-emerald-200 navy:border-cyan-900/50">
          <h3 className="text-lg font-bold text-emerald-900 navy:text-cyan-400 mb-2">💡 Ключевой навык для победы в Стаде: Внимательность</h3>
          <p className="text-sm text-emerald-950 navy:text-slate-300">
            Главный секрет профессиональной игры в Стад — это **подсчет «мертвых» карт**. Вы обязаны внимательно следить за открытыми картами всех соперников за столом, особенно за теми, кто сбрасывает руки в пас. Например, если вам для сбора Флеша нужна пиковая карта, а вы видите, что три пиковые карты уже были открыты у сбросивших карты игроков, вероятность закрыть ваше дро резко падает. Игрок, умеющий запоминать вышедшие из игры карты, получает колоссальное математическое преимущество.
          </p>
        </footer>
        </article>
      </div>
      <Footer />
    </div>
  );
}
