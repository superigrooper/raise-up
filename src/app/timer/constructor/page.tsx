// src/app/timer/constructor/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePokerStore } from "@/store/usePokerStore";
import { TournamentRow } from "@/types/poker";
import Footer from "@/components/Footer";

export default function StructureConstructor() {
  const {
    grid,
    updateCustomRow,
    insertCustomRow,
    removeCustomRow,
    theme,
    config,
    resetCustomGrid,
  } = usePokerStore();

  const [activeMobileMenuIndex, setActiveMobileMenuIndex] = useState<
    number | null
  >(null);

  useEffect(() => {
    if (usePokerStore.getState().grid.length === 0) {
      usePokerStore.getState().buildTournament();
    }
  }, []);
  // СЛУШАТЕЛЬ ДЛЯ ЗАКРЫТИЯ МОБИЛЬНОГО МЕНЮ ПРИ КЛИКЕ МИМО НЕГО
  useEffect(() => {
    const handleOutsideClick = () => setActiveMobileMenuIndex(null);
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, []);

  const getThemeClass = () => {
    if (theme === "navy") return "navy bg-[#090916] text-white";
    return "bg-gray-100 text-gray-900";
  };

  // Визуальный разделитель с кнопками для вклинивания раундов в середину таблицы

  const InsertionBar = ({ index }: { index: number }) => {
    const isOpen = activeMobileMenuIndex === index;
    return (
      <div className="relative h-6 flex items-center justify-center -my-3 z-20">
        {/* Десктопная линия (включается по hover) */}
        <div className="absolute inset-x-4 h-[2px] bg-gradient-to-r from-transparent via-[#e94560]/30 to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity pointer-events-none" />

        {/* Мобильная кнопка-плюс (видна только на тач-скринах) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setActiveMobileMenuIndex(isOpen ? null : index);
          }}
          className={`md:hidden w-5 h-5 rounded-full flex items-center justify-center font-bold text-xs shadow transition-all cursor-pointer ${isOpen ? "bg-[#e94560] text-white rotate-45" : "bg-white navy:bg-[#121224] text-gray-400 border border-gray-200 navy:border-slate-800"}`}
        >
          ＋
        </button>

        {/* Десктопное меню для мыши */}
        <div className="hidden md:flex opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all gap-2 bg-white navy:bg-[#121224] px-3 py-1 rounded-full shadow-md border border-gray-200 navy:border-slate-800">
          <button
            onClick={() => insertCustomRow(index, false)}
            className="text-[10px] font-black uppercase text-emerald-500 hover:text-emerald-400 cursor-pointer"
          >
            ➕ Уровень
          </button>
          <span className="text-gray-300 text-[10px] select-none">
            |
          </span>
          <button
            onClick={() => insertCustomRow(index, true)}
            className="text-[10px] font-black uppercase text-amber-500 hover:text-amber-400 cursor-pointer"
          >
            ➕ Перерыв
          </button>
        </div>

        {/* Выпадающее меню для пальцев (мобильный попап) */}
        {isOpen && (
          <div className="absolute top-6 bg-white navy:bg-[#121224] py-1.5 px-2 rounded-xl shadow-xl border border-gray-200 navy:border-slate-800 flex gap-4 z-30">
            <button
              onClick={() => {
                insertCustomRow(index, false);
                setActiveMobileMenuIndex(null);
              }}
              className="text-xs font-bold text-emerald-500 flex items-center gap-1 cursor-pointer"
            >
              🟢 + Уровень
            </button>
            <span className="text-gray-200">|</span>
            <button
              onClick={() => {
                insertCustomRow(index, true);
                setActiveMobileMenuIndex(null);
              }}
              className="text-xs font-bold text-amber-500 flex items-center gap-1 cursor-pointer"
            >
              🟡 + Перерыв
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-200 p-4 md:p-8 flex flex-col items-center font-sans ${getThemeClass()}`}
    >
      <div className="w-full max-w-4xl bg-white navy:bg-[#121224] p-5 md:p-6 rounded-2xl shadow-lg border border-gray-200 navy:border-slate-800">
        {/* Шапка */}
        <header className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 border-gray-100 navy:border-slate-900/60 gap-4">
          <div>
            <h1 className="text-2xl font-black">
              🛠️ Продвинутый конструктор структуры
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">
              Наведите курсор мыши в пространство между любыми строками, чтобы
              вставить раунд в середину
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                resetCustomGrid();
              }}
              className="px-3.5 py-2 border border-gray-300 navy:border-slate-700 text-gray-500 hover:text-[#e94560] hover:border-[#e94560] font-bold text-xs rounded-xl transition-all cursor-pointer bg-transparent"
              title="Сбросить таблицу к исходному шаблону пресета"
            >
              🧹 Сбросить
            </button>
            <Link
              href="/timer"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition-colors text-center cursor-pointer"
            >
              💾 Сохранить
            </Link>
          </div>
        </header>

        {/* Панель показателей */}
        <div className="mb-4 p-3 rounded-xl bg-gray-50 navy:bg-[#0b0b14]/40 border border-gray-100 navy:border-slate-900/20 flex justify-between text-xs font-semibold text-gray-500">
          <span>
            Всего блоков:{" "}
            <strong className="text-gray-900 navy:text-slate-100">
              {grid.length}
            </strong>
          </span>
        </div>

        {/* СПИСОК УРОВНЕЙ С ИНТЕРАКТИВНЫМИ ЗОНАМИ ВСТАВКИ */}
        <main className="max-h-[500px] overflow-y-auto border border-gray-100 navy:border-slate-900/50 rounded-xl mb-6 bg-gray-50/50 navy:bg-[#0b0b14]/20 p-4 space-y-1">
          {/* Нулевая точка вставки (перед самым первым элементом) */}
          <InsertionBar index={0} />

          {grid.map((row: TournamentRow, index: number) => (
            <div key={index} className="group space-y-1">
              <div
                className={`p-3 rounded-xl border flex flex-wrap lg:flex-nowrap items-center justify-between gap-3 transition-colors ${
                  row.isBreak
                    ? "bg-amber-500/5 border-amber-500/20 text-amber-500"
                    : "bg-white navy:bg-[#0b0b14] border-gray-200 navy:border-slate-850"
                }`}
              >
                {/* Метка */}
                <div className="flex items-center gap-2 min-w-[100px]">
                  <span className="text-xs font-black uppercase bg-gray-100 navy:bg-slate-900 px-2 py-1 rounded-md text-gray-700 navy:text-slate-300 truncate ">
                    {row.labelText}
                  </span>
                </div>

                {/* Поля */}
                <div className="flex flex-wrap items-center gap-3 flex-1 justify-start lg:justify-end">
                  {row.isBreak ? (
                    <div className="text-xs font-bold text-amber-500/80 uppercase tracking-wider flex-1">
                      ☕ Перерыв
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-bold text-gray-400 uppercase">
                          ББ:
                        </span>
                        <input
                          type="number"
                          value={row.bb}
                          onChange={(e) =>
                            updateCustomRow(index, {
                              bb: Math.max(0, parseInt(e.target.value) || 0),
                            })
                          }
                          className="w-20 text-center py-1 rounded-md border border-gray-200 navy:border-slate-800 bg-gray-50 navy:bg-slate-900 text-xs font-extrabold text-gray-900 navy:text-slate-100 outline-none focus:border-[#e94560]"
                        />
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-bold text-gray-400 uppercase">
                          МБ:
                        </span>
                        <span className="w-14 text-center font-mono text-xs font-bold text-gray-400">
                          ({row.sb})
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-bold text-gray-400 uppercase">
                          Анте:
                        </span>
                        <input
                          type="number"
                          value={row.ante}
                          disabled={!config.useAnte}
                          onChange={(e) =>
                            updateCustomRow(index, {
                              ante: Math.max(0, parseInt(e.target.value) || 0),
                            })
                          }
                          className="w-16 text-center py-1 rounded-md border border-gray-200 navy:border-slate-800 bg-gray-50 navy:bg-slate-900 text-xs text-gray-900 navy:text-slate-100 outline-none focus:border-amber-500 disabled:opacity-30 disabled:cursor-not-allowed"
                        />
                      </div>
                    </>
                  )}

                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-bold text-gray-400 uppercase">
                      Мин:
                    </span>
                    <input
                      type="number"
                      value={row.duration}
                      onChange={(e) =>
                        updateCustomRow(index, {
                          duration: Math.max(1, parseInt(e.target.value) || 1),
                        })
                      }
                      className="w-14 text-center py-1 rounded-md border border-gray-200 navy:border-slate-800 bg-gray-50 navy:bg-slate-900 text-xs text-gray-900 navy:text-slate-100 outline-none focus:border-[#e94560]"
                    />
                  </div>
                </div>

                {/* Кнопка Удаления */}
                <button
                  onClick={() => removeCustomRow(index)}
                  className="w-7 h-7 rounded-md bg-gray-100 navy:bg-slate-900 text-gray-400 hover:text-[#e94560] font-bold text-xs flex items-center justify-center cursor-pointer transition-all border border-transparent hover:border-red-500/20"
                  title="Удалить этот раунд"
                >
                  ✕
                </button>
              </div>

              {/* Точка вставки под текущей строкой */}
              <InsertionBar index={index + 1} />
            </div>
          ))}
        </main>

        {/* Нижние кнопки (Добавление классически в самый конец списка) */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => insertCustomRow(grid.length, false)}
            className="flex-1 py-3 bg-gray-100 navy:bg-slate-900 border border-gray-300 navy:border-slate-800 text-gray-700 navy:text-slate-300 hover:border-emerald-500 hover:text-emerald-500 font-bold rounded-xl text-xs uppercase tracking-wider cursor-pointer transition-all text-center"
          >
            ➕ Уровень в конец списка
          </button>
          <button
            onClick={() => insertCustomRow(grid.length, true)}
            className="flex-1 py-3 bg-gray-100 navy:bg-slate-900 border border-gray-300 navy:border-slate-800 text-gray-700 navy:text-slate-300 hover:border-amber-500 hover:text-amber-500 font-bold rounded-xl text-xs uppercase tracking-wider cursor-pointer transition-all text-center"
          >
            ➕ Перерыв в конец списка
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
