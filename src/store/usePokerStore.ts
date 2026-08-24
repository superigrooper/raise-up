import { create } from "zustand";
import { persist } from "zustand/middleware";
import { defaultPresets } from "@/lib/presets";
import {
  TournamentRow,
  TournamentConfig,
} from "@/types/poker";

const BLINDS_STRING =
  "2 4 5 10 20 30 40 50 60 80 100 150 200 250 300 400 500 600 800 1000 1200 1400 1600 2000 2500 3000 4000 5000 6000 8000 10000 12000 15000 20000 25000 30000 40000 50000 60000 80000 100000 120000 150000 200000 300000 400000 500000 600000 800000 1000000";
const HARD_BLINDS_STRUCTURE: number[] = BLINDS_STRING.split(" ").map(Number);

// Генератор стандартной жесткой сетки блайндов для дефолтных пресетов
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
      isCustomGrid: false,

      setConfigValue: (key: any, value: any) => {
        set((state: any) => ({
          config: { ...state.config, [key]: value },
          activePresetId: "custom",
          isCustomGrid: false,
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

        // Если используется кастомная сетка, пересчитываем только тайминги
        if (isCustomGrid) {
          set({
            currentIndex: 0,
            isPaused: true,
            secondsLeft: grid.length > 0 ? Number(grid.duration) * 60 : 0,
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

      // Вспомогательный метод для автоматического пересчета сквозной нумерации уровней
      reindexGrid: (updatedGrid: TournamentRow[]) => {
        let gameCounter = 1;
        return updatedGrid.map((row: any) => {
          if (row.isBreak) return row;
          const r = {
            ...row,
            levelNum: gameCounter,
            labelText: `Уровень ${gameCounter}`,
          };
          gameCounter++;
          return r;
        });
      },

      // УНИВЕРСАЛЬНЫЙ ЭКШЕН КОНТЕКСТНОЙ ВСТАВКИ В ЛЮБОЕ МЕСТО ТАБЛИЦЫ
      insertCustomRow: (index: number, isBreak: boolean) => {
        set((state: any) => {
          const updatedGrid = [...state.grid];

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
                levelNum: 1,
                labelText: "Уровень",
                sb: 100,
                bb: 200,
                ante: 0,
                duration: 15,
              };

          // Вставляем новую плашку по указанному индексу
          updatedGrid.splice(index, 0, newRow);

          // Перестраиваем нумерацию "Уровень 1, 2, 3..." с самого начала
          const normalGrid = get().reindexGrid(updatedGrid);

          return {
            grid: normalGrid,
            isCustomGrid: true,
          };
        });
      },

      removeCustomRow: (index: number) => {
        set((state: any) => {
          const updatedGrid = state.grid.filter(
            (_: any, i: number) => i !== index,
          );

          // Восстанавливаем сквозную нумерацию уровней после удаления
          const normalGrid = get().reindexGrid(updatedGrid);

          return {
            grid: normalGrid,
            isCustomGrid: true,
          };
        });
      },

      updateCustomRow: (index: number, fields: Partial<TournamentRow>) => {
        set((state: any) => {
          const updatedGrid = [...state.grid];
          updatedGrid[index] = { ...updatedGrid[index], ...fields };

          // Автоматический пересчет Малого блайнда при ручном изменении Большого
          if (fields.bb !== undefined && typeof fields.bb === "number") {
            updatedGrid[index].sb = fields.bb === 5 ? 2 : fields.bb / 2;
          }

          return {
            grid: updatedGrid,
            isCustomGrid: true,
          };
        });
      },
      // Вставить внутрь usePokerStore в файле src/store/usePokerStore.ts:

      resetCustomGrid: () => {
        set({
          isCustomGrid: false,
          currentIndex: 0,
          isPaused: true,
        });
        // Вызываем базовую генерацию турнира по стандартным правилам пресета
        get().buildTournament();
      },
    }),
    {
      name: "poker-timer-v26",
      skipHydration: true,
    },
  ),
);
