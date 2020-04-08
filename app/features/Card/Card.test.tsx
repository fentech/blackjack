import React from "react";
import { render } from "test-utils";
import Card from "./Card";
import { Ranks, Suits } from "./types";

describe("Card", () => {
  it("matches snapshot", (): void => {
    const suits: Suits[] = ["clubs", "hearts", "clubs", "spades"];
    const ranks: Ranks[] = ["nine", "ace", "two", "jack"];

    suits.forEach((suit, i) => {
      const rank = ranks[i];
      const { baseElement } = render(<Card suit={suit} rank={rank} />);

      expect(baseElement).toMatchSnapshot();
    });
  });
});
