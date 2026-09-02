"use client";
import Link from "next/link";
import Footer from "@/components/Footer";
import { usePokerStore } from "@/store/usePokerStore";
import getThemeClass from "@/utils/getThemeClass";
import { Theme } from "@/types/poker";
import { pokerGames } from "@/db/games";

export default function RulesMenu() {
  const theme: Theme = usePokerStore((state) => state.theme);

  return (
    <div
      className={`min-h-screen transition-colors duration-200 p-4 md:p-8 flex flex-col items-center justify-center font-sans ${getThemeClass(theme)}`}
    >
      <div className="w-full max-w-5xl bg-white navy:bg-[#121224] p-6 rounded-2xl shadow-lg border border-gray-200 navy:border-slate-800">
        <header className="mb-8 flex items-center justify-between border-b pb-4 border-gray-100 navy:border-slate-900/60">
          <div>
            <h1 className="text-2xl font-black">📜 Правила покера</h1>
            <p className="text-xs text-gray-400 mt-0.5">
              Выберите дисциплину для изучения регламента
            </p>
          </div>
          <Link
            href="/"
            className="text-sm font-bold text-[#e94560] hover:underline"
          >
            ◀ Главное меню
          </Link>
        </header>

        <main className="flex flex-col gap-4">
          {pokerGames.map((game, index) => (
            <Link
              href={game.path}
              key={index}
              className={`p-5 rounded-xl border transition-all duration-300 flex flex-col sm:flex-row sm:items-center sm:justify-between group cursor-pointer bg-gray-50 navy:bg-[#0b0b14]/40 border-gray-100 navy:border-slate-900/20 hover:shadow-md ${game.color}`}
            >
              <div className="max-w-xl">
                <h2 className="text-lg font-bold mb-1 group-hover:text-[#e94560] transition-colors">
                  {game.title}
                </h2>
                <p className="text-xs text-gray-400 navy:text-slate-400 leading-relaxed">
                  {game.desc}
                </p>
              </div>
              <div className="mt-3 sm:mt-0 text-xs font-bold text-[#e94560] opacity-0 group-hover:opacity-100 transition-all uppercase tracking-wider">
                Читать ➔
              </div>
            </Link>
          ))}
        </main>
      </div>
      <Footer />
    </div>
  );
}
