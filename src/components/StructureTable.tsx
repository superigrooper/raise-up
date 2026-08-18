// components/StructureTable.tsx
"use client";

import React, { useEffect, useRef } from 'react';
import { usePokerStore } from '@/store/usePokerStore';

export const StructureTable: React.FC = () => {
  const { grid, currentIndex } = usePokerStore();
  const activeRowRef = useRef<HTMLTableRowElement | null>(null);

  useEffect(() => {
    if (activeRowRef.current) {
      activeRowRef.current.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [currentIndex]);

  return (
    <div className="max-h-[380px] overflow-y-auto border border-gray-800 rounded-xl bg-[#0f0f1b]">
      <table className="w-full border-collapse text-sm text-center">
        <thead className="bg-[#0b0b14] text-gray-400 sticky top-0 border-b border-gray-800 z-10">
          <tr>
            <th className="p-3 font-semibold">Ур.</th>
            <th className="p-3 font-semibold">Время</th>
            <th className="p-3 font-semibold">МБ</th>
            <th className="p-3 font-semibold">ББ</th>
            <th className="p-3 font-semibold">Анте</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-900/50">
          {grid.map((row, index) => {
            const isActive = index === currentIndex;
            return (
              <tr
                key={index}
                ref={isActive ? activeRowRef : null}
                className={`transition-colors ${
                  row.isBreak ? 'bg-yellow-500/5 text-yellow-500 font-medium' : 'text-gray-300'
                } ${isActive ? 'bg-red-500/20 text-white font-bold' : ''}`}
              >
                {row.isBreak ? (
                  <td colSpan={5} className="p-3 text-center tracking-wide text-xs">
                    ПЕРЕРЫВ ({row.duration} мин)
                  </td>
                ) : (
                  <>
                    <td className="p-3">{row.levelNum}</td>
                    <td className="p-3 text-gray-500">{row.duration} м</td>
                    <td className="p-3">{row.sb}</td>
                    <td className="p-3">{row.bb}</td>
                    <td className="p-3 text-yellow-600/80">{row.ante || '—'}</td>
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
