import { getValue } from "../Hand/utils";
import { createDeck } from "../GameControls/utils";
import reducer, {
  GameState,
  hit,
  initNewRound,
  resetDeck,
  resetGame,
  setTurn,
  stand,
  startNewRound,
  toggleBetting,
  name,
  initialState,
} from "./gameSlice";

const getType = (action: string) => `${name}/${action}`;

describe("hit() action creator", (): void => {
  it("should setup a 'hit' action", (): void => {
    const payload = "dealer";

    expect(hit(payload)).toEqual({
      payload,
      type: getType("hit"),
    });
  });
});

describe("initNewRound() action creator", (): void => {
  it("should setup a 'initNewRound' action", (): void => {
    expect(initNewRound()).toEqual({
      payload: undefined,
      type: getType("initNewRound"),
    });
  });
});

describe("resetDeck() action creator", (): void => {
  it("should setup a 'resetDeck' action", (): void => {
    expect(resetDeck()).toEqual({
      payload: undefined,
      type: getType("resetDeck"),
    });
  });
});

describe("resetGame() action creator", (): void => {
  it("should setup a 'resetGame' action", (): void => {
    expect(resetGame()).toEqual({
      payload: undefined,
      type: getType("resetGame"),
    });
  });
});

describe("setTurn() action creator", (): void => {
  it("should setup a 'setTurn' action", (): void => {
    const payload = "player";

    expect(setTurn(payload)).toEqual({
      payload,
      type: getType("setTurn"),
    });
  });
});

describe("stand() action creator", (): void => {
  it("should setup a 'stand' action", (): void => {
    expect(stand()).toEqual({
      payload: undefined,
      type: getType("stand"),
    });
  });
});

describe("startNewRound() action creator", (): void => {
  it("should setup a 'startNewRound' action", (): void => {
    const payload = 10;

    expect(startNewRound(payload)).toEqual({
      payload,
      type: getType("startNewRound"),
    });
  });
});

describe("toggleBetting() action creator", (): void => {
  it("should setup a 'toggleBetting' action", (): void => {
    expect(toggleBetting()).toEqual({
      payload: undefined,
      type: getType("toggleBetting"),
    });
  });
});

