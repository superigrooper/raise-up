// store/usePokerStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PokerStore, TournamentConfig, TournamentRow, TournamentPreset } from '@/types/poker';

const defaultPresets: TournamentPreset[] = [
  {
    id: 'regular',
    name: 'Regular (Глубокий)',
    config: { startBB: 200, percentGrowth: 25, levelDuration: 15, anteStartBB: 400, breakEvery: 4, breakDuration: 10 }
  },
  {
    id: 'turbo',
    name: 'Turbo (Быстрый)',
    config: { startBB: 200, percentGrowth: 35, levelDuration: 8, anteStartBB: 600, breakEvery: 5, breakDuration: 5 }
  },
  {
    id: 'hyper',
    name: 'Hyper-Turbo (Взрывной)',
    config: { startBB: 400, percentGrowth: 50, levelDuration: 3, anteStartBB: 400, breakEvery: 6, breakDuration: 3 }
  }
];

const getRoundStep = (blind: number): number => {
  if (blind < 500) return 25;
  if (blind < 3000) return 100;
  if (blind < 10000) return 500;
  if (blind < 50000) return 1000;
  return 5000;
};

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
      totalDurationStr: '0 ч. 0 мин.',

      setConfigValue: (key, value) => {
        set((state) => ({
          config: { ...state.config, [key]: value },
          activePresetId: 'custom' // Сбрасываем пресет, если пользователь меняет значения руками
        }));
      },

      selectPreset: (presetId) => {
        const preset = get().presets.find(p => p.id === presetId);
        if (preset) {
          set({
            config: { ...preset.config },
            activePresetId: presetId
          });
          get().buildTournament();
        }
      },

      buildTournament: () => {
        const { config } = get();
        let currentBB = config.startBB;
        let totalMinutes = 0;
        let gameLevelCounter = 1;
        const tempGrid: TournamentRow[] = [];

        for (let i = 1; i <= 20; i++) {
          const sb = currentBB / 2;
          const ante = currentBB >= config.anteStartBB ? currentBB : 0;

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

          if (gameLevelCounter % config.breakEvery === 0) {
            tempGrid.push({
              isBreak: true,
              levelNum: '—',
              labelText: `Перерыв`,
              sb: '—',
              bb: '—',
              ante: '—',
              duration: config.breakDuration,
            });
            totalMinutes += config.breakDuration;
          }
          gameLevelCounter++;

          const rawNextBB = currentBB * (1 + config.percentGrowth / 100);
          const step = getRoundStep(rawNextBB);
          currentBB = Math.ceil(rawNextBB / step) * step;
        }

        const h = Math.floor(totalMinutes / 60);
        const m = totalMinutes % 60;

        set({
          grid: tempGrid,
          currentIndex: 0,
          isPaused: true,
          secondsLeft: tempGrid.length > 0 ? tempGrid[0].duration * 60 : 0,
          totalDurationStr: `${h} ч. ${m} мин.`
        });
      },

      setIsPaused: (paused) => set({ isPaused: paused }),

      setSecondsLeft: (seconds) => {
        if (typeof seconds === 'function') {
          set((state) => ({ secondsLeft: seconds(state.secondsLeft) }));
        } else {
          set({ secondsLeft: seconds });
        }
      },

      nextLevel: () => {
        const { currentIndex, grid } = get();
        const nextIndex = currentIndex + 1;
        if (nextIndex < grid.length) {
          set({
            currentIndex: nextIndex,
            secondsLeft: grid[nextIndex].duration * 60
          });
        } else {
          set({ isPaused: true });
        }
      }
    }),
    {
      name: 'poker-tournament-storage-v2',
    }
  )
);
