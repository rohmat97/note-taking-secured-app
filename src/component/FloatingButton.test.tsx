// FloatingButton.test.tsx
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import FloatingButton from "./FloatingButton"; // Adjust the import path

describe("FloatingButton Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(<FloatingButton label="Test Button" />);
    const button = getByText("Test Button");
    expect(button).toBeTruthy();
  });

  it("executes the action on button press", () => {
    const action = jest.fn();
    const { getByText } = render(
      <FloatingButton label="Test Button" action={action} />
    );
    const button = getByText("Test Button");

    fireEvent.press(button);
    expect(action).toHaveBeenCalled();
  });
});
