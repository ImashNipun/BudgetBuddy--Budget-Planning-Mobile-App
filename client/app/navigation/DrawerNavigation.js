import React, { useEffect } from "react";
import { View, Text, Image, Alert } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation, CommonActions } from "@react-navigation/native";
import HomeScreen from "../screens/common/HomeScreen";
import BudgetScreen from "../screens/common/BudgetScreen";
import SavingsScreen from "../screens/common/SavingsScreen";
import { FontAwesome5 } from "@expo/vector-icons"; // Import icons from FontAwesome5
import useAuth from "../hooks/useAuth";
import ExpenseScreen from "../screens/expense/ExpenseScreen";
import SingleExpenseCategory from "../screens/expense/SingleExpenseCategory";
import AddExpenseWithCategory from "../screens/expense/AddExpenseWithCategory";
import AddGoalScreen from "../screens/goals/AddGoalScreen";
import GoalsScreen from "../screens/goals/GoalsScreen";
import Chart from "../screens/analytics/Chart";
import { config } from "../config/config";
import axios from "axios";

const Drawer = createDrawerNavigator();

const ExpenseStack = createNativeStackNavigator();
const GoalsStack = createNativeStackNavigator();

const ExpenseScreenStack = () => (
  <ExpenseStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <ExpenseStack.Screen
      name="AllExpenseCategories"
      component={ExpenseScreen}
    />
    <ExpenseStack.Screen
      name="AddExpensesWithCategory"
      component={AddExpenseWithCategory}
    />
    <ExpenseStack.Screen
      name="SingleExpenseCategory"
      component={SingleExpenseCategory}
    />
    {/* Add other screens for the Expense stack as needed */}
  </ExpenseStack.Navigator>
);

const GoalScreenStack = () => {
  return (
    <GoalsStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <GoalsStack.Screen name="AllGoals" component={GoalsScreen} />
      <GoalsStack.Screen name="AddGoals" component={AddGoalScreen} />
    </GoalsStack.Navigator>
  );
};

const CustomDrawerContent = (props) => {
  const { auth, onLogout } = useAuth();
  const [user, setUser] = React.useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          `${config.BASE_URL}/api/v1/user/${auth?.user}`
        );

        setUser(response?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, [auth]);

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          alignItems: "center",
          marginTop: 30,
          marginBottom: "auto",
          objectFit: "cover",
        }}
      >
        {/* Add your circular profile picture here */}
        <Image
          source={require("../../assets/profile.png")} // Replace with your image source
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
        <Text style={{ marginTop: 10 }}>{user && user?.user_name}</Text>
      </View>

      <View>
        <DrawerItemList {...props} />
      </View>

      <DrawerItem
        label="Logout"
        icon={() => <FontAwesome5 name="sign-out-alt" size={24} />}
        onPress={() => {
          Alert.alert("Logout", "Are you sure you want to logout?", [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            {
              text: "Logout",
              onPress: () => {
                onLogout();
              },
            },
          ]);
        }}
      />
      <View
        style={{ marginTop: "auto", alignItems: "center", marginBottom: 10 }}
      >
        {/* Add your logo at the bottom */}
        <Image
          source={require("../../assets/app_logo2.png")} // Replace with your logo source
          style={{ width: 100, height: 100, objectFit: "contain" }}
        />
      </View>
    </DrawerContentScrollView>
  );
};

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        activeBackgroundColor: "red", // Selected drawer background color
        activeTintColor: "green", // Selected icon and text color
        inactiveTintColor: "green", // Inactive icon and text color
        headerShown: true,
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: ({ color }) => (
            <FontAwesome5 name="home" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Budget"
        component={BudgetScreen}
        options={{
          drawerIcon: ({ color }) => (
            <FontAwesome5 name="wallet" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Expenses"
        component={ExpenseScreenStack}
        options={{
          drawerIcon: ({ color }) => (
            <FontAwesome5 name="money-bill" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Savings"
        component={SavingsScreen}
        options={{
          drawerIcon: ({ color }) => (
            <FontAwesome5 name="piggy-bank" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Goals"
        component={GoalScreenStack}
        options={{
          drawerIcon: ({ color }) => (
            <FontAwesome5 name="bullseye" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Analytics"
        component={Chart}
        options={{
          drawerIcon: ({ color }) => (
            <FontAwesome5 name="chart-line" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Notifications"
        component={Chart}
        options={{
          drawerIcon: ({ color }) => (
            <FontAwesome5 name="bell" size={24} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
