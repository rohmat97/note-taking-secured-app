import { useCallback, useMemo, useState } from "react";
import { NoteContext } from "../context/note-context";

export const NoteProvider = ({ children }: { children: React.ReactNode }) => {
  const [listNote, setlistNote] = useState<string[]>(["asdasd", "bbbb"]);

  const setNote = useCallback(
    (payload: string) => {
      setlistNote((prev) => prev.concat(payload));
    },
    [listNote]
  );

  const contextValue = useMemo(
    () => ({
      listNote,
      setNote,
    }),
    [listNote, setNote]
  );

  return (
    <NoteContext.Provider value={contextValue}>{children}</NoteContext.Provider>
  );
};
