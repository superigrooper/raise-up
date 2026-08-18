import { TournamentStage } from "./tournament";

export interface TournamentPreset {
  id: string;
  name: string;
  description: string;
  recommendedPlayers: string;
  estimatedDurationMin: number;
  startingStack: number;
  stages: TournamentStage[];
}
