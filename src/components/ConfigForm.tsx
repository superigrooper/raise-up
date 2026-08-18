// components/ConfigForm.tsx
"use client";

import React from 'react';
import { usePokerStore } from '@/store/usePokerStore';
import { TournamentConfig } from '@/types/poker';

export const ConfigForm: React.FC = () => {
  const { config, setConfigValue, buildTournament, presets, activePresetId, selectPreset } = usePokerStore();

  const labels: Record<keyof TournamentConfig, string> = {
    startBB: 'Стартовый ББ',
    percentGrowth: 'Рост блайндов (%)',
    levelDuration: 'Время уровня (мин)',
    anteStartBB: 'Анте начиная с ББ >=',
    breakEvery: 'Перерыв каждые (ур)',
    breakDuration: 'Длина перерыва (мин)',
  };

  return (
    <div className="bg-[#161625] p-5 rounded-xl shadow-lg border border-gray-800">
      <h3 className="text-lg font-bold mb-4 text-white">Выбор пресета</h3>
      
      {/* Кнопки пресетов */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        {presets.map((preset) => (
          <button
            key={preset.id}
            onClick={() => selectPreset(preset.id)}
            className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
              activePresetId === preset.id
                ? 'bg-[#e94560] text-white border-[#e94560] shadow-md shadow-red-900/30'
                : 'bg-[#0f0f1b] text-gray-400 border-gray-800 hover:border-gray-700 hover:text-white'
            }`}
          >
            {preset.name}
          </button>
        ))}
      </div>

      <h3 className="text-lg font-bold mb-4 text-white">Ручная настройка</h3>
      <div className="space-y-3 mb-5">
        {(Object.keys(config) as Array<keyof TournamentConfig>).map((key) => (
          <div className="flex justify-between items-center" key={key}>
            <label className="text-sm text-gray-400">{labels[key]}:</label>
            <input
              type="number"
              value={config[key]}
              onChange={(e) => setConfigValue(key, parseFloat(e.target.value) || 0)}
              className="bg-[#0f0f1b] border border-gray-800 focus:border-[#e94560] text-white py-1 px-3 rounded-md w-24 text-center outline-none transition-colors"
            />
          </div>
        ))}
      </div>

      <button 
        onClick={buildTournament} 
        className="w-full py-3 bg-[#e94560] hover:bg-[#ff5270] text-white font-bold rounded-lg transition-colors shadow-lg shadow-red-950/20"
      >
        Перезапустить турнир
      </button>
    </div>
  );
};
