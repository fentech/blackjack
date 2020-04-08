import React from "react";
import { Provider } from "react-redux";
import { ApplicationProvider } from "@ui-kitten/components";
import { mapping } from "@eva-design/eva";
import { default as customMapping } from "./assets/custom-theme.json";
import Game from "./app/features/Game/Game";
import store from "./app/store";

export default function App() {
  return (
    <ApplicationProvider mapping={mapping} theme={customMapping}>
      <Provider store={store}>
        <Game />
      </Provider>
    </ApplicationProvider>
  );
}
