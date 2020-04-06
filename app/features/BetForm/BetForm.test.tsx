import React from "react";
import { act, render, fireEvent } from "test-utils";
import BetForm from "./BetForm";
import store from "../../store";
import { resetGame } from "../Game/gameSlice";

describe("BetForm", (): void => {
  const onSubmit = jest.fn();
  const ui = <BetForm onSubmit={onSubmit} />;

  afterEach((): void => {
    act((): void => {
      store.dispatch(resetGame());
    });
  });

  it("should match snapshot", (): void => {
    const { baseElement } = render(ui);

    expect(baseElement).toMatchSnapshot();
  });

  describe("entering a valid number", (): void => {
    const newBet = 12;

    it("should enable the button", (): void => {
      const { getByTestId } = render(ui);
      const input = getByTestId("BetFormInput");
      const button = getByTestId("BetFormButton");

      expect(button.props.disabled).toBeTruthy();

      fireEvent.changeText(input, 1);

      expect(button.props.disabled).toBeFalsy();
    });

    it("should call on submit with bet value", (): void => {
      const { getByTestId } = render(ui);

      const input = getByTestId("BetFormInput");
      fireEvent.changeText(input, newBet);

      const button = getByTestId("BetFormButton");
      fireEvent.press(button);

      expect(onSubmit).toHaveBeenCalledWith(newBet);
    });
  });

  describe("entering a number less than or equal to 0", (): void => {
    const newBets = [0, -10];

    it("should show an error", (): void => {
      const { getByTestId } = render(ui);
      const input = getByTestId("BetFormInput");

      expect(input.props.caption).toEqual("");

      newBets.forEach((bet) => {
        fireEvent.changeText(input, bet);

        expect(input.props.caption).toEqual("Bet must be more than 0.");
      });
    });

    it("should disable the button", (): void => {
      const { getByTestId } = render(ui);
      const input = getByTestId("BetFormInput");
      const button = getByTestId("BetFormButton");

      fireEvent.changeText(input, 1);

      expect(button.props.disabled).toBeFalsy();

      newBets.forEach((bet) => {
        fireEvent.changeText(input, bet);

        expect(button.props.disabled).toBeTruthy();
      });
    });
  });

  describe("entering a number higher than the chips available", (): void => {
    const newBet = 1000;

    it("should show an error", (): void => {
      const { getByTestId } = render(ui);
      const input = getByTestId("BetFormInput");

      expect(input.props.caption).toEqual("");

      fireEvent.changeText(input, newBet);

      expect(input.props.caption).toEqual(
        "Bet must be less than or equal to your total chips."
      );
    });

    it("should disable the button", (): void => {
      const { getByTestId } = render(ui);
      const input = getByTestId("BetFormInput");
      const button = getByTestId("BetFormButton");

      fireEvent.changeText(input, 1);

      expect(button.props.disabled).toBeFalsy();

      fireEvent.changeText(input, newBet);

      expect(button.props.disabled).toBeTruthy();
    });
  });

  describe("entering an invalid number", (): void => {
    const newBet = "a";

    it("should show an error", (): void => {
      const { getByTestId } = render(ui);
      const input = getByTestId("BetFormInput");

      expect(input.props.caption).toEqual("");

      fireEvent.changeText(input, newBet);

      expect(input.props.caption).toEqual("Must be a valid number.");
    });

    it("should disable the button", (): void => {
      const { getByTestId } = render(ui);
      const input = getByTestId("BetFormInput");
      const button = getByTestId("BetFormButton");

      fireEvent.changeText(input, 1);

      expect(button.props.disabled).toBeFalsy();

      fireEvent.changeText(input, newBet);

      expect(button.props.disabled).toBeTruthy();
    });
  });
});
