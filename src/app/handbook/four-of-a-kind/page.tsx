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
            Комбинация Каре (Four of a Kind) в покере
          </h1>
          <p className="text-lg text-slate-600 navy:text-[#9BA1A6]">
            Третья по силе монстр-рука, сокрушающая Фулл-Хаусы и Флеши. Разбираем правила составления, важнейшую роль кикера при совпадениях и математические шансы на победу.
          </p>
        </header>

        {/* Главная карточка комбинации */}
        <section className="bg-white navy:bg-[#1C2541] rounded-2xl shadow-sm border border-slate-200 navy:border-slate-800 p-6 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <span className="bg-emerald-100 navy:bg-cyan-950 text-emerald-800 navy:text-cyan-300 font-bold px-3 py-1 rounded-md text-sm">
                Ранг #3
              </span>
              <h2 className="text-xl font-bold">Что такое Каре?</h2>
            </div>
            <span className="text-sm text-slate-500 navy:text-slate-400 font-medium">
              Старше Фулл-Хауса / Уступает только Стрит-Флешу
            </span>
          </div>
          
          <p className="mb-4">
            <strong>Каре (Four of a Kind / Quads)</strong> — это комбинация, которая состоит из <strong>четырех карт одного номинала</strong> и одной дополнительной пятой карты, называемой <strong>кикером</strong>. Масти четырех основных карт всегда уникальны и представляют весь комплект колоды (♠️, ♥️, ♦️, ♣️).
          </p>

          {/* Визуализация карт (Каре Дам с Тузом) */}
          <div className="bg-slate-100 navy:bg-[#0B132B] rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-sm font-semibold text-slate-500 navy:text-slate-400">Пример (Каре Дам со старшим кикером):</span>
            <div className="flex gap-2 text-xl sm:text-2xl font-mono font-bold tracking-wider">
              <span className="bg-white navy:bg-[#1C2541] px-3 py-1.5 rounded-lg shadow-sm text-slate-900 navy:text-white">Q♠️</span>
              <span className="bg-white navy:bg-[#1C2541] px-3 py-1.5 rounded-lg shadow-sm text-red-500">Q♥️</span>
              <span className="bg-white navy:bg-[#1C2541] px-3 py-1.5 rounded-lg shadow-sm text-red-500">Q♦️</span>
              <span className="bg-white navy:bg-[#1C2541] px-3 py-1.5 rounded-lg shadow-sm text-slate-900 navy:text-white">Q♣️</span>
              <span className="bg-white navy:bg-[#1C2541] px-3 py-1.5 rounded-lg shadow-sm text-red-500 border border-emerald-400 dark:border-cyan-500">A♥️</span>
            </div>
          </div>
        </section>

        {/* Раздел: Роль кикера */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 navy:text-white mb-4">Когда кикер решает всё</h2>
          <p className="mb-4">
            Поскольку итоговая покерная рука всегда формируется ровно из 5 карт, при составлении Каре свободное пятое место занимает **кикер**. В большинстве раздач номинал Каре у игроков отличается, но бывают ситуации, когда кикер становится единственным фактором победы.
          </p>

          {/* Пример с общим каре */}
          <div className="p-5 rounded-xl border border-slate-200 navy:border-slate-800 bg-white navy:bg-[#1C2541]">
            <h3 className="font-bold text-amber-700 navy:text-amber-400 mb-2">Ситуация: Каре на общем столе (Борде)</h3>
            <p className="text-sm mb-3 text-slate-600 navy:text-slate-400">
              Представьте, что на стол вышли карты: <span className="font-mono bg-slate-100 dark:bg-slate-900 p-0.5 rounded">8-8-8-8-K</span>. У всех игроков автоматически собрано Каре восьмерок. 
            </p>
            <ul className="text-sm space-y-2 list-disc pl-5 text-slate-700 navy:text-[#E0E1DD]">
              <li>Если у <strong>Игрока 1</strong> в карманных картах есть <span className="font-mono font-bold text-red-500">A♦️</span>, его пятикарточная рука: <span className="font-mono">8-8-8-8-A</span>.</li>
              <li>Общий Король (<span className="font-mono">K</span>) со стола вытесняется более сильным Тузом из руки.</li>
              <li><strong>Игрок 1 побеждает</strong>, так как его кикер (Туз) старше общего кикера (Короля) и кикеров других соперников.</li>
            </ul>
          </div>
        </section>

        {/* Раздел: Тай-брейки */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 navy:text-white mb-4">Правила разрешения споров (Тай-брейки)</h2>
          
          <ul className="space-y-4 list-none pl-0 text-slate-700 navy:text-[#E0E1DD]">
            <li className="flex gap-3">
              <span className="text-emerald-500 navy:text-cyan-400 font-bold">✓</span>
              <span><strong>Номинал самого Каре:</strong> Если у двух игроков разные Каре (часто встречается в Омахе), побеждает тот, чей номинал выше. Каре Королей (<span className="font-mono text-sm bg-slate-100 navy:bg-[#0B132B] px-1 rounded">K-K-K-K-x</span>) всегда бьет Каре Дам (<span className="font-mono text-sm bg-slate-100 navy:bg-[#0B132B] px-1 rounded">Q-Q-Q-Q-x</span>).</span>
            </li>
            <li className="flex gap-3">
              <span className="text-emerald-500 navy:text-cyan-400 font-bold">✓</span>
              <span><strong>Старшинство кикера:</strong> Если номинал Каре одинаковый (лежит на доске), выигрывает обладатель самой старшей пятой карты.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-emerald-500 navy:text-cyan-400 font-bold">✓</span>
              <span><strong>Полное равенство (Chop-Chop):</strong> Если Каре на доске, а у оставшихся в игре соперников карманные карты младше пятой карты стола, то кикером для всех становится карта борда. Банк делится поровну.</span>
            </li>
          </ul>
        </section>

        {/* Раздел: Математика */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 navy:text-white mb-4">Математическая вероятность сбора</h2>
          <p className="mb-4">Вероятность получить четыре карты одного достоинства крайне мала, что делает Каре практически гарантированным залогом победы в раздаче:</p>
          
          <div className="overflow-x-auto border border-slate-200 navy:border-slate-800 rounded-xl">
            <table className="w-full border-collapse text-left bg-white navy:bg-[#1C2541] text-sm">
              <thead className="bg-slate-100 navy:bg-[#0B132B] text-slate-700 navy:text-slate-300 font-semibold">
                <tr>
                  <th className="p-4">Игровой этап (Техасский Холдем)</th>
                  <th className="p-4">Вероятность</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 navy:divide-slate-800">
                <tr>
                  <td className="p-4 font-medium">Общая вероятность собрать Каре на ривере (из 7 доступных карт)</td>
                  <td className="p-4 text-emerald-600 navy:text-cyan-400 font-bold">0.168% (1 шанс из 595)</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium">Поймать Каре на флопе, имея карманную пару (например, J-J)</td>
                  <td className="p-4 text-emerald-600 navy:text-cyan-400 font-bold">0.25% (2 аута)</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium">Усилить Тройку (Сет) с флопа до Каре к моменту ривера</td>
                  <td className="p-4 text-emerald-600 navy:text-cyan-400 font-bold">~4.3%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Стратегический совет */}
        <footer className="p-6 rounded-2xl bg-emerald-50 navy:bg-[#1C2541] border border-emerald-200 navy:border-cyan-900/50">
          <h3 className="text-lg font-bold text-emerald-900 navy:text-cyan-400 mb-2">💡 Совет школы покера: Опасность Бад-Бита (Bad Beat)</h3>
          <p className="text-sm text-emerald-950 navy:text-slate-300">
            Собрать Каре — заветная мечта, но помните о существовании «Бад-Бита», когда ваша сильнейшая рука проигрывает еще более редкой комбинации (Стрит-Флешу или более высокому Каре). Если у вас Каре на руках (например, вы держите <span className="font-mono">9-9</span> на борде <span className="font-mono">9-9-10-J-Q</span>), будьте внимательны к агрессии соперника. Наличие на столе потенциальных Стрит-Флешей требует взвешенных решений, хотя в 99.9% случаев вы заберете банк. Многие покер-румы выплачивают огромный накопительный Bad Beat Jackpot игрокам, проигравшим с комбинацией от Каре валетов и старше.
          </p>
        </footer>

        </article>
      </div>
      <Footer />
    </div>
  );
}
