import React from "react";
import Card from "../Card/Card";
import { PersonState } from "../Game/gameSlice";
import { getHiddenCardValue } from "../GameControls/utils";
import { Container, Name, CardContainer } from "./Hand.styles";
import { Person } from "../GameControls/types";

interface Props {
  hideCard?: boolean;
  person: Person;
  personState: PersonState;
  last?: boolean;
}

const Hand: React.FC<Props & Testable> = ({
  hideCard,
  person,
  personState,
  testID = "Hand",
  last = false,
}) => {
  const personTitle = person[0].toUpperCase() + person.slice(1);
  const score = personState.cards.length
    ? person == "dealer" && hideCard
      ? getHiddenCardValue(personState)
      : personState.score
    : 0;
  const name = personTitle + " - " + score;
  const cards =
    person == "dealer" && hideCard ? (
      <>
        <Card
          $first
          $zIndex={3}
          testID="DealerCard"
          {...personState.cards[0]}
        />
        <Card $last $zIndex={4} testID="DealerCard" />
      </>
    ) : (
      personState.cards.map((card, index, arr) => (
        <Card
          $first={index === 0}
          $last={index === arr.length - 1}
          $zIndex={index + 3}
          testID={`${personTitle}Card`}
          key={index}
          {...card}
        />
      ))
    );

  return (
    <Container $last={last} testID={testID}>
      <Name testID="HandName">{name}</Name>
      <CardContainer>{cards}</CardContainer>
    </Container>
  );
};

export default Hand;
