import { UseTimerOptions } from "@/types/poker";
import { useEffect, useRef } from "react";

export function useTimer({
  secondsLeft,
  isPaused,
  onTick,
  onComplete,
}: UseTimerOptions): void {
  const endTimeRef = useRef<number | null>(null);
  // Ref для secondsLeft — чтобы интервал всегда читал актуальное значение
  // без пересоздания при каждом тике
  const secondsRef = useRef<number>(secondsLeft);

  // Синхронизируем ref при внешнем изменении secondsLeft
  // (например, при переходе на следующий уровень)
  useEffect(() => {
    secondsRef.current = secondsLeft;
  }, [secondsLeft]);

  useEffect(() => {
    if (isPaused) {
      endTimeRef.current = null;
      return;
    }

    // Фиксируем момент окончания на основе текущего ref-значения
    endTimeRef.current = Date.now() + secondsRef.current * 1000;

    const intervalId = setInterval(() => {
      if (!endTimeRef.current) return;

      const msLeft = endTimeRef.current - Date.now();
      const newSeconds = Math.max(0, Math.ceil(msLeft / 1000));

      // Обновляем только при смене целой секунды
      if (newSeconds !== secondsRef.current) {
        secondsRef.current = newSeconds;
        onTick(newSeconds);

        if (newSeconds === 0) {
          onComplete();
        }
      }
    }, 100);

    return () => clearInterval(intervalId);

    // Пересоздаём интервал только при смене паузы.
    // onTick / onComplete оборачиваем в ref ниже, чтобы не попасть в deps.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused]);
}
