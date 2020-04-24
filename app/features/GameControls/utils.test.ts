import { CardProps } from "../Card/Card";
import { PersonState } from "../Game/gameSlice";
import {
  createDeck,
  getEndGameStatus,
  getHiddenCardValue,
  isGameOver,
  playerLoses,
  playerWins,
  shuffleDeck,
} from "./utils";
import deepEquals from "lodash/isEqual";
import { PartialGameState } from "./utils";
import { Turn } from "./types";

const createPartialState = (
  playerScore: number,
  dealerScore: number,
  turn: Turn,
  state: Partial<PartialGameState> = {}
): PartialGameState => ({
  dealer: {
    cards: state.dealer ? state.dealer.cards : [],
    score: dealerScore,
  },
  player: {
    cards: state.player ? state.player.cards : [],
    score: playerScore,
  },
  turn,
});

describe("createDeck()", (): void => {
  it("should return an array of 4 decks of cards", (): void => {
    expect(createDeck().length).toBe(52 * 4);
  });
});

describe("getEndGameStatus()", (): void => {
  const partialState: PartialGameState = {
    dealer: {
      cards: [],
      score: 0,
    },
    player: {
      cards: [],
      score: 0,
    },
    turn: "player",
  };

  describe("player wins", (): void => {
    it("should return 'YOU WIN!!'", (): void => {
      expect(
        getEndGameStatus(createPartialState(21, 20, null, partialState))
      ).toBe("YOU WIN!!");
    });
  });

  describe("player loses", (): void => {
    it("should return 'You lost...'", (): void => {
      expect(
        getEndGameStatus(createPartialState(20, 21, null, partialState))
      ).toBe("You lost...");
    });
  });

  describe("player ties dealer", (): void => {
    it("should return 'Pushed'", (): void => {
      expect(
        getEndGameStatus(createPartialState(21, 21, null, partialState))
      ).toBe("Pushed");
    });
  });
});

describe("getHiddenCardValue()", (): void => {
  it("should return only return the value of the first card", (): void => {
    const personState: PersonState = {
      score: 14,
      cards: [
        { suit: "clubs", rank: "four" },
        { suit: "clubs", rank: "jack" },
      ],
    };

    expect(getHiddenCardValue(personState)).toBe(4);
  });
});

describe("isGameOver()", (): void => {
  const partialState: PartialGameState = {
    dealer: {
      cards: [],
      score: 0,
    },
    player: {
      cards: [],
      score: 0,
    },
    turn: "player",
  };

  describe("nobody's turn", (): void => {
    const turn = null;

    it("should return true", (): void => {
      expect(isGameOver(createPartialState(21, 20, turn, partialState))).toBe(
        true
      );
      expect(isGameOver(createPartialState(20, 21, turn, partialState))).toBe(
        true
      );
      expect(isGameOver(createPartialState(20, 20, turn, partialState))).toBe(
        true
      );
    });
  });

  describe("still player's turn", (): void => {
    const turn = "player";

    describe("player hasn't busted", (): void => {
      it("should return false", (): void => {
        expect(isGameOver(createPartialState(20, 12, turn, partialState))).toBe(
          false
        );
      });

      describe("player has blackjack", (): void => {
        describe("start of the round", (): void => {
          it("should return true", (): void => {
            expect(
              isGameOver(
                createPartialState(21, 12, turn, {
                  ...partialState,
                  player: {
                    cards: [
                      { rank: "ace", suit: "clubs" },
                      { rank: "king", suit: "clubs" },
                    ],
                    score: 21,
                  },
                })
              )
            ).toBe(true);
          });
        });

        describe("after the start of the round", (): void => {
          it("should return false", (): void => {
            expect(
              isGameOver(
                createPartialState(21, 12, turn, {
                  ...partialState,
                  player: {
                    cards: [
                      { rank: "ace", suit: "clubs" },
                      { rank: "king", suit: "clubs" },
                      { rank: "king", suit: "clubs" },
                    ],
                    score: 21,
                  },
                })
              )
            ).toBe(false);
          });
        });
      });
    });

    describe("player busts", (): void => {
      it("should return true", (): void => {
        expect(isGameOver(createPartialState(22, 12, turn, partialState))).toBe(
          true
        );
      });
    });
  });

  describe("still dealer's turn", (): void => {
    const turn = "dealer";

    describe("dealer hasn't busted", (): void => {
      it("should return false", (): void => {
        expect(isGameOver(createPartialState(20, 12, turn, partialState))).toBe(
          false
        );
      });
    });

    describe("dealer busts", (): void => {
      it("should return true", (): void => {
        expect(isGameOver(createPartialState(20, 22, turn, partialState))).toBe(
          true
        );
      });
    });
  });
});

