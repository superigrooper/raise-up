export default function getThemeClass(theme: string): string {
  const dark: string = "navy bg-[#090916] text-white";
  const light: string = "bg-gray-100 text-gray-900";

  return theme === "navy" ? dark : light;
}
