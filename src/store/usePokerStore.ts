// src/store/usePokerStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  TournamentRow,
  TournamentPreset,
  TournamentConfig,
} from "@/types/poker";

const BLINDS_STRING =
  "2 4 5 10 20 30 40 50 60 80 100 150 200 250 300 400 500 600 800 1000 1200 1400 1600 2000 2500 3000 4000 5000 6000 8000 10000 12000 15000 20000 25000 30000 40000 50000 60000 80000 100000 120000 150000 200000 300000 400000 500000 600000 800000 1000000";
const HARD_BLINDS_STRUCTURE: number[] = BLINDS_STRING.split(" ").map(Number);

// Вспомогательная функция для расчета общей длины турнира в часах и минутах
const calculateTotalDurationStr = (grid: TournamentRow[]): string => {
  const totalMinutes = grid.reduce(
    (sum, row) => sum + (Number(row.duration) || 0),
    0,
  );
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return `${h} ч. ${m} мин.`;
};

function generateBlindsGrid(config: TournamentConfig): {
  tempGrid: TournamentRow[];
  totalMinutes: number;
} {
  let totalMinutes = 0;
  let gameLevelCounter = 1;
  const tempGrid: TournamentRow[] = [];

  let blindsPointer = HARD_BLINDS_STRUCTURE.findIndex(
    (bb) => bb >= config.startBB,
  );
  if (blindsPointer === -1) blindsPointer = 0;

  while (gameLevelCounter <= 20) {
    let currentBB = HARD_BLINDS_STRUCTURE[blindsPointer];
    if (!currentBB) {
      const lastBB = HARD_BLINDS_STRUCTURE[HARD_BLINDS_STRUCTURE.length - 1];
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
    blindsPointer++;

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
  return { tempGrid, totalMinutes };
}

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
      warningTime: 60,
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
      warningTime: 30,
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
      warningTime: 15,
    },
  },
];

export const usePokerStore = create<any>()(
  persist(
    (set, get) => ({
      config: { ...defaultPresets[0].config },
      presets: defaultPresets,
      activePresetId: defaultPresets[0].id,
      grid: [],
      currentIndex: 0,
      secondsLeft: 0,
      isPaused: true,
      totalDurationStr: "0 ч. 0 мин.",
      theme: "navy",
      _hasHydrated: false,
      isCustomGrid: false, // Изначально выключен

      setConfigValue: (key: any, value: any) => {
        set((state: any) => ({
          config: { ...state.config, [key]: value },
          activePresetId: "custom",
          isCustomGrid: false, // Сбрасываем кастомную сетку, если крутят обычные ползунки
        }));
        get().buildTournament();
      },
      selectPreset: (presetId: string) => {
        const preset = get().presets.find((p: any) => p.id === presetId);
        if (preset) {
          set({
            config: { ...preset.config },
            activePresetId: presetId,
            isCustomGrid: false,
          });
          get().buildTournament();
        }
      },
      buildTournament: () => {
        const { config, isCustomGrid, grid } = get();

        // Если активирован режим ручного конструктора — не перезаписываем сетку
        if (isCustomGrid) {
          set({
            currentIndex: 0,
            isPaused: true,
            secondsLeft: grid.length > 0 ? Number(grid.duration) * 60 : 0,
            totalDurationStr: calculateTotalDurationStr(grid),
          });
          return;
        }

        const { tempGrid, totalMinutes } = generateBlindsGrid(config);
        const h = Math.floor(totalMinutes / 60);
        const m = totalMinutes % 60;
        set({
          grid: tempGrid,
          currentIndex: 0,
          isPaused: true,
          secondsLeft: tempGrid.length > 0 ? tempGrid[0].duration * 60 : 0,
          totalDurationStr: `${h} ч. ${m} мин.`,
        });
      },
      setIsPaused: (paused: boolean) => set({ isPaused: paused }),
      setSecondsLeft: (seconds: any) =>
        set((state: any) => ({
          secondsLeft:
            typeof seconds === "function"
              ? seconds(state.secondsLeft)
              : seconds,
        })),
      nextLevel: () => {
        const { currentIndex, grid } = get();
        const nextIndex = currentIndex + 1;
        if (nextIndex < grid.length) {
          set({
            currentIndex: nextIndex,
            secondsLeft: grid[nextIndex].duration * 60,
            isPaused: true,
          });
        } else {
          set({ isPaused: true });
        }
      },
      setTheme: (theme: any) => set({ theme }),
      setHasHydrated: (state: boolean) => set({ _hasHydrated: state }),

      // РЕАЛИЗАЦИЯ НОВЫХ ЭКШЕНОВ КОНСТРУКТОРА
      setCustomGrid: (newGrid: TournamentRow[]) => {
        set({ grid: newGrid, isCustomGrid: true, activePresetId: "custom" });
        get().buildTournament();
      },
      updateCustomRow: (index: number, fields: Partial<TournamentRow>) => {
        set((state: any) => {
          const updatedGrid = [...state.grid];
          updatedGrid[index] = { ...updatedGrid[index], ...fields };

          // Корректируем малый блайнд автоматически при ручном изменении ББ (кроме исключения ББ 5)
          if (fields.bb !== undefined && typeof fields.bb === "number") {
            updatedGrid[index].sb = fields.bb === 5 ? 2 : fields.bb / 2;
          }

          return {
            grid: updatedGrid,
            isCustomGrid: true,
            totalDurationStr: calculateTotalDurationStr(updatedGrid),
          };
        });
      },
      addCustomRow: (isBreak: boolean) => {
        set((state: any) => {
          const updatedGrid = [...state.grid];

          // Высчитываем номер следующего игрового уровня
          const lastGameLevel = [...updatedGrid]
            .reverse()
            .find((r) => !r.isBreak);
          const nextNum = lastGameLevel
            ? (Number(lastGameLevel.levelNum) || 0) + 1
            : 1;

          const newRow: TournamentRow = isBreak
            ? {
                isBreak: true,
                levelNum: "—",
                labelText: "Перерыв",
                sb: "—",
                bb: "—",
                ante: "—",
                duration: 10,
              }
            : {
                isBreak: false,
                levelNum: nextNum,
                labelText: `Уровень ${nextNum}`,
                sb: 100,
                bb: 200,
                ante: 0,
                duration: 15,
              };

          updatedGrid.push(newRow);
          return {
            grid: updatedGrid,
            isCustomGrid: true,
            totalDurationStr: calculateTotalDurationStr(updatedGrid),
          };
        });
      },
      removeCustomRow: (index: number) => {
        set((state: any) => {
          const updatedGrid = state.grid.filter(
            (_: any, i: number) => i !== index,
          );

          // Пересчитываем нумерацию уровней с самого начала, чтобы не ломался порядок
          let gameCounter = 1;
          const normalGrid = updatedGrid.map((row: any) => {
            if (row.isBreak) return row;
            const r = {
              ...row,
              levelNum: gameCounter,
              labelText: `Уровень ${gameCounter}`,
            };
            gameCounter++;
            return r;
          });

          return {
            grid: normalGrid,
            isCustomGrid: true,
            totalDurationStr: calculateTotalDurationStr(normalGrid),
          };
        });
      },
    }),
    {
      name: "poker-timer-v26", // Новая версия кэша для безопасной инициализации структуры
      skipHydration: true,
    },
  ),
);
