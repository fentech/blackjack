import React from "react";
import { render } from "test-utils";
import GameControls from "./GameControls";

describe("GameControls", (): void => {
  describe("gameOver = false", (): void => {
    const ui = <GameControls gameOver={false} />;

    it("should render the 'Hit' button", (): void => {
      const { getByTestId } = render(ui);

      expect(getByTestId("HitButton")).toBeTruthy();
    });

    it("should render the 'Stand' button", (): void => {
      const { getByTestId } = render(ui);

      expect(getByTestId("StandButton")).toBeTruthy();
    });

    it("should not render a 'Play Again' button", (): void => {
      const { queryByTestId } = render(ui);

      expect(queryByTestId("PlayAgainButton")).toBeFalsy();
    });
  });

  describe("gameOver = true", (): void => {
    const ui = <GameControls gameOver={true} />;

    it("should render the 'Play Again' button", (): void => {
      const { getByTestId } = render(ui);

      expect(getByTestId("PlayAgainButton")).toBeTruthy();
    });

    it("should not render a 'Hit' button", (): void => {
      const { queryByTestId } = render(ui);

      expect(queryByTestId("HitButton")).toBeFalsy();
    });

    it("should not render a 'Stand' button", (): void => {
      const { queryByTestId } = render(ui);

      expect(queryByTestId("StandButton")).toBeFalsy();
    });
  });
});
