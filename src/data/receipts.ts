export type ReceiptCategory = "music" | "purchase" | "place" | "transaction" | "event";

export type ReceiptMoment = {
  id: string;
  category: ReceiptCategory;
  date: string;
  time: string;
  title: string;
  source: string;
  detail: string;
  reflection: string;
  x: number;
  y: number;
  size: "small" | "medium" | "large";
};

export const categories: Array<{ id: ReceiptCategory; label: string }> = [
  { id: "music", label: "Music" },
  { id: "purchase", label: "Purchases" },
  { id: "place", label: "Places" },
  { id: "transaction", label: "Transactions" },
  { id: "event", label: "Events" },
];

export const receipts: [ReceiptMoment, ...ReceiptMoment[]] = [
  {
    id: "r-01",
    category: "music",
    date: "12 MAR 2025",
    time: "23:48",
    title: "Nights, played again",
    source: "Listening history · Track 47",
    detail: "Frank Ocean · 5 min 07 sec",
    reflection: "The song you returned to after every late train home.",
    x: 48,
    y: 42,
    size: "large",
  },
  {
    id: "r-02",
    category: "place",
    date: "12 MAR 2025",
    time: "23:31",
    title: "Platform 4",
    source: "Location trace · King's Cross",
    detail: "51.5318° N · 0.1238° W",
    reflection: "Seventeen minutes before the song. A familiar wait, recorded twice.",
    x: 27,
    y: 29,
    size: "medium",
  },
  {
    id: "r-03",
    category: "purchase",
    date: "02 APR 2025",
    time: "08:14",
    title: "Two coffees",
    source: "Digital receipt · North Star Café",
    detail: "Flat white × 2 · £7.20",
    reflection: "A small order that quietly says: you were not alone.",
    x: 72,
    y: 23,
    size: "medium",
  },
  {
    id: "r-04",
    category: "transaction",
    date: "02 APR 2025",
    time: "08:15",
    title: "A split, settled",
    source: "Bank transfer · Personal",
    detail: "+ £3.60 · “coffee x”",
    reflection: "One minute later, the second cup became a shared memory.",
    x: 79,
    y: 47,
    size: "small",
  },
  {
    id: "r-05",
    category: "event",
    date: "19 JUN 2025",
    time: "19:30",
    title: "Doors open",
    source: "Calendar · Somerset House",
    detail: "Live music · East Wing",
    reflection: "An appointment made six weeks earlier, arriving all at once.",
    x: 59,
    y: 70,
    size: "large",
  },
  {
    id: "r-06",
    category: "music",
    date: "19 JUN 2025",
    time: "22:56",
    title: "The setlist after",
    source: "Playlist created · 12 tracks",
    detail: "Title: still ringing",
    reflection: "A temporary collection made to keep an evening from ending.",
    x: 35,
    y: 76,
    size: "small",
  },
  {
    id: "r-07",
    category: "place",
    date: "07 SEP 2025",
    time: "06:42",
    title: "The unfamiliar coast",
    source: "Photo location · Margate",
    detail: "First capture · 06:42",
    reflection: "The earliest photograph in a place you had never planned to visit.",
    x: 15,
    y: 57,
    size: "medium",
  },
];

export const connections: Array<[string, string]> = [
  ["r-01", "r-02"],
  ["r-01", "r-06"],
  ["r-02", "r-07"],
  ["r-03", "r-04"],
  ["r-03", "r-05"],
  ["r-04", "r-05"],
  ["r-05", "r-06"],
];