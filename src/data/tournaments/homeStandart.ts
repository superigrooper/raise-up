import { TournamentPreset } from "@/types/preset";

function increaseByPercentage(number: number, percent: number): number {
  const result = number * (1 + percent / 100);
  return Math.ceil(Math.round(result * 100) / 100);
}

const dataSetting = {
  duration: 900,
  SB: 5,
  BB: 10,
  ante: 0,
};

export const homeStandart: TournamentPreset = {
  id: "home-standard",
  name: "Обычный домашний",
  description: "Классический домашний турнир на 3–4 часа.",
  recommendedPlayers: "6–10 игроков",
  estimatedDurationMin: 900,
  startingStack: 10000,
  stages: [
    {
      id: "hs-1",
      type: "level",
      levelNumber: 1,
      smallBlind: 5,
      bigBlind: 10,
      ante: 0,
      durationSec: duration,
    },
    {
      id: "hs-2",
      type: "level",
      levelNumber: 2,
      smallBlind: 10,
      bigBlind: 20,
      ante: 0,
      durationSec: duration,
    },
    {
      id: "hs-3",
      type: "level",
      levelNumber: 3,
      smallBlind: 20,
      bigBlind: 40,
      ante: 0,
      durationSec: duration,
    },
    {
      id: "hs-4",
      type: "level",
      levelNumber: 4,
      smallBlind: 25,
      bigBlind: 50,
      ante: 0,
      durationSec: duration,
    },
    {
      id: "hs-break-1",
      type: "break",
      title: "Перерыв",
      durationSec: 600,
    },
    {
      id: "hs-5",
      type: "level",
      levelNumber: 5,
      smallBlind: 50,
      bigBlind: 100,
      ante: 0,
      durationSec: duration,
    },
    {
      id: "hs-6",
      type: "level",
      levelNumber: 6,
      smallBlind: 75,
      bigBlind: 150,
      ante: 0,
      durationSec: duration,
    },
    {
      id: "hs-7",
      type: "level",
      levelNumber: 7,
      smallBlind: 100,
      bigBlind: 200,
      ante: 0,
      durationSec: duration,
    },
    {
      id: "hs-8",
      type: "level",
      levelNumber: 8,
      smallBlind: 150,
      bigBlind: 300,
      ante: 0,
      durationSec: duration,
    },
    {
      id: "hs-9",
      type: "level",
      levelNumber: 9,
      smallBlind: 200,
      bigBlind: 400,
      ante: 0,
      durationSec: duration,
    },
  ],
};
