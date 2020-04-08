import React from "react";
import { useDispatch } from "react-redux";
import useSelector from "../../functions/useSelector";
import { hit, initNewRound, setTurn, startNewRound } from "../Game/gameSlice";
import { Container, Button } from "./GameControls.styles";
import BetForm from "../BetForm/BetForm";

interface Props {
  gameOver: boolean;
}

export interface GameControlButtonProps {
  size: "giant";
  appearance: "outline";
  status: "warning";
}

const GameControls: React.FC<Props> = ({ gameOver }) => {
  const { isBetting, turn } = useSelector((state) => state.game);
  const dispatch = useDispatch();
  const buttonProps: GameControlButtonProps = {
    size: "giant",
    appearance: "outline",
    status: "warning",
  };

  if (isBetting)
    return (
      <Container testID="GameControls" $flex={3}>
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
        disabled={turn === "dealer"}
        testID="HitButton"
        {...buttonProps}
        onPress={() => {
          dispatch(hit("player"));
        }}
      >
        Hit
      </Button>
      <Button
        disabled={turn === "dealer"}
        testID="StandButton"
        {...buttonProps}
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
