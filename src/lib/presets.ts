import { TournamentPreset } from "@/types/poker";

export const defaultPresets: TournamentPreset[] = [
  {
    id: "regular",
    name: "Regular",
    config: {
      startBB: 4,
      levelDuration: 15,
      useAnte: true,
      anteStartBB: 40,
      breakEvery: 4,
      breakDuration: 10,
      warningTime: 60,
    },
  },
  {
    id: "turbo",
    name: "Turbo",
    config: {
      startBB: 4,
      levelDuration: 8,
      useAnte: true,
      anteStartBB: 60,
      breakEvery: 5,
      breakDuration: 5,
      warningTime: 30,
    },
  },
  {
    id: "hyper",
    name: "Hyper",
    config: {
      startBB: 10,
      levelDuration: 3,
      useAnte: false,
      anteStartBB: 100,
      breakEvery: 6,
      breakDuration: 3,
      warningTime: 15,
    },
  },
];
