import React from "react";
import { View } from "react-native";
import Card from "../Card/Card";
import { PersonState } from "../Game/gameSlice";
import { getHiddenCardValue } from "../GameControls/utils";
import { Container, Name } from "./Hand.styles";
import { Person } from "../GameControls/types";

interface Props {
  hideCard?: boolean;
  person: Person;
  personState: PersonState;
}

const Hand: React.FC<Props & Testable> = ({
  hideCard,
  person,
  personState,
}) => {
  return (
    <Container>
      <Name testID="HandName">
        {person[0].toUpperCase() + person.slice(1)} -{" "}
        {personState.cards.length &&
          (person == "dealer" && hideCard
            ? getHiddenCardValue(personState)
            : personState.score)}
      </Name>
      <View>
        {person == "dealer" && hideCard ? (
          <Card {...personState.cards[0]} />
        ) : (
          personState.cards.map((card, index) => <Card key={index} {...card} />)
        )}
      </View>
    </Container>
  );
};

export default Hand;
