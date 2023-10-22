import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import DashboardScreen from "./dashboard-screen";

// Mock the useNavigation and useNote hooks
jest.mock("@react-navigation/native", () => {
  return {
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});

jest.mock("../../hooks/use-note", () => {
  return {
    useNote: () => ({
      listNote: ["Note 1", "Note 2"],
      deleteNote: jest.fn(),
    }),
  };
});

describe("DashboardScreen", () => {
  it("renders correctly", () => {
    const { getByText, getAllByText } = render(<DashboardScreen />);
    const title = getByText("List NoteTaking APP");
    const addButton = getByText("Add New Note");
    const editButtons = getAllByText("Edit");
    const deleteButtons = getAllByText("Delete");

    expect(title).toBeTruthy();
    expect(addButton).toBeTruthy();
    expect(editButtons).toHaveLength(2); // Check for the number of edit buttons
    expect(deleteButtons).toHaveLength(2); // Check for the number of delete buttons
  });

  it('calls navigate when the "Add New Note" button is pressed', () => {
    const { getByText } = render(<DashboardScreen />);
    const addButton = getByText("Add New Note");

    fireEvent.press(addButton);
  });

  it('calls navigate with the correct payload when "Edit" button is pressed', () => {
    const { getAllByText } = render(<DashboardScreen />);
    const editButtons = getAllByText("Edit");

    fireEvent.press(editButtons[0]);
  });

  it('calls deleteNote when "Delete" button is pressed', () => {
    const { getAllByText } = render(<DashboardScreen />);
    const deleteButtons = getAllByText("Delete");

    fireEvent.press(deleteButtons[0]);
  });
});
