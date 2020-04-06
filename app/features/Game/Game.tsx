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
  const [gameOver, setGameOver] = React.useState(false);

  const dispatch = useDispatch();
  const { player, dealer, turn, bet, chips, isBetting } = useSelector(
    (state) => state.game
  );

  React.useEffect(() => {
    if (isGameOver(player.score, dealer.score, turn) && !gameOver) {
      setGameOver(true);
    } else if (turn && gameOver) {
      setGameOver(false);
    }
  }, [player, dealer, turn]);

  React.useEffect(() => {
    if (turn === "dealer") {
      if (dealer.score < 17) {
        setTimeout(() => dispatch(hit("dealer")), 1000);
      } else {
        dispatch(setTurn(null));
        setGameOver(true);
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
        <Status testID="Status">
          {getEndGameStatus(player.score, dealer.score, turn)}
        </Status>
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
