import { TournamentConfig, TournamentRow } from "@/types/poker";

const BIG_BLINDS_ARRAY: number[] = [
  2, 5, 10, 20, 30, 40, 50, 60, 80, 100, 150, 200, 250, 300, 400, 500, 600, 800,
  1000, 1200, 1400, 1600, 2000, 2500, 3000, 4000, 5000, 6000, 8000, 10000,
  12000, 15000, 20000, 25000, 30000, 40000, 50000, 60000, 80000, 100000, 120000,
  150000, 200000, 300000, 400000, 500000, 600000, 800000, 1000000,
];

export default function generateBlindsGrid(config: TournamentConfig): {
  tempGrid: TournamentRow[];
  totalMinutes: number;
} {
  let totalMinutes = 0;
  let gameLevelCounter = 1;
  const tempGrid: TournamentRow[] = [];

  let blindsPointer = BIG_BLINDS_ARRAY.findIndex((bb) => bb >= config.startBB);
  if (blindsPointer === -1) blindsPointer = 0;

  while (gameLevelCounter <= BIG_BLINDS_ARRAY.length - 1) {
    let currentBB = BIG_BLINDS_ARRAY[blindsPointer];
    if (!currentBB) {
      const lastBB = BIG_BLINDS_ARRAY[BIG_BLINDS_ARRAY.length - 1];
      const stepsOut = blindsPointer - (BIG_BLINDS_ARRAY.length - 1);
      currentBB =
        Math.round((lastBB * Math.pow(1.5, stepsOut)) / 100000) * 100000;
    }

    const sb = currentBB === 5 ? 2 : currentBB / 2;
    const ante =
      config.useAnte && currentBB >= config.anteStartBB ? currentBB * 0.1 : 0;

    tempGrid.push({
      isBreak: false,
      levelNum: gameLevelCounter,
      labelText: `Уровень ${gameLevelCounter}`,
      sb,
      bb: currentBB,
      ante,
      duration: config.levelDuration,
    });
    totalMinutes += config.levelDuration;
    blindsPointer++;

    if (gameLevelCounter % config.breakEvery === 0) {
      tempGrid.push({
        isBreak: true,
        levelNum: "—",
        labelText: `Перерыв`,
        sb: "—",
        bb: "—",
        ante: "—",
        duration: config.breakDuration,
      });
      totalMinutes += config.breakDuration;
    }
    gameLevelCounter++;
  }
  return { tempGrid, totalMinutes };
}
