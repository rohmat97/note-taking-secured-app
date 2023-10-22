import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import FloatingButton from "../component/FloatingButton";
import { useNote } from "../hooks/use-note";
import {
  useNavigation,
  NavigationProp,
  useRoute,
} from "@react-navigation/native";

const AddNoteScreen = () => {
  const [note, setNotes] = useState(""); // State to hold the note text
  const { goBack } = useNavigation<NavigationProp<any>>();
  const { setNote, deleteNote } = useNote();
  const { params } = useRoute();

  const handleAddNote = useCallback(async () => {
    // Handle the submission of the new note here
    // You can save it to your data source, state, or perform any desired action
    console.log("New note:", note);
    if (params) await deleteNote(params);
    await setNote(note);
    goBack();
  }, [note]);

  useEffect(() => {
    if (params) {
      setNotes(params as unknown as string);
    }
  }, [params]);

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, flexGrow: 3, justifyContent: "center" }}>
        <Text style={styles.label}>
          {params ? "Edit Note:" : "Add a New Note:"}
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your note"
          onChangeText={(text) => setNotes(text)}
          value={note}
          multiline
        />
      </View>
      <FloatingButton
        label={params ? "Edit Note" : "Add Note"}
        action={handleAddNote}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#808080",
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    minHeight: 100,
  },
});

export default AddNoteScreen;
