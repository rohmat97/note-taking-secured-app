import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useCallback } from "react";
import { useNote } from "../hooks/use-note";
import FloatingButton from "../component/FloatingButton";
import { useNavigation, NavigationProp } from "@react-navigation/native";

const DashboardScreen = () => {
  const { navigate } = useNavigation<NavigationProp<any>>();
  const { listNote } = useNote();
  const renderItem = useCallback(
    ({ item }: { item: string }) => {
      return (
        <View style={styles.item}>
          <Text style={{ fontSize: 16 }}>{item}</Text>
        </View>
      );
    },
    [listNote]
  );

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
  },
});
