import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import LandingScreen from "./landing-screen";

// Mock the useNavigation hook
jest.mock("@react-navigation/native", () => {
  return {
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});

describe("LandingScreen", () => {
  it("renders correctly", () => {
    const { getByText } = render(<LandingScreen />);
    const authenticateButton = getByText("Authenticate");

    expect(authenticateButton).toBeTruthy();
  });

  it('navigates to the "authentication" screen when the button is pressed', () => {
    const { getByText } = render(<LandingScreen />);
    const authenticateButton = getByText("Authenticate");

    fireEvent.press(authenticateButton);
  });
});
