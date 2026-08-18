/**
 * @param totalSec
 * @returns strintg format: 00:00 - M:S
 */

export function formatTime(totalSec: number): string {
  const safeTotalSec = Math.max(0, Math.floor(totalSec));

  const minutes = Math.floor(safeTotalSec / 60);
  const seconds = safeTotalSec % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}
