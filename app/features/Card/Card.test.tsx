import React from "react";
import { render } from "test-utils";
import Card from "./Card";
import { Ranks, Suits } from "./types";

describe("Card", () => {
  it("displays appropriate text with rank and suit", (): void => {
    const suits: Suits[] = ["clubs", "hearts", "clubs", "spades"];
    const ranks: Ranks[] = [9, "ace", 2, "jack"];

    suits.forEach((suit, i) => {
      const rank = ranks[i];
      const { getByText } = render(<Card suit={suit} rank={rank} />);

      expect(getByText(`${rank} of ${suit}`)).toBeTruthy();
    });
  });
});
