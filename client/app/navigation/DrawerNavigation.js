import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/common/HomeScreen";
import BudgetScreen from "../screens/common/BudgetScreen";
import SavingsScreen from "../screens/common/SavingsScreen";
import { FontAwesome5 } from "@expo/vector-icons"; // Import icons from FontAwesome5
import useAuth from "../hooks/useAuth";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const CustomDrawerContent = (props) => {
  const { auth} = useAuth()
  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{
          alignItems: "center",
          marginTop: 20,
          objectFit: "cover",
        }}
      >
        {/* Add your circular profile picture here */}
        <Image
          source={require("../../assets/profile.png")} // Replace with your image source
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
        <Text style={{ marginTop: 10 }}>name</Text>
      </View>

      <View>
        <DrawerItemList {...props} />
      </View>
      <DrawerItem
        label="Logout"
        icon={() => <FontAwesome5 name="sign-out-alt" size={24} />}
        onPress={() => {
          // Implement your logout logic here
        }}
      />
      <View
        style={{ marginTop: "auto", alignItems: "center", marginBottom: 20 }}
      >
        {/* Add your logo at the bottom */}
        <Image
          source={require("../../assets/app_logo2.png")} // Replace with your logo source
          style={{ width: 50, height: 50, objectFit: "contain" }}
        />
      </View>
    </DrawerContentScrollView>
  );
};

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContentOptions={{
        activeBackgroundColor: "purple", // Selected drawer background color
        activeTintColor: "green", // Selected icon and text color
        inactiveTintColor: "green", // Inactive icon and text color
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: ({ color }) => <FontAwesome5 name="home" size={24} color={color}/>,
        }}
      />
      <Drawer.Screen
        name="Budget"
        component={BudgetScreen}
        options={{
          drawerIcon: ({ color }) => <FontAwesome5 name="money-bill" size={24} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Savings"
        component={SavingsScreen}
        options={{
          drawerIcon: ({ color }) => <FontAwesome5 name="piggy-bank" size={24} color={color}/>,
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
