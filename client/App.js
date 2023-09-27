import "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DrawerNavigation from "./app/navigation/DrawerNavigation";
import LoginScreen from "./app/screens/common/LoginScreen";
import RegisterScreen from "./app/screens/RegisterScreen";
import BudgetAddIntroScreen from "./app/screens/BudgetAddIntroScreen";
import BudgetSetupScreen from "./app/screens/BudgetSetupScreen";
import BudgetCreateSuccessScreen from "./app/screens/BudgetCreateSuccessScreen";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_300Light,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import { AuthProvider } from "./app/context/AuthContext";
import useAuth from "./app/hooks/useAuth";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <Layout></Layout>
    </AuthProvider>
  );
}

const Layout = () => {
  const { auth } = useAuth();

  auth.authenticated = true;
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {auth?.authenticated ? (
          <>
            {/* <Stack.Screen
              name="BudgetAddIntro"
              component={BudgetAddIntroScreen}
            />
            <Stack.Screen name="BudgetSetup" component={BudgetSetupScreen} />
            <Stack.Screen
              name="BudgetSetupSuccess"
              component={BudgetCreateSuccessScreen}
            /> */}
            <Stack.Screen name="AppDrawer" component={DrawerNavigation} />
          </>
        ) : (
          <>
            {/* <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} /> */}
          </>
        )}
        {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
