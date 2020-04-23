import React from "react";
import HandsView from "./HandsView";
import { render, act } from "test-utils";
import store from "../../store";
import { resetGame, toggleBetting } from "../Game/gameSlice";

describe("HandsView", (): void => {
  afterEach((): void => {
    act((): void => {
      store.dispatch(resetGame());
    });
  });

  describe("player isn't betting", (): void => {
    beforeEach((): void => {
      act((): void => {
        store.dispatch(toggleBetting());
      });
    });

    it("should render the player's hand", (): void => {
      const { getByTestId } = render(<HandsView />);

      expect(getByTestId("Hands")).toBeTruthy();
      expect(getByTestId("PlayerHand")).toBeTruthy();
    });

    it("should render the dealer's hand", (): void => {
      const { getByTestId } = render(<HandsView />);

      expect(getByTestId("Hands")).toBeTruthy();
      expect(getByTestId("DealerHand")).toBeTruthy();
    });
  });

  describe("player is betting", (): void => {
    it("should hide the player and dealers hands", (): void => {
      const { queryByTestId } = render(<HandsView />);

      expect(queryByTestId("Hands")).toBeFalsy();
    });
  });
});
