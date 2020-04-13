import { CardProps } from '../Card/Card';
import { RANKS } from '../Game/constants';

export const getValue = (cards: CardProps[]): number => {
  if (cards.length === 0) return 0;

  let aces = 0;
  let value = cards.reduce((cumm, card) => {
    if (card.rank === 'ace') aces++
    return cumm += RANKS[card.rank]
  }, 0)

  while (value > 21 && aces > 0) {
    value -= 10
    aces--
  }

  return value
}
