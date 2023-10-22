import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const LandingScreen = () => {
  const { navigate } = useNavigation<NavigationProp<any>>();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigate("authentication");
          // Handle button press
        }}
      >
        <Text style={styles.buttonText}>Authenticate</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#007AFF", // Background color
    borderRadius: 5, // Optional border radius
    padding: 10, // Optional padding
    alignItems: "center",
  },
  buttonText: {
    color: "white", // Text color
    fontSize: 16,
  },
});
