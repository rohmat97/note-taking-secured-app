import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import AddNoteScreen from "./add-note-screen";

// Mock the useNavigation and useNote hooks
jest.mock("@react-navigation/native", () => {
  return {
    useNavigation: () => ({
      goBack: jest.fn(),
    }),
    useRoute: () => ({
      params: null, // Adjust this to mock route params if needed
    }),
  };
});

jest.mock("../../hooks/use-note", () => {
  return {
    useNote: () => ({
      setNote: jest.fn(),
      deleteNote: jest.fn(),
    }),
  };
});

describe("AddNoteScreen", () => {
  it("renders correctly", () => {
    const { getByText, getByPlaceholderText } = render(<AddNoteScreen />);
    const label = getByText("Add a New Note:");
    const input = getByPlaceholderText("Enter your note");

    expect(label).toBeTruthy();
    expect(input).toBeTruthy();
  });

  it("handles adding a new note", async () => {
    const { getByPlaceholderText, getByText } = render(<AddNoteScreen />);
    const input = getByPlaceholderText("Enter your note");
    const addNoteButton = getByText("Add Note");

    fireEvent.changeText(input, "New note text");
    await fireEvent.press(addNoteButton);

    // Check if the setNote function is called with the correct text
    const { setNote } = require("../../hooks/use-note").useNote();
    expect(setNote).toHaveBeenCalledWith("New note text");

    // Check if the goBack function is called
    const { goBack } = require("@react-navigation/native").useNavigation();
    expect(goBack).toHaveBeenCalled();
  });

  it("handles editing a note", async () => {
    // Mocking route params for editing a note
    const { getByPlaceholderText, getByText } = render(
      <AddNoteScreen route={{ params: "Existing note text" }} />
    );
    const input = getByPlaceholderText("Enter your note");
    const editNoteButton = getByText("Edit Note");

    await fireEvent.press(editNoteButton);

    // Check if the setNote function is called with the correct text for editing
    const { setNote } = require("../../hooks/use-note").useNote();
    expect(setNote).toHaveBeenCalledWith("Existing note text");

    // Check if the goBack function is called
    const { goBack } = require("@react-navigation/native").useNavigation();
    expect(goBack).toHaveBeenCalled();
  });
});
