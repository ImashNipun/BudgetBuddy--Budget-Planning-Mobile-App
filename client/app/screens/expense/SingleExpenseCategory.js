import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
} from "react-native";
import React from "react";
import data from "../../data/data";
import { SingleExpenseCategoryCard } from "../../components/expense/SingleExpenseCategoryCard";

const image =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAABQ0lEQVR4nO3bzUrDQBQF4OrCKvjeCoIUEeqqD+FCfCLdiIo/uDwS6E4wCdTcsfm+bWFyOSdMQqddLAAAAAAAAAAAAIARkiyTXCR5SvKRZJ3kRIjThX+Xn26muP6s/RJ+5616vjmH33mtnnHO4Xcuq+ecc/jd58vqWfdOkqMktz3h3yc5rp517wi/kPALCb+Q8AsJv5DwCwm/kPALCb+Q8AsJv5DwCwm//a+UGeclyfWgs/Ak5yMXZ7j+s/AkjyMWZJzPJId9BTyMXJQdF3A2YkHGWQ/ZgjyEd+85ydXgH6R5DW2AEhqghAYooQFKaIASGqCEBiihAUpogBIaoIQGKKEBSmiAEhrgL0r/p4RV9ZxzL+E9yUH1nHMu4av3bJQ/LWEj32lLWG23ne7O3yQ5ner6bHV7vn0fAAAAAAAAAAAWU/gGhKtHrQIgGN4AAAAASUVORK5CYII=";

const expenses = [
  { id: "1", description: "Groceries", amount: 200 },
  { id: "2", description: "Utilities", amount: 300 },
  { id: "3", description: "Utilities", amount: 300 },
  { id: "4", description: "Utilities", amount: 300 },
  { id: "5", description: "Utilities", amount: 300 },
  { id: "6", description: "Utilities", amount: 300 },
  { id: "7", description: "Utilities", amount: 300 },
  { id: "8", description: "Utilities", amount: 300 },
  { id: "9", description: "Utilities", amount: 300 },
  { id: "10", description: "Utilities", amount: 300 },
  { id: "11", description: "Utilities", amount: 300 },

  // Add more expenses as needed
];

const SingleExpenseCategory = ({ route, navigation }) => {
  const { itemId } = route.params;
  const handlePressNavigaion = () => {
    navigation.navigate("AllExpenseCategories");
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: "center"}}
        onPress={handlePressNavigaion}
      >
        <View
          style={{
            width: 40,
            height: 40,
            marginTop: 15,
            marginBottom: 20,
            backgroundColor: "black",
            borderRadius: 50,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={{ uri: image }}
            style={{
              width: 20,
              height: 20,
            }}
          ></Image>
        </View>
        <Text style={{ marginLeft: 5 }}>My expense categories</Text>
      </TouchableOpacity>
      {data
        ? data.map((items, index) => {
            if (itemId == items.id) {
              return <SingleExpenseCategoryCard key={index} items={items} />;
            }
          })
        : nul}
      <Text style={styles.sectionTitle}>My Expenses</Text>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.expenseItem}>
            <Text>{item.description}</Text>
            <Text>${item.amount}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
});

export default SingleExpenseCategory;
