// ExpenseCategoryCard.js
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import * as Progress from "react-native-progress";

const GoalCardDetailed = () => {
  const handleClickNavigation = () => {
    
  };
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={handleClickNavigation}
    >
      <View style={styles.sideColour}></View>
      <View style={styles.cardDetailsContainer}>
        <View style={styles.categoryInfo}>
          <Text style={styles.categoryName}>Buy a Motorbike</Text>

          <Text style={styles.categoryPrice}>Rs.10,000.00</Text>
        </View>
        <View style={styles.categoryInfo}>
          <Text style={styles.moneyLeftText}>18 September 2023</Text>
          <Text style={styles.moneyLeftText}>2.45 PM</Text>
        </View>
        <Text style={styles.moneyLeftText}>Goal Amount : Rs. 10,000.00</Text>
        <Text style={styles.moneyLeftText}>Duration : 6 months</Text>
        {/* <View style={styles.middleRow}>
        <Text style={styles.categoryDescription}>{data.description}</Text>
      </View> */}
        <View style={styles.bottomRow}>
          <Text style={styles.moneyLeftText}>Completed</Text>
          <Text style={styles.moneyLeftAmount}>0%</Text>
        </View>
        <View style={styles.progressBar}>
          <Progress.Bar progress={0} width={300} height={8} color="green" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection:"row",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 18,
    margin: 15,
    marginTop: 0,
    elevation: 4,
  },
  cardDetailsContainer:{
    flex:12
  },
  categoryInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom:5
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
    fontSize: 14,
    marginBottom:1
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
  sideColour:{
    backgroundColor:"red",
    flex:1,
    marginRight:10,
    borderTopLeftRadius:10,
    borderBottomLeftRadius:10
  }
});

export default GoalCardDetailed;
