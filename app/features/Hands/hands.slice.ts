import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CardProps } from '../Card/Card';
import { setTurn } from "../Game/game.slice";
import { Person } from '../GameControls/types';

export interface HandsSliceState {
  dealer: CardProps[];
  player: CardProps[];
}

const handsSlice = createSlice({
  name: 'hands',
  initialState: {
    player: [],
    dealer: []
  },
  reducers: {
    addCard(state: HandsSliceState, action: PayloadAction<{ person: Person; card: CardProps }>) {
        const { card, person } = action.payload
        state[person].push(card)
    },
    resetCards() {
      return {
        player: [],
        dealer: []
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(setTurn, (state, action) => {
      console.log("handsSlice -> response to setTurn being called: ", {state,action})
    })
  }
});

export const { addCard, resetCards } = handsSlice.actions

export default handsSlice.reducer;
