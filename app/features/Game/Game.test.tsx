import React from "react";
import Game from "./Game";
import { render, act } from "test-utils";
import store from "../../store";
import { resetGame, toggleBetting, hit, setTurn } from "./gameSlice";

describe("Game", (): void => {
  afterEach((): void => {
    act((): void => {
      store.dispatch(resetGame());
    });
  });

  it("should render the user's total chips", (): void => {
    const { getByText } = render(<Game />);

    expect(getByText("Total chips: 100")).toBeTruthy();
  });

  it("should render the game controls", (): void => {
    const { getByTestId } = render(<Game />);

    expect(getByTestId("GameControls")).toBeTruthy();
  });

  describe("player is betting", (): void => {
    it("should hide current bet", (): void => {
      const { queryByTestId } = render(<Game />);

      expect(queryByTestId("CurrentBet")).toBeFalsy();
    });

    it("should hide the current hands", (): void => {
      const { queryByTestId } = render(<Game />);

      expect(queryByTestId("Cards")).toBeFalsy();
    });
  });

  describe("player isn't betting", (): void => {
    beforeEach((): void => {
      act((): void => {
        store.dispatch(toggleBetting());
      });
    });

    it("should show current bet", (): void => {
      const { getByTestId } = render(<Game />);

      expect(getByTestId("CurrentBet")).toBeTruthy();
      expect(getByTestId("CurrentBet").children).toContain("Current bet: ");
    });

    it("should show current hands", (): void => {
      const { getByTestId } = render(<Game />);

      expect(getByTestId("Cards")).toBeTruthy();
      expect(getByTestId("DealerHand")).toBeTruthy();
      expect(getByTestId("PlayerHand")).toBeTruthy();
    });
  });

  describe("game is over", (): void => {
    it("should display the game status", (): void => {
      const { queryByTestId, getByTestId } = render(<Game />);

      expect(queryByTestId("Status")).toBeFalsy();

      act((): void => {
        store.dispatch(hit("player"));
        store.dispatch(hit("player"));
        store.dispatch(hit("player"));
        store.dispatch(hit("player"));
        store.dispatch(hit("player"));
      });

      expect(getByTestId("Status")).toBeTruthy();
      expect(getByTestId("Status").children).toContain("You lost...");

      act((): void => {
        store.dispatch(resetGame());
        store.dispatch(toggleBetting());
      });

      expect(queryByTestId("Status")).toBeFalsy();

      act((): void => {
        store.dispatch(setTurn(null));
      });

      expect(getByTestId("Status")).toBeTruthy();
    });
  });
});
