import { Tournament } from "./tournament";

export type TimerStatus = "idle" | "running" | "paused" | "finished";

export interface TimerState {
  status: TimerStatus;
  tournament: Tournament | null;
  currentStageIndex: number;
  remainingSec: number;
  startedAt: number | null;
  baseRemainingSec: number;
  autoAdvance: boolean;
  soundEnabled: boolean;
}
