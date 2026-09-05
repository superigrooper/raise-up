"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePokerStore } from "@/store/usePokerStore";
import getThemeClass from "@/utils/getThemeClass";
import { Theme } from "@/types/poker";
import Footer from "@/components/Footer";
import { Tab } from "@/types/poker";
import { combinations } from "@/db/combinations";
import { positionCharts } from "@/db/positionCharts";
import { terms } from "@/db/terms";

export default function HandbookPage() {
  const theme: Theme = usePokerStore((state) => state.theme);

  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("combinations");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div
      className={`min-h-screen transition-colors duration-200 p-4 md:p-8 flex flex-col items-center font-sans ${getThemeClass(theme)}`}
    >
      <div className="w-full max-w-5xl bg-white navy:bg-[#121224] p-5 md:p-6 rounded-2xl shadow-lg border border-gray-200 navy:border-slate-800">
        {/* Шапка справочника */}
        <header className="mb-6 flex items-center justify-between border-b pb-4 border-gray-100 navy:border-slate-900/60">
          <div>
            <h1 className="text-2xl font-black">📚 Справочник игрока</h1>
            <p className="text-xs text-gray-400 mt-0.5">
              Шпаргалка по комбинациям, позициям и терминологии
            </p>
          </div>
          <Link
            href="/"
            className="text-sm font-bold text-[#e94560] hover:underline cursor-pointer"
          >
            ◀ В меню
          </Link>
        </header>

        {/* Меню переключения вкладок (Табы) */}
        <div className="grid grid-cols-3 gap-2 bg-gray-100 navy:bg-[#0b0b14] p-1.5 rounded-xl mb-6 border border-gray-200/50 navy:border-slate-900/30">
          <button
            onClick={() => setActiveTab("combinations")}
            className={`py-2 px-1 text-center text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === "combinations"
                ? "bg-[#e94560] text-white shadow-sm"
                : "text-gray-500 hover:text-gray-900 navy:hover:text-slate-200"
            }`}
          >
            🙌 Комбинации
          </button>
          <button
            onClick={() => setActiveTab("charts")}
            className={`py-2 px-1 text-center text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === "charts"
                ? "bg-[#e94560] text-white shadow-sm"
                : "text-gray-500 hover:text-gray-900 navy:hover:text-slate-200"
            }`}
          >
            📈 Чарты рук
          </button>
          <button
            onClick={() => setActiveTab("dictionary")}
            className={`py-2 px-1 text-center text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === "dictionary"
                ? "bg-[#e94560] text-white shadow-sm"
                : "text-gray-500 hover:text-gray-900 navy:hover:text-slate-200"
            }`}
          >
            📖 Словарь
          </button>
        </div>

        {/* КОНТЕНТ ВКЛАДОК */}
        <main className="min-h-[350px]">
          {/* ВКЛАДКА 1: КОМБИНАЦИИ */}
          {activeTab === "combinations" && (
            <ul className=" animate-fadeIn">
              {combinations.map((combination) => (
                <li key={combination.path} className="p-1">
                  <Link
                    title="Подробнее..."
                    href={combination.path}
                    className="p-1 rounded-xl border border-gray-100 navy:border-slate-900/30 bg-gray-50/50 navy:bg-[#0b0b14]/30 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
                  >
                    <div>
                      <h3 className="text-xl font-black text-gray-900 navy:text-slate-100">
                        {combination.name}
                      </h3>
                      <p className="text-xs text-gray-400 navy:text-slate-400 mt-0.5">
                        {combination.desc}
                      </p>
                    </div>
                    <div className="font-mono text-2xl font-bold bg-white navy:bg-[#0b0b14] px-2.5 py-1 rounded-md border border-gray-200 navy:border-slate-800 self-start sm:self-center">
                      {combination.example}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {/* ВКЛАДКА 2: ЧАРТЫ РУК */}
          {activeTab === "charts" && (
            <div className="space-y-5 animate-fadeIn">
              {positionCharts.map((item, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl border border-gray-100  navy:border-slate-900/40 bg-gray-50/50 navy:bg-[#0b0b14]/30"
                >
                  <h3 className="text-sm font-black mb-1.5">{item.pos}</h3>
                  <div className="text-xs font-mono text-[#e94560] bg-white navy:bg-[#0b0b14] p-2.5 rounded-lg border border-gray-100 navy:border-slate-800 mb-2 font-bold break-all">
                    Что играть: {item.hands}
                  </div>
                  <p className="text-xs text-gray-500 navy:text-slate-400 leading-relaxed font-medium">
                    {item.strategy}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* ВКЛАДКА 3: СЛОВАРЬ */}
          {activeTab === "dictionary" && (
            <div className="space-y-3 animate-fadeIn">
              {/* {terms.map((item, index) => (
                <div
                  key={index}
                  className="p-3.5 rounded-xl border border-gray-100 navy:border-slate-900/30 bg-gray-50/50 navy:bg-[#0b0b14]/30"
                >
                  <h3 className="text-sm font-black text-[#e94560] mb-0.5">
                    {item.term}
                  </h3>
                  <p className="text-xs text-gray-500 navy:text-slate-400 leading-relaxed font-medium">
                    {item.def}
                  </p>
                </div>
              ))} */}
              <header className="border-b border-slate-200 navy:border-slate-700 pb-6 mb-8">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 navy:text-white tracking-tight mb-4">
                  Покерный глоссарий: Термины и сленг
                </h1>
                <p className="text-lg text-slate-600 navy:text-[#9BA1A6]">
                  Полный справочник базовых понятий, тактических приемов и
                  сленговых выражений. Изучите язык профессиональных игроков для
                  уверенной игры за столом.
                </p>
              </header>

              {/* Категория 1: Базовые действия в торгах */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 navy:text-white mb-6 border-l-4 border-emerald-500 pl-3">
                  Базовые действия и решения
                </h2>

                <div className="space-y-4">
                  {/* Фолд */}
                  <div className="p-5 rounded-xl border border-slate-200 navy:border-slate-800 bg-white navy:bg-[#1C2541] shadow-sm">
                    <div className="flex flex-wrap items-baseline gap-2 mb-2">
                      <h3 className="text-lg font-bold text-slate-900 navy:text-white">
                        Фолд (Fold / Пас)
                      </h3>
                      <span className="text-xs font-mono text-slate-400">
                        [существительное / глагол]
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 navy:text-slate-300">
                      Отказ от продолжения борьбы за банк в текущей раздаче.
                      Игрок сбрасывает свои карты в закрытую на стол и больше не
                      совершает никаких действий до следующей сдачи. Все фишки,
                      поставленные игроком ранее, остаются в банке.
                    </p>
                  </div>

                  {/* Лимп */}
                  <div className="p-5 rounded-xl border border-slate-200 navy:border-slate-800 bg-white navy:bg-[#1C2541] shadow-sm">
                    <div className="flex flex-wrap items-baseline gap-2 mb-2">
                      <h3 className="text-lg font-bold text-slate-900 navy:text-white">
                        Лимп (Limp)
                      </h3>
                      <span className="text-xs font-mono text-slate-400">
                        [тактический прием]
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 navy:text-slate-300">
                      Вход в игру на префлопе обычным уравниванием размера
                      Большого Блайнда (Call) без повышения. В современной
                      покерной стратегии открытый лимп (когда до вас никто не
                      входил в игру) считается признаком слабого игрока, так как
                      он не дает возможности забрать банк сразу.
                    </p>
                  </div>
                </div>
              </section>

              {/* Категория 2: Тактические приемы на Постфлопе */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 navy:text-white mb-6 border-l-4 border-emerald-500 pl-3">
                  Тактические приемы и линии игры
                </h2>

                <div className="space-y-4">
                  {/* Контбет */}
                  <div className="p-5 rounded-xl border border-slate-200 navy:border-slate-800 bg-white navy:bg-[#1C2541] shadow-sm">
                    <div className="flex flex-wrap items-baseline gap-2 mb-2">
                      <h3 className="text-lg font-bold text-slate-900 navy:text-white">
                        Контбет (Continuation Bet / C-Bet)
                      </h3>
                      <span className="text-xs font-mono text-slate-400">
                        [продолженная ставка]
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 navy:text-slate-300">
                      Ставка на флопе, которую делает игрок, бывший агрессором
                      (повышавший ставку) на предыдущей улице (префлопе). Этим
                      действием игрок продолжает демонстрировать силу своей
                      руки, пытаясь забрать банк сразу, даже если карты флопа
                      ему не подошли.
                    </p>
                  </div>

                  {/* Чек-Рейз */}
                  <div className="p-5 rounded-xl border border-slate-200 navy:border-slate-800 bg-white navy:bg-[#1C2541] shadow-sm">
                    <div className="flex flex-wrap items-baseline gap-2 mb-2">
                      <h3 className="text-lg font-bold text-slate-900 navy:text-white">
                        Чек-Рейз (Check-Raise)
                      </h3>
                      <span className="text-xs font-mono text-slate-400">
                        [агрессивный прием]
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 navy:text-slate-300">
                      Прием, при котором игрок сначала объявляет «Чек»
                      (пропускает ход), провоцируя соперника сделать ставку, а
                      после ставки оппонента заявляет «Рейз» (повышение). Это
                      одна из самых мощных и агрессивных линий розыгрыша,
                      используемая как для извлечения максимальной прибыли с
                      сильной рукой, так и для жесткого блефа.
                    </p>
                  </div>
                </div>
              </section>

              {/* Дополнительные важные термины */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 navy:text-white mb-6 border-l-4 border-emerald-500 pl-3">
                  Что еще нужно знать новичку
                </h2>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-slate-200 navy:border-slate-800 bg-white navy:bg-[#1C2541]">
                    <h4 className="font-bold text-emerald-600 navy:text-cyan-400 mb-1">
                      Натс (Nuts)
                    </h4>
                    <p className="text-xs text-slate-600 navy:text-slate-400">
                      Абсолютно лучшая, непобедимая комбинация карт в конкретный
                      момент раздачи с учетом структуры карт на столе.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 navy:border-slate-800 bg-white navy:bg-[#1C2541]">
                    <h4 className="font-bold text-emerald-600 navy:text-cyan-400 mb-1">
                      Дро (Draw)
                    </h4>
                    <p className="text-xs text-slate-600 navy:text-slate-400">
                      Недостроенная комбинация карт (например, Флеш-дро или
                      Стрит-дро), которой не хватает одной или двух карт для
                      превращения в готовую сильную руку.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 navy:border-slate-800 bg-white navy:bg-[#1C2541]">
                    <h4 className="font-bold text-emerald-600 navy:text-cyan-400 mb-1">
                      Борд (Board / Доска)
                    </h4>
                    <p className="text-xs text-slate-600 navy:text-slate-400">
                      Пять общих карт, которые дилер выкладывает лицом вверх в
                      центр стола во время раундов флоп, терн и ривер.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 navy:border-slate-800 bg-white navy:bg-[#1C2541]">
                    <h4 className="font-bold text-emerald-600 navy:text-cyan-400 mb-1">
                      Стек (Stack)
                    </h4>
                    <p className="text-xs text-slate-600 navy:text-slate-400">
                      Общее количество фишек или денег, которыми располагает
                      игрок за столом в текущий момент времени.
                    </p>
                  </div>
                </div>
              </section>

              {/* Блок внимания */}
              <footer className="p-6 rounded-2xl bg-emerald-50 navy:bg-[#1C2541] border border-emerald-200 navy:border-cyan-900/50">
                <h3 className="text-lg font-bold text-emerald-900 navy:text-cyan-400 mb-2">
                  💡 Совет школы покера: Изучайте контекст
                </h3>
                <p className="text-sm text-emerald-950 navy:text-slate-300">
                  Понимание терминологии — это фундамент. Профессиональные
                  игроки общаются на этом языке автоматически, разбирая раздачи.
                  Знание того, чем отличается простой <em>колл</em> от{" "}
                  <em>коллирования контбета</em> или как реагировать на чужой{" "}
                  <em>чек-рейз</em>, убережет ваш стек от спонтанных и ошибочных
                  решений.
                </p>
              </footer>
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}
