export type Theme = "navy" | "light";

export interface TournamentConfig {
  startBB: number;
  levelDuration: number;
  useAnte: boolean;
  anteStartBB: number;
  breakEvery: number;
  breakDuration: number;
}

export interface TournamentRow {
  isBreak: boolean;
  levelNum: number | "—";
  labelText: string;
  sb: number | "—";
  bb: number | "—";
  ante: number | "—";
  duration: number;
}

export interface Preset {
  id: string;
  name: string;
  config: TournamentConfig;
}

export interface UseTimerOptions {
  secondsLeft: number;
  isPaused: boolean;
  onTick: (seconds: number) => void;
  onComplete: () => void;
}

export interface PokerState {
  // Данные
  config: TournamentConfig;
  presets: Preset[];
  activePresetId: string;
  grid: TournamentRow[];
  isCustomGrid: boolean;

  // Таймер
  currentIndex: number;
  secondsLeft: number;
  isPaused: boolean;

  // UI
  theme: string;
  _hasHydrated: boolean;

  // Конфиг
  setConfigValue: <K extends keyof TournamentConfig>(
    key: K,
    value: TournamentConfig[K],
  ) => void;
  selectPreset: (presetId: string) => void;
  buildTournament: () => void;

  // Таймер
  setIsPaused: (paused: boolean) => void;
  setSecondsLeft: (seconds: number | ((prev: number) => number)) => void;
  nextLevel: (auto?: boolean) => void;

  // Кастомная сетка
  insertCustomRow: (index: number, isBreak: boolean) => void;
  removeCustomRow: (index: number) => void;
  updateCustomRow: (index: number, fields: Partial<TournamentRow>) => void;
  resetCustomGrid: () => void;

  // UI
  setTheme: (theme: string) => void;
  setHasHydrated: (state: boolean) => void;
}

export interface Navigation {
  title: string;
  desc: string;
  path: string;
  color: string;
}

export interface NumberFieldProps {
  id: string;
  label: string;
  value: number;
  min?: number;
  onChange: (value: number) => void;
}
