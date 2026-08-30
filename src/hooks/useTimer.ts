import { UseTimerOptions } from "@/types/poker";
import { useEffect, useRef } from "react";

export function useTimer({
  secondsLeft,
  isPaused,
  onTick,
  onComplete,
}: UseTimerOptions): void {
  const endTimeRef = useRef<number | null>(null);
  const secondsRef = useRef<number>(secondsLeft);
  const isPausedRef = useRef<boolean>(isPaused);

  // Синхронизируем isPausedRef
  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  // При внешнем изменении secondsLeft (смена уровня):
  // — обновляем ref
  // — сбрасываем endTimeRef чтобы интервал пересчитал время с нуля
  useEffect(() => {
    secondsRef.current = secondsLeft;

    // Если таймер запущен — пересчитываем точку окончания
    // Если на паузе (endTimeRef = null) — не трогаем
    if (!isPausedRef.current) {
      endTimeRef.current = Date.now() + secondsLeft * 1000;
    }
  }, [secondsLeft]);

  useEffect(() => {
    if (isPaused) {
      endTimeRef.current = null;
      return;
    }

    // Инициализируем точку окончания при снятии с паузы
    endTimeRef.current = Date.now() + secondsRef.current * 1000;

    const intervalId = setInterval(() => {
      if (!endTimeRef.current) return;

      const msLeft = endTimeRef.current - Date.now();
      const newSeconds = Math.max(0, Math.ceil(msLeft / 1000));

      if (newSeconds !== secondsRef.current) {
        secondsRef.current = newSeconds;
        onTick(newSeconds);

        if (newSeconds === 0) {
          // Сбрасываем endTimeRef ДО вызова onComplete —
          // чтобы следующий тик не увидел старое прошедшее время
          endTimeRef.current = null;
          onComplete();
        }
      }
    }, 100);

    return () => clearInterval(intervalId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused]);
}