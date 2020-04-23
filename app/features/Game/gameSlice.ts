import { createSlice, PayloadAction, CaseReducer } from "@reduxjs/toolkit";
import { CardProps } from "../Card/Card";
import { Person, Turn } from "../GameControls/types";
import {
  createDeck,
  shuffleDeck,
  playerWins,
  playerLoses,
} from "../GameControls/utils";
import { getValue } from "../Hand/utils";
import { isGameOver } from "../GameControls/utils";

const resetPerson = () => ({ cards: [], score: 0 });

const newDeck = () => {
  return shuffleDeck(createDeck());
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
  gameOver: boolean;
  isBetting: boolean;
  isNewGame: boolean;
  player: PersonState;
  turn: Turn;
}

export const deriveFromInitialState = (bet: number = 0): GameState => ({
  bet,
  chips: 100,
  deck: newDeck(),
  dealer: resetPerson(),
  gameOver: false,
  isBetting: true,
  isNewGame: true,
  player: resetPerson(),
  turn: "player",
});

export const initialState = deriveFromInitialState();

const endGameCR: CaseReducer<GameState> = (state) => {
  state.gameOver = true;
};

const hitBase = (state: GameState, payload: Person) => {
  if (!state.deck.length) state.deck = newDeck();

  const newCard = state.deck.shift() as CardProps;

  state[payload].cards.push(newCard);
  state[payload].score = getValue(state[payload].cards);

  if (isGameOver(state)) state.gameOver = true;
};
const hitCR: CaseReducer<GameState, PayloadAction<Person>> = (
  state,
  action
) => {
  hitBase(state, action.payload);
};

export class DoubleDownError extends Error {
  constructor() {
    super("Must be the beginning of the player's turn.");
  }
}
export const NoBetErrorText = "Player must have a current bet.";
export class NoBetError extends Error {
  constructor() {
    super(NoBetErrorText);
  }
}
export class TurnError extends Error {
  constructor(person: Person) {
    super(`Must be ${person}'s turn.`);
  }
}
const doubleDownCR: CaseReducer<GameState> = (state) => {
  if (!state.bet) throw new NoBetError();
  if (state.turn !== "player") throw new TurnError("player");
  if (state.player.cards.length > 2) throw new DoubleDownError();

  state.bet *= 2;

  hitBase(state, "player");

  if (!state.gameOver) state.turn = "dealer";
};

const initNewRoundCR: CaseReducer<GameState> = (state) => {
  if (playerWins(state)) {
    state.chips += state.bet;
  } else if (playerLoses(state)) {
    state.chips -= state.bet;
  }

  state.isBetting = true;

  state.bet = 0;

  state.gameOver = false;
};

const resetDeckCR: CaseReducer<GameState> = (state) => {
  state.deck = newDeck();
};

const resetGameCR: CaseReducer<GameState> = () => deriveFromInitialState();

const setTurnCR: CaseReducer<GameState, PayloadAction<Turn>> = (
  state,
  action
) => {
  state.turn = action.payload;

  if (action.payload === null) state.gameOver = true;
};

const standCR: CaseReducer<GameState> = (state) => {
  state.turn = "dealer";
};

const startNewRoundCR: CaseReducer<GameState, PayloadAction<number>> = (
  state,
  { payload }
) => {
  state.isBetting = false;
  if (state.isNewGame) state.isNewGame = false;

  state.bet = payload;

  state.turn = "player";
  state.dealer = resetPerson();
  state.player = resetPerson();

  function deal() {
    if (!state.deck.length) state.deck = newDeck();

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

  if (isGameOver(state)) state.gameOver = true;
};

const toggleBettingCR: CaseReducer<GameState> = (state) => {
  state.isBetting = !state.isBetting;
};

const gameSlice = createSlice({
  name: "gameControls",
  initialState,
  reducers: {
    doubleDown: doubleDownCR,
    endGame: endGameCR,
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
  doubleDown,
  endGame,
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
