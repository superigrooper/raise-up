import { Theme } from "@/types/poker";

export default function getThemeClass(theme: Theme): string {
  const dark: string = "navy bg-[#090916] text-white";
  const light: string = "bg-gray-100 text-gray-900";

  const themes: Record<Theme, string> = {
    navy: dark,
    light: light,
  };

  return themes[theme];
}
