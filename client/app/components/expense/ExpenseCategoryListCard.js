// ExpenseCategoryCard.js
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import * as Progress from "react-native-progress";

export const ExpenseCategoryListCard = ({
  data,
  navigation,
  custom_cat,
  customCategory,
  allCategories,
}) => {
  const handleClickNavigation = () => {
    navigation.navigate("SingleExpenseCategory", {
      data: data,
      custom_cat: custom_cat,
      customCategory: customCategory ? customCategory : null,
      allCategories,
    });
  };

  const calculatePersentage = () => {
    return data.remaining_amount / data.initial_amount;
  };

  const progress = calculatePersentage().toFixed(2);
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={handleClickNavigation}
    >
      <View style={styles.categoryInfo}>
        <View style={styles.topRowLeft}>
          <Image
            style={styles.selectedCategoryIcon}
            source={{ uri: custom_cat ? data.icon : data?.category_id?.icon }}
          />
          <Text style={styles.categoryName}>
            {custom_cat ? data.category_name : data.category_id.category_name}
          </Text>
        </View>
        <Text style={styles.categoryPrice}>Rs.{data.remaining_amount}.00</Text>
      </View>
      <View style={styles.middleRow}>
        <Text style={styles.categoryDescription}>
          {custom_cat ? data.description : data.category_id.description}
        </Text>
      </View>
      <View style={styles.bottomRow}>
        <Text style={styles.moneyLeftText}>Money left - Rs</Text>
        <Text style={styles.moneyLeftAmount}>
          {data.remaining_amount}/{data.initial_amount}
        </Text>
      </View>
      <View style={styles.progressBar}>
        <Progress.Bar
          progress={Number(progress)}
          width={null}
          height={10}
          color="#00FF99"
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 18,
    margin: 15,
    marginTop: 2,
    elevation: 4,
  },
  categoryInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  categoryName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  categoryPrice: {
    marginLeft: 10,
    fontSize: 18,
  },
  middleRow: {
    marginTop: 10,
  },
  categoryDescription: {
    fontSize: 14,
  },
  bottomRow: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  moneyLeftText: {
    fontSize: 16,
  },
  moneyLeftAmount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  progressBar: {
    marginTop: 10,
  },
  selectedCategoryIcon: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    marginRight: 10,
  },
  topRowLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
});
