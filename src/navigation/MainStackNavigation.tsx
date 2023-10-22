import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DashboardScreen from "../screen/Dashboard/dashboard-screen";
import AddNoteScreen from "../screen/AddNote/add-note-screen";
import AuthenticationScreen from "../screen/AuthPage/authentication-screen";
import LandingScreen from "../screen/LandingPage/landing-screen";

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
