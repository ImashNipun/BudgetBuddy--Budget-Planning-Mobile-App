import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import logo from "../../assets/app_logo.png";

const BudgetCreateSuccessScreen = ({ navigation }) => {
  //const navigation = useNavigation();

  const handleHomePress = () => {
    // Navigate to the home page
    navigation.navigate("AppDrawer");
  };

  const handleExpensePress = () => {
    // Navigate to the expense page
    navigation.navigate("AppDrawer", { screen: "Budget" });
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={logo} style={styles.logo} />

      {/* Congratulations Title */}
      <Text style={styles.title}>Congratulations!</Text>

      {/* Description */}
      <Text style={styles.description}>
        You are setup your budget successfully. Now you can start adding
        expenses. Click below button to go to expense screen or home screen.
      </Text>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.loginButton} onPress={handleHomePress}>
          <Text style={styles.loginButtonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleExpensePress}
        >
          <Text style={styles.loginButtonText}>My Expenses</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "90%",
  },
  loginButton: {
    backgroundColor: "#8373C1",
    paddingVertical: 15,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    width: 130,
  },
  loginButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default BudgetCreateSuccessScreen;
