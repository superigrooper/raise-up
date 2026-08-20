// store/usePokerStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PokerStore, TournamentRow, TournamentPreset } from "@/types/poker";

// ЖЁСТКАЯ ПРОФЕССИОНАЛЬНАЯ СЕТКА БЛАЙНДОВ (WSOP / EPT)
// Записана компактной строкой через пробел, чтобы редактор её не повреждал
const BLINDS_STRING =
  "2 4 5 10 20 30 40 50 60 80 100 150 200 250 300 400 500 600 800 1000 1200 1400 1600 2000 2500 3000 4000 5000 6000 8000 10000 12000 15000 20000 25000 30000 40000 50000 60000 80000 100000 120000 150000 200000 300000 400000 500000 600000 800000 1000000";
const HARD_BLINDS_STRUCTURE: number[] = BLINDS_STRING.split(" ").map(Number);

const defaultPresets: TournamentPreset[] = [
  {
    id: "regular",
    name: "Regular",
    config: {
      startBB: 4,
      levelDuration: 15,
      useAnte: true,
      anteStartBB: 40,
      breakEvery: 4,
      breakDuration: 10,
    },
  },
  {
    id: "turbo",
    name: "Turbo",
    config: {
      startBB: 4,
      levelDuration: 8,
      useAnte: true,
      anteStartBB: 60,
      breakEvery: 5,
      breakDuration: 5,
    },
  },
  {
    id: "hyper",
    name: "Hyper",
    config: {
      startBB: 10,
      levelDuration: 3,
      useAnte: false,
      anteStartBB: 100,
      breakEvery: 6,
      breakDuration: 3,
    },
  },
];

export const usePokerStore = create<PokerStore>()(
  persist(
    (set, get) => ({
      config: { ...defaultPresets[0].config },
      presets: defaultPresets,
      activePresetId: defaultPresets[0].id,
      grid: [],
      currentIndex: 0,
      secondsLeft: 0,
      isPaused: true,

      theme: "navy",

      setConfigValue: (key, value) => {
        set((state) => ({
          config: { ...state.config, [key]: value },
          activePresetId: "custom",
        }));
        get().buildTournament();
      },

      selectPreset: (presetId) => {
        const preset = get().presets.find((p) => p.id === presetId);
        if (preset) {
          set({ config: { ...preset.config }, activePresetId: presetId });
          get().buildTournament();
        }
      },

      buildTournament: () => {
        const { config } = get();
        let totalMinutes = 0;
        let gameLevelCounter = 1;
        const tempGrid: TournamentRow[] = [];

        // Находим индекс стартового блайнда в нашей жесткой структуре
        let blindsPointer = HARD_BLINDS_STRUCTURE.findIndex(
          (bb) => bb >= config.startBB,
        );
        if (blindsPointer === -1) blindsPointer = 0;

        // Генерируем ровно 20 ИГРОВЫХ уровней (перерывы в этот лимит не входят)
        while (gameLevelCounter <= HARD_BLINDS_STRUCTURE.length) {
          // Извлекаем текущий ББ по указателю
          let currentBB = HARD_BLINDS_STRUCTURE[blindsPointer];

          // Бесконечный предохранитель: если вышли за рамки массива, плавно растим блайнды х1.5
          if (!currentBB) {
            const lastBB =
              HARD_BLINDS_STRUCTURE[HARD_BLINDS_STRUCTURE.length - 1];
            const stepsOut = blindsPointer - (HARD_BLINDS_STRUCTURE.length - 1);
            currentBB =
              Math.round((lastBB * Math.pow(1.5, stepsOut)) / 100000) * 100000;
          }

          const sb = currentBB === 5 ? 2 : currentBB / 2;
          const ante =
            config.useAnte && currentBB >= config.anteStartBB ? currentBB : 0;

          tempGrid.push({
            isBreak: false,
            levelNum: gameLevelCounter,
            labelText: `Уровень ${gameLevelCounter}`,
            sb,
            bb: currentBB,
            ante,
            duration: config.levelDuration,
          });
          totalMinutes += config.levelDuration;

          // Смещаем указатель блайндов на следующий уровень только после успешной записи игры
          blindsPointer++;

          // Вставка перерыва
          if (gameLevelCounter % config.breakEvery === 0) {
            tempGrid.push({
              isBreak: true,
              levelNum: "—",
              labelText: `Перерыв`,
              sb: "—",
              bb: "—",
              ante: "—",
              duration: config.breakDuration,
            });
            totalMinutes += config.breakDuration;
          }
          gameLevelCounter++;
        }

        const h = Math.floor(totalMinutes / 60);
        const m = totalMinutes % 60;

        set({
          grid: tempGrid,
          currentIndex: 0,
          isPaused: true,
          secondsLeft: tempGrid.length > 0 ? tempGrid[0].duration * 60 : 0,
        });
      },

      setIsPaused: (paused) => set({ isPaused: paused }),
      setSecondsLeft: (seconds) => {
        if (typeof seconds === "function") {
          set((state) => ({ secondsLeft: seconds(state.secondsLeft) }));
        } else {
          set({ secondsLeft: seconds });
        }
      },

      nextLevel: () => {
        const { currentIndex, grid, isPaused } = get();
        const nextIndex = currentIndex + 1;

        if (nextIndex < grid.length) {
          set({
            currentIndex: nextIndex,
            secondsLeft: Number(grid[nextIndex].duration) * 60,
            isPaused: true,
          });
        } else {
          // Если турнир кончился — пауза
          set({ isPaused: true });
        }
      },

      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "poker-tournament-storage-v13", // Новый ключ кэша для полной очистки памяти
    },
  ),
);
