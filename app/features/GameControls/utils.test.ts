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

describe("createDeck()", (): void => {
  it("should return an array of 52 cards", (): void => {
    expect(createDeck().length).toBe(52);
  });

  it("each card should be unique", (): void => {
    const cards = createDeck();
    const cardsDict: Record<string, CardProps> = {};

    cards.forEach((card) => {
      expect(cardsDict[card.rank + card.suit]).toBeUndefined();

      cardsDict[card.rank + card.suit] = card;
    });
  });
});

describe("getEndGameStatus()", (): void => {
  describe("player wins", (): void => {
    it("should return 'YOU WIN!!'", (): void => {
      expect(getEndGameStatus(21, 20, null)).toBe("YOU WIN!!");
    });
  });

  describe("player loses", (): void => {
    it("should return 'You lost...'", (): void => {
      expect(getEndGameStatus(20, 21, null)).toBe("You lost...");
    });
  });

  describe("player ties dealer", (): void => {
    it("should return 'Pushed'", (): void => {
      expect(getEndGameStatus(21, 21, null)).toBe("Pushed");
    });
  });
});

describe("getHiddenCardValue()", (): void => {
  it("should return only return the value of the first card", (): void => {
    const personState: PersonState = {
      score: 14,
      cards: [
        { suit: "clubs", rank: 4 },
        { suit: "clubs", rank: "jack" },
      ],
    };

    expect(getHiddenCardValue(personState)).toBe(4);
  });
});

describe("isGameOver()", (): void => {
  describe("nobody's turn", (): void => {
    const turn = null;

    it("should return true", (): void => {
      expect(isGameOver(21, 20, turn)).toBe(true);
      expect(isGameOver(20, 21, turn)).toBe(true);
      expect(isGameOver(20, 20, turn)).toBe(true);
    });
  });

  describe("still player's turn", (): void => {
    const turn = "player";

    describe("player hasn't busted", (): void => {
      it("should return false", (): void => {
        expect(isGameOver(20, 12, turn)).toBe(false);
      });
    });

    describe("player busts", (): void => {
      it("should return true", (): void => {
        expect(isGameOver(22, 12, turn)).toBe(true);
      });
    });
  });

  describe("still dealer's turn", (): void => {
    const turn = "dealer";

    describe("dealer hasn't busted", (): void => {
      it("should return false", (): void => {
        expect(isGameOver(20, 12, turn)).toBe(false);
      });
    });

    describe("dealer busts", (): void => {
      it("should return true", (): void => {
        expect(isGameOver(20, 22, turn)).toBe(true);
      });
    });
  });
});

describe("playerLoses()", (): void => {
  describe("nobody's turn", (): void => {
    describe("player busts", (): void => {
      it("should return true", (): void => {
        expect(playerLoses(22, 12, null)).toBe(true);
      });
    });

    describe("dealer busts", (): void => {
      it("should return false", (): void => {
        expect(playerLoses(12, 22, null)).toBe(false);
      });
    });

    describe("player and dealer haven't busted", (): void => {
      describe("player's score is greater than dealer's", (): void => {
        it("should return false", (): void => {
          expect(playerLoses(21, 20, null)).toBe(false);
        });
      });

      describe("player's score is less than dealer's", (): void => {
        it("should return true", (): void => {
          expect(playerLoses(20, 21, null)).toBe(true);
        });
      });

      describe("player's score is equal to dealer's", (): void => {
        it("should return false", (): void => {
          expect(playerLoses(21, 21, null)).toBe(false);
        });
      });
    });
  });

  describe("player's turn", (): void => {
    describe("player busts", (): void => {
      it("should return true", (): void => {
        expect(playerLoses(22, 12, "player")).toBe(true);
      });
    });

    describe("player hasn't busted", (): void => {
      it("should return false", (): void => {
        expect(playerLoses(21, 20, "player")).toBe(false);
      });
    });
  });

  describe("dealer's turn", (): void => {
    it("should return false", (): void => {
      expect(playerLoses(20, 22, "dealer")).toBe(false);
      expect(playerLoses(20, 21, "dealer")).toBe(false);
    });
  });
});

describe("playerWins()", (): void => {
  describe("nobody's turn", (): void => {
    const turn = null;

    describe("player busts", (): void => {
      it("should return false", (): void => {
        expect(playerWins(22, 12, turn)).toBe(false);
      });
    });

    describe("dealer busts", (): void => {
      it("should return true", (): void => {
        expect(playerWins(12, 22, turn)).toBe(true);
      });
    });

    describe("player and dealer haven't busted", (): void => {
      describe("player's score is greater than dealer's", (): void => {
        it("should return true", (): void => {
          expect(playerWins(21, 20, turn)).toBe(true);
        });
      });

      describe("player's score is less than dealer's", (): void => {
        it("should return false", (): void => {
          expect(playerWins(20, 21, turn)).toBe(false);
        });
      });

      describe("player's score is equal to dealer's", (): void => {
        it("should return false", (): void => {
          expect(playerWins(21, 21, turn)).toBe(false);
        });
      });
    });
  });

  describe("player's turn", (): void => {
    const turn = "player";

    it("should return false", (): void => {
      expect(playerWins(21, 12, turn)).toBe(false);
    });
  });

  describe("dealer's turn", (): void => {
    const turn = "dealer";

    describe("dealer busts", (): void => {
      it("should return true", (): void => {
        expect(playerWins(20, 22, turn)).toBe(true);
      });
    });

    describe("dealer hasn't busted", (): void => {
      it("should return false", (): void => {
        expect(playerWins(20, 19, turn)).toBe(false);
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
