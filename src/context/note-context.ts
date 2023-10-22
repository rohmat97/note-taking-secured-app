import React, { RefObject } from "react";

type NoteContextType = {
  listNote: string[];
  setNote: (payload: any) => void;
  deleteNote: (payload: any) => void;
  editNote: (payload: any) => void;
};

export const NoteContext = React.createContext({} as NoteContextType);
