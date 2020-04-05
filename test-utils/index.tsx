import React from "react";
import { render, RenderOptions } from "@testing-library/react-native";
import { Provider } from "react-redux";
import store from "../app/store";

const WihRedux: React.FC = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

const customRender = (
  ui: JSX.Element,
  options: Omit<RenderOptions, "queries"> = {}
) => render(ui, { wrapper: WihRedux, ...options });

// re-export everything
export * from "@testing-library/react-native";

// override render method
export { customRender as render };
