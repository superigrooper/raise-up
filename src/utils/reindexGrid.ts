import { TournamentRow } from "@/types/poker";

export default function reindexGrid(grid: TournamentRow[]): TournamentRow[] {
  let counter = 1;
  return grid.map((row) => {
    if (row.isBreak) return row;
    const updated: TournamentRow = {
      ...row,
      levelNum: counter,
      labelText: `Уровень ${counter}`,
    };
    counter++;
    return updated;
  });
}
