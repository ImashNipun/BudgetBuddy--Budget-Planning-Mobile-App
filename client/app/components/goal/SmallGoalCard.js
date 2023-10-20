// ExpenseCategoryCard.js
import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import * as Progress from "react-native-progress";
import axios from "axios";
import { config } from "../../config/config";
import { useIsFocused } from "@react-navigation/native";

const SmallGoalCard = ({ item }) => {
  return (
    <View style={styles.cardContainer}>
      <View
        style={{
          backgroundColor: "red",
          flex: 0.5,
          marginRight: 10,
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
        }}
      ></View>
      <View style={styles.cardDetailsContainer}>
        <View style={styles.categoryInfo}>
          <Text style={styles.categoryName}>{item?.goal_name}</Text>

          <Text style={styles.categoryPrice}>Rs.{item?.target_amount}.00</Text>
        </View>

        <Text style={styles.moneyLeftText}>
          Goal End Date :{new Date(item?.goal_end_date).toDateString()}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 12,
    margin: 3,
    marginTop: 0,
    marginBottom: 15,
    elevation: 4,
  },
  cardDetailsContainer: {
    flex: 12,
  },
  categoryInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  categoryName: {
    fontSize: 13,
    fontWeight: "bold",
    width: 200,
    marginBottom: 10,
  },
  categoryPrice: {
    marginLeft: 10,
    fontSize: 15,
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
    fontSize: 12,
    marginBottom: 1,
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

export default SmallGoalCard;
