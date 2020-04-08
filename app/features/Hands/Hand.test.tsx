import React from "react";
import { render } from "test-utils";
import Hand from "./Hand";
import { PersonState } from "../Game/gameSlice";
import { getValue } from "./utils";

const defaultPersonState: PersonState = {
  cards: [
    { rank: "two", suit: "clubs" },
    { rank: "ace", suit: "hearts" },
  ],
  score: 13,
};

describe("Hand", () => {
  describe('person is the "player"', () => {
    it("should display a title with the person name and score", (): void => {
      const { getByText } = render(
        <Hand person="player" personState={defaultPersonState} />
      );

      expect(getByText("Player - " + defaultPersonState.score)).toBeTruthy();
    });

    it("should display all of the players cards", (): void => {
      const { getAllByTestId } = render(
        <Hand person="player" personState={defaultPersonState} />
      );

      expect(getAllByTestId("PlayerCard")).toHaveLength(2);
    });
  });

  describe('person is the "dealer"', () => {
    describe("hideCard = false", () => {
      it("should display a title with the person name and total score", (): void => {
        const { getByText } = render(
          <Hand
            person="dealer"
            personState={defaultPersonState}
            hideCard={false}
          />
        );

        expect(getByText("Dealer - " + defaultPersonState.score)).toBeTruthy();
      });

      it("should display all of the dealer's cards", (): void => {
        const { getAllByTestId } = render(
          <Hand
            person="dealer"
            personState={defaultPersonState}
            hideCard={false}
          />
        );

        expect(getAllByTestId("DealerCard")).toHaveLength(2);
      });
    });

    describe("hideCard = true", () => {
      it("should display a title with the person name and partial score", (): void => {
        const { getByText } = render(
          <Hand
            person="dealer"
            personState={defaultPersonState}
            hideCard={true}
          />
        );

        expect(
          getByText(
            "Dealer - " +
              (defaultPersonState.score -
                getValue([defaultPersonState.cards[1]]))
          )
        ).toBeTruthy();
      });

      it("should only display the dealer's first card", (): void => {
        const { getAllByTestId } = render(
          <Hand
            person="dealer"
            personState={defaultPersonState}
            hideCard={true}
          />
        );

        expect(getAllByTestId("DealerCard")).toHaveLength(1);
      });
    });
  });
});
