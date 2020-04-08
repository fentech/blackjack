import React from "react";
import styled from "styled-components/native";
import { Image } from "react-native";
import twoOfSpades from "./cards/2_of_spades.png";
import twoOfDiamonds from "./cards/2_of_diamonds.png";
import twoOfClubs from "./cards/2_of_clubs.png";
import twoOfHearts from "./cards/2_of_hearts.png";
import threeOfSpades from "./cards/3_of_spades.png";
import threeOfDiamonds from "./cards/3_of_diamonds.png";
import threeOfClubs from "./cards/3_of_clubs.png";
import threeOfHearts from "./cards/3_of_hearts.png";
import fourOfSpades from "./cards/4_of_spades.png";
import fourOfDiamonds from "./cards/4_of_diamonds.png";
import fourOfClubs from "./cards/4_of_clubs.png";
import fourOfHearts from "./cards/4_of_hearts.png";
import fiveOfSpades from "./cards/5_of_spades.png";
import fiveOfDiamonds from "./cards/5_of_diamonds.png";
import fiveOfClubs from "./cards/5_of_clubs.png";
import fiveOfHearts from "./cards/5_of_hearts.png";
import sixOfSpades from "./cards/6_of_spades.png";
import sixOfDiamonds from "./cards/6_of_diamonds.png";
import sixOfClubs from "./cards/6_of_clubs.png";
import sixOfHearts from "./cards/6_of_hearts.png";
import sevenOfSpades from "./cards/7_of_spades.png";
import sevenOfDiamonds from "./cards/7_of_diamonds.png";
import sevenOfClubs from "./cards/7_of_clubs.png";
import sevenOfHearts from "./cards/7_of_hearts.png";
import eightOfSpades from "./cards/8_of_spades.png";
import eightOfDiamonds from "./cards/8_of_diamonds.png";
import eightOfClubs from "./cards/8_of_clubs.png";
import eightOfHearts from "./cards/8_of_hearts.png";
import nineOfSpades from "./cards/9_of_spades.png";
import nineOfDiamonds from "./cards/9_of_diamonds.png";
import nineOfClubs from "./cards/9_of_clubs.png";
import nineOfHearts from "./cards/9_of_hearts.png";
import tenOfSpades from "./cards/10_of_spades.png";
import tenOfDiamonds from "./cards/10_of_diamonds.png";
import tenOfClubs from "./cards/10_of_clubs.png";
import tenOfHearts from "./cards/10_of_hearts.png";
import jackOfSpades from "./cards/jack_of_spades.png";
import jackOfDiamonds from "./cards/jack_of_diamonds.png";
import jackOfClubs from "./cards/jack_of_clubs.png";
import jackOfHearts from "./cards/jack_of_hearts.png";
import queenOfSpades from "./cards/queen_of_spades.png";
import queenOfDiamonds from "./cards/queen_of_diamonds.png";
import queenOfClubs from "./cards/queen_of_clubs.png";
import queenOfHearts from "./cards/queen_of_hearts.png";
import kingOfSpades from "./cards/king_of_spades.png";
import kingOfDiamonds from "./cards/king_of_diamonds.png";
import kingOfClubs from "./cards/king_of_clubs.png";
import kingOfHearts from "./cards/king_of_hearts.png";
import aceOfSpades from "./cards/ace_of_spades.png";
import aceOfDiamonds from "./cards/ace_of_diamonds.png";
import aceOfClubs from "./cards/ace_of_clubs.png";
import aceOfHearts from "./cards/ace_of_hearts.png";
import { Ranks, Suits } from "./types";

export interface CardProps {
  suit: Suits;
  rank: Ranks;
}

const ImageContainer = styled.View`
  background-color: #fff;
  border-radius: 3px;
  padding: 4px;
  align-self: flex-start;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 115px;
  margin-right: 10px;
`;

const Card: React.FC<CardProps> = ({ suit, rank }) => {
  const cards = {
    jackOfSpades,
    jackOfDiamonds,
    jackOfClubs,
    jackOfHearts,
    queenOfSpades,
    queenOfDiamonds,
    queenOfClubs,
    queenOfHearts,
    kingOfSpades,
    kingOfDiamonds,
    kingOfClubs,
    kingOfHearts,
    aceOfSpades,
    aceOfDiamonds,
    aceOfClubs,
    aceOfHearts,
    twoOfSpades,
    twoOfDiamonds,
    twoOfClubs,
    twoOfHearts,
    threeOfSpades,
    threeOfDiamonds,
    threeOfClubs,
    threeOfHearts,
    fourOfSpades,
    fourOfDiamonds,
    fourOfClubs,
    fourOfHearts,
    fiveOfSpades,
    fiveOfDiamonds,
    fiveOfClubs,
    fiveOfHearts,
    sixOfSpades,
    sixOfDiamonds,
    sixOfClubs,
    sixOfHearts,
    sevenOfSpades,
    sevenOfDiamonds,
    sevenOfClubs,
    sevenOfHearts,
    eightOfSpades,
    eightOfDiamonds,
    eightOfClubs,
    eightOfHearts,
    nineOfSpades,
    nineOfDiamonds,
    nineOfClubs,
    nineOfHearts,
    tenOfSpades,
    tenOfDiamonds,
    tenOfClubs,
    tenOfHearts,
  };
  const cardKey = `${rank}Of${suit[0].toUpperCase() + suit.slice(1)}`;
  const card = cards[cardKey];

  return (
    <ImageContainer>
      <Image style={{ flex: 1 }} resizeMode="contain" source={card} />
    </ImageContainer>
  );
};

export default Card;
