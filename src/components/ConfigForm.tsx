"use client";
import { useState } from "react";
import Link from "next/link";
import { usePokerStore } from "@/store/usePokerStore";
import { TournamentConfig } from "@/types/poker";
import NumberField from "./NumberField";

export default function ConfigForm() {
  const {
    config,
    setConfigValue,
    buildTournament,
    presets,
    activePresetId,
    selectPreset,
  } = usePokerStore();

  const [isCustomOpen, setIsCustomOpen] = useState(false);

  // Типизированный хелпер — гарантирует, что ключ и значение совпадают
  const handleChange = <K extends keyof TournamentConfig>(
    key: K,
    value: TournamentConfig[K],
  ) => {
    setConfigValue(key, value);
  };

  const handleApply = () => {
    buildTournament();
    setIsCustomOpen(false);
  };

  return (
    <div
      className="
      p-5 rounded-xl shadow-lg border
      border-gray-200 navy:border-slate-800
      bg-white navy:bg-[#121224]"
    >
      {/* ── Шапка ── */}
      <div className="flex justify-between items-center mb-3">
        <h3
          className="
          text-xs font-bold uppercase tracking-wider
          text-gray-400 navy:text-slate-500"
        >
          Формат турнира
        </h3>

        <div className="flex gap-3">
          <Link
            href="/timer/constructor"
            className="text-xs font-semibold text-emerald-500 hover:text-emerald-400 transition-colors"
          >
            🛠️ Продвинутый конструктор
          </Link>
          <button
            onClick={() => setIsCustomOpen((prev) => !prev)}
            className="text-xs font-semibold text-[#e94560] hover:text-[#ff5270] transition-colors cursor-pointer"
          >
            {isCustomOpen ? "⚙️ Скрыть настройки" : "⚙️ Быстрые параметры"}
          </button>
        </div>
      </div>

      {/* ── Пресеты ── */}
      <div className="grid grid-cols-3 gap-3 mb-1">
        {presets.map((preset) => {
          const isActive = activePresetId === preset.id;
          return (
            <button
              key={preset.id}
              onClick={() => {
                selectPreset(preset.id);
                setIsCustomOpen(false);
              }}
              className={`
                py-3 px-4 text-xs font-bold rounded-lg border
                transition-all cursor-pointer truncate
                ${
                  isActive
                    ? "bg-[#e94560] text-white border-[#e94560] shadow-md"
                    : `bg-gray-50 navy:bg-[#0b0b14]
                     text-gray-600 navy:text-slate-400
                     border-gray-200 navy:border-slate-800
                     hover:border-gray-400 navy:hover:border-slate-700`
                }`}
            >
              {preset.name}
            </button>
          );
        })}
      </div>

      {/* ── Раскрывающиеся настройки ── */}
      <div
        className={`
        transition-all duration-300 ease-in-out overflow-hidden
        ${
          isCustomOpen
            ? "max-h-[500px] mt-5 pt-4 border-t border-gray-100 navy:border-slate-900/50"
            : "max-h-0"
        }`}
      >
        <div className="space-y-3.5 mb-5">
          <NumberField
            id="startBB"
            label="Стартовый ББ:"
            value={config.startBB}
            min={1}
            onChange={(v) => handleChange("startBB", v)}
          />

          <NumberField
            id="levelDuration"
            label="Время уровня (мин):"
            value={config.levelDuration}
            min={1}
            onChange={(v) => handleChange("levelDuration", v)}
          />

          {/* Чекбокс Анте */}
          <div className="flex justify-between items-center py-1">
            <label
              htmlFor="useAnte"
              className="text-sm font-medium text-gray-600 navy:text-slate-400"
            >
              Использовать Анте (Ante):
            </label>
            <input
              id="useAnte"
              type="checkbox"
              checked={config.useAnte}
              onChange={(e) => handleChange("useAnte", e.target.checked)}
              className="w-5 h-5 accent-[#e94560] cursor-pointer"
            />
          </div>

          {/* Порог включения Анте — показываем только если Анте включено */}
          {config.useAnte && (
            <NumberField
              id="anteStartBB"
              label="Анте начиная с ББ ≥:"
              value={config.anteStartBB}
              min={1}
              onChange={(v) => handleChange("anteStartBB", v)}
            />
          )}

          <NumberField
            id="breakEvery"
            label="Перерыв каждые (ур):"
            value={config.breakEvery}
            min={1}
            onChange={(v) => handleChange("breakEvery", v)}
          />

          <NumberField
            id="breakDuration"
            label="Длина перерыва (мин):"
            value={config.breakDuration}
            min={1}
            onChange={(v) => handleChange("breakDuration", v)}
          />
        </div>

        <button
          onClick={handleApply}
          className="
            w-full py-3 font-bold rounded-lg cursor-pointer text-sm
            bg-[#e94560] hover:bg-[#ff5270] text-white transition-colors"
        >
          Применить структуру
        </button>
      </div>
    </div>
  );
}
