import { configureStore, combineReducers } from "@reduxjs/toolkit";
import game from "./features/Game/gameSlice";
const rootReducer = combineReducers({
  game,
});
export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});
export type AppDispatch = typeof store.dispatch;

export default store;
