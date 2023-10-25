import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React from "react";

const CategoryCard = ({
  toggleCategory,
  selectedCategories,
  category,
  totalBudget,
}) => {
  const calculateEachCategoryAmount = (totalbudget, persentage) => {
    let amount = Number(totalbudget) * (Number(persentage) / 100);
    return amount;
  };
  return (
    <TouchableOpacity
      key={category._id}
      onPress={() =>
        toggleCategory(
          category._id,
          calculateEachCategoryAmount(totalBudget, category.percentage)
        )
      }
      style={[
        styles.categoryCard,
        //selectedCategories.includes(category._id)
        selectedCategories.some(
          (categoryObj) => categoryObj.category_id === category._id
        ) && styles.selectedCategoryCard,
      ]}
    >
      <View style={styles.categoryContent}>
        <View style={styles.categoryContentAll}>
          <View style={styles.categoryContentBottom}>
            <View style={styles.categoryContentTop}>
              <View style={styles.checkbox}>
                {
                  //selectedCategories.includes(category._id)
                  selectedCategories.some(
                    (categoryObj) => categoryObj.category_id === category._id
                  ) && <Text style={styles.checkmark}>✓</Text>
                }
              </View>
              <Text style={styles.categoryName}>{category.category_name}</Text>
            </View>
            <Text style={styles.categoryDescription}>
              {category.description}
            </Text>
            <Text>
              {calculateEachCategoryAmount(totalBudget, category.percentage)}
            </Text>
          </View>
          <View style={styles.categoryIconView}>
            <Image
              style={styles.categoryIcon}
              source={{ uri: category.icon }}
            ></Image>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  categoryCard: {
    width: 280, // Adjust the width for elongated cards
    height: 180,
    padding: 16,
    borderRadius: 10,
    margin: 4,
    backgroundColor: "#ffffff",
    elevation: 3,
  },
  selectedCategoryCard: {
    flexDirection: "column",
    marginBottom: 10,
  },
  categoryContent: {
    flexDirection: "column",
    alignItems: "center",
  },
  categoryContentTop: {
    width: "100%",
    flexDirection: "row",
    //backgroundColor: "red",
  },
  categoryContentBottom: {
    //width: "100%",
    flexDirection: "column",
    flex: 2,
    //backgroundColor: "green",
  },
  categoryContentAll: {
    flexDirection: "row",
    //backgroundColor: "yellow",
    height: "100%",
  },
  checkbox: {
    width: 30,
    height: 30,
    borderWidth: 2,
    borderColor: "blue",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  checkmark: {
    color: "blue",
    fontSize: 16,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  categoryDescription: {
    fontSize: 14,
  },
  categoryIcon: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  categoryIconView: {
    flex: 1,
    justifyContent: "center",
    //backgroundColor: "purple",
    alignItems: "center",
  },
});

export default CategoryCard;
