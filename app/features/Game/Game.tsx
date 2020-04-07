import React from "react";
// redux
import { useDispatch } from "react-redux";
import { hit, setTurn, resetGame } from "./gameSlice";
// components
import { Text } from "@ui-kitten/components";
import GameControls from "../GameControls/GameControls";
import Hand from "../Hands/Hand";
import { HandContainer, Status, Title, Wrapper } from "./Game.styles";
// utils
import { getEndGameStatus, isGameOver } from "../GameControls/utils";
import useSelector from "../../functions/useSelector";

export default function Game() {
  const dispatch = useDispatch();
  const gameState = useSelector((state) => state.game);
  const { player, dealer, turn, bet, chips, isBetting, gameOver } = gameState;

  React.useEffect(() => {
    if (turn === "dealer") {
      if (dealer.score < 17) {
        setTimeout(() => dispatch(hit("dealer")), 1000);
      } else {
        dispatch(setTurn(null));
      }
    }
  }, [dealer, turn]);

  React.useEffect(() => {
    if (!chips) dispatch(resetGame());
  }, [chips]);

  return (
    <Wrapper>
      <Title>Blackjack</Title>
      {gameOver ? (
        <Status testID="Status">{getEndGameStatus(gameState)}</Status>
      ) : null}
      {!isBetting && (
        <Text testID="CurrentBet" category="h4">
          Current bet: {bet.toString()}
        </Text>
      )}
      <Text category="h5">Total chips: {chips.toString()}</Text>
      {!isBetting && (
        <HandContainer testID="Cards">
          <Hand
            hideCard={turn === "player"}
            person="dealer"
            personState={dealer}
            testID="DealerHand"
          />
          <Hand person="player" personState={player} testID="PlayerHand" />
        </HandContainer>
      )}
      <GameControls gameOver={gameOver} />
    </Wrapper>
  );
}
