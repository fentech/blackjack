import React from "react";
import { Button } from "@ui-kitten/components";
import { Container, Input, Title } from "./BetForm.styles";
import useSelector from "../../functions/useSelector";

interface Props {
  onSubmit(bet: number): void;
}

const BetForm: React.FC<Props> = ({ onSubmit }) => {
  const [bet, setBet] = React.useState<number | string | undefined | null>();
  const [error, setError] = React.useState<string | null>(null);
  const { chips } = useSelector((state) => state.game);

  return (
    <Container testID="BetForm">
      <Title category="h3">Place your bet</Title>
      <Input
        value={bet || bet === 0 ? bet.toString() : ""}
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
        status={!error ? "primary" : "danger"}
        caption={!error ? "" : error}
        testID="BetFormInput"
      />
      <Button
        disabled={!bet || !!error}
        size="large"
        onPress={() => {
          if (typeof bet === "number") onSubmit(bet);
        }}
        testID="BetFormButton"
      >
        Bet
      </Button>
    </Container>
  );
};

export default BetForm;
