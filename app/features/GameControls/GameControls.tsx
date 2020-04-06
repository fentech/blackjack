import React from "react";
import { Button, ButtonText } from "./GameControls.styles";
import { useDispatch } from "react-redux";
import { hit, initNewRound, setTurn, startNewRound } from "../Game/gameSlice";
import BetForm from "../BetForm/BetForm";
import useSelector from "../../functions/useSelector";
import { View } from "react-native";

interface Props {
  gameOver: boolean;
}

const GameControls: React.FC<Props> = ({ gameOver }) => {
  const { isBetting } = useSelector((state) => state.game);
  const dispatch = useDispatch();

  if (isBetting)
    return (
      <View testID="GameControls">
        <BetForm
          onSubmit={(bet) => {
            dispatch(startNewRound(bet));
          }}
        />
      </View>
    );

  if (gameOver)
    return (
      <View testID="GameControls">
        <Button
          testID="PlayAgainButton"
          onPress={() => {
            dispatch(initNewRound());
          }}
        >
          <ButtonText>Play Again</ButtonText>
        </Button>
      </View>
    );

  return (
    <View testID="GameControls">
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
    </View>
  );
};

export default GameControls;
