import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DashboardScreen from "../screen/dashboard.screen";
import AddNoteScreen from "../screen/add-note-screen";
import AuthenticationScreen from "../screen/authentication-screen";
import LandingScreen from "../screen/landing-screen";

const MainStack = createNativeStackNavigator();

export function MainStackNavigation() {
  return (
    <MainStack.Navigator initialRouteName="landing">
      <MainStack.Screen name="landing" component={LandingScreen} />
      <MainStack.Screen
        name="authentication"
        component={AuthenticationScreen}
      />
      <MainStack.Screen name="dashboard" component={DashboardScreen} />
      <MainStack.Screen name="add-note" component={AddNoteScreen} />
    </MainStack.Navigator>
  );
}
