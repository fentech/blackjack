import React from "react";
import { Provider } from "react-redux";
import { ApplicationProvider } from "@ui-kitten/components";
import { mapping, light as lightTheme } from "@eva-design/eva";
import Game from "./app/features/Game/Game";
import store from "./app/store";

export default function App() {
  return (
    <ApplicationProvider mapping={mapping} theme={lightTheme}>
      <Provider store={store}>
        <Game />
      </Provider>
    </ApplicationProvider>
  );
}
