import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { RadioButton } from "react-native-paper";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

import {
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Button,
  View,
  Dimensions,
} from "react-native";

const Chart = ({ navigation }) => {
  const screenWidth = Dimensions.get("window").width;
  const [selectedCategory, setSelectedCategory] = useState("food"); // Initialize the selected category state
  const [selectedChartType, setSelectedChartType] = useState("bar"); // Initialize the selected chart type
  const data = {
    labels: ["M1", "M2", "M3", "M4", "M5", "M6", "M7"],
    datasets: [
      {
        data: [200, 450, 280, 320, 700, 400, 1000], // Data for the first dataset
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
      },
      {
        data: [30, 60, 25, 48], // Data for the second dataset
        color: (opacity = 1) => `rgba(42, 187, 155, ${opacity})`,
      },
      {
        data: [10, 20, 30, 40], // Data for the third dataset
        color: (opacity = 1) => `rgba(69, 166, 248, ${opacity})`,
      },
    ],
  };

  // Expense data for each category and month
  const expenseData = {
    food: [100, 150, 120, 180, 220, 190, 160, 140, 200, 220, 250, 280],
    housing: [800, 820, 800, 850, 880, 900, 920, 900, 950, 970, 1000, 1050],
    utilities: [100, 110, 105, 115, 120, 130, 125, 140, 135, 130, 125, 120],
    healthcare: [50, 60, 55, 70, 80, 70, 65, 75, 80, 85, 90, 100],
    personal: [200, 220, 210, 230, 240, 250, 260, 270, 280, 290, 300, 320],
  };

  // Data for the line chart
  const lineChartData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        data: expenseData[selectedCategory],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: "white",
    backgroundGradientTo: "#f2f2f2",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForLabels: {
      fontSize: 12,
    },
    barRadius: 2, // This will round the corners of the bars
    barWidth: 10,
  };

  return (
    <ScrollView style={styles.view}>
      <Text style={styles.topic}>Total Budget</Text>

      {/* <View style={styles.container}>
        <BarChart
          data={data}
          width={300}
          height={200}
          chartConfig={chartConfig}
          style={styles.chart}
        />
      </View> */}

      <View style={styles.container}>
        {/* Conditionally render Bar Chart or Line Chart based on selectedChartType */}
        {selectedChartType === "bar" ? (
          <BarChart
            data={data}
            width={400}
            height={200}
            yAxisLabel="Rs."
            chartConfig={chartConfig}
            style={styles.chart}
          />
        ) : (
          <LineChart
            data={lineChartData}
            width={400}
            height={200}
            yAxisLabel="Rs."
            chartConfig={chartConfig}
            style={styles.chart}
          />
        )}
      </View>

      <View style={styles.container}>
        {/* Radio buttons to toggle chart type */}
        <RadioButton.Group
          onValueChange={(value) => setSelectedChartType(value)}
          value={selectedChartType}
        >
          <View style={styles.radioContainer}>
            <RadioButton value="bar" />
            <RadioButton value="line" />
          </View>
          {/* <View style={styles.radioContainer}>
          </View> */}
        </RadioButton.Group>
      </View>

      <Text style={styles.topic}>Category</Text>

      <Picker
        selectedValue={selectedCategory}
        onValueChange={(itemValue, itemIndex) => setSelectedCategory(itemValue)}
        style={{ color: "black" }} // Change the text color here
      >
        <Picker.Item label="Food" value="food" />
        <Picker.Item label="Housing" value="housing" />
        <Picker.Item label="Utilities" value="utilities" />
        <Picker.Item label="Healthcare" value="healthcare" />
        <Picker.Item label="Personal" value="personal" />
      </Picker>

      <View style={styles.container}>
        <LineChart
          data={lineChartData}
          width={400}
          height={200}
          yAxisLabel="Rs."
          chartConfig={chartConfig}
          style={styles.chart}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  view: {
    padding: 16,
  },

  topic: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginBottom: 10,
  },

  image: {
    marginLeft: 15,
  },

  text: {
    marginTop: 25,
    fontSize: 20,
    fontWeight: "bold",
    color: "#13BC9E",
  },

  input: {
    marginTop: 20,
    borderColor: "#13BC9E",
    borderWidth: 1,
    borderRadius: 10,
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  container: {
    flex: 1,
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
  },

  chart: {
    marginVertical: 30,
    // marginLeft: 5,
    // marginTop: 30,
    // marginBottom: 30,
    borderRadius: 16,
    padding: 5,
  },

  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    justifyContent: "space-between", // Align items with space between
    padding: 10, // Add some padding
  },
});

export default Chart;
