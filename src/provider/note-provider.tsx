import { useCallback, useEffect, useMemo, useState } from "react";
import { NoteContext } from "../context/note-context";
import { MMKV } from "react-native-mmkv";

export const NoteProvider = ({ children }: { children: React.ReactNode }) => {
  const [listNote, setlistNote] = useState<string[]>([]);
  const storage = new MMKV();

  const setNote = useCallback(
    (payload: string) => {
      setlistNote((prev) => prev.concat(payload));
      storage.set("notes", JSON.stringify(listNote.concat(payload)));
    },
    [listNote]
  );

  useEffect(() => {
    // Load existing notes from MMKV on component mount
    const savedNotes = storage.getString("notes");
    if (savedNotes) {
      setlistNote(JSON.parse(savedNotes));
    }
  }, []);

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
