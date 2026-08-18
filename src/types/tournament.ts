export type BlindOrBreakLevelType = "level" | "break";

export interface BlindLevel {
  id: string;
  type: "level";
  levelNumber: number;
  smallBlind: number;
  bigBlind: number;
  ante?: number;
  durationSec: number;
}

export interface BreakLevel {
  id: string;
  type: "break";
  title: string;
  durationSec: number;
}

export type TournamentStage = BlindLevel | BreakLevel;

export interface Tournament {
  id: string;
  name: string;
  startingStack?: number;
  playersCount?: number;
  stages: TournamentStage[];
  createdAt: string;
  updatedAt: string;
}
