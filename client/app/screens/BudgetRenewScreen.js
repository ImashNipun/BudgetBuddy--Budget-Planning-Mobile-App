import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  Alert
} from "react-native";
import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import renewimg from "../../assets/budget_renew_img.png";
import axios from "axios";
import { config } from "../config/config";
import useAuth from "../hooks/useAuth";
import Loading from "../components/common/Loading";

const BudgetRenewScreen = () => {
  const { auth, mainLoadingVisible, onLogout} = useAuth();
  const [budget, setBudget] = useState(null);
  const [goals, setGoals] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingButtonVisible, setLoadingButtonVisible] = useState(false);
  useEffect(() => {
    const getExpiredBudget = async () => {
      try {
        const budget = await axios.get(
          `${config.BASE_URL}/api/v1/budget/${auth?.user}`
        );

        setBudget(budget?.data?.data);

        const total_amount = calculateTotalRemainingBudget({
          selected_categories: budget?.data?.data?.selected_categories,
          custom_category: budget?.data?.data?.custom_category,
        });

        setTotalAmount(total_amount);

        const goals = await axios.get(
          `${config.BASE_URL}/api/v1/goals/${auth?.user}`
        );

        setGoals(goals?.data?.data);

        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getExpiredBudget();
  }, []);

  const calculateTotalRemainingBudget = ({
    selected_categories,
    custom_category,
  }) => {
    let total_amount = 0;

    selected_categories.map((category) => {
      total_amount += category.remaining_amount;
    });

    if (custom_category) {
      total_amount += custom_category.remaining_amount;
    }

    return total_amount;
  };

  function getNextMonthDate(selectedDay) {
    const today = new Date();
    const nextMonth = new Date(today);
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    nextMonth.setDate(
      Math.min(
        selectedDay,
        new Date(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 0).getDate()
      )
    );

    return nextMonth;
  }
  return (
    <>
      {(mainLoadingVisible || isLoading) && <Loading />}
      <View style={{ flex: 1 }}>
        <Formik
          initialValues={{ budget_amount: "" }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            setLoadingButtonVisible(true);
            let renew_payload = {
              user_id: auth?.user,
              next_budget_renew_date: getNextMonthDate(
                Number(budget?.budget_renew_date)
              ),
              amount: values.budget_amount,
            };
            try {
              if (totalAmount > 0 && goals.lenght != 0) {
                const goalscreate = await axios.post(
                  `${config.BASE_URL}/api/v1/goals/add-goal-amount`,
                  {
                    userId: auth?.user,
                    amount: totalAmount,
                  }
                );
              } else if (totalAmount > 0 && goalArray.lenght == 0) {
                renew_payload = { ...renew_payload, exces_amount: totalAmount };
              }

              const budgetrenew = await axios.post(
                `${config.BASE_URL}/api/v1/budget/renew`,
                renew_payload
              );

              if(budgetrenew?.status == 200){
                Alert.alert(
                  "Budget Updated",
                  "Your budget has been updated successfully",
                  [
                    {
                      text: "OK",
                      onPress: () => {
                        navigation.navigate("AppDrawer");
                      },
                    },
                  ],
                  { cancelable: false }
                );
              }
            } catch (error) {
              console.log(error);
              Alert.alert(
                "Error",
                "Something went wrong, please try again later",
                [
                  {
                    text: "OK",
                    onPress: () => {
                      onLogout()
                    },
                  },
                ],
                { cancelable: false }
              );
            }
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={styles.container}>
              <StatusBar backgroundColor="#8373C1" />

              <Image source={renewimg} style={styles.relatedImage} />

              {/* Title and Welcome Message */}
              <View style={styles.headerContainer}>
                <Text style={styles.title}>Time to update your budget</Text>
                <Text style={styles.welcomeMessage}>
                  Give the budget amount and click continue to update your
                  budget.
                </Text>
              </View>

              {/* Form */}
              <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Budget Amount</Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder="Enter your budget amount"
                    onChangeText={handleChange("budget_amount")}
                    onBlur={handleBlur("budget_amount")}
                    value={values.budget_amount}
                  />
                  {touched.budget_amount && errors.budget_amount && (
                    <Text style={{ color: "red" }}>{errors.budget_amount}</Text>
                  )}
                </View>
                {loadingButtonVisible ? (
                  <TouchableOpacity
                    style={styles.loginButton}
                  >
                    <ActivityIndicator size="large" color="#fff" />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.loginButton}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.loginButtonText}>Continue</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}
        </Formik>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerContainer: {
    alignItems: "flex-start", // Align title and welcome message to the left
    alignSelf: "stretch", // Stretch the header container to the full width
    paddingLeft: 30,
    marginBottom: 20,
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "left", // Align title to the left
  },
  welcomeMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "left", // Align welcome message to the left
  },
  formContainer: {
    width: "85%",
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: "left", // Align labels to the left
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    textAlign: "left", // Align input text to the left
  },
  loginButton: {
    backgroundColor: "#8373C1",
    paddingVertical: 15,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  loginButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  relatedImage: {
    width: 300,
    height: 300,
    resizeMode: "contain",
    marginBottom: 50,
  },
});

const validationSchema = Yup.object().shape({
  budget_amount: Yup.number().min(0).required("required"),
});

export default BudgetRenewScreen;
