export const combinations = [
  {
    name: "👑 Роял-Флэш",
    desc: "Старшие 5 карт одной масти от десятки до туза.",
    example: "A♠️ K♠️ Q♠️ J♠️ 10♠️",
    path: "handbook/royal-flush",
  },
  {
    name: "🎨 Стрит-Флэш",
    desc: "Пять последовательных карт одной масти.",
    example: "9♥️ 8♥️ 7♥️ 6♥️ 5♥️",
    path: "handbook/straight-flush",
  },
  {
    name: "🦁 Каре",
    desc: "Четыре карты одного достоинства.",
    example: "8♣️ 8♥️ 8♠️ 8♦️ 3♥️",
    path: "handbook/four-of-a-kind",
  },
  {
    name: "🏠 Фулл-Хаус",
    desc: "Тройка + Пара одновременно.",
    example: "K♣️ K♠️ K♥️ 10♣️ 10♥️",
    path: "handbook/full-house",
  },
  {
    name: "🌊 Флэш",
    desc: "Пять любых карт одной масти в любом порядке.",
    example: "A♦️ J♦️ 8♦️ 5♦️ 2♦️",
    path: "handbook/flush",
  },
  {
    name: "🪜 Стрит",
    desc: "Пять последовательных карт разных мастей.",
    example: "5♣️ 6♠️ 7♥️ 8♦️ 9♣",
    path: "handbook/straight",
  },
  {
    name: "⚡ Сет / Трипс / Тройка",
    desc: "Три карты одного достоинства.",
    example: "Q♦️ Q♥️ Q♣️ 8♣️ 2♦️",
    path: "handbook/three-of-a-kind",
  },
  {
    name: "👬 Две пары",
    desc: "Две разные пары карт.",
    example: "J♣️ J♦️ 4♥️ 4♠️ 9♠️",
    path: "handbook/two-pair",
  },
  {
    name: "👫 Пара",
    desc: "Две карты одного достоинства.",
    example: "10♣️ 10♦️ J♦️ 3♠️ 8♥️",
    path: "handbook/one-pair",
  },
  {
    name: "🃏 Старшая карта",
    desc: "Если ни у кого нет комбинаций, решает номинал.",
    example: "10♣️ 5♦️ K♠️ 4♥️ 8♦️",
    path: "handbook/high-card",
  },
];