describe("game reducer", (): void => {
  const defaultState: GameState = {
    deck: createDeck(),
    dealer: {
      cards: [
        {
          rank: "two",
          suit: "diamonds",
        },
        {
          rank: "five",
          suit: "clubs",
        },
      ],
      score: 7,
    },
    player: {
      cards: [
        {
          rank: "ten",
          suit: "diamonds",
        },
        {
          rank: "queen",
          suit: "clubs",
        },
      ],
      score: 20,
    },
    chips: 100,
    bet: 10,
    turn: null,
    isBetting: false,
    isNewGame: false,
    gameOver: false,
  };

  it("should return initial state", (): void => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });

  describe("'hit' action", (): void => {
    it("should add a card for the specified user", (): void => {
      expect(reducer(undefined, hit("dealer")).dealer.cards.length).toBe(1);
    });

    describe("deck is empty", (): void => {
      const state = { ...defaultState, deck: [] };
      const { deck } = reducer(state, hit("dealer"));

      it("should reset the deck", (): void => {
        expect(deck.length).toBe(51);
      });
    });

    describe("game is over", (): void => {
      it("should set gameOver to true", (): void => {
        expect(reducer(defaultState, hit("player")).gameOver).toBe(true);
      });
    });
  });

  describe("'initNewRound' action", (): void => {
    const { bet, chips, isBetting, gameOver } = reducer(
      defaultState,
      initNewRound()
    );

    it("should adjust the player's chips", (): void => {
      expect(chips).toBe(110);
    });

    it("should adjust the player's bet", (): void => {
      expect(bet).toBe(0);
    });

    it("should set isBetting to false", (): void => {
      expect(isBetting).toBe(true);
    });

    it("should set gameOver to false", (): void => {
      expect(gameOver).toBe(false);
    });

    describe("player wins round", (): void => {
      const state: GameState = {
        ...defaultState,
        dealer: {
          cards: [],
          score: 20,
        },
        player: {
          cards: [],
          score: 21,
        },
      };
      const { chips } = reducer(state, initNewRound());

      it("should add player's bet to their chips", (): void => {
        expect(chips).toBe(state.chips + state.bet);
      });
    });

    describe("player loses round", (): void => {
      const state: GameState = {
        ...defaultState,
        dealer: {
          cards: [],
          score: 21,
        },
        player: {
          cards: [],
          score: 20,
        },
      };
      const { chips } = reducer(state, initNewRound());

      it("should subtract player's bet from their chips", (): void => {
        expect(chips).toBe(state.chips - state.bet);
      });
    });

    describe("round was pushed", (): void => {
      const state: GameState = {
        ...defaultState,
        dealer: {
          cards: [],
          score: 20,
        },
        player: {
          cards: [],
          score: 20,
        },
      };
      const { chips } = reducer(state, initNewRound());

      it("should not change player's chips", (): void => {
        expect(chips).toBe(state.chips);
      });
    });
  });

  describe("'resetDeck' action", (): void => {
    it("should assign a new shuffled deck in state", (): void => {
      const { deck } = reducer(defaultState, resetDeck());

      expect(deck.length).toBe(52);
    });
  });

  describe("'resetGame' action", (): void => {
    const {
      bet,
      chips,
      deck,
      dealer,
      gameOver,
      isBetting,
      isNewGame,
      player,
      turn,
    } = reducer(defaultState, resetGame());

    it("should reset deck", (): void => {
      expect(deck.length).toBe(52);
    });

    it("should reset dealer and player scores", (): void => {
      expect(player.score).toBe(0);
      expect(dealer.score).toBe(0);
    });

    it("should set the player's turn", (): void => {
      expect(turn).toBe("player");
    });

    it("should reset the player's bet", (): void => {
      expect(bet).toBe(0);
    });

    it("should reset the player's chips", (): void => {
      expect(chips).toBe(100);
    });

    it("should set isBetting to true", (): void => {
      expect(isBetting).toBe(true);
    });

    it("should set isNewGame to true", (): void => {
      expect(isNewGame).toBe(true);
    });

    it("should set gameOver to false", (): void => {
      expect(gameOver).toBe(false);
    });
  });

  describe("'setTurn' action", (): void => {
    it("should assign the 'turn' property in state to the specified person", (): void => {
      const { turn } = reducer(defaultState, setTurn("dealer"));

      expect(turn).toBe("dealer");
    });

    describe("turn is null", (): void => {
      const { gameOver } = reducer(defaultState, setTurn(null));

      it("should set gameOver to true", (): void => {
        expect(gameOver).toBe(true);
      });
    });
  });

  describe("'stand' action", (): void => {
    it("should assign the 'turn' property in state to 'dealer'", (): void => {
      const { turn } = reducer(defaultState, stand());

      expect(turn).toBe("dealer");
    });
  });

  describe("'startNewRound' action", (): void => {
    const { bet, dealer, isBetting, isNewGame, player, turn } = reducer(
      defaultState,
      startNewRound(11)
    );

    it("should set dealer and player scores", (): void => {
      expect(player.score).toBe(getValue(player.cards));
      expect(dealer.score).toBe(getValue(dealer.cards));
    });

    it("should set the player's turn", (): void => {
      expect(turn).toBe("player");
    });

    it("should adjust the player's bet", (): void => {
      expect(bet).toBe(11);
    });

    it("should set isBetting to false", (): void => {
      expect(isBetting).toBe(false);
    });

    describe("deck is empty", (): void => {
      const state = { ...defaultState, deck: [] };
      const { deck, dealer, player } = reducer(state, startNewRound(11));

      it("should reset deck and deal starting cards", (): void => {
        expect(deck.length).toBe(48);
        expect(player.cards.length).toBe(2);
        expect(dealer.cards.length).toBe(2);
      });
    });

    describe("deck is almost empty", (): void => {
      const newDeck = [...createDeck().slice(0, 2)];
      const state = { ...defaultState, deck: newDeck };
      const { deck, dealer, player } = reducer(state, startNewRound(11));

      it("should reset deck and deal starting cards", (): void => {
        expect(deck.length).toBe(50);
        expect(player.cards.length).toBe(2);
        expect(dealer.cards.length).toBe(2);
      });
    });

    describe("'isNewGame' is true", (): void => {
      it("should set isNewGame to true", (): void => {
        expect(initialState.isNewGame).toBeTruthy();

        const { isNewGame } = reducer(initialState, startNewRound(11));

        expect(isNewGame).toBeFalsy();
      });
    });

    describe("'isNewGame' is false", (): void => {
      it("'isNewGame' should still be false", (): void => {
        expect(isNewGame).toBe(false);
      });
    });

    describe("player has blackjack", (): void => {
      const { gameOver } = reducer(
        {
          ...defaultState,
          deck: [
            {
              rank: "ace",
              suit: "diamonds",
            },
            {
              rank: "two",
              suit: "diamonds",
            },
            {
              rank: "queen",
              suit: "clubs",
            },
            {
              rank: "queen",
              suit: "diamonds",
            },
          ],
        },
        startNewRound(11)
      );

      it("should set gameOver to true", (): void => {
        expect(gameOver).toBe(true);
      });
    });
  });

  describe("'toggleBetting' action", (): void => {
    it("should toggle the 'isBetting' property in state", (): void => {
      const { isBetting } = reducer(defaultState, toggleBetting());

      expect(isBetting).toBe(!defaultState.isBetting);
    });
  });
});
