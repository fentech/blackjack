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

  return (
    <Container $last={last} testID={testID}>
      <Name testID="HandName">
        {personTitle} -{" "}
        {personState.cards.length &&
          (person == "dealer" && hideCard
            ? getHiddenCardValue(personState)
            : personState.score)}
      </Name>
      <CardContainer>
        {person == "dealer" && hideCard ? (
          <Card testID="DealerCard" {...personState.cards[0]} />
        ) : (
          personState.cards.map((card, index) => (
            <Card testID={`${personTitle}Card`} key={index} {...card} />
          ))
        )}
      </CardContainer>
    </Container>
  );
};

export default Hand;
