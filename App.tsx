/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { MainStackNavigation } from "./src/navigation/MainStackNavigation";
function App(): JSX.Element {
  return (
    <NavigationContainer>
      <MainStackNavigation />
    </NavigationContainer>
  );
}

export default App;
