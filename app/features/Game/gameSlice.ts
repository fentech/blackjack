import { createSlice, PayloadAction, CaseReducer } from "@reduxjs/toolkit";
import { CardProps } from "../Card/Card";
import { Person, Turn } from "../GameControls/types";
import { createDeck, shuffleDeck, playerWins } from "../GameControls/utils";
import { getValue } from "../Hands/utils";

const resetPerson = () => ({ cards: [], score: 0 });

const newDeck = (state: GameState) => {
  state.deck = shuffleDeck(createDeck());
};

export interface PersonState {
  cards: CardProps[];
  score: number;
}
export interface GameState {
  bet: number;
  chips: number;
  deck: CardProps[];
  dealer: PersonState;
  player: PersonState;
  turn: Turn;
}

export const initialState: GameState = {
  bet: 0,
  chips: 100,
  deck: shuffleDeck(createDeck()),
  dealer: resetPerson(),
  player: resetPerson(),
  turn: "player",
};

const newGameCR: CaseReducer<GameState> = () => initialState;

const newRoundCR: CaseReducer<GameState> = (state) => {
  newDeck(state);

  if (playerWins(state.player.score, state.dealer.score, state.turn)) {
    state.chips += state.bet;
  } else {
    state.chips -= state.bet;
  }

  state.bet = 0;

  state.turn = "player";
  state.dealer = resetPerson();
  state.player = resetPerson();

  function deal() {
    return state.deck.shift() as CardProps;
  }

  for (let i = 0; i < 4; i++) {
    if ((i + 1) % 2 === 0) {
      const newCard = deal();
      state.dealer.cards.push(newCard);
      state.dealer.score += getValue([newCard]);
    } else {
      const newCard = deal();
      state.player.cards.push(newCard);
      state.player.score += getValue([newCard]);
    }
  }
};
const hitCR: CaseReducer<GameState, PayloadAction<Person>> = (
  state,
  action
) => {
  const newCard = state.deck.shift() as CardProps;

  state[action.payload].cards.push(newCard);
  state[action.payload].score = getValue(state[action.payload].cards);
};
const resetDeckCR: CaseReducer<GameState> = (state) => {
  newDeck(state);
};
const setTurnCR: CaseReducer<GameState, PayloadAction<Turn>> = (
  state,
  action
) => {
  state.turn = action.payload;
};
const standCR: CaseReducer<GameState> = (state) => {
  state.turn = "dealer";
};
const takeBetCR: CaseReducer<GameState, PayloadAction<number>> = (
  state,
  action
) => {
  state.bet = action.payload;
};

const gameSlice = createSlice({
  name: "gameControls",
  initialState,
  reducers: {
    hit: hitCR,
    newGame: newGameCR,
    newRound: newRoundCR,
    resetDeck: resetDeckCR,
    setTurn: setTurnCR,
    stand: standCR,
    takeBet: takeBetCR,
  },
});

export const {
  hit,
  newGame,
  newRound,
  resetDeck,
  setTurn,
  stand,
  takeBet,
} = gameSlice.actions;
export const { name } = gameSlice;

export default gameSlice.reducer;
