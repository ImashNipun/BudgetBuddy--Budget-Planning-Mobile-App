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
import ExpenseCard from "../../components/expense/ExpenseCard";
import SmallGoalCard from "../../components/goal/SmallGoalCard";
import SingleExpenseModal from "../../components/expense/SingleExpenseModal";
import Loading from "../../components/common/Loading";

const HomeScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  const { auth } = useAuth();

  const [budget, setBudget] = useState({
    currentBalance: null,
    totalBudget: null,
    totalExpenses: null,
  });

  const [expenses, setExpenses] = useState([]);
  const [singleExpenseModalVisible, setSingleExpenseModalVisible] =
    useState(false);
  const [expenseModalData, setExpenseModalData] = useState(null);
  const [goals, setGoals] = useState(null);
  const [budgetLoad, setBudgetLoad] = useState(true);
  const [goalLoad, setGoalLoad] = useState(true);
  const [expenseLoad, setExpenseLoad] = useState(true);

  useEffect(() => {
    async function getdata() {
      try {
        const user = await SecureStore.getItemAsync("USER_DETAILS");
        //console.log(user);
      } catch (error) {
        console.log("ERROR", error);
      }
    }

    getdata();

    //console.log(auth ? auth : { message: "no auth" });
  }, [auth, isFocused]);

  useEffect(() => {
    const getBudgetDetails = async () => {
      try {
        const result = await axios.get(
          `${config.BASE_URL}/api/v1/budget/${auth?.user}`
        );

        const result_data = result?.data?.data;

        setBudgetLoad(false);

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
          //console.log(result_data);
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

  useEffect(() => {
    const getLatestExpenses = async () => {
      try {
        const result = await axios.get(
          `${config.BASE_URL}/api/v1/expense/user/${auth?.user}`
        );

        setExpenseLoad(false);

        let expense = result?.data?.data;
        if (result?.data?.data.length != 0 && result?.data?.data.length > 5) {
          for (let i = 0; i < 5; i++) {
            expenses.push(result?.data?.data[i]);
          }
        }
        setExpenses(expense);
      } catch (error) {
        console.log(`Error:${error.message}`, error);
      }
    };
    getLatestExpenses();
  }, [budget, isFocused]);

  useEffect(() => {
    const getAllGoals = async () => {
      try {
        const result = await axios.get(
          `${config.BASE_URL}/api/v1/goals/${auth?.user}`
        );

        setGoalLoad(false);
        if (result?.status == 200) {
          //console.log(result?.data?.data);
          setGoals(result?.data?.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getAllGoals();
  }, [budget, isFocused]);

  const handleSingleExpenseModalClose = () => {
    setSingleExpenseModalVisible(false);
  };

  const handleSingleExpenseModalView = (data) => {
    setExpenseModalData(data);
    setSingleExpenseModalVisible(true);
  };

  return (
    <>
      {(expenseLoad || goalLoad || budgetLoad) && <Loading />}
      <View style={styles.container}>
        {/* Current Balance Card */}
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
        <View
          style={{
            flexDirection: "row",
            marginTop: 16,
            marginBottom: 16,
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.sectionTitle}>My Expenses</Text>
          <Text
            style={{
              fontSize: 12,
              padding: 5,
              paddingLeft: 12,
              paddingRight: 12,
              borderColor: "#8274BC",
              borderWidth: 1,
              borderRadius: 5,
              borderStyle: "dashed",
            }}
            onPress={() => {}}
          >
            All expenses
          </Text>
        </View>

        {expenses?.length != 0 ? (
          <FlatList
            data={expenses}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <ExpenseCard
                item={item}
                key={item?.id}
                onVisible={handleSingleExpenseModalView}
              />
            )}
            style={{ flex: 1 }}
          />
        ) : (
          <Text style={{ marginBottom: "auto" }}>
            No expenses are available
          </Text>
        )}

        {/* Goals List */}
        <View
          style={{
            flexDirection: "row",
            marginTop: 16,
            marginBottom: 16,
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.sectionTitle}>Goals</Text>
          <Text
            style={{
              fontSize: 12,
              padding: 5,
              paddingLeft: 12,
              paddingRight: 12,
              borderColor: "#8274BC",
              borderWidth: 1,
              borderRadius: 5,
              borderStyle: "dashed",
            }}
            onPress={() => {
              navigation.navigate("Goals", { screen: "AllGoals" });
            }}
          >
            All goals
          </Text>
        </View>
        {goals?.length != 0 ? (
          <FlatList
            data={goals}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <SmallGoalCard item={item} key={item?.id} />
            )}
            style={{ flex: 1 }}
          />
        ) : (
          <Text style={{ marginBottom: "auto" }}>No goals are available</Text>
        )}
      </View>

      <SingleExpenseModal
        data={expenseModalData}
        visible={singleExpenseModalVisible}
        onClose={handleSingleExpenseModalClose}
      />
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
