import { Navigation } from "@/types/poker";

export const navigation: Navigation[] = [
  {
    title: "⏱️ Турнирный таймер",
    desc: "Управление блайндами, анте и перерывами. Полноэкранный режим для ТВ-экранов.",
    path: "/timer",
    color: "hover:border-[#e94560]",
  },
  {
    title: "🧮 Покерный калькулятор",
    desc: "Расчет шансов на победу (эквити) комбинаций и распределения призового фонда.",
    path: "/calculator",
    color: "hover:border-emerald-500",
  },
  {
    title: "📜 Правила игры",
    desc: "Официальный регламент TDA, правила кэш-игр и клубного покерного турнира.",
    path: "/rules",
    color: "hover:border-amber-500",
  },
  {
    title: "📚 Справочник игрока",
    desc: "Таблица комбинаций, покерные термины, чарты стартовых рук и базовые тактики.",
    path: "/handbook",
    color: "hover:border-indigo-500",
  },
];
