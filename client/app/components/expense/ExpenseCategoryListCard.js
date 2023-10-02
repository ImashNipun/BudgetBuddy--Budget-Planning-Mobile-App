// ExpenseCategoryCard.js
import React from "react";
import { View, Text, Image, StyleSheet,TouchableOpacity } from "react-native";
import * as Progress from "react-native-progress";

export const ExpenseCategoryListCard = ({ data,navigation }) => {
    const handleClickNavigation = () =>{
        navigation.navigate("SingleExpenseCategory",{itemId:data.id});
    }
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={handleClickNavigation}>
      <View style={styles.categoryInfo}>
        <View style={styles.topRowLeft}>
            <Image style={styles.selectedCategoryIcon} source={{ uri: data.icon }}/>
          <Text style={styles.categoryName}>{data.name}</Text>
        </View>
        <Text style={styles.categoryPrice}>Rs.10,000.00</Text>
      </View>
      <View style={styles.middleRow}>
        <Text style={styles.categoryDescription}>{data.description}</Text>
      </View>
      <View style={styles.bottomRow}>
        <Text style={styles.moneyLeftText}>Money left - Rs</Text>
        <Text style={styles.moneyLeftAmount}>1000</Text>
      </View>
      <View style={styles.progressBar}>
        <Progress.Bar progress={1} width={330} height={8} color="green" />
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
    marginTop:0,
    elevation:4
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
    width: 50,
    height: 50,
    resizeMode: "contain",
    marginRight:10
  },
  topRowLeft:{
    flexDirection:"row",
    alignItems:"center"
  }
});
