/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { MainStackNavigation } from "./src/navigation/MainStackNavigation";
import { NoteProvider } from "./src/provider/note-provider";
function App(): JSX.Element {
  return (
    <NavigationContainer>
      <NoteProvider>
        <MainStackNavigation />
      </NoteProvider>
    </NavigationContainer>
  );
}

export default App;
