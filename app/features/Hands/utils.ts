import { CardProps } from '../Card/Card';
import { RANKS } from '../Game/constants';

export const getValue = (cards: CardProps[]): number => {
  if (cards.length === 0) return 0;

  let value = cards.reduce((cumm, card) => {
    return cumm += RANKS[card.rank]
  }, 0)
  if (value > 21 && cards.findIndex(card => card.rank === 'ace') > -1) value -= (10 * cards.filter(card => card.rank === 'ace').length);

  return value
}
