import { create } from "zustand";
import { persist } from "zustand/middleware";
import { defaultPresets } from "@/lib/presets";
import { TournamentRow, PokerState } from "@/types/poker";
import generateBlindsGrid from "@/utils/generateBlindsGrid";

const CUSTOM_PRESET_ID = "custom" as const;
const STORE_NAME = "poker-timer";
const STORE_VERSION = 3;

/**
 * Пересчитывает SB:
 * BB = 5 → SB = 2 (исключение, т.к. половина не целое)
 * BB = любой другой → SB = BB / 2
 */
export const calcSbFromBb = (bb: number): number => (bb === 5 ? 2 : bb / 2);

/**
 * Восстанавливает сквозную нумерацию уровней (не перерывов).
 */
export const reindexGrid = (grid: TournamentRow[]): TournamentRow[] => {
  let counter = 1;
  return grid.map((row) => {
    if (row.isBreak) return row;
    const updated: TournamentRow = {
      ...row,
      levelNum: counter,
      labelText: `Уровень ${counter}`,
    };
    counter++;
    return updated;
  });
};

export const usePokerStore = create<PokerState>()(
  persist(
    (set, get) => ({
      // ── Начальное состояние ──
      config: { ...defaultPresets[0].config },
      presets: defaultPresets,
      activePresetId: defaultPresets[0].id,
      grid: [],
      isCustomGrid: false,
      currentIndex: 0,
      secondsLeft: 0,
      isPaused: true,
      autoStart: false, // 
      theme: "light",
      _hasHydrated: false,

      // ── Конфиг ──
      setAutoStart: (value) => set({ autoStart: value }),

      setConfigValue: (key, value) => {
        set((state) => ({
          config: { ...state.config, [key]: value },
          activePresetId: CUSTOM_PRESET_ID,
          isCustomGrid: false,
        }));
        get().buildTournament();
      },

      selectPreset: (presetId) => {
        const preset = get().presets.find((p) => p.id === presetId);

        if (!preset) {
          console.warn(`[usePokerStore] Пресет с id="${presetId}" не найден`);
          return;
        }

        set({
          config: { ...preset.config },
          activePresetId: presetId,
          isCustomGrid: false,
        });
        get().buildTournament();
      },

      buildTournament: () => {
        const { config, isCustomGrid, grid } = get();

        // Кастомная сетка: сбрасываем только позицию и таймер,
        // структуру не трогаем
        if (isCustomGrid) {
          set({
            currentIndex: 0,
            isPaused: true,
            // Исправлен баг: grid[0].duration вместо grid.duration
            secondsLeft: grid.length > 0 ? grid[0].duration * 60 : 0,
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

      // ── Таймер ──

      setIsPaused: (paused) => set({ isPaused: paused }),

      setSecondsLeft: (seconds) =>
        set((state) => ({
          secondsLeft:
            typeof seconds === "function"
              ? seconds(state.secondsLeft)
              : seconds,
        })),

      /**
       * auto=false — ручной переход (ставим на паузу)
       * auto=true  — автопереход по таймеру (продолжаем играть)
       */
       nextLevel: (auto = false) => {
        const { currentIndex, grid, autoStart } = get();
        const nextIndex = currentIndex + 1;

        if (nextIndex < grid.length) {
          set({
            currentIndex: nextIndex,
            secondsLeft: grid[nextIndex].duration * 60,
            // Ручной переход → всегда пауза
            // Автопереход → смотрим на настройку autoStart
            isPaused: auto ? !autoStart : true,
          });
        } else {
          set({ isPaused: true });
        }
      },

      // ── Кастомная сетка ──

      insertCustomRow: (index, isBreak) => {
        set((state) => {
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
                labelText: "Уровень 1",
                sb: 100,
                bb: 200,
                ante: 0,
                duration: 15,
              };

          updatedGrid.splice(index, 0, newRow);

          return {
            grid: reindexGrid(updatedGrid),
            isCustomGrid: true,
          };
        });
      },

      removeCustomRow: (index) => {
        set((state) => {
          const updatedGrid = state.grid.filter((_, i) => i !== index);
          return {
            grid: reindexGrid(updatedGrid),
            isCustomGrid: true,
          };
        });
      },

      updateCustomRow: (index, fields) => {
        set((state) => {
          const updatedGrid = [...state.grid];
          const current = updatedGrid[index];
          const updated: TournamentRow = { ...current, ...fields };

          // Автопересчёт SB при изменении BB по правилам покера:
          // BB=5 → SB=2, иначе SB = BB/2
          if (fields.bb !== undefined && typeof fields.bb === "number") {
            updated.sb = calcSbFromBb(fields.bb);
          }

          updatedGrid[index] = updated;

          return {
            grid: updatedGrid,
            isCustomGrid: true,
          };
        });
      },

      resetCustomGrid: () => {
        set({
          isCustomGrid: false,
          currentIndex: 0,
          isPaused: true,
        });
        get().buildTournament();
      },

      // ── UI ──

      setTheme: (theme) => set({ theme }),
      setHasHydrated: (state) => set({ _hasHydrated: state }),
    }),

    {
      name: STORE_NAME,
      version: STORE_VERSION,

      // Сохраняем только конфигурационные данные.
      // secondsLeft / isPaused / currentIndex не персистируем —
      // при перезагрузке страницы таймер всегда стартует заново.
      partialize: (state) => ({
        config: state.config,
        presets: state.presets,
        activePresetId: state.activePresetId,
        theme: state.theme,
        grid: state.grid,
        isCustomGrid: state.isCustomGrid,
                autoStart: state.autoStart,
      }),

      // Миграции при смене версии схемы
      migrate: (persistedState, version) => {
        console.info(
          `[usePokerStore] Миграция с версии ${version} → ${STORE_VERSION}`,
        );
        return persistedState as PokerState;
      },

      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
