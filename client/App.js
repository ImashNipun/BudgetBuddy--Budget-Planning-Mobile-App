import React, { useState } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DrawerNavigation from "./app/navigation/DrawerNavigation";
import LoginScreen from "./app/screens/common/LoginScreen";
import RegisterScreen from "./app/screens/RegisterScreen";
import BudgetAddIntroScreen from "./app/screens/BudgetAddIntroScreen";
import BudgetSetupScreen from "./app/screens/BudgetSetupScreen";
import BudgetCreateSuccessScreen from "./app/screens/BudgetCreateSuccessScreen";
import BudgetRenewScreen from "./app/screens/BudgetRenewScreen";
import { AuthProvider } from "./app/context/AuthContext";
import useAuth from "./app/hooks/useAuth";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Layout />
      </NavigationContainer>
    </AuthProvider>
  );
}

const Layout = () => {
  const { auth, isBudgetExsist, isBudgetExpire } = useAuth();
  const [showSpinner, setShowSpinner] = useState(true);

  console.log(isBudgetExpire);

  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {auth?.authenticated ? (
          <>
            {!isBudgetExsist && (
              <>
                <Stack.Screen
                  name="BudgetAddIntro"
                  component={BudgetAddIntroScreen}
                />
                <Stack.Screen
                  name="BudgetSetup"
                  component={BudgetSetupScreen}
                />
                <Stack.Screen
                  name="BudgetSetupSuccess"
                  component={BudgetCreateSuccessScreen}
                />
              </>
            )}

            {isBudgetExpire && (
              <Stack.Screen name="BudgetRenew" component={BudgetRenewScreen} />
            )}

            <Stack.Screen name="AppDrawer" component={DrawerNavigation} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </>
  );
};
