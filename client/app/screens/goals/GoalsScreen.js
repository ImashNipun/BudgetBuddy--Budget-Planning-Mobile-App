// MainScreen.js
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import { config } from "../../config/config";
import GoalCardDetailed from "../../components/goal/GoalCardDetailed";
import useAuth from "../../hooks/useAuth";
import Loading from "../../components/common/Loading";

const color = ['#F0941F','#019587','#FF4858']

const GoalsScreen = ({ navigation }) => {
  const { auth } = useAuth();
  const isFocused = useIsFocused();
  const [goals, setGoals] = useState([]);
  const [loadingVisible, setLoadingVisible] = useState(true);

  const addExpenseCategory = () => {
    if (goals.length >= 3) {
      Alert.alert(
        "Exceed the limit of goals",
        `You can only create 3 goals. Press ok to continue.`,
        [{ text: "OK", onPress: () => console.log("press ok") }]
      );
    } else {
      navigation.navigate("AddGoals");
    }
  };

  useEffect(() => {
    const getAllGoals = async () => {
      try {
        const result = await axios.get(
          `${config.BASE_URL}/api/v1/goals/${auth?.user}`
        );

        setLoadingVisible(false);

        if (result?.status == 200) {
          console.log(result?.data?.data);
          setGoals(result?.data?.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getAllGoals();
  }, [isFocused]);

  return (
    <>
    {loadingVisible && <Loading />}
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.TitleContainer}>
        <Text style={styles.mainTitleText}>Goal List</Text>
        <Text style={styles.mainSubTitleText}>
          You can set your longtime goals here. We will always be with you and
          remind you about your goals. At the each budget renew date excess
          budget will added to your golas.
        </Text>
        <TouchableOpacity
          style={styles.mainButton}
          onPress={addExpenseCategory}
        >
          <Text style={styles.mainButtonText}>Create a Goal</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.ScrollViewContainer}>
        {goals?.length > 0 ? (
          goals.map((goal, index) => (
            <GoalCardDetailed key={index} goal={goal} navigation={navigation} color={color[index]}/>
          ))
        ) : (
          <Text style={{ paddingLeft: 16, paddingRight: 16 }}>
            No goals available
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  TitleContainer: {
    margin: 15,
  },
  mainTitleText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  mainSubTitleText: {
    fontSize: 16,
    fontWeight: "normal",
    marginBottom: 15,
    textAlign: "justify",
  },
  ScrollViewContainer: {
    //height: "",
  },
  mainButton: {
    backgroundColor: "#8274BC",
    padding: 10,
    borderRadius: 5,
  },
  mainButtonText: {
    textAlign: "center",
    fontSize: 15,
    color: "white",
  },
});

export default GoalsScreen;
