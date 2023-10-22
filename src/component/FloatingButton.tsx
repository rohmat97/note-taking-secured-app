import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface Props {
  label: string;
  action?: () => void;
}
const FloatingButton = ({ action, label }: Props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={action}>
        <Text style={styles.buttonText}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end", // Align to the bottom of the screen
    alignItems: "center", // Center horizontally
    paddingBottom: 20, // Optional padding from the bottom
  },
  button: {
    backgroundColor: "#6082B6", // Background color
    width: "100%", // Full width
    padding: 15, // Optional padding
    borderRadius: 10, // Optional border radius
    alignItems: "center", // Center content horizontally
  },
  buttonText: {
    color: "white", // Text color
    fontSize: 16,
  },
});

export default FloatingButton;
