import React from "react";
import { Button, ButtonText } from "./GameControls.styles";
import { useDispatch } from "react-redux";
import { hit, newRound, setTurn } from "../Game/gameSlice";

interface Props {
  gameOver: boolean;
}

const GameControls: React.FC<Props> = ({ gameOver }) => {
  const dispatch = useDispatch();

  if (gameOver)
    return (
      <Button
        testID="PlayAgainButton"
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
        testID="HitButton"
        onPress={() => {
          dispatch(hit("player"));
        }}
      >
        <ButtonText>Hit</ButtonText>
      </Button>
      <Button
        testID="StandButton"
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
