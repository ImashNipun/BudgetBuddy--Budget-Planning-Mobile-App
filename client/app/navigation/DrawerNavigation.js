import { View, Text } from "react-native";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/common/HomeScreen";
import BudgetScreen from "../screens/common/BudgetScreen";
//import ExpenseScreen from "../screens/expense/ExpenseScreen";
import SavingsScreen from "../screens/common/SavingsScreen";
//import GoalsScreen from "../screens/goals/GoalsScreen";
//import SingleExpenseCategory from "../screens/expense/SingleExpenseCategory";
//import AddExpenseWithCategory from "../screens/expense/AddExpenseWithCategory";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Budget" component={BudgetScreen} />
      {/* <Drawer.Screen name="Expenses" component={ExpenseStack} /> */}
      <Drawer.Screen name="Savings" component={SavingsScreen} />
      {/* <Drawer.Screen name="Goals" component={GoalsScreen} /> */}
      {/* <Drawer.Screen name="Date" component={SelectDateAndTimeModel} /> */}
    </Drawer.Navigator>
  );
};

// const ExpenseStack = () => {
//   return (
//     <Stack.Navigator
//       initialRouteName="AllExpenseCategories"
//       screenOptions={{ headerShown: false }}
//     >
//       <Stack.Screen name="AllExpenseCategories" component={ExpenseScreen} />
//       <Stack.Screen
//         name="SingleExpenseCategory"
//         component={SingleExpenseCategory}
//       />
//       <Stack.Screen
//         name="AddExpensesWithCategory"
//         component={AddExpenseWithCategory}
//       />
//     </Stack.Navigator>
//   );
// };

export default DrawerNavigation;
