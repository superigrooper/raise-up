"use client";

import React from "react";
import { usePokerStore } from "@/store/usePokerStore";
import { Theme } from "@/types/poker";

export const ThemeSelector: React.FC = () => {
  const { theme, setTheme } = usePokerStore();
  const themes: { id: Theme; name: string; icon: string }[] = [
    { id: "navy", name: "Синяя тема", icon: "🌌" },
    { id: "light", name: "Светлая тема", icon: "☀️" },
  ];

  return (
    <div className="flex gap-1.5 bg-gray-200/50 dark:bg-[#0b0b14] navy:bg-[#0b0b14] p-1 rounded-xl border border-gray-300 dark:border-slate-800 navy:border-slate-800 transition-colors">
      {themes.map((t) => (
        <button
          key={t.id}
          onClick={() => setTheme(t.id)}
          className={`flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-lg border transition-all cursor-pointer ${theme === t.id ? "bg-[#e94560] text-white border-[#e94560] shadow-sm" : "bg-transparent text-gray-600 dark:text-slate-400 navy:text-slate-400 border-transparent hover:text-gray-900 dark:hover:text-slate-200 navy:hover:text-slate-200"}`}
        >
          <span>{t.icon}</span>
          <span className="hidden sm:inline">{t.name}</span>
        </button>
      ))}
    </div>
  );
};
