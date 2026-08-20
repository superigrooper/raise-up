// components/ConfigForm.tsx
"use client";

import React, { useState } from 'react';
import { usePokerStore } from '@/store/usePokerStore';

export const ConfigForm: React.FC = () => {
  const { config, setConfigValue, buildTournament, presets, activePresetId, selectPreset } = usePokerStore();
  const [isCustomOpen, setIsCustomOpen] = useState(false);

  return (
    <div className="p-5 rounded-xl shadow-lg border transition-colors duration-200 bg-white dark:bg-[#161625] navy:bg-[#121224] border-gray-200 dark:border-gray-800 navy:border-slate-800">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 navy:text-slate-500">
          Формат турнира
        </h3>
        <button
          onClick={() => setIsCustomOpen(!isCustomOpen)}
          className="text-xs font-semibold text-[#e94560] hover:text-[#ff5270] transition-colors cursor-pointer flex items-center gap-1"
        >
          {isCustomOpen ? '⚙️ Скрыть настройки' : '⚙️ Своя структура'}
        </button>
      </div>
      
      {/* Сетка пресетов */}
      <div className="grid grid-cols-3 gap-3 mb-1">
        {presets.map((preset) => (
          <button
            key={preset.id}
            onClick={() => {
              selectPreset(preset.id);
              setIsCustomOpen(false);
            }}
            className={`py-3 px-4 text-xs font-bold rounded-lg border transition-all cursor-pointer truncate ${
              activePresetId === preset.id
                ? 'bg-[#e94560] text-white border-[#e94560] shadow-md shadow-red-950/20'
                : 'bg-gray-50 dark:bg-[#0f0f1b] navy:bg-[#0b0b14] text-gray-600 dark:text-gray-400 navy:text-slate-400 border-gray-200 dark:border-gray-800 navy:border-slate-800 hover:border-gray-400 dark:hover:border-gray-700 navy:hover:border-slate-700'
            }`}
          >
            {preset.name}
          </button>
        ))}
      </div>

      {/* Панель ручных настроек */}
      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
        isCustomOpen ? 'max-h-[600px] mt-5 pt-4 border-t border-gray-100 dark:border-gray-900/50 navy:border-slate-900/50' : 'max-h-0'
      }`}>
        <div className="space-y-3.5 mb-5">
          {/* Стартовый ББ */}
          <div className="flex justify-between items-center">
            <label className="text-sm text-gray-600 dark:text-gray-400 navy:text-slate-400">Стартовый ББ:</label>
            <input
              type="number"
              value={config.startBB}
              onChange={(e) => setConfigValue('startBB', parseFloat(e.target.value) || 0)}
              className="w-24 text-center py-1.5 px-3 rounded-md border outline-none transition-all bg-gray-50 dark:bg-[#0f0f1b] navy:bg-[#0b0b14] border-gray-300 dark:border-gray-800 navy:border-slate-800 text-gray-900 dark:text-white navy:text-slate-100 focus:border-[#e94560]"
            />
          </div>
          {/* Время уровня */}
          <div className="flex justify-between items-center">
            <label className="text-sm text-gray-600 dark:text-gray-400 navy:text-slate-400">Время уровня (мин):</label>
            <input
              type="number"
              value={config.levelDuration}
              onChange={(e) => setConfigValue('levelDuration', parseFloat(e.target.value) || 0)}
              className="w-24 text-center py-1.5 px-3 rounded-md border outline-none transition-all bg-gray-50 dark:bg-[#0f0f1b] navy:bg-[#0b0b14] border-gray-300 dark:border-gray-800 navy:border-slate-800 text-gray-900 dark:text-white navy:text-slate-100 focus:border-[#e94560]"
            />
          </div>

          {/* Чекбокс Анте */}
          <div className="flex justify-between items-center py-1">
            <label className="text-sm text-gray-600 dark:text-gray-400 navy:text-slate-400 font-medium">Использовать Анте (Ante):</label>
            <input
              type="checkbox"
              checked={config.useAnte}
              onChange={(e) => setConfigValue('useAnte', e.target.checked)}
              className="w-5 h-5 accent-[#e94560] rounded border-gray-300 cursor-pointer"
            />
          </div>

          {/* Порог Анте */}
          {config.useAnte && (
            <div className="flex justify-between items-center">
              <label className="text-sm text-gray-600 dark:text-gray-400 navy:text-slate-400">Анте начиная с ББ &gt;=:</label>
              <input
                type="number"
                value={config.anteStartBB}
                onChange={(e) => setConfigValue('anteStartBB', parseFloat(e.target.value) || 0)}
                className="w-24 text-center py-1.5 px-3 rounded-md border outline-none transition-all bg-gray-50 dark:bg-[#0f0f1b] navy:bg-[#0b0b14] border-gray-300 dark:border-gray-800 navy:border-slate-800 text-gray-900 dark:text-white navy:text-slate-100 focus:border-[#e94560]"
              />
            </div>
          )}

          {/* НОВОЕ ПОЛЕ: КАСТОМИЗАЦИЯ ЗВУКОВОГО ПРЕДУПРЕЖДЕНИЯ */}
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 dark:text-gray-400 navy:text-slate-400">Предупреждение за (сек):</label>
              <span className="text-[10px] text-gray-400 dark:text-gray-500 navy:text-slate-500">(0 — выключить звук)</span>
            </div>
            <input
              type="number"
              value={config.warningTime}
              onChange={(e) => setConfigValue('warningTime', parseFloat(e.target.value) || 0)}
              className="w-24 text-center py-1.5 px-3 rounded-md border outline-none transition-all bg-gray-50 dark:bg-[#0f0f1b] navy:bg-[#0b0b14] border-gray-300 dark:border-gray-800 navy:border-slate-800 text-gray-900 dark:text-white navy:text-slate-100 focus:border-[#e94560]"
            />
          </div>

          {/* Перерывы */}
          <div className="flex justify-between items-center">
            <label className="text-sm text-gray-600 dark:text-gray-400 navy:text-slate-400">Перерыв каждые (ур):</label>
            <input
              type="number"
              value={config.breakEvery}
              onChange={(e) => setConfigValue('breakEvery', parseFloat(e.target.value) || 0)}
              className="w-24 text-center py-1.5 px-3 rounded-md border outline-none transition-all bg-gray-50 dark:bg-[#0f0f1b] navy:bg-[#0b0b14] border-gray-300 dark:border-gray-800 navy:border-slate-800 text-gray-900 dark:text-white navy:text-slate-100 focus:border-[#e94560]"
            />
          </div>

          {/* Длина перерыва */}
          <div className="flex justify-between items-center">
            <label className="text-sm text-gray-600 dark:text-gray-400 navy:text-slate-400">Длина перерыва (мин):</label>
            <input
              type="number"
              value={config.breakDuration}
              onChange={(e) => setConfigValue('breakDuration', parseFloat(e.target.value) || 0)}
              className="w-24 text-center py-1.5 px-3 rounded-md border outline-none transition-all bg-gray-50 dark:bg-[#0f0f1b] navy:bg-[#0b0b14] border-gray-300 dark:border-gray-800 navy:border-slate-800 text-gray-900 dark:text-white navy:text-slate-100 focus:border-[#e94560]"
            />
          </div>
        </div>

        <button 
          onClick={buildTournament} 
          className="w-full py-3 bg-[#e94560] hover:bg-[#ff5270] text-white font-bold rounded-lg transition-colors shadow-lg shadow-red-500/10 cursor-pointer text-sm"
        >
          Применить и запустить кастомную структуру
        </button>
      </div>
    </div>
  );
};
