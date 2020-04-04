import React from "react";
import { Provider } from "react-redux";
import store from "./app/store";
import Game from "./app/features/Game/Game";

export default function App() {
  return (
    <Provider store={store}>
      <Game />
    </Provider>
  );
}
