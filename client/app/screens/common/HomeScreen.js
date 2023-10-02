import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import upimg from "../../../assets/up.png";
import downimg from "../../../assets/down.png";
import * as SecureStore from "expo-secure-store";
import useAuth from "../../hooks/useAuth";
import { useIsFocused } from "@react-navigation/native";
import { config } from "../../config/config";
import axios from "axios";

const HomeScreen = () => {
  const isFocused = useIsFocused();
  const { auth, onLogout } = useAuth();

  const [budget, setBudget] = useState({
    currentBalance: null,
    totalBudget: null,
    totalExpenses: null,
  });
  useEffect(() => {
    async function getdata() {
      try {
        const user = await SecureStore.getItemAsync("USER_DETAILS");
        console.log(user);
      } catch (error) {
        console.log("ERROR", error);
      }
    }

    getdata();

    console.log(auth ? auth : { message: "no auth" });
  }, [auth, isFocused]);

  useEffect(() => {
    const getBudgetDetails = async () => {
      try {
        const result = await axios.get(
          `${config.BASE_URL}/api/v1/budget/${auth?.user}`
        );

        const result_data = result?.data?.data;

        if (result_data?.savings) {
          setBudget((prev) => ({
            ...prev,
            totalBudget: result_data?.budget_amount,
            totalExpenses: calculateTotalExpenses({
              selected_categories: result_data?.selected_categories,
              total_budget: result_data?.budget_amount,
              isSaving: true,
              savings_amount: result_data?.savings?.savings_amount,
            }),
            currentBalance:
              result_data?.budget_amount -
              result_data?.savings?.savings_amount -
              calculateTotalExpenses({
                selected_categories: result_data?.selected_categories,
                total_budget: result_data?.budget_amount,
                isSaving: true,
                savings_amount: result_data?.savings?.savings_amount,
              }),
          }));
        } else if (result_data?.custom_category) {
          setBudget((prev) => ({
            ...prev,
            totalBudget: result_data?.budget_amount,
            totalExpenses: calculateTotalExpenses({
              selected_categories: result_data?.data?.selected_categories,
              total_budget: result_data?.data?.budget_amount,
              isCCategory: true,
              c_category_amount: result_data?.custom_category?.remaining_amount,
            }),
            currentBalance:
              result_data?.budget_amount -
              calculateTotalExpenses({
                selected_categories: result_data?.data?.selected_categories,
                total_budget: result_data?.data?.budget_amount,
                isCCategory: true,
                c_category_amount:
                  result_data?.custom_category?.remaining_amount,
              }),
          }));
        } else {
          setBudget((prev) => ({
            ...prev,
            totalBudget: result_data?.budget_amount,
            totalExpenses: calculateTotalExpenses({
              selected_categories: result_data?.selected_categories,
              total_budget: result_data?.budget_amount,
            }),
            currentBalance:
              result_data?.budget_amount -
              calculateTotalExpenses({
                selected_categories: result_data?.selected_categories,
                total_budget: result_data?.budget_amount,
              }),
          }));
        }
      } catch (error) {
        console.log(`Error:${error.message}`, error);
      }
    };

    if (auth?.user) {
      getBudgetDetails();
    } else {
    }
  }, [isFocused]);

  const calculateTotalExpenses = ({
    selected_categories,
    total_budget,
    isCCategory = false,
    c_category_amount,
    isSaving = false,
    savings_amount,
  }) => {
    let total_expense = 0;

    if (isCCategory) {
      for (const cat of selected_categories) {
        total_expense += cat.remaining_amount;
      }
      return total_budget - (total_expense + c_category_amount);
    } else if (isSaving) {
      for (const cat of selected_categories) {
        total_expense += cat.remaining_amount;
      }
      return total_budget - savings_amount - total_expense;
    } else {
      for (const cat of selected_categories) {
        total_expense += cat.remaining_amount;
      }
      return total_budget - total_expense;
    }
  };

  const expenses = [
    { id: "1", description: "Groceries", amount: 200 },
    { id: "2", description: "Utilities", amount: 300 },
    { id: "3", description: "Utilities", amount: 300 },
    { id: "4", description: "Utilities", amount: 300 },
    { id: "5", description: "Utilities", amount: 300 },
    { id: "6", description: "Utilities", amount: 300 },
    { id: "7", description: "Utilities", amount: 300 },
    { id: "8", description: "Utilities", amount: 300 },
    { id: "9", description: "Utilities", amount: 300 },
    { id: "10", description: "Utilities", amount: 300 },
    { id: "11", description: "Utilities", amount: 300 },

    // Add more expenses as needed
  ];

  const goals = [
    { id: "1", description: "Vacation", targetAmount: 5000 },
    { id: "2", description: "New Phone", targetAmount: 1000 },
    { id: "3", description: "Utilities", amount: 300 },
    { id: "4", description: "Utilities", amount: 300 },
    { id: "5", description: "Utilities", amount: 300 },
    { id: "6", description: "Utilities", amount: 300 },
    { id: "7", description: "Utilities", amount: 300 },
    { id: "8", description: "Utilities", amount: 300 },
    { id: "9", description: "Utilities", amount: 300 },
    { id: "10", description: "Utilities", amount: 300 },
    { id: "11", description: "Utilities", amount: 300 },
    // Add more goals as needed
  ];

  return (
    <View style={styles.container}>
      {/* Current Balance Card */}
      <TouchableOpacity onPress={onLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Current Balance</Text>
        <Text style={styles.cardValue}>Rs.{budget.currentBalance}.00</Text>

        {/* Total Budget and Total Expenses Cards */}
        <View style={styles.cardRow}>
          <View style={styles.innerCard}>
            <Image source={upimg} style={styles.cardicon} />
            <View>
              <Text style={styles.cardTitleInner}>Total Income</Text>
              <Text style={styles.cardValueInner}>
                Rs.{budget.totalBudget}.00
              </Text>
            </View>
          </View>
          <View style={styles.innerCard}>
            <Image source={downimg} style={styles.cardicon} />
            <View>
              <Text style={styles.cardTitleInner}>Total Expenses</Text>
              <Text style={styles.cardValueInner}>
                Rs.{budget.totalExpenses}.00
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Expenses List */}
      <Text style={styles.sectionTitle}>My Expenses</Text>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.expenseItem}>
            <Text>{item.description}</Text>
            <Text>${item.amount}</Text>
          </View>
        )}
      />

      {/* Goals List */}
      <Text style={styles.sectionTitle}>Goals</Text>
      <FlatList
        data={goals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.goalItem}>
            <Text>{item.description}</Text>
            <Text>${item.targetAmount}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: "#8274BC",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    marginTop: 15,
    elevation: 5,
  },
  cardRow: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-between",
    marginTop: 26,
  },
  innerCard: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#8274BC",
    padding: 15,
    borderRadius: 8,
    elevation: 5,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: "normal",
    color: "white",
    textAlign: "center",
  },
  cardTitleInner: {
    fontSize: 10,
    fontWeight: "normal",
    color: "white",
    textAlign: "left",
  },
  cardValue: {
    fontSize: 27,
    color: "white",
    textAlign: "center",
    marginTop: 3,
  },
  cardValueInner: {
    fontSize: 14,
    color: "white",
    //textAlign:"left"
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 16,
  },
  expenseItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    padding: 15,
    backgroundColor: "white",
    marginLeft: 3,
    marginRight: 3,
    borderRadius: 5,
    elevation: 3,
  },
  goalItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    padding: 14,
    backgroundColor: "white",
    marginLeft: 3,
    marginRight: 3,
    borderRadius: 5,
  },
  cardicon: {
    width: 25,
    height: 25,
    marginRight: 10,
    objectFit: "contain",
  },
});

export default HomeScreen;
