import React from "react";
import { Button, ButtonText } from "./GameControls.styles";
import { useDispatch } from "react-redux";
import { hit, newRound, setTurn } from "../Game/game.slice";

interface Props {
  gameOver: boolean;
}

const GameControls: React.FC<Props> = ({ gameOver }) => {
  const dispatch = useDispatch();

  if (gameOver)
    return (
      <Button
        onPress={() => {
          dispatch(newRound());
        }}
      >
        <ButtonText>Play Again</ButtonText>
      </Button>
    );

  return (
    <>
      <Button
        onPress={() => {
          dispatch(hit("player"));
        }}
      >
        <ButtonText>Hit</ButtonText>
      </Button>
      <Button
        onPress={() => {
          dispatch(setTurn("dealer"));
        }}
      >
        <ButtonText>Stand</ButtonText>
      </Button>
    </>
  );
};

export default GameControls;
