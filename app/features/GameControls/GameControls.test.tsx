import React from "react";
import { render, Matcher, MatcherOptions, act } from "test-utils";
import GameControls from "./GameControls";
import store from "../../store";
import {
  endGame,
  resetGame,
  setTurn,
  hit,
  startNewRound,
} from "../Game/gameSlice";

type MemoCB = (getters: {
  debug: (element?: Pick<any, string | number | symbol> | undefined) => void;
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
  options: { gameOver?: boolean; isBetting?: boolean; onGame?: () => void } = {}
) => {
  const { gameOver = false, isBetting = false, onGame } = options;

  const { debug, getByTestId, queryByTestId } = render(<GameControls />);

  if (!isBetting) {
    act((): void => {
      store.dispatch(startNewRound(10));

      onGame && onGame();

      if (gameOver) store.dispatch(endGame());
    });
  }

  cb({ debug, getByTestId, queryByTestId });
};

describe("GameControls", (): void => {
  afterEach((): void => {
    act((): void => {
      store.dispatch(resetGame());
    });
  });

  describe("player is betting", (): void => {
    it("should display BetForm", (): void => {
      memoTest(
        ({ getByTestId }) => {
          expect(getByTestId("BetForm")).toBeTruthy();
        },
        { isBetting: true }
      );
    });
  });

  describe("player isn't betting", (): void => {
    it("should not render a BetForm", (): void => {
      memoTest(({ queryByTestId }) => {
        expect(queryByTestId("BetForm")).toBeFalsy();
      });
    });

    describe("game isn't over", (): void => {
      const assert = (cb: MemoCB, onGame?: () => void) =>
        memoTest(cb, { gameOver: false, onGame });

      describe("player's turn", (): void => {
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

        describe("start of player's turn", (): void => {
          it("should render a 'Double Down' button", (): void => {
            assert(({ getByTestId }) => {
              expect(getByTestId("DoubleDownButton")).toBeTruthy();
            });
          });
        });

        describe("start has more than 2 cards", (): void => {
          it("should render a 'Double Down' button", (): void => {
            assert(
              ({ queryByTestId }) => {
                expect(queryByTestId("DoubleDownButton")).toBeFalsy();
              },
              () => store.dispatch(hit("player"))
            );
          });
        });
      });

      describe("dealer's turn", (): void => {
        const onGame = (): void => {
          store.dispatch(setTurn("dealer"));
        };

        it("should not render a 'Hit' button", (): void => {
          assert(({ queryByTestId }) => {
            expect(queryByTestId("HitButton")).toBeFalsy();
          }, onGame);
        });

        it("should not render a 'Stand' button", (): void => {
          assert(({ queryByTestId }) => {
            expect(queryByTestId("StandButton")).toBeFalsy();
          }, onGame);
        });
      });
    });

    describe("game is over", (): void => {
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
