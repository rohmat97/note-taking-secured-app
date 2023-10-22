import React from "react";
import { NoteContext } from "../context/note-context";

export function useNote() {
  const context = React.useContext(NoteContext);

  if (!context) {
    throw "You need to add to your root component";
  }

  return context;
}
