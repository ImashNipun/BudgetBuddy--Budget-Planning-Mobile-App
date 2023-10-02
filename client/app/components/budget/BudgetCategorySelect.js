import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  ToastAndroid,
  Alert,
} from "react-native";
import axios from "axios";
import CategoryCard from "./CategoryCard";
import SelectedCategoryCard from "./SelectedCategoryCard";
import CustomCategorySelect from "./CustomCategorySelect";
import data from "../../data/data";
import { config } from "../../config/config";
import useAuth from "../../hooks/useAuth";

const BudgetCategorySelect = ({
  totalBudget,
  setTotalBudget,
  budgetRenewDate,
  navigation,
}) => {
  const { auth, onLogout } = useAuth();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [modelVisible, setModelVisible] = useState(false);
  const [allCategories, setAllCategories] = useState([]);
  const [remaningBudget, setRemaningBudget] = useState(0);

  const onClose = () => {
    setModelVisible(false);
  };

  const onSubmit = async () => {
    if (selectedCategories?.length != 0 && selectedCategories?.length == 6) {
      if (!auth.user) {
        onLogout();
      }
      const budget_payload = {
        user_id: auth?.user,
        budget_amount: Number(totalBudget),
        selected_categories: selectedCategories,
        budget_renew_date: Number(budgetRenewDate),
      };
      try {
        const result = await axios.post(
          `${config.BASE_URL}/api/v1/budget/`,
          budget_payload
        );
        navigation.navigate("AppDrawer");
      } catch (error) {
        Alert.alert(
          "Somthing went wrong!",
          `${error?.response?.data?.message}`,
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            { text: "OK", onPress: () => console.log("Cancel Pressed") },
          ]
        );
      }
    } else {
      if (selectedCategories?.length != 0) {
        console.log(selectedCategories);
        setModelVisible(true);
      } else {
        ToastAndroid.show(
          "You must select at least one category",
          ToastAndroid.SHORT
        );
      }
    }
  };
  const image =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAABQ0lEQVR4nO3bzUrDQBQF4OrCKvjeCoIUEeqqD+FCfCLdiIo/uDwS6E4wCdTcsfm+bWFyOSdMQqddLAAAAAAAAAAAAIARkiyTXCR5SvKRZJ3kRIjThX+Xn26muP6s/RJ+5616vjmH33mtnnHO4Xcuq+ecc/jd58vqWfdOkqMktz3h3yc5rp517wi/kPALCb+Q8AsJv5DwCwm/kPALCb+Q8AsJv5DwCwm//a+UGeclyfWgs/Ak5yMXZ7j+s/AkjyMWZJzPJId9BTyMXJQdF3A2YkHGWQ/ZgjyEd+85ydXgH6R5DW2AEhqghAYooQFKaIASGqCEBiihAUpogBIaoIQGKKEBSmiAEhrgL0r/p4RV9ZxzL+E9yUH1nHMu4av3bJQ/LWEj32lLWG23ne7O3yQ5ner6bHV7vn0fAAAAAAAAAAAWU/gGhKtHrQIgGN4AAAAASUVORK5CYII=";

  //const budgetCategories = data;

  const toggleCategory = (categoryId, amount) => {
    const updatedCategories = [...selectedCategories];
    //const index = updatedCategories.indexOf(categoryId);
    //const index = updatedCategories.findIndex(id => id.equals(categoryId));
    const index = updatedCategories.findIndex(
      (cat) => cat.category_id === categoryId
    );

    if (index === -1) {
      updatedCategories.push({
        category_id: categoryId,
        initial_amount: Number(amount),
        remaining_amount: Number(amount),
      });
    } else {
      updatedCategories.splice(index, 1);
    }
    setSelectedCategories(updatedCategories);
  };

  useEffect(() => {
    const calculateRemainingBudget = () => {
      const totalInitialAmount = selectedCategories.reduce(
        (sum, categoryObj) => {
          return sum + categoryObj.initial_amount;
        },
        0
      );
      const remainingBudget = Number(totalBudget) - Number(totalInitialAmount);
      setRemaningBudget(Number(remainingBudget));
    };
    calculateRemainingBudget();
  }, [selectedCategories]);

  useEffect(() => {
    const getAllCategories = async () => {
      try {
        const result = await axios.get(`${config.BASE_URL}/api/v1/category/`);
        setAllCategories(result?.data?.data);
      } catch (error) {
        console.log(`Error: ${error.message}`, error);
      }
    };
    getAllCategories();
  }, [totalBudget, budgetRenewDate]);

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={() => setTotalBudget(0)}
        >
          <View
            style={{
              width: 40,
              height: 40,
              marginTop: 15,
              marginBottom: 20,
              backgroundColor: "black",
              borderRadius: 50,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={{ uri: image }}
              style={{
                width: 20,
                height: 20,
              }}
            ></Image>
          </View>
          <Text style={{ marginLeft: 5 }}>Set Budget</Text>
        </TouchableOpacity>

        <View>
          <Text style={styles.introText}>Select expense categories</Text>
          <Text style={styles.introTextDescription}>
            Select one or more expense categories you will do your expense on.
          </Text>
        </View>
        <Text style={styles.remainingBudget}>
          Remaining Budget: Rs {remaningBudget}.00
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryContainer}
        >
          {allCategories.map((category, index) => (
            <CategoryCard
              key={index}
              toggleCategory={toggleCategory}
              selectedCategories={selectedCategories}
              category={category}
              totalBudget={totalBudget}
            />
          ))}
        </ScrollView>

        <View style={styles.selectedCategoriesContainer}>
          <Text style={styles.selectedCategoriesTitle}>
            Selected Categories:
          </Text>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.selectedCategoriesScroll}
          >
            {selectedCategories.map((scategory, index) => {
              const category = allCategories.find(
                (cat) => cat._id === scategory.category_id
              );
              return (
                <SelectedCategoryCard
                  key={index}
                  category={category}
                  categoryId={scategory.category_id}
                  camount={scategory.initial_amount}
                />
              );
            })}
          </ScrollView>
          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => onSubmit()}
          >
            <Text style={styles.registerButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
      <CustomCategorySelect
        visible={modelVisible}
        onClose={onClose}
        navigation={navigation}
        remaningBudget={remaningBudget}
        user_id={auth?.user}
        budget_amount={Number(totalBudget)}
        selected_categories={selectedCategories}
        budget_renew_date={Number(budgetRenewDate)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  introText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  introTextDescription: {
    fontSize: 14,
    marginBottom: 20,
  },
  remainingBudget: {
    fontSize: 18,
    marginBottom: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  categoryContainer: {
    flexDirection: "row",
    marginBottom: 20,
    flex: 2,
  },
  selectedCategoriesContainer: {
    flex: 1.7,
  },
  selectedCategoriesTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  selectedCategoriesScroll: {
    height: 190, // Adjust the height as needed
  },
  registerButton: {
    backgroundColor: "#8373C1", // Button background color for registration screen
    paddingVertical: 15,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  registerButtonText: {
    color: "white", // Button text color for registration screen
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default BudgetCategorySelect;
