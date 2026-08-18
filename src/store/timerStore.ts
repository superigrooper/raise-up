import { create } from "zustand";
import { Tournament, TournamentStage } from "@/types/tournament";
import { TimerStatus } from "@/types/timer";

interface TimerStore {
  status: TimerStatus;
  tournament: Tournament | null;
  currentStageIndex: number;
  remainingSec: number;
  startedAt: number | null;
  baseRemainingSec: number;
  autoAdvance: boolean;

  loadTournament: (tournament: Tournament) => void;
  start: () => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
  tick: () => void;
  goToNextStage: () => void;
  goToPreviousStage: () => void;
}

function getStageDuration(stage?: TournamentStage): number {
  return stage?.durationSec ?? 0;
}

export const useTimerStore = create<TimerStore>((set, get) => ({
  status: "idle",
  tournament: null,
  currentStageIndex: 0,
  remainingSec: 0,
  startedAt: null,
  baseRemainingSec: 0,
  autoAdvance: true,

  loadTournament: (tournament) => {
    const firstStage = tournament.stages[0];

    set({
      tournament,
      currentStageIndex: 0,
      status: "idle",
      remainingSec: getStageDuration(firstStage),
      baseRemainingSec: getStageDuration(firstStage),
      startedAt: null,
    });
  },

  start: () => {
    const { tournament, currentStageIndex } = get();
    if (!tournament) return;

    const stage = tournament.stages[currentStageIndex];
    const duration = getStageDuration(stage);

    set({
      status: "running",
      remainingSec: duration,
      baseRemainingSec: duration,
      startedAt: Date.now(),
    });
  },

  pause: () => {
    const { status, remainingSec } = get();
    if (status !== "running") return;

    set({
      status: "paused",
      startedAt: null,
      baseRemainingSec: remainingSec,
    });
  },

  resume: () => {
    const { status, remainingSec } = get();
    if (status !== "paused") return;

    set({
      status: "running",
      startedAt: Date.now(),
      baseRemainingSec: remainingSec,
    });
  },

  reset: () => {
    const { tournament, currentStageIndex } = get();
    const stage = tournament?.stages[currentStageIndex];
    const duration = getStageDuration(stage);

    set({
      status: "idle",
      remainingSec: duration,
      baseRemainingSec: duration,
      startedAt: null,
    });
  },

  tick: () => {
    const {
      status,
      startedAt,
      baseRemainingSec,
      tournament,
      currentStageIndex,
      autoAdvance,
    } = get();

    if (status !== "running" || !startedAt || !tournament) return;

    const elapsedSec = Math.floor((Date.now() - startedAt) / 1000);
    const nextRemainingSec = Math.max(baseRemainingSec - elapsedSec, 0);

    set({ remainingSec: nextRemainingSec });

    if (nextRemainingSec > 0) return;

    const isLastStage = currentStageIndex >= tournament.stages.length - 1;

    if (isLastStage) {
      set({
        status: "finished",
        startedAt: null,
        remainingSec: 0,
      });
      return;
    }

    if (autoAdvance) {
      get().goToNextStage();

      set({
        status: "running",
        startedAt: Date.now(),
      });
    } else {
      set({
        status: "paused",
        startedAt: null,
        remainingSec: 0,
      });
    }
  },

  goToNextStage: () => {
    const { tournament, currentStageIndex } = get();
    if (!tournament) return;

    const nextIndex = Math.min(
      currentStageIndex + 1,
      tournament.stages.length - 1,
    );

    const stage = tournament.stages[nextIndex];
    const duration = getStageDuration(stage);

    set({
      currentStageIndex: nextIndex,
      remainingSec: duration,
      baseRemainingSec: duration,
      startedAt: null,
      status: "idle",
    });
  },

  goToPreviousStage: () => {
    const { tournament, currentStageIndex } = get();
    if (!tournament) return;

    const previousIndex = Math.max(currentStageIndex - 1, 0);
    const stage = tournament.stages[previousIndex];
    const duration = getStageDuration(stage);

    set({
      currentStageIndex: previousIndex,
      remainingSec: duration,
      baseRemainingSec: duration,
      startedAt: null,
      status: "idle",
    });
  },
}));
