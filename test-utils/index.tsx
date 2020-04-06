import React from "react";
import { render, RenderOptions } from "@testing-library/react-native";
import { Provider } from "react-redux";
import { ApplicationProvider } from "@ui-kitten/components";
import { mapping, light as lightTheme } from "@eva-design/eva";
import store from "../app/store";

export const WithRedux: React.FC = ({ children }) => {
  return (
    <ApplicationProvider mapping={mapping} theme={lightTheme}>
      <Provider store={store}>{children}</Provider>
    </ApplicationProvider>
  );
};

const customRender = (
  ui: JSX.Element,
  options: Omit<RenderOptions, "queries"> = {}
) => render(ui, { wrapper: WithRedux, ...options });

// re-export everything
export * from "@testing-library/react-native";

// override render method
export { customRender as render };
