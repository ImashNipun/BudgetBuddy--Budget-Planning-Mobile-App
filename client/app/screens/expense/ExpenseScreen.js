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
  Dimensions,
} from "react-native";
import { ExpenseCategoryListCard } from "../../components/expense/ExpenseCategoryListCard";
import data from "../../data/data";
import { config } from "../../config/config";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import useAuth from "../../hooks/useAuth";
import Loading from "../../components/common/Loading";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const ExpenseScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  const { auth } = useAuth();
  const [allCategories, setAllCategories] = useState([]);
  const [customCategory, setCustomcategory] = useState(null);
  const [loadingVisible, setLoadingVisible] = useState(true);

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

        setLoadingVisible(false);
      } catch (error) {
        console.log(`Error: ${error.message}`, error);
      }
    };

    getAllCategoriesOfUser();
  }, [isFocused]);

  return (
    <>
      {loadingVisible && <Loading />}
      <SafeAreaView style={styles.pageContainer}>
        <View style={styles.TitleContainer}>
          <View
            style={{
              flexDirection: "row",
              alignContent: "center",
              justifyContent: "space-between",
              marginBottom: 15,
              marginTop: 10,
            }}
          >
            <Text style={styles.mainTitleText}>My Expense Categories</Text>
            <TouchableOpacity
              style={styles.allExpenseButton}
              onPress={() => {
                navigation.navigate("AllExpenses", {
                  allCategories: allCategories,
                  customCategory: customCategory,
                });
              }}
            >
              <Text style={styles.allExpenseButtonText}>View all Expense</Text>
            </TouchableOpacity>
          </View>
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
    </>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  TitleContainer: {
    margin: 15,
  },
  mainTitleText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  mainSubTitleText: {
    fontSize: 16,
    fontWeight: "normal",
    marginBottom: 15,
  },
  ScrollViewContainer: {
    height: 550,
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
  allExpenseButton: {
    padding: 10,
    borderRadius: 5,
    borderColor: "#8274BC",
    borderWidth: 1,
  },
  allExpenseButtonText: {
    textAlign: "center",
    fontSize: 13,
    color: "#000",
  },
});

export default ExpenseScreen;
