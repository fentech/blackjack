import React from "react";
import { Button } from "@ui-kitten/components";
import { Container, Input, Title } from "./BetForm.styles";
import useSelector from "../../functions/useSelector";
import { GameControlButtonProps } from "../GameControls/GameControls";

interface Props {
  buttonProps: GameControlButtonProps;
  onSubmit(bet: number): void;
}

const BetForm: React.FC<Props> = ({ buttonProps, onSubmit }) => {
  const [bet, setBet] = React.useState<number | string | null>(10);
  const [error, setError] = React.useState<string | null>(null);
  const { chips } = useSelector((state) => state.game);

  function handleSubmit() {
    if (typeof bet === "number") onSubmit(bet);
  }

  return (
    <Container testID="BetForm">
      <Title category="h3">Place your bet</Title>
      <Input
        autoFocus
        enablesReturnKeyAutomatically
        keyboardType="number-pad"
        returnKeyType="go"
        value={bet || bet === 0 ? bet.toString() : ""}
        onSubmitEditing={handleSubmit}
        onChangeText={(text) => {
          const number = parseInt(text);

          if (!number && number !== 0) {
            setError("Must be a valid number.");
            setBet(text);
          } else {
            setBet(number);

            if (number <= 0) {
              setError("Bet must be more than 0.");
            } else if (number > chips) {
              setError("Bet must be less than or equal to your total chips.");
            } else {
              setError(null);
            }
          }
        }}
        status={!error ? "basic" : "danger"}
        caption={!error ? "" : error}
        testID="BetFormInput"
        style={{
          backgroundColor: "rgba(255,255,255,0.2)",
        }}
      />
      <Button
        {...buttonProps}
        appearance="filled"
        disabled={!bet || !!error}
        size="giant"
        onPress={handleSubmit}
        testID="BetFormButton"
      >
        Bet
      </Button>
    </Container>
  );
};

export default BetForm;
