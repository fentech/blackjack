import React from "react";
import { useDispatch } from "react-redux";
import useSelector from "../../functions/useSelector";
import {
  doubleDown,
  hit,
  initNewRound,
  setTurn,
  startNewRound,
} from "../Game/gameSlice";
import {
  Container,
  Button,
  ButtonGroup,
  InnerButton,
} from "./GameControls.styles";
import BetForm from "../BetForm/BetForm";

export interface GameControlButtonProps {
  size: "giant";
  appearance: "outline";
  status: "warning";
}

const GameControls: React.FC = () => {
  const { gameOver, isBetting, player, turn } = useSelector(
    (state) => state.game
  );
  const dispatch = useDispatch();
  const buttonProps: GameControlButtonProps = {
    size: "giant",
    appearance: "outline",
    status: "warning",
  };
  const startPlayersTurn = player.cards.length === 2;
  let Controls = null;

  if (turn === "player")
    Controls = (
      <>
        <ButtonGroup {...buttonProps}>
          <InnerButton
            onPress={() => {
              dispatch(hit("player"));
            }}
            testID="HitButton"
          >
            Hit
          </InnerButton>
          <InnerButton
            onPress={() => {
              dispatch(setTurn("dealer"));
            }}
            testID="StandButton"
          >
            Stand
          </InnerButton>
        </ButtonGroup>
        {startPlayersTurn && (
          <Button
            {...buttonProps}
            $last
            onPress={() => {
              dispatch(doubleDown());
            }}
            testID="DoubleDownButton"
          >
            Double Down
          </Button>
        )}
      </>
    );

  if (isBetting)
    Controls = (
      <BetForm
        buttonProps={buttonProps}
        onSubmit={(bet) => {
          dispatch(startNewRound(bet));
        }}
      />
    );

  if (gameOver)
    Controls = (
      <Button
        {...buttonProps}
        $last
        onPress={() => {
          dispatch(initNewRound());
        }}
        testID="PlayAgainButton"
      >
        Play Again
      </Button>
    );

  return <Container testID="GameControls">{Controls}</Container>;
};

export default GameControls;
