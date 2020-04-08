import { Ranks, Suits } from "../Card/types";

export const RANKS: Record<Ranks, number> = {
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
  jack: 10,
  queen: 10,
  king: 10,
  ace: 11,
};
export const SUITS: Suits[] = ["diamonds", "hearts", "spades", "clubs"];
