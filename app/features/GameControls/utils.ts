import { Turn } from "./types";
import { CardProps } from "../Card/Card";
import { Ranks } from "../Card/types";
import { PersonState } from "../Game/gameSlice";
import { RANKS, SUITS } from "../Game/constants";

export interface PartialGameState {
  player: PersonState;
  dealer: PersonState;
  turn: Turn;
}

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

export const playerLoses = ({ player, dealer, turn }: PartialGameState) => {
  const { score: playerScore } = player;
  const { score: dealerScore } = dealer;

  return (
    personBusts(playerScore) ||
    (!turn &&
      !personBusts(dealerScore) &&
      playerScore <= 21 &&
      dealerScore <= 21 &&
      playerScore < dealerScore)
  );
};

export const playerWins = ({ player, dealer, turn }: PartialGameState) => {
  const { score: playerScore } = player;
  const { score: dealerScore } = dealer;

  return (
    (!personBusts(playerScore) &&
      turn !== "player" &&
      (personBusts(dealerScore) ||
        (!turn &&
          playerScore <= 21 &&
          dealerScore <= 21 &&
          playerScore > dealerScore))) ||
    (turn === "player" && player.cards.length === 2 && playerScore === 21)
  );
};

export const getEndGameStatus = (partialGameState: PartialGameState) => {
  if (playerWins(partialGameState)) return "YOU WIN!!";

  if (playerLoses(partialGameState)) return "You lost...";

  return "Pushed";
};

export const isGameOver = (partialGameState: PartialGameState) => {
  return (
    !partialGameState.turn ||
    playerLoses(partialGameState) ||
    playerWins(partialGameState)
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
