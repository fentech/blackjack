import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import game from "./features/Game/gameSlice";
const rootReducer = combineReducers({
  game,
});
export type RootState = ReturnType<typeof rootReducer>;

const defaultMiddleware = getDefaultMiddleware({
  immutableCheck: {
    ignoredPaths: ["game.deck"],
  },
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [...defaultMiddleware],
});
export type AppDispatch = typeof store.dispatch;

export default store;
