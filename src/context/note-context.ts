import React, { RefObject } from "react";

type NoteContextType = {
  listNote: string[];
  setNote: (payload: any) => void;
};

export const NoteContext = React.createContext({} as NoteContextType);
