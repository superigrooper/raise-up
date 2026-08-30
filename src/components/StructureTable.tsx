"use client";

import React, { useEffect, useRef } from "react";
import { usePokerStore } from "@/store/usePokerStore";
import { TournamentRow } from "@/types/poker";

export const StructureTable: React.FC = () => {
  const { grid, currentIndex } = usePokerStore();
  const activeRowRef = useRef<HTMLTableRowElement | null>(null);

  useEffect(() => {
    if (activeRowRef.current) {
      activeRowRef.current.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  return (
    <div className="max-h-[380px] overflow-y-auto border rounded-xl transition-colors duration-200 border-gray-200 navy:border-slate-800 bg-gray-50 navy:bg-[#0b0b14]">
      <table className="w-full border-collapse text-sm text-center">
        <thead className="sticky top-0 border-b border-gray-200 navy:border-slate-800 bg-gray-100 navy:bg-[#07070f] text-gray-500 navy:text-slate-400 z-10">
          <tr>
            <th className="p-3 font-semibold">Ур.</th>
            <th className="p-3 font-semibold">Время</th>
            <th className="p-3 font-semibold">МБ</th>
            <th className="p-3 font-semibold">ББ</th>
            <th className="p-3 font-semibold">Анте</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 navy:divide-slate-900/50">
          {grid.map((row: TournamentRow, index: number) => {
            const isActive = index === currentIndex;
            return (
              <tr
                key={index}
                ref={isActive ? activeRowRef : null}
                className={`transition-colors ${
                  row.isBreak
                    ? "bg-yellow-500/5 text-yellow-600 font-medium"
                    : "text-gray-700 navy:text-slate-300"
                } ${isActive ? "bg-red-500/10 text-red-600 font-bold" : ""}`}
              >
                {row.isBreak ? (
                  <td
                    colSpan={5}
                    className="p-3 text-center tracking-wide text-xs"
                  >
                    ПЕРЕРЫВ ({row.duration} мин)
                  </td>
                ) : (
                  <>
                    <td className="p-3">{row.levelNum}</td>
                    <td className="p-3 text-gray-400 navy:text-slate-500">
                      {row.duration} м
                    </td>
                    <td className="p-3">{row.sb}</td>
                    <td className="p-3">{row.bb}</td>
                    <td className="p-3 text-yellow-600 navy:text-amber-500/80">
                      {row.ante || "—"}
                    </td>
                  </>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};