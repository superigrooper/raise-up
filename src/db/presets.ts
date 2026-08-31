import { Preset } from "@/types/poker";

export const defaultPresets: Preset[] = [
  {
    id: "regular",
    name: " Регулярный",
    config: {
      startBB: 2,
      levelDuration: 15,
      useAnte: false,
      anteStartBB: 200,
      breakEvery: 4,
      breakDuration: 10,
      warningTime: 30,
    },
  },
  {
    id: "turbo",
    name: "Турбо",
    config: {
      startBB: 10,
      levelDuration: 10,
      useAnte: true,
      anteStartBB: 150,
      breakEvery: 3,
      breakDuration: 10,
      warningTime: 30,
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
      breakEvery: 3,
      breakDuration: 5,
      warningTime: 30,
    },
  },
  {
    id: "hyper-turbo",
    name: "Гипер-турбо",
    config: {
      startBB: 100,
      levelDuration: 1,
      useAnte: true,
      anteStartBB: 100,
      breakEvery: 3,
      breakDuration: 3,
      warningTime: 50,
    },
  },
];
