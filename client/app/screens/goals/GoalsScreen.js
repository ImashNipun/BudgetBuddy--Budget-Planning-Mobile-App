// MainScreen.js
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import GoalCardDetailed from "../../components/goal/GoalCardDetailed";

const GoalsScreen = ({ navigation }) => {
  const addExpenseCategory = () => {
    navigation.navigate("AddExpensesWithCategory");
  };

  return (
    <SafeAreaView>
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
        <GoalCardDetailed />
        <GoalCardDetailed />
        <GoalCardDetailed />
        <GoalCardDetailed />
      </ScrollView>
    </SafeAreaView>
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
