// src/app/timer/constructor/page.tsx
"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePokerStore } from '@/store/usePokerStore';

export default function StructureConstructor() {
  const { grid, updateCustomRow, addCustomRow, removeCustomRow, totalDurationStr, theme, setCustomGrid, config } = usePokerStore();
  const _hasHydrated = usePokerStore((state) => state._hasHydrated);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Если зашли на страницу, а сетка пустая, генерируем базовый скелет на основе текущего конфига
    if (usePokerStore.getState().grid.length === 0) {
      usePokerStore.getState().buildTournament();
    }
  }, []);

  const getThemeClass = () => {
    if (!isClient || !_hasHydrated || theme === "navy") return "dark navy bg-[#090916] text-white";
    return "bg-gray-100 text-gray-900";
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 p-4 md:p-8 flex flex-col items-center font-sans ${getThemeClass()}`}>
      <div className="w-full max-w-4xl bg-white dark:bg-[#161625] navy:bg-[#121224] p-5 md:p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 navy:border-slate-800">
        
        {/* Шапка конструктора */}
        <header className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 border-gray-100 dark:border-gray-900/60 navy:border-slate-900/60 gap-4">
          <div>
            <h1 className="text-2xl font-black">🛠️ Продвинутый конструктор структуры</h1>
            <p className="text-xs text-gray-400 mt-0.5">Полное ручное управление блайндами, анте и длительностью каждого раунда</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/timer" className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition-colors text-center">
              💾 Сохранить и к таймеру
            </Link>
          </div>
        </header>

        {/* Информационная панель */}
        <div className="mb-4 p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40 navy:bg-[#0b0b14]/40 border border-gray-100 dark:border-gray-900/20 navy:border-slate-900/20 flex justify-between text-xs font-semibold text-gray-500">
          <span>Всего раундов/блоков: <strong className="text-gray-900 dark:text-white navy:text-slate-100">{grid.length}</strong></span>
          <span>Общее время игры: <strong className="text-[#e94560]">{totalDurationStr}</strong></span>
        </div>

        {/* РЕДАКТОР СЕТКИ */}
        <main className="max-h-[500px] overflow-y-auto border border-gray-100 dark:border-gray-900/50 navy:border-slate-900/50 rounded-xl mb-6 bg-gray-50/50 dark:bg-gray-900/20 navy:bg-[#0b0b14]/20 p-2 space-y-2">
          {grid.map((row: any, index: number) => (
            <div 
              key={index}
              className={`p-3 rounded-xl border flex flex-wrap lg:flex-nowrap items-center justify-between gap-3 transition-colors ${
                row.isBreak 
                  ? 'bg-amber-500/5 border-amber-500/20 text-amber-500' 
                  : 'bg-white dark:bg-[#0f0f1b] navy:bg-[#0b0b14] border-gray-200 dark:border-gray-800 navy:border-slate-850'
              }`}
            >
              {/* Левый блок: Номер / Обозначение */}
              <div className="flex items-center gap-2 min-w-[100px]">
                <span className="text-xs font-bold opacity-40">#{index + 1}</span>
                <span className="text-xs font-black uppercase bg-gray-100 dark:bg-gray-900 navy:bg-slate-900/80 px-2 py-1 rounded-md text-gray-700 dark:text-gray-300 navy:text-slate-300 truncate max-w-[90px]">
                  {row.labelText}
                </span>
              </div>

              {/* Центральный блок: Поля ввода параметров */}
              <div className="flex flex-wrap items-center gap-3 flex-1 justify-start lg:justify-end">
                {row.isBreak ? (
                  <div className="text-xs font-bold text-amber-500/80 uppercase tracking-wider flex-1">
                    ☕ Перерыв — Игроки отдыхают от ставок
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-bold text-gray-400 uppercase">ББ:</span>
                      <input 
                        type="number" 
                        value={row.bb} 
                        onChange={(e) => updateCustomRow(index, { bb: Math.max(0, parseInt(e.target.value) || 0) })}
                        className="w-20 text-center py-1 rounded-md border border-gray-200 dark:border-gray-800 navy:border-slate-800 bg-gray-50 dark:bg-gray-900 navy:bg-slate-900 text-xs font-extrabold text-gray-900 dark:text-white navy:text-slate-100 outline-none focus:border-[#e94560]"
                      />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-bold text-gray-400 uppercase">МБ:</span>
                      <span className="w-14 text-center font-mono text-xs font-bold text-gray-400">
                        ({row.sb})
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-bold text-gray-400 uppercase">Анте:</span>
                      <input 
                        type="number" 
                        value={row.ante} 
                        disabled={!config.useAnte}
                        title={!config.useAnte ? "Включите использование Анте в быстрых настройках" : ""}
                        onChange={(e) => updateCustomRow(index, { ante: Math.max(0, parseInt(e.target.value) || 0) })}
                        className="w-16 text-center py-1 rounded-md border border-gray-200 dark:border-gray-800 navy:border-slate-800 bg-gray-50 dark:bg-gray-900 navy:bg-slate-900 text-xs text-gray-900 dark:text-white navy:text-slate-100 outline-none focus:border-amber-500 disabled:opacity-30 disabled:cursor-not-allowed"
                      />
                    </div>
                  </>
                )}

                {/* Поле Длительности раунда (Доступно и для игры, и для перерыва) */}
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-bold text-gray-400 uppercase">Мин:</span>
                  <input 
                    type="number" 
                    value={row.duration} 
                    onChange={(e) => updateCustomRow(index, { duration: Math.max(1, parseInt(e.target.value) || 1) })}
                    className="w-14 text-center py-1 rounded-md border border-gray-200 dark:border-gray-800 navy:border-slate-800 bg-gray-50 dark:bg-gray-900 navy:bg-slate-900 text-xs text-gray-900 dark:text-white navy:text-slate-100 outline-none focus:border-[#e94560]"
                  />
                </div>
              </div>

              {/* Правый блок: Удаление строки */}
              <button 
                onClick={() => removeCustomRow(index)}
                className="w-7 h-7 rounded-md bg-gray-100 dark:bg-gray-900 navy:bg-slate-900 text-gray-400 hover:text-[#e94560] dark:hover:bg-red-950/30 navy:hover:bg-red-950/30 font-bold text-xs flex items-center justify-center cursor-pointer transition-all border border-transparent hover:border-red-500/20"
                title="Удалить этот раунд"
              >
                ✕
              </button>
            </div>
          ))}
        </main>

        {/* Нижняя панель: Кнопки добавления новых элементов */}
        <footer className="flex flex-col sm:flex-row gap-3">
          <button 
            onClick={() => addCustomRow(false)}
            className="flex-1 py-3 bg-gray-100 dark:bg-gray-900 navy:bg-slate-900 border border-gray-300 dark:border-gray-800 navy:border-slate-800 text-gray-700 dark:text-gray-300 navy:text-slate-300 hover:border-emerald-500 dark:hover:border-emerald-500 hover:text-emerald-500 dark:hover:text-emerald-400 font-bold rounded-xl text-xs uppercase tracking-wider cursor-pointer transition-all text-center"
          >
            ➕ Добавить игровой уровень
          </button>
          <button 
            onClick={() => addCustomRow(true)}
            className="flex-1 py-3 bg-gray-100 dark:bg-gray-900 navy:bg-slate-900 border border-gray-300 dark:border-gray-800 navy:border-slate-800 text-gray-700 dark:text-gray-300 navy:text-slate-300 hover:border-amber-500 dark:hover:border-amber-500 hover:text-amber-500 dark:hover:text-amber-400 font-bold rounded-xl text-xs uppercase tracking-wider cursor-pointer transition-all text-center"
          >
            ➕ Вставить перерыв (Отдых)
          </button>
        </footer>

      </div>
    </div>
  );
}
