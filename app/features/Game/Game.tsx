import React from "react";
// redux
import { useDispatch } from "react-redux";
import { hit, setTurn, newRound, GameState } from "./gameSlice";
// components
import GameControls from "../GameControls/GameControls";
import Hand from "../Hands/Hand";
import { HandContainer, Status, Title, Wrapper } from "./Game.styles";
// utils
import { getEndGameStatus, isGameOver } from "../GameControls/utils";
import useSelector from "../../functions/useSelector";

export default function Game() {
  const [gameOver, setGameOver] = React.useState(false);

  const dispatch = useDispatch();
  const { player, dealer, turn } = useSelector((state) => state.game);

  React.useEffect(() => {
    dispatch(newRound());
  }, []);

  React.useEffect(() => {
    if (isGameOver(player.score, dealer.score, turn) && !gameOver) {
      setGameOver(true);
    } else {
      setGameOver(false);
    }
  }, [player, dealer, turn]);

  React.useEffect(() => {
    if (turn === "dealer") {
      if (dealer.score < 17) {
        setTimeout(() => dispatch(hit("dealer")), 1000);
      } else {
        dispatch(setTurn(null));
      }
    }
  }, [dealer, turn]);

  return (
    <Wrapper>
      <Title>Blackjack</Title>
      {gameOver ? (
        <Status>{getEndGameStatus(player.score, dealer.score, turn)}</Status>
      ) : null}
      <HandContainer>
        <Hand
          hideCard={turn === "player"}
          person="dealer"
          personState={dealer}
        />
        <Hand person="player" personState={player} />
      </HandContainer>
      <GameControls gameOver={gameOver} />
    </Wrapper>
  );
}
