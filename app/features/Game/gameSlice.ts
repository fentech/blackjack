import { createSlice, PayloadAction, CaseReducer } from "@reduxjs/toolkit";
import { CardProps } from "../Card/Card";
import { Person, Turn } from "../GameControls/types";
import {
  createDeck,
  shuffleDeck,
  playerWins,
  playerLoses,
} from "../GameControls/utils";
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
  isBetting: boolean;
  isNewGame: boolean;
  player: PersonState;
  turn: Turn;
}

export const deriveFromInitialState = (bet: number = 0): GameState => ({
  bet,
  chips: 100,
  deck: shuffleDeck(createDeck()),
  dealer: resetPerson(),
  isBetting: true,
  isNewGame: true,
  player: resetPerson(),
  turn: "player",
});

export const initialState = deriveFromInitialState();

const hitCR: CaseReducer<GameState, PayloadAction<Person>> = (
  state,
  action
) => {
  const newCard = state.deck.shift() as CardProps;

  state[action.payload].cards.push(newCard);
  state[action.payload].score = getValue(state[action.payload].cards);
};

const initNewRoundCR: CaseReducer<GameState> = (state) => {
  const { player, dealer, turn } = state;
  if (playerWins(player.score, dealer.score, turn)) {
    state.chips += state.bet;
  } else if (playerLoses(player.score, dealer.score, turn)) {
    state.chips -= state.bet;
  }

  state.isBetting = true;

  state.bet = 0;
};

const resetDeckCR: CaseReducer<GameState> = (state) => {
  newDeck(state);
};

const resetGameCR: CaseReducer<GameState> = () => deriveFromInitialState();

const setTurnCR: CaseReducer<GameState, PayloadAction<Turn>> = (
  state,
  action
) => {
  state.turn = action.payload;
};

const standCR: CaseReducer<GameState> = (state) => {
  state.turn = "dealer";
};

const startNewRoundCR: CaseReducer<GameState, PayloadAction<number>> = (
  state,
  { payload }
) => {
  newDeck(state);

  state.isBetting = false;
  if (state.isNewGame) state.isNewGame = false;

  state.bet = payload;

  state.turn = "player";
  state.dealer = resetPerson();
  state.player = resetPerson();

  function deal() {
    return state.deck.shift() as CardProps;
  }

  for (let i = 0; i < 4; i++) {
    const newCard = deal();

    if ((i + 1) % 2 === 0) {
      state.dealer.cards.push(newCard);
    } else {
      state.player.cards.push(newCard);
    }
  }

  state.dealer.score += getValue(state.dealer.cards);
  state.player.score += getValue(state.player.cards);
};

const toggleBettingCR: CaseReducer<GameState> = (state) => {
  state.isBetting = !state.isBetting;
};

const gameSlice = createSlice({
  name: "gameControls",
  initialState,
  reducers: {
    hit: hitCR,
    initNewRound: initNewRoundCR,
    resetDeck: resetDeckCR,
    resetGame: resetGameCR,
    setTurn: setTurnCR,
    stand: standCR,
    startNewRound: startNewRoundCR,
    toggleBetting: toggleBettingCR,
  },
});

export const {
  hit,
  initNewRound,
  resetDeck,
  resetGame,
  setTurn,
  stand,
  startNewRound,
  toggleBetting,
} = gameSlice.actions;
export const { name } = gameSlice;

export default gameSlice.reducer;
