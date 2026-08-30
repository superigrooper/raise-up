import { Theme } from "@/types/poker";

export function getSystemTheme(): Theme {
  if (typeof window === "undefined") return "light";

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "navy"
    : "light";
}
