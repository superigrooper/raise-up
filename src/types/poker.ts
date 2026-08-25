// src/types/poker.ts
export type Theme = "navy" | "light";

export interface TournamentConfig {
  startBB: number;
  levelDuration: number;
  useAnte: boolean;
  anteStartBB: number;
  breakEvery: number;
  breakDuration: number;
}

export interface TournamentPreset {
  id: string;
  name: string;
  config: TournamentConfig;
}

export interface TournamentRow {
  isBreak: boolean;
  levelNum: number | string;
  labelText: string;
  sb: number | string;
  bb: number | string;
  ante: number | string;
  duration: number;
}

export interface PokerStore {
  config: TournamentConfig;
  presets: TournamentPreset[];
  activePresetId: string;
  grid: TournamentRow[];
  currentIndex: number;
  secondsLeft: number;
  isPaused: boolean;
  theme: Theme;
  _hasHydrated: boolean;
  isCustomGrid: boolean; // Флаг: используется ли созданная вручную структура

  setConfigValue: (
    key: keyof TournamentConfig,
    value: number | boolean,
  ) => void;
  selectPreset: (presetId: string) => void;
  buildTournament: () => void;
  setIsPaused: (paused: boolean) => void;
  setSecondsLeft: (seconds: number | ((prev: number) => number)) => void;
  nextLevel: () => void;
  setTheme: (theme: Theme) => void;
  setHasHydrated: (state: boolean) => void;

  // НОВЫЕ ЭКШЕНЫ ДЛЯ РУЧНОГО КОНСТРУКТОРА
  setCustomGrid: (newGrid: TournamentRow[]) => void;
  updateCustomRow: (index: number, fields: Partial<TournamentRow>) => void;
  // addCustomRow: (isBreak: boolean) => void;
  insertCustomRow: (index: number, isBreak: boolean) => void;
  removeCustomRow: (index: number) => void;
  resetCustomGrid: () => void;
}
