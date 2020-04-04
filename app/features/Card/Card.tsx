import React from "react";
import styled from "styled-components/native";

export interface CardProps {
  suit: "hearts" | "diamonds" | "spades" | "clubs";
  rank: 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | "jack" | "queen" | "king" | "ace";
}

const CardText = styled.Text`
  font-size: 18px;
`;

const Card: React.FC<CardProps> = ({ suit, rank }) => {
  return (
    <CardText>
      {rank} of {suit}
    </CardText>
  );
};

export default Card;
