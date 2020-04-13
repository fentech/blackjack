import { getValue } from "./utils";
import { CardProps } from "../Card/Card";

const defaultCards: CardProps[] = [
  { rank: "ace", suit: "clubs" },
  { rank: "nine", suit: "diamonds" },
];

describe("getValue()", () => {
  describe("cards total value is equal to or less than 21", (): void => {
    it("should return the sum total rank value of all cards", (): void => {
      expect(getValue(defaultCards)).toBe(20);
    });
  });

  describe("cards total value is greater than 21", () => {
    const cards: CardProps[] = [
      ...defaultCards,
      { rank: "queen", suit: "hearts" },
      { rank: "king", suit: "hearts" },
    ];
    describe("with any number of ace cards", (): void => {
      it("should return the sum total rank value of all cards minus 10 for each ace", (): void => {
        expect(getValue(cards)).toBe(30);

        expect(getValue([...cards, { rank: "ace", suit: "hearts" }])).toBe(31);
      });
    });

    describe("with no ace cards", (): void => {
      const noAces = [...cards.slice(1)];
      it("should return the sum total rank value of all cards", (): void => {
        expect(getValue(noAces)).toBe(29);
      });
    });
  });
});
