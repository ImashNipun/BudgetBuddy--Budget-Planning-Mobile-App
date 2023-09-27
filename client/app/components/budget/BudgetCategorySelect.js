import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  ToastAndroid,
} from "react-native";
import CategoryCard from "./CategoryCard";
import SelectedCategoryCard from "./SelectedCategoryCard";
import CustomCategorySelect from "./CustomCategorySelect";
import data from "../../data/data";

const BudgetCategorySelect = ({ totalBudget, setTotalBudget,navigation }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [modelVisible, setModelVisible] = useState(false);
  const onClose = () => {
    setModelVisible(false);
  };
  const onSubmit = () => {
    if (selectedCategories?.length != 0) {
      setModelVisible(true);
    } else {
      ToastAndroid.show(
        "You must select at least one category",
        ToastAndroid.SHORT
      );
    }
  };
  const image =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAABQ0lEQVR4nO3bzUrDQBQF4OrCKvjeCoIUEeqqD+FCfCLdiIo/uDwS6E4wCdTcsfm+bWFyOSdMQqddLAAAAAAAAAAAAIARkiyTXCR5SvKRZJ3kRIjThX+Xn26muP6s/RJ+5616vjmH33mtnnHO4Xcuq+ecc/jd58vqWfdOkqMktz3h3yc5rp517wi/kPALCb+Q8AsJv5DwCwm/kPALCb+Q8AsJv5DwCwm//a+UGeclyfWgs/Ak5yMXZ7j+s/AkjyMWZJzPJId9BTyMXJQdF3A2YkHGWQ/ZgjyEd+85ydXgH6R5DW2AEhqghAYooQFKaIASGqCEBiihAUpogBIaoIQGKKEBSmiAEhrgL0r/p4RV9ZxzL+E9yUH1nHMu4av3bJQ/LWEj32lLWG23ne7O3yQ5ner6bHV7vn0fAAAAAAAAAAAWU/gGhKtHrQIgGN4AAAAASUVORK5CYII=";

  const budgetCategories = data;

  const toggleCategory = (categoryId) => {
    const updatedCategories = [...selectedCategories];
    const index = updatedCategories.indexOf(categoryId);
    if (index === -1) {
      updatedCategories.push(categoryId);
    } else {
      updatedCategories.splice(index, 1);
    }
    setSelectedCategories(updatedCategories);
  };

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
          Remaining Budget: Rs {totalBudget}.00
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryContainer}
        >
          {budgetCategories.map((category, index) => (
            <CategoryCard
              key={index}
              toggleCategory={toggleCategory}
              selectedCategories={selectedCategories}
              category={category}
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
            {selectedCategories.map((categoryId, index) => {
              const category = budgetCategories.find(
                (cat) => cat.id === categoryId
              );
              return (
                <SelectedCategoryCard
                  key={index}
                  category={category}
                  categoryId={categoryId}
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
      <CustomCategorySelect visible={modelVisible} onClose={onClose} navigation={navigation}/>
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
