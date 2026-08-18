import { Tournament } from "@/types/tournament";
import { TournamentPreset } from "@/types/preset";

export function presetTournament(preset: TournamentPreset): Tournament {
  const now = new Date().toISOString();

  return {
    id: crypto.randomUUID(),
    name: preset.name,
    startingStack: preset.startingStack,
    playersCount: undefined,
    stages: preset.stages.map((stage) => ({
      ...stage,
      id: crypto.randomUUID(),
    })),
    createdAt: now,
    updatedAt: now,
  };
}
