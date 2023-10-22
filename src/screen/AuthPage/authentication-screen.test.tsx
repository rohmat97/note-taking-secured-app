import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import AuthenticationScreen from "./authentication-screen";

// Mock the useNavigation and TouchID
jest.mock("@react-navigation/native", () => {
  return {
    useNavigation: () => ({
      reset: jest.fn(),
    }),
  };
});

jest.mock("react-native-touch-id", () => {
  return {
    isSupported: jest.fn().mockResolvedValue(true),
    authenticate: jest.fn().mockResolvedValue(true),
  };
});

describe("AuthenticationScreen", () => {
  it("renders correctly with biometric support", () => {
    const { getByText, getByPlaceholderText } = render(
      <AuthenticationScreen />
    );
    const passwordInput = getByPlaceholderText("Enter your password");
    const passwordLoginButton = getByText("Password Login");
    const biometricLoginButton = getByText("Biometric Login");

    expect(passwordInput).toBeTruthy();
    expect(passwordLoginButton).toBeTruthy();
    expect(biometricLoginButton).toBeTruthy();
  });

  it("handles password login", () => {
    const { getByPlaceholderText, getByText } = render(
      <AuthenticationScreen />
    );
    const passwordInput = getByPlaceholderText("Enter your password");
    const passwordLoginButton = getByText("Password Login");

    fireEvent.changeText(passwordInput, "12345");
    fireEvent.press(passwordLoginButton);

    // Check if navigation reset function is called
    const { reset } = require("@react-navigation/native").useNavigation();
    expect(reset).toHaveBeenCalledWith({
      index: 0,
      routes: [{ name: "dashboard" }],
    });
  });

  it("handles biometric login", async () => {
    const { getByText } = render(<AuthenticationScreen />);
    const biometricLoginButton = getByText("Biometric Login");

    await fireEvent.press(biometricLoginButton);

    // Check if the authenticateBiometric function is called
    const authenticateBiometric =
      require("./AuthenticationScreen").authenticateBiometric;
    expect(authenticateBiometric).toHaveBeenCalled();
  });
});
