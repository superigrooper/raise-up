import { ThemeSelector } from "./ThemeSelector";

export default function Header() {
  return (
    <header className="mb-10 flex flex-col sm:flex-row justify-between items-center gap-4 border-b pb-6 border-gray-200 dark:border-gray-800 navy:border-slate-850">
      <div className="text-center sm:text-left">
        <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 navy:from-slate-100 navy:to-slate-400 bg-clip-text text-transparent">
          RAISE-UP
        </h1>
      </div>
      <ThemeSelector />
    </header>
  );
}
