import React from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const BudgetScreen = () => {
  // Sample data for budgets, expenses, and goals
  const budgets = {
    currentBalance: 150000,
    totalBudget: 150000,
    totalExpenses: 150000,
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
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Latest Budget</Text>
        <Text style={styles.cardValue1}>Rs.{budgets.currentBalance}.00</Text>
        <Text style={styles.cardmiddle}>of</Text>
        <Text style={styles.cardValue2}>Rs.150,000.00</Text>
      </View>

      {/* Expenses List */}
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.sectionTitle}>Budget Updates</Text>
        
      </View>
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

  cardTitle: {
    fontSize: 17,
    fontWeight: "normal",
    color: "white",
    textAlign: "center",
  },

  cardValue1: {
    fontSize: 27,
    color: "white",
    textAlign: "center",
    marginTop: 3,
  },
  cardValue2: {
    fontSize: 17,
    color: "white",
    textAlign: "center",
    marginTop: 3,
    opacity: 0.6,
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
  cardmiddle: {
    fontSize: 17,
    color: "white",
    textAlign: "center",
    marginTop: 3,
    opacity: 0.6,
  },
});

export default BudgetScreen;
