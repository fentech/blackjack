import React from "react";
import { HandsContainer, HandsWrapper } from "./HandsView.styles";
import Hand from "../Hand/Hand";
import useSelector from "../../functions/useSelector";

const HandsView: React.FC = () => {
  const gameState = useSelector((state) => state.game);
  const { player, dealer, turn, isBetting } = gameState;

  return (
    <HandsContainer testID="Cards">
      {!isBetting && (
        <HandsWrapper level="2">
          <Hand
            hideCard={turn === "player"}
            person="dealer"
            personState={dealer}
            testID="DealerHand"
          />
          <Hand last person="player" personState={player} testID="PlayerHand" />
        </HandsWrapper>
      )}
    </HandsContainer>
  );
};

export default HandsView;
