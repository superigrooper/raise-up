import { create } from "zustand";
import { Tournament, TournamentStage } from "@/types/tournament";

function createEmptyTournament(): Tournament {
  return {
    id: "custom",
    name: "Custom Tournament",
    startingStack: 10000,
    playersCount: 8,
    stages: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

interface TournamentStore {
  currentTournament: Tournament;

  loadTournament: (tournament: Tournament) => void;
  setTournamentName: (name: string) => void;
  setStartingStack: (stack: number) => void;
  setPlayersCount: (count: number) => void;

  addStage: (stage: Omit<TournamentStage, "id">) => void;
  updateStage: (id: string, patch: Partial<TournamentStage>) => void;
  removeStage: (id: string) => void;
  replaceStages: (stages: TournamentStage[]) => void;
}

export const useTournamentStore = create<TournamentStore>((set) => ({
  currentTournament: createEmptyTournament(),

  loadTournament: (tournament) => {
    set({
      currentTournament: {
        ...tournament,
        updatedAt: new Date().toISOString(),
      },
    });
  },

  setTournamentName: (name) => {
    set((state) => ({
      currentTournament: {
        ...state.currentTournament,
        name,
        updatedAt: new Date().toISOString(),
      },
    }));
  },

  setStartingStack: (stack) => {
    set((state) => ({
      currentTournament: {
        ...state.currentTournament,
        startingStack: stack,
        updatedAt: new Date().toISOString(),
      },
    }));
  },

  setPlayersCount: (count) => {
    set((state) => ({
      currentTournament: {
        ...state.currentTournament,
        playersCount: count,
        updatedAt: new Date().toISOString(),
      },
    }));
  },

  addStage: (stage) => {
    set((state) => ({
      currentTournament: {
        ...state.currentTournament,
        stages: [
          ...state.currentTournament.stages,
          {
            ...stage,
            id: crypto.randomUUID(),
          } as TournamentStage,
        ],
        updatedAt: new Date().toISOString(),
      },
    }));
  },

  updateStage: (id, patch) => {
    set((state) => ({
      currentTournament: {
        ...state.currentTournament,
        stages: state.currentTournament.stages.map((stage) =>
          stage.id === id ? ({ ...stage, ...patch } as TournamentStage) : stage,
        ),
        updatedAt: new Date().toISOString(),
      },
    }));
  },

  removeStage: (id) => {
    set((state) => ({
      currentTournament: {
        ...state.currentTournament,
        stages: state.currentTournament.stages.filter(
          (stage) => stage.id !== id,
        ),
        updatedAt: new Date().toISOString(),
      },
    }));
  },

  replaceStages: (stages) => {
    set((state) => ({
      currentTournament: {
        ...state.currentTournament,
        stages,
        updatedAt: new Date().toISOString(),
      },
    }));
  },
}));
