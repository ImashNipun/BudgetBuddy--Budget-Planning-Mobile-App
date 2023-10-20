// ExpenseCategoryCard.js
import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import * as Progress from "react-native-progress";
import axios from "axios";
import { config } from "../../config/config";
import { useIsFocused } from "@react-navigation/native";

const GoalCardDetailed = ({ goal, navigation, color }) => {
  const isFocused = useIsFocused();
  const [goalAmountList, setGoalsAmountList] = useState([]);
  const [goalAmount, setGoalAmount] = useState(0);
  const [latestGoalAmount, setLatestGoalAmount] = useState(0);
  const handleClickNavigation = () => {};

  const goal_id = goal._id;
  const end_date = new Date(goal.goal_end_date);
  const goal_end_date = end_date.toDateString();
  const create_date = new Date(goal.createdAt).toDateString();
  const created_time = new Date(goal.createdAt).toLocaleTimeString();
  const completed_persentage = goalAmount / goal.target_amount;

  useEffect(() => {
    const getAllGoalsAmount = async () => {
      try {
        const result = await axios.get(
          `${config.BASE_URL}/api/v1/goals/goal-amount/${goal_id}`
        );

        if (result?.status == 200) {
          console.log(result?.data?.data);
          setGoalsAmountList(result?.data?.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getAllGoalsAmount();
  }, [isFocused]);

  useEffect(() => {
    let totalGaolAmount = 0;
    if (goalAmountList.length > 0) {
      goalAmountList.map((goalAmount) => {
        totalGaolAmount += goalAmount.amount;
      });
    }
    setGoalAmount(totalGaolAmount);
  }, [goalAmountList]);

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={handleClickNavigation}
    >
      <View
        style={{
          backgroundColor: color,
          flex: 0.7,
          marginRight: 10,
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
        }}
      ></View>
      <View style={styles.cardDetailsContainer}>
        <View style={styles.categoryInfo}>
          <Text style={styles.categoryName}>{goal.goal_name}</Text>

          <Text style={styles.categoryPrice}>
            Rs.{goal.target_amount - goalAmount}.00
          </Text>
        </View>
        <View style={styles.categoryInfo}>
          <Text style={styles.moneyLeftText}>{create_date}</Text>
          <Text style={styles.moneyLeftText}>{created_time}</Text>
        </View>
        <Text style={styles.moneyLeftText}>
          Goal Amount : Rs. {goal.target_amount}.00
        </Text>
        <Text style={styles.moneyLeftText}>Goal End Date :{goal_end_date}</Text>
        {/* <View style={styles.middleRow}>
        <Text style={styles.categoryDescription}>{data.description}</Text>
      </View> */}
        <View style={styles.bottomRow}>
          <Text style={styles.moneyLeftText}>Completed</Text>
          <Text style={styles.moneyLeftAmount}>
            {completed_persentage * 100}%
          </Text>
        </View>
        <View style={styles.progressBar}>
          <Progress.Bar
            progress={completed_persentage}
            width={300}
            height={8}
            color="green"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 18,
    margin: 15,
    marginTop: 0,
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

export default GoalCardDetailed;
