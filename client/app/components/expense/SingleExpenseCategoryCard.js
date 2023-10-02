// ExpenseCategoryCard.js
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import * as Progress from "react-native-progress";

export const SingleExpenseCategoryCard = ({ items }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.categoryInfo}>
        <View style={styles.topRowLeft}>
          <Image
            style={styles.selectedCategoryIcon}
            source={{ uri: items.icon }}
          />
          <Text style={styles.categoryName}>{items.name}</Text>
        </View>
        <Text style={styles.categoryPrice}>Rs.10,000.00</Text>
      </View>
      <View style={styles.middleRow}>
        <Text style={styles.categoryDescription}>{items.description}</Text>
      </View>
      <View style={styles.bottomRow}>
        <Text style={styles.moneyLeftText}>Money left - Rs</Text>
        <Text style={styles.moneyLeftAmount}>1000</Text>
      </View>
      <View style={styles.progressBar}>
        <Progress.Bar progress={1} width={330} height={8} color="green" />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.mainButton}>
          <Text style={styles.mainButtonText}>Add an Expense</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.mainOutlineButton}>
          <Text style={styles.mainOutlineButtonText}>Share Amount</Text>
        </TouchableOpacity>
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
    alignItems:"center"
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
    paddingTop:7,
    paddingBottom:7,
    paddingLeft:30,
    paddingRight:30,
    borderRadius: 5,
  },
  mainButtonText: {
    textAlign: "center",
    fontSize: 13,
    color: "white",
  },
  mainOutlineButton: {
    paddingTop:7,
    paddingBottom:7,
    paddingLeft:30,
    paddingRight:30,
    borderRadius: 5,
    borderColor:"#8274BC",
    borderWidth:1
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
