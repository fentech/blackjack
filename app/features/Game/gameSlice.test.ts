import { getValue } from "../Hands/utils";
import reducer, {
  GameState,
  hit,
  newGame,
  newRound,
  resetDeck,
  setTurn,
  stand,
  takeBet,
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

describe("newGame() action creator", (): void => {
  it("should setup a 'newGame' action", (): void => {
    expect(newGame()).toEqual({
      payload: undefined,
      type: getType("newGame"),
    });
  });
});

describe("newRound() action creator", (): void => {
  it("should setup a 'newRound' action", (): void => {
    expect(newRound()).toEqual({
      payload: undefined,
      type: getType("newRound"),
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

describe("takeBet() action creator", (): void => {
  it("should setup a 'takeBet' action", (): void => {
    const payload = 10;

    expect(takeBet(payload)).toEqual({
      payload,
      type: getType("takeBet"),
    });
  });
});

describe("game reducer", (): void => {
  const defaultState: GameState = {
    deck: [],
    dealer: {
      cards: [
        {
          rank: 2,
          suit: "diamonds",
        },
        {
          rank: 5,
          suit: "clubs",
        },
      ],
      score: 7,
    },
    player: {
      cards: [
        {
          rank: 10,
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
  };

  it("should return initial state", (): void => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });

  describe("'hit' action", (): void => {
    it("should add a card for the specified user", (): void => {
      expect(reducer(undefined, hit("dealer")).dealer.cards.length).toBe(1);
    });
  });

  describe("'newGame' action", (): void => {
    const { deck, player, dealer, turn, chips, bet } = reducer(
      defaultState,
      newGame()
    );

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
  });

  describe("'newRound' action", (): void => {
    const { deck, player, dealer, turn, chips, bet } = reducer(
      defaultState,
      newRound()
    );

    it("should reset deck and deal starting cards", (): void => {
      expect(deck.length).toBe(48);
      expect(player.cards.length).toBe(2);
      expect(dealer.cards.length).toBe(2);
    });

    it("should set dealer and player scores", (): void => {
      expect(player.score).toBe(getValue(player.cards));
      expect(dealer.score).toBe(getValue(dealer.cards));
    });

    it("should set the player's turn", (): void => {
      expect(turn).toBe("player");
    });

    it("should adjust the player's chips", (): void => {
      expect(chips).toBe(110);
    });

    it("should adjust the player's bet", (): void => {
      expect(bet).toBe(0);
    });
  });

  describe("'resetDeck' action", (): void => {
    it("should assign a new shuffled deck in state", (): void => {
      const { deck } = reducer(defaultState, resetDeck());

      expect(deck.length).toBe(52);
    });
  });

  describe("'setTurn' action", (): void => {
    it("should assign the 'turn' property in state to the specified person", (): void => {
      const { turn } = reducer(defaultState, setTurn("dealer"));

      expect(turn).toBe("dealer");
    });
  });

  describe("'stand' action", (): void => {
    it("should assign the 'turn' property in state to 'dealer'", (): void => {
      const { turn } = reducer(defaultState, stand());

      expect(turn).toBe("dealer");
    });
  });

  describe("'takeBet' action", (): void => {
    it("should assign the 'bet' property in state", (): void => {
      const newBet = 12;
      const { bet } = reducer(defaultState, takeBet(newBet));

      expect(bet).toBe(newBet);
    });
  });
});
