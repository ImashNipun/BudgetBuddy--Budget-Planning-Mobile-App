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
import { StatusBar } from "react-native";
import CustomLoadingScreen from "./app/components/common/CustomLoadingScreen";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <StatusBar backgroundColor="#8373C1" />
        <Layout />
      </NavigationContainer>
    </AuthProvider>
  );
}

const Layout = () => {
  const { auth, isBudgetExsist, isBudgetExpire, isHealthy } = useAuth();

  console.log(isBudgetExpire);

  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isHealthy && (
          <Stack.Screen name="CustomLoading" component={CustomLoadingScreen} />
        )}

        <>
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
                <Stack.Screen
                  name="BudgetRenew"
                  component={BudgetRenewScreen}
                />
              )}

              <Stack.Screen name="AppDrawer" component={DrawerNavigation} />
            </>
          ) : (
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
            </>
          )}
        </>

        {/* <Stack.Screen name="BudgetAddIntro" component={BudgetAddIntroScreen} />
          <Stack.Screen name="BudgetSetup" component={BudgetSetupScreen} />
          <Stack.Screen
            name="BudgetSetupSuccess"
            component={BudgetCreateSuccessScreen}
          />

          <Stack.Screen name="BudgetRenew" component={BudgetRenewScreen} />

          <Stack.Screen name="AppDrawer" component={DrawerNavigation} />

          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} /> */}
      </Stack.Navigator>
    </>
  );
};
