import React from "react";
// redux
import { useDispatch } from "react-redux";
import { hit, setTurn, resetGame } from "./gameSlice";
// components
import GameControls from "../GameControls/GameControls";
import HandsView from "../HandsView/HandsView";
import Header from "../Header/Header";
import { GameWrapper, MainWrapper } from "./Game.styles";
// utils
import useSelector from "../../functions/useSelector";

export default function Game() {
  const dispatch = useDispatch();
  const gameState = useSelector((state) => state.game);
  const { dealer, turn, chips } = gameState;

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
    <GameWrapper>
      <MainWrapper>
        <Header />
        <HandsView />
        <GameControls />
      </MainWrapper>
    </GameWrapper>
  );
}
