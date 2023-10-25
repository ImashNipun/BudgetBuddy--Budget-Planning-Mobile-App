import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const SavingsListCard = ({ data }) => {
  return (
    <View
      style={styles.container}
    >
      <View style={styles.iconContainer}>
        <View style={styles.icon}>
          <FontAwesome5 name="piggy-bank" size={24} color="#fff" />
        </View>
        <View>
        <Text style={styles.expenseName}>{new Date(data?.createdAt).toDateString()}</Text>
        <Text style={styles.time}>{new Date(data?.createdAt).toTimeString()}</Text>
        </View>
        <Text style={styles.amount}>Rs. {data?.savings_amount.toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    margin: 3,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "top",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#000",
    margin: "auto",
    alignItems: "center",
    justifyContent: "center",
  },
  iconText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  contentContainer: {
    flex: 4,
    marginLeft: 10,
  },
  expenseName: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 5,
    width: 200,
  },
  amount: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 5,
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  date: {
    fontSize: 11,
    color: "#808080",
  },
  time: {
    fontSize: 11,
    color: "#808080",
  },
  cardicon: {
    width: 25,
    height: 25,
    objectFit: "contain",
  },
});

export default SavingsListCard;
