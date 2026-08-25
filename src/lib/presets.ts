import { TournamentPreset } from "@/types/poker";

export const defaultPresets: TournamentPreset[] = [
  {
    id: "regular",
    name: " Регулярный",
    config: {
      startBB: 2,
      levelDuration: 20,
      useAnte: true,
      anteStartBB: 100,
      breakEvery: 3,
      breakDuration: 15,
    },
  },
  {
    id: "turbo",
    name: "Турбо",
    config: {
      startBB: 10,
      levelDuration: 15,
      useAnte: true,
      anteStartBB: 60,
      breakEvery: 4,
      breakDuration: 15,
    },
  },
  {
    id: "hyper",
    name: "Гипер",
    config: {
      startBB: 50,
      levelDuration: 5,
      useAnte: true,
      anteStartBB: 50,
      breakEvery: 5,
      breakDuration: 5,
    },
  },
];
