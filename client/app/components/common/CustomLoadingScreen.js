import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet, Image } from "react-native";
import logoimage from "../../../assets/app_logo_white.png";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { config } from "../../config/config";
import { useIsFocused } from "@react-navigation/native";
import { isLoading } from "expo-font";

const CustomLoadingScreen = ({ navigation }) => {
  const {
    auth,
    isBudgetExsist,
    isBudgetExpire,
    isHealthy,
    setIsHealthy,
    isLoading,
    setIsLoading,
  } = useAuth();
  const isFocused = useIsFocused();

  useEffect(() => {
    const getHealth = async () => {
      try {
        setIsHealthy(false);
        const result = await axios.get(`${config.BASE_URL}/health`);
        result?.status == "200" && setIsHealthy(true);
      } catch (error) {
        console.log(error);
      }
    };
    getHealth();
  }, []);

  //   if (isHealthy) {
  //     if (isBudgetExsist && isBudgetExpire && auth?.authenticated) {
  //       setIsLoading(false);
  //     }
  //   }

//   if (isHealthy) {
//     if (!auth?.authenticated) {
//       navigation.navigate("Login");
//     } else if (auth?.authenticated && !isBudgetExsist) {
//       navigation.navigate("BudgetAddIntro");
//     } else if (auth?.authenticated && !isBudgetExpire) {
//       navigation.navigate("BudgetRenew");
//     } else if (auth?.authenticated) {
//       setIsLoading(false);
//       if (!isLoading) {
//         navigation.navigate("AppDrawer");
//       }
//     }
//   }

  return (
    <View style={styles.container}>
      <Image
        source={logoimage}
        style={{ width: 200, height: 200, objectFit: "contain" }}
      />
      <ActivityIndicator size="large" color="#fff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#8274BC",
  },
});

export default CustomLoadingScreen;
