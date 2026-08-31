export type Theme = "navy" | "light";
export type Tab = "combinations" | "charts" | "dictionary";

export interface TournamentConfig {
  startBB: number;
  levelDuration: number;
  useAnte: boolean;
  anteStartBB: number;
  breakEvery: number;
  breakDuration: number;
  warningTime: number;
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
  config: TournamentConfig;
  presets: Preset[];
  activePresetId: string;
  grid: TournamentRow[];
  isCustomGrid: boolean;
  currentIndex: number;
  secondsLeft: number;
  isPaused: boolean;
  autoStart: boolean;
  theme: Theme;
  _hasHydrated: boolean;

  setConfigValue: <K extends keyof TournamentConfig>(
    key: K,
    value: TournamentConfig[K],
  ) => void;
  selectPreset: (presetId: string) => void;
  buildTournament: () => void;
  setIsPaused: (paused: boolean) => void;
  setSecondsLeft: (seconds: number | ((prev: number) => number)) => void;
  nextLevel: (auto?: boolean) => void;
  insertCustomRow: (index: number, isBreak: boolean) => void;
  removeCustomRow: (index: number) => void;
  updateCustomRow: (index: number, fields: Partial<TournamentRow>) => void;
  resetCustomGrid: () => void;
  setTheme: (theme: Theme) => void;
  setHasHydrated: (state: boolean) => void;
  setAutoStart: (value: boolean) => void;
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
