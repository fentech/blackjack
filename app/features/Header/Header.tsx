import React from "react";
import {
  ChipsContainer,
  HeaderContainer,
  Status,
  Title,
} from "./Header.styles";
import { Text } from "@ui-kitten/components";
import useSelector from "../../functions/useSelector";
import { getEndGameStatus } from "../GameControls/utils";

const Header: React.FC = () => {
  const gameState = useSelector((state) => state.game);
  const { bet, chips, gameOver, isBetting } = gameState;

  return (
    <HeaderContainer>
      <Title>Blackjack</Title>
      <ChipsContainer>
        {!isBetting && (
          <Text testID="CurrentBet" category="h4">
            Current bet: {bet.toString()}
          </Text>
        )}
        <Text category="h5">Total chips: {chips.toString()}</Text>
      </ChipsContainer>
      {gameOver ? (
        <Status testID="Status">{getEndGameStatus(gameState)}</Status>
      ) : null}
    </HeaderContainer>
  );
};

export default Header;
