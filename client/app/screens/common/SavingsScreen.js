import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useIsFocused } from "@react-navigation/native";
import { config } from "../../config/config";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import Loading from "../../components/common/Loading";
import SavingsListCard from "../../components/budget/SavingsListCard";

const SavingsScreen = () => {
  const isFocused = useIsFocused();
  const { auth } = useAuth();
  const [savings, setSavings] = useState([]);
  const [loadingVisible, setLoadingVisible] = useState(true);
  const [totalSavings, setTotalSavings] = useState(0);

  useEffect(() => {
    const getBudgetDetails = async () => {
      try {
        const result = await axios.get(
          `${config.BASE_URL}/api/v1/budget/all-savings/${auth?.user}`
        );

        setSavings(result?.data?.data);
        calculateTotalSavings(result?.data?.data);

        setLoadingVisible(false);
      } catch (error) {
        console.log(error);
      }
    };

    getBudgetDetails();
  }, [isFocused]);

  const calculateTotalSavings = (data) => {
    let total_savings = 0;

    data?.forEach((item) => {
      total_savings += item?.savings_amount;
    });

    setTotalSavings(total_savings);
  };

  return (
    <>
      {loadingVisible && <Loading />}
      <View style={styles.container}>
        {/* Current Balance Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Latest Savings Amount</Text>
          <Text style={styles.cardValue1}>Rs.{totalSavings.toFixed(2)}</Text>
        </View>

        {/* Expenses List */}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.sectionTitle}>Savings List</Text>
        </View>
        {savings.length > 0 ? (
          <FlatList
            data={savings}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <SavingsListCard data={item} />}
          />
        ) : (
          <Text>No savings are available</Text>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: "#8274BC",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    marginTop: 15,
    elevation: 5,
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: "normal",
    color: "white",
    textAlign: "center",
  },

  cardValue1: {
    fontSize: 27,
    color: "white",
    textAlign: "center",
    marginTop: 3,
  },
  cardValue2: {
    fontSize: 17,
    color: "white",
    textAlign: "center",
    marginTop: 3,
    opacity: 0.6,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 16,
  },
  expenseItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    padding: 15,
    backgroundColor: "white",
    marginLeft: 3,
    marginRight: 3,
    borderRadius: 5,
    elevation: 3,
  },
  cardmiddle: {
    fontSize: 17,
    color: "white",
    textAlign: "center",
    marginTop: 3,
    opacity: 0.6,
  },
});

export default SavingsScreen;
