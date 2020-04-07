import { Turn } from "./types";
import { CardProps } from "../Card/Card";
import { Ranks } from "../Card/types";
import { PersonState } from "../Game/gameSlice";
import { RANKS, SUITS } from "../Game/constants";

export const createDeck = () => {
  return (Object.keys(RANKS) as Ranks[])
    .map((rank) => SUITS.map((suit) => ({ suit, rank })))
    .flat();
};

export const getHiddenCardValue = ({ score, cards }: PersonState) => {
  let hiddenScore = score;

  cards.slice(1).map((card) => {
    hiddenScore -= RANKS[card.rank];
  });

  return hiddenScore;
};

export const personBusts = (personScore: number) => personScore > 21;

export const playerLoses = (
  playerScore: number,
  dealerScore: number,
  turn: Turn
) =>
  personBusts(playerScore) ||
  (!turn &&
    !personBusts(dealerScore) &&
    playerScore <= 21 &&
    dealerScore <= 21 &&
    playerScore < dealerScore);

export const playerWins = (
  playerScore: number,
  dealerScore: number,
  turn: Turn
) =>
  (!personBusts(playerScore) &&
    turn !== "player" &&
    (personBusts(dealerScore) ||
      (!turn &&
        playerScore <= 21 &&
        dealerScore <= 21 &&
        playerScore > dealerScore))) ||
  (turn === "player" && playerScore === 21);

export const getEndGameStatus = (
  playerScore: number,
  dealerScore: number,
  turn: Turn
) => {
  if (playerWins(playerScore, dealerScore, turn)) return "YOU WIN!!";

  if (playerLoses(playerScore, dealerScore, turn)) return "You lost...";

  return "Pushed";
};

export const isGameOver = (
  playerScore: number,
  dealerScore: number,
  turn: Turn
) => {
  return (
    !turn ||
    playerLoses(playerScore, dealerScore, turn) ||
    playerWins(playerScore, dealerScore, turn)
  );
};

export const shuffleDeck = (deck: CardProps[]) => {
  for (let i = 0; i < deck.length; i++) {
    let newIndex = Math.floor(Math.random() * (i + 1));
    let currentValue = deck[i];
    deck[i] = deck[newIndex];
    deck[newIndex] = currentValue;
  }

  return deck;
};
