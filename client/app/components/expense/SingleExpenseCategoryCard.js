// ExpenseCategoryCard.js
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as Progress from "react-native-progress";

export const SingleExpenseCategoryCard = ({
  data,
  custom_cat,
  navigation,
  allCategories,
  customCategory,
  setShareAmountModelVisibel,
}) => {
  const calculatePersentage = () => {
    return data.remaining_amount / data.initial_amount;
  };

  const handleAddExpenseScreen = () => {
    navigation.navigate("AddExpensesWithCategory", {
      allCategories,
      customCategory,
      cat_id: custom_cat ? data._id : data.category_id._id,
    });
  };

  const handleShareAmountExceed = () => {
    Alert.alert(
      "Expense category remaining amount is 0",
      "You can't share amount among categories",
      [
        {
          text: "Ok",
          onPress: () => console.log("Cancel Pressed"),
        },
      ],
      { cancelable: false }
    );
  };

  const progress = calculatePersentage().toFixed(2);
  return (
    <View style={styles.cardContainer}>
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
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.mainButton}
          onPress={handleAddExpenseScreen}
        >
          <Text style={styles.mainButtonText}>Add an Expense</Text>
        </TouchableOpacity>
        {data.remaining_amount > 0 ? (
          <TouchableOpacity style={styles.mainOutlineButton}>
            <Text
              style={styles.mainOutlineButtonText}
              onPress={() => setShareAmountModelVisibel(true)}
            >
              Share Amount
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.mainOutlineButton}>
            <Text
              style={styles.mainOutlineButtonText}
              onPress={() => handleShareAmountExceed()}
            >
              Share Amount
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 18,
    marginTop: 0,
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
    width: 70,
    height: 70,
    resizeMode: "contain",
    marginRight: 10,
  },
  topRowLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  mainButton: {
    backgroundColor: "#8274BC",
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 5,
  },
  mainButtonText: {
    textAlign: "center",
    fontSize: 13,
    color: "white",
  },
  mainOutlineButton: {
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 5,
    borderColor: "#8274BC",
    borderWidth: 1,
  },
  mainOutlineButtonText: {
    textAlign: "center",
    fontSize: 13,
    color: "black",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 15,
    justifyContent: "space-between",
  },
});
