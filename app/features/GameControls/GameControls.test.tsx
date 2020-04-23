import React from "react";
import { render, Matcher, MatcherOptions, fireEvent, act } from "test-utils";
import GameControls from "./GameControls";
import store from "../../store";
import { endGame, resetGame, setTurn, toggleBetting } from "../Game/gameSlice";

type MemoCB = (getters: {
  getByTestId: (
    text: Matcher,
    options?: MatcherOptions | undefined
  ) => Pick<any, string | number | symbol>;
  queryByTestId: (
    text: Matcher,
    options?: MatcherOptions | undefined
  ) => Pick<any, string | number | symbol> | null;
}) => void;
const memoTest = (
  cb: MemoCB,
  options: { gameOver?: boolean; isBetting?: boolean } = {}
) => {
  const { gameOver = false, isBetting = false } = options;

  const { getByTestId, queryByTestId } = render(<GameControls />);

  if (!isBetting) {
    act((): void => {
      store.dispatch(toggleBetting());

      if (gameOver) store.dispatch(endGame());
    });
  }

  cb({ getByTestId, queryByTestId });
};

describe("GameControls", (): void => {
  afterEach((): void => {
    act((): void => {
      store.dispatch(resetGame());
    });
  });

  describe("redux state.isBetting = true", (): void => {
    it("should display BetForm", (): void => {
      memoTest(
        ({ getByTestId }) => {
          expect(getByTestId("BetForm")).toBeTruthy();
        },
        { isBetting: true }
      );
    });
  });

  describe("redux state.isBetting = false", (): void => {
    it("should not render a BetForm", (): void => {
      memoTest(({ queryByTestId }) => {
        expect(queryByTestId("BetForm")).toBeFalsy();
      });
    });

    describe("gameOver = false", (): void => {
      const assert = (cb: MemoCB) => memoTest(cb, { gameOver: false });

      it("should render the 'Hit' button", (): void => {
        assert(({ getByTestId }) => {
          expect(getByTestId("HitButton")).toBeTruthy();
        });
      });

      it("should render the 'Stand' button", (): void => {
        assert(({ getByTestId }) => {
          expect(getByTestId("StandButton")).toBeTruthy();
        });
      });

      it("should not render a 'Play Again' button", (): void => {
        assert(({ queryByTestId }) => {
          expect(queryByTestId("PlayAgainButton")).toBeFalsy();
        });
      });

      describe("dealer's turn", (): void => {
        beforeEach((): void => {
          act((): void => {
            store.dispatch(setTurn("dealer"));
          });
        });

        it("should diable the 'Hit' button", (): void => {
          assert(({ getByTestId }) => {
            expect(getByTestId("HitButton").props.disabled).toBeTruthy();
          });
        });

        it("should diable the 'Stand' button", (): void => {
          assert(({ getByTestId }) => {
            expect(getByTestId("StandButton").props.disabled).toBeTruthy();
          });
        });
      });
    });

    describe("gameOver = true", (): void => {
      const assert = (cb: MemoCB) => memoTest(cb, { gameOver: true });

      it("should render the 'Play Again' button", (): void => {
        assert(({ getByTestId }) => {
          expect(getByTestId("PlayAgainButton")).toBeTruthy();
        });
      });

      it("should not render a 'Hit' button", (): void => {
        assert(({ queryByTestId }) => {
          expect(queryByTestId("HitButton")).toBeFalsy();
        });
      });

      it("should not render a 'Stand' button", (): void => {
        assert(({ queryByTestId }) => {
          expect(queryByTestId("StandButton")).toBeFalsy();
        });
      });
    });
  });
});
