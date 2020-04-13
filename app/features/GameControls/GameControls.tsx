import React from "react";
import { useDispatch } from "react-redux";
import useSelector from "../../functions/useSelector";
import { hit, initNewRound, setTurn, startNewRound } from "../Game/gameSlice";
import { Container, Button } from "./GameControls.styles";
import BetForm from "../BetForm/BetForm";

export interface GameControlButtonProps {
  size: "giant";
  appearance: "outline";
  status: "warning";
}

const GameControls: React.FC = () => {
  const { isBetting, turn, gameOver } = useSelector((state) => state.game);
  const dispatch = useDispatch();
  const buttonProps: GameControlButtonProps = {
    size: "giant",
    appearance: "outline",
    status: "warning",
  };

  if (isBetting)
    return (
      <Container testID="GameControls">
        <BetForm
          buttonProps={buttonProps}
          onSubmit={(bet) => {
            dispatch(startNewRound(bet));
          }}
        />
      </Container>
    );

  if (gameOver)
    return (
      <Container testID="GameControls">
        <Button
          testID="PlayAgainButton"
          {...buttonProps}
          $last
          onPress={() => {
            dispatch(initNewRound());
          }}
        >
          Play Again
        </Button>
      </Container>
    );

  return (
    <Container testID="GameControls">
      <Button
        {...buttonProps}
        disabled={turn === "dealer"}
        testID="HitButton"
        onPress={() => {
          dispatch(hit("player"));
        }}
      >
        Hit
      </Button>
      <Button
        {...buttonProps}
        disabled={turn === "dealer"}
        testID="StandButton"
        $last
        onPress={() => {
          dispatch(setTurn("dealer"));
        }}
      >
        Stand
      </Button>
    </Container>
  );
};

export default GameControls;
