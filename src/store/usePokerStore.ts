import { create } from "zustand";
import { persist } from "zustand/middleware";
import { defaultPresets } from "@/lib/presets";
import { TournamentRow } from "@/types/poker";
import generateBlindsGrid from "@/utils/generateBlindsGrid";

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

        const { tempGrid } = generateBlindsGrid(config);
        set({
          grid: tempGrid,
          currentIndex: 0,
          isPaused: true,
          secondsLeft: tempGrid.length > 0 ? tempGrid[0].duration * 60 : 0,
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

      setTheme: (theme: string) => set({ theme }),
      setHasHydrated: (state: boolean) => set({ _hasHydrated: state }),

      // Вспомогательный метод для автоматического пересчета сквозной нумерации уровней
      reindexGrid: (updatedGrid: TournamentRow[]) => {
        let gameCounter = 1;
        return updatedGrid.map((row: TournamentRow) => {
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
