import React from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import upimg from "../../../assets/up.png";
import downimg from "../../../assets/down.png";

const HomeScreen = () => {
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
        <Text style={styles.cardTitle}>Current Balance</Text>
        <Text style={styles.cardValue}>Rs.{budgets.currentBalance}.00</Text>

        {/* Total Budget and Total Expenses Cards */}
        <View style={styles.cardRow}>
          <View style={styles.innerCard}>
            <Image source={upimg} style={styles.cardicon}/>
            <View>
              <Text style={styles.cardTitleInner}>Total Income</Text>
              <Text style={styles.cardValueInner}>
                Rs.{budgets.totalBudget}.00
              </Text>
            </View>
          </View>
          <View style={styles.innerCard}>
            <Image source={downimg} style={styles.cardicon}/>
            <View>
              <Text style={styles.cardTitleInner}>Total Expenses</Text>
              <Text style={styles.cardValueInner}>
                Rs.{budgets.totalExpenses}.00
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
    flexDirection:"row",
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
    marginTop:3
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
  cardicon:{
    width:25,
    height:25,
    marginRight:10,
    objectFit:"contain"
  }
});

export default HomeScreen;
