import { GameState } from "./gameSlice";
import { getValue } from "../Hands/utils";
import reducer, {
  hit,
  newRound,
  resetDeck,
  setTurn,
  stand,
  name,
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

describe("game reducer", (): void => {
  const initialState: GameState = {
    deck: [
      {
        rank: 2,
        suit: "diamonds",
      },
    ],
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

  it("should return initial state", (): void => {
    expect(reducer(undefined, { type: undefined })).toEqual({
      ...initialState,
      deck: expect.any(Array),
    });
  });

  describe("'hit' action", (): void => {
    it("should add a card for the specified user", (): void => {
      expect(reducer(undefined, hit("dealer")).dealer.cards.length).toBe(1);
    });
  });

  describe("'newRound' action", (): void => {
    const { deck, player, dealer, turn } = reducer(initialState, newRound());

    it("should reset deck and deal starting cards", (): void => {
      expect(deck.length).toBe(48);
      expect(player.cards.length).toBe(2);
      expect(dealer.cards.length).toBe(2);
    });

    it("should set dealer and player scores", (): void => {
      expect(player.score).toBe(getValue(player.cards));
      expect(dealer.score).toBe(getValue(dealer.cards));
    });

    it("set the player's turn", (): void => {
      expect(turn).toBe("player");
    });
  });

  describe("'resetDeck' action", (): void => {
    it("should assign a new shuffled deck in state", (): void => {
      const { deck } = reducer(initialState, resetDeck());

      expect(deck.length).toBe(52);
    });
  });

  describe("'setTurn' action", (): void => {
    it("should assign the 'turn' property in state to the specified person", (): void => {
      const { turn } = reducer(initialState, setTurn("dealer"));

      expect(turn).toBe("dealer");
    });
  });

  describe("'stand' action", (): void => {
    it("should assign the 'turn' property in state to 'dealer'", (): void => {
      const { turn } = reducer(initialState, stand());

      expect(turn).toBe("dealer");
    });
  });
});