describe("playerLoses()", (): void => {
  const partialState: PartialGameState = {
    dealer: {
      cards: [],
      score: 0,
    },
    player: {
      cards: [],
      score: 0,
    },
    turn: "player",
  };

  describe("nobody's turn", (): void => {
    describe("player busts", (): void => {
      it("should return true", (): void => {
        expect(
          playerLoses(createPartialState(22, 12, null, partialState))
        ).toBe(true);
      });
    });

    describe("dealer busts", (): void => {
      it("should return false", (): void => {
        expect(
          playerLoses(createPartialState(12, 22, null, partialState))
        ).toBe(false);
      });
    });

    describe("player and dealer haven't busted", (): void => {
      describe("player's score is greater than dealer's", (): void => {
        it("should return false", (): void => {
          expect(
            playerLoses(createPartialState(21, 20, null, partialState))
          ).toBe(false);
        });
      });

      describe("player's score is less than dealer's", (): void => {
        it("should return true", (): void => {
          expect(
            playerLoses(createPartialState(20, 21, null, partialState))
          ).toBe(true);
        });
      });

      describe("player's score is equal to dealer's", (): void => {
        it("should return false", (): void => {
          expect(
            playerLoses(createPartialState(21, 21, null, partialState))
          ).toBe(false);
        });
      });
    });
  });

  describe("player's turn", (): void => {
    const turn = "player";

    describe("player busts", (): void => {
      it("should return true", (): void => {
        expect(
          playerLoses(createPartialState(22, 12, turn, partialState))
        ).toBe(true);
      });
    });

    describe("player hasn't busted", (): void => {
      it("should return false", (): void => {
        expect(
          playerLoses(createPartialState(21, 20, turn, partialState))
        ).toBe(false);
      });
    });
  });

  describe("dealer's turn", (): void => {
    const turn = "dealer";

    it("should return false", (): void => {
      expect(playerLoses(createPartialState(20, 22, turn, partialState))).toBe(
        false
      );
      expect(playerLoses(createPartialState(20, 21, turn, partialState))).toBe(
        false
      );
    });
  });
});

describe("playerWins()", (): void => {
  const partialState: PartialGameState = {
    dealer: {
      cards: [],
      score: 0,
    },
    player: {
      cards: [],
      score: 0,
    },
    turn: "player",
  };

  describe("nobody's turn", (): void => {
    const turn = null;

    describe("player busts", (): void => {
      it("should return false", (): void => {
        expect(playerWins(createPartialState(22, 12, turn, partialState))).toBe(
          false
        );
      });
    });

    describe("dealer busts", (): void => {
      it("should return true", (): void => {
        expect(playerWins(createPartialState(12, 22, turn, partialState))).toBe(
          true
        );
      });
    });

    describe("player and dealer haven't busted", (): void => {
      describe("player's score is greater than dealer's", (): void => {
        it("should return true", (): void => {
          expect(
            playerWins(createPartialState(21, 20, turn, partialState))
          ).toBe(true);
        });
      });

      describe("player's score is less than dealer's", (): void => {
        it("should return false", (): void => {
          expect(
            playerWins(createPartialState(20, 21, turn, partialState))
          ).toBe(false);
        });
      });

      describe("player's score is equal to dealer's", (): void => {
        it("should return false", (): void => {
          expect(
            playerWins(createPartialState(21, 21, turn, partialState))
          ).toBe(false);
        });
      });
    });
  });

  describe("player's turn", (): void => {
    const turn = "player";

    describe("player doesn't have blackjack", (): void => {
      it("should return false", (): void => {
        expect(playerWins(createPartialState(20, 12, turn, partialState))).toBe(
          false
        );
      });
    });

    describe("player has blackjack", (): void => {
      describe("start of the round", (): void => {
        it("should return true", (): void => {
          expect(
            playerWins(
              createPartialState(21, 12, turn, {
                ...partialState,
                player: {
                  cards: [
                    { rank: "ace", suit: "clubs" },
                    { rank: "king", suit: "clubs" },
                  ],
                  score: 21,
                },
              })
            )
          ).toBe(true);
        });
      });

      describe("after the start of the round", (): void => {
        it("should return false", (): void => {
          expect(
            playerWins(
              createPartialState(21, 12, turn, {
                ...partialState,
                player: {
                  cards: [
                    { rank: "ace", suit: "clubs" },
                    { rank: "king", suit: "clubs" },
                    { rank: "king", suit: "clubs" },
                  ],
                  score: 21,
                },
              })
            )
          ).toBe(false);
        });
      });
    });
  });

  describe("dealer's turn", (): void => {
    const turn = "dealer";

    describe("dealer busts", (): void => {
      it("should return true", (): void => {
        expect(playerWins(createPartialState(20, 22, turn, partialState))).toBe(
          true
        );
      });
    });

    describe("dealer hasn't busted", (): void => {
      it("should return false", (): void => {
        expect(playerWins(createPartialState(20, 19, turn, partialState))).toBe(
          false
        );
      });
    });
  });
});

describe("shuffleDeck()", (): void => {
  it("should shuffle the array in place", (): void => {
    const deck = createDeck();
    const deckCopy = [...deck];

    expect(deepEquals(deck, shuffleDeck(deckCopy))).toBeFalsy();
  });

  it("should return the array after being shuffled", (): void => {
    const deck = createDeck();

    expect(deepEquals(deck, shuffleDeck(deck))).toBeTruthy();
  });
});
