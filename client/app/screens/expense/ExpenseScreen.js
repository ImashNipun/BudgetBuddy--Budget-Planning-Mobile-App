// MainScreen.js
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { ExpenseCategoryListCard } from "../../components/expense/ExpenseCategoryListCard";
import data from "../../data/data";
import { config } from "../../config/config";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import useAuth from "../../hooks/useAuth";

const ExpenseScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  const { auth } = useAuth();
  const [allCategories, setAllCategories] = useState([]);
  const [customCategory, setCustomcategory] = useState(null);

  const addExpenseCategory = () => {
    navigation.navigate("AddExpensesWithCategory", {
      allCategories: allCategories,
      customCategory: customCategory,
    });
  };

  useEffect(() => {
    const getAllCategoriesOfUser = async () => {
      try {
        const result = await axios.get(
          `${config.BASE_URL}/api/v1/budget/${auth?.user}`
        );
        setAllCategories(result?.data?.data?.selected_categories);
        if (result?.data?.data?.custom_category) {
          setCustomcategory(result?.data?.data?.custom_category);
        }
      } catch (error) {
        console.log(`Error: ${error.message}`, error);
      }
    };

    getAllCategoriesOfUser();
  }, [isFocused]);

  return (
    <SafeAreaView>
      <View style={styles.TitleContainer}>
        <Text style={styles.mainTitleText}>My Expense Categories</Text>
        <Text style={styles.mainSubTitleText}>
          Click one category to see your expenses or share some amount with
          other category
        </Text>
        <TouchableOpacity
          style={styles.mainButton}
          onPress={addExpenseCategory}
        >
          <Text style={styles.mainButtonText}>Add an Expense</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.ScrollViewContainer}>
        {allCategories
          ? allCategories.map((data, index) => {
              return (
                <ExpenseCategoryListCard
                  key={index}
                  data={data}
                  navigation={navigation}
                  custom_cat={false}
                  allCategories={allCategories}
                  customCategory={customCategory}
                />
              );
            })
          : null}
        {customCategory ? (
          <ExpenseCategoryListCard
            data={customCategory}
            navigation={navigation}
            custom_cat={true}
            allCategories={allCategories}
            customCategory={customCategory}
          />
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  TitleContainer: {
    margin: 15,
  },
  mainTitleText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  mainSubTitleText: {
    fontSize: 16,
    fontWeight: "normal",
    marginBottom: 15,
  },
  ScrollViewContainer: {
    height: 580,
  },
  mainButton: {
    backgroundColor: "#8274BC",
    padding: 10,
    borderRadius: 5,
  },
  mainButtonText: {
    textAlign: "center",
    fontSize: 15,
    color: "white",
  },
});

export default ExpenseScreen;
