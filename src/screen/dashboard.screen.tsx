import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback } from "react";
import { useNote } from "../hooks/use-note";
import FloatingButton from "../component/FloatingButton";
import { useNavigation, NavigationProp } from "@react-navigation/native";

const DashboardScreen = () => {
  const { navigate } = useNavigation<NavigationProp<any>>();
  const { listNote, deleteNote } = useNote();

  const handleEditNote = useCallback((payload: string) => {
    navigate("add-note", payload);
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: string }) => {
      return (
        <View style={styles.item}>
          <Text style={{ fontSize: 16 }}>{item}</Text>
          <View style={{ rowGap: 8 }}>
            <Button
              title="Edit"
              color={"#6082B6"}
              onPress={() => handleEditNote(item)}
            />
            <Button
              title="Delete"
              color={"#ff000030"}
              onPress={() => deleteNote(item)}
            />
          </View>
        </View>
      );
    },
    [listNote]
  );
  const renderEmpty = useCallback(() => {
    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        <Text style={{ color: "black" }}>
          Note still empty, Add your note ...
        </Text>
      </View>
    );
  }, []);

  const handleAddNewNote = useCallback(() => {
    navigate("add-note");
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>List NoteTaking APP</Text>
      <FlatList
        data={listNote}
        renderItem={renderItem}
        contentContainerStyle={{ rowGap: 8 }}
        ListEmptyComponent={renderEmpty}
      />
      <FloatingButton label="Add New Note" action={handleAddNewNote} />
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    rowGap: 24,
  },
  title: {
    color: "black",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
  },
  item: {
    backgroundColor: "gray",
    padding: 12,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
