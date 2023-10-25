import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useIsFocused } from "@react-navigation/native";
import { config } from "../../config/config";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import Loading from "../../components/common/Loading";
import BudgetUpdateListCard from "../../components/budget/BudgetUpdateListCard";

const BudgetScreen = () => {
  const isFocused = useIsFocused();
  const { auth, onLogout } = useAuth();

  const [budget, setBudget] = useState({
    currentBalance: null,
    totalBudget: null,
    totalExpenses: null,
  });

  const [loadingVisible, setLoadingVisible] = useState(true);
  const [budgetUpdates, setBudgetUpdates] = useState([]);

  useEffect(() => {
    console.log("this is budget screen");
  }, [isFocused]);

  useEffect(() => {
    const getBudgetDetails = async () => {
      try {
        const result = await axios.get(
          `${config.BASE_URL}/api/v1/budget/${auth?.user}`
        );

        console.log(result?.data?.data);

        const result_data = result?.data?.data;

        setLoadingVisible(false);

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
          console.log(result_data);
          setBudget((prev) => ({
            ...prev,
            totalBudget: result_data?.budget_amount,
            totalExpenses: calculateTotalExpenses({
              selected_categories: result_data?.selected_categories,
              total_budget: result_data?.budget_amount,
              isCCategory: true,
              c_category_amount: result_data?.custom_category?.remaining_amount,
            }),
            currentBalance:
              result_data?.budget_amount -
              calculateTotalExpenses({
                selected_categories: result_data?.selected_categories,
                total_budget: result_data?.budget_amount,
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

  useEffect(() => {
    const getBudgetDetails = async () => {
      try {
        const result = await axios.get(
          `${config.BASE_URL}/api/v1/budget/all-budgets/${auth?.user}`
        );
        setBudgetUpdates(result?.data?.data);
      } catch (error) {
        console.log(`Error:${error.message}`, error);
      }
    };

    getBudgetDetails();
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

  return (
    <>
      {loadingVisible && <Loading />}
      <View style={styles.container}>
        {/* Current Balance Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Latest Budget</Text>
          <Text style={styles.cardValue1}>Rs.{budget.currentBalance}.00</Text>
          <Text style={styles.cardmiddle}>of</Text>
          <Text style={styles.cardValue2}>Rs.{budget.totalBudget}.00</Text>
        </View>

        {/* Expenses List */}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.sectionTitle}>Budget Updates</Text>
        </View>
        {budgetUpdates.length > 0 ? (
          <FlatList
            data={budgetUpdates}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <BudgetUpdateListCard data={item} />}
          />
        ) : (
          <Text>No budget updates available</Text>
        )}

        {/* Goals List */}
      </View>
    </>
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
