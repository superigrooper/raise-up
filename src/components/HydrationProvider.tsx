"use client";

import { useEffect } from "react";
import { usePokerStore } from "@/store/usePokerStore";
import { Theme } from "@/types/poker";

function getSystemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "navy"
    : "light";
}

export function HydrationProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // 1. Читаем localStorage через Zustand
    usePokerStore.persist.rehydrate();

    // 2. После регидрации проверяем: есть ли сохранённая тема?
    //    Если нет (первый визит) — применяем системную тему
    const stored = localStorage.getItem("poker-timer");

    if (!stored) {
      // Первый визит — синхронизируем стор с системной темой
      const systemTheme = getSystemTheme();
      usePokerStore.getState().setTheme(systemTheme);
    }
  }, []);

  // Подписка на изменение системной темы во время сессии
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      const currentTheme = usePokerStore.getState().theme;
      const prevSystemTheme: Theme = e.matches ? "light" : "navy";
      const newSystemTheme: Theme = e.matches ? "navy" : "light";

      // Меняем тему только если пользователь не выбирал её вручную
      // (признак: текущая тема совпадает с предыдущей системной)
      if (currentTheme === prevSystemTheme) {
        usePokerStore.getState().setTheme(newSystemTheme);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return <>{children}</>;
}
