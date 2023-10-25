import React, { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import { RadioButton } from "react-native-paper";
import axios from "axios";
import { LineChart, BarChart } from "react-native-chart-kit";
import { Text, StyleSheet, ScrollView, View, Dimensions } from "react-native";
import useAuth from "../../hooks/useAuth";
import { config } from "../../config/config";
import Loading from "../../components/common/Loading";
import { useIsFocused } from "@react-navigation/native";

const Chart = () => {
  const isFocused = useIsFocused();
  const { auth } = useAuth();
  const [fullData, setFullData] = useState([]);
  const [budget, setBudget] = useState([]);
  const [allexpesnse, setAllexpesnse] = useState([]);
  const [food, setFood] = useState([]);
  const [transport, setTransport] = useState([]);
  const [housing, setHousing] = useState([]);
  const [utilities, setUtilities] = useState([]);
  const [healthcare, setHealthcare] = useState([]);
  const [personal, setPersonal] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("food");
  const [selectedChartType, setSelectedChartType] = useState("bar");
  const [loadingVisible, setLoadingVisible] = useState(true);
  const [data, setData] = useState({
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
        data: [],
        color: (opacity = 0) => `rgba(255, 255, 255, ${opacity})`,
      },
    ],
  });
  const [newdata, setNewdata] = useState({
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
        data: [],
        color: (opacity = 0) => `rgba(255, 255, 255, ${opacity})`,
      },
    ],
  });
  const [lineChartData, setLineChartData] = useState({
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
        data: [],
        color: (opacity = 0) => `rgba(255, 255, 255, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  });

  useEffect(() => {
    const data = {
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
          data: budget ? budget : [],
          color: (opacity = 0) => `rgba(255, 255, 255, ${opacity})`,
        },
      ],
    };
    setData(data);
  }, [budget, isFocused]);

  useEffect(() => {
    const newdata = {
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
          data: allexpesnse ? allexpesnse : [],
          color: (opacity = 0) => `rgba(255, 255, 255, ${opacity})`,
        },
      ],
    };
    setNewdata(newdata);
  }, [allexpesnse, isFocused]);

  useEffect(() => {
    const expenseData = {
      food: food ? food : [],
      housing: housing ? housing : [],
      utilities: utilities ? utilities : [],
      healthcare: healthcare ? healthcare : [],
      personal: personal ? personal : [],
      transport: transport ? transport : [],
    };

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
          data: expenseData[selectedCategory ? selectedCategory : "food"],
          color: (opacity = 0) => `rgba(255, 255, 255, ${opacity})`,
          strokeWidth: 2,
        },
      ],
    };
    setLineChartData(lineChartData);
  }, [
    selectedCategory,
    isFocused,
    food,
    housing,
    utilities,
    healthcare,
    personal,
    transport,
  ]);

  const chartConfig = {
    backgroundGradientFrom: "#8274BC",
    backgroundGradientTo: "#8274BC",
    decimalPlaces: 0,
    color: (opacity = 0) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForLabels: {
      fontSize: 12,
    },
    barRadius: 2,
    barPercentage: 0.5,
    propsForDots: {
      r: "6",
      strokeWidth: "1",
      stroke: "#fff",
    },
  };

  const getE = async () => {
    try {
      const res = await axios.get(
        `${config.BASE_URL}/api/v1/expense/user/${auth?.user}`
      );
      setFullData(res?.data?.data);
      const fullData = res?.data?.data;

      const expenseData = Array.from({ length: 12 }, (_, index) => ({
        key: index + 1,
        foodValue: 0,
        transportValue: 0,
        housingValue: 0,
        healthcareValue: 0,
        utilitiesValue: 0,
        personalValue: 0,
        fullValue: 0,
      }));

      for (let x = 0; x < fullData.length; x++) {
        const date = new Date(fullData[x].expense_date);
        const month = date.getMonth() + 1;

        if (month >= 1 && month <= 12) {
          switch (fullData[x].expense_category.category_name) {
            case "Food":
              expenseData[month - 1].foodValue += parseInt(
                fullData[x].expense_amount
              );
              break;
            case "Transportation":
              expenseData[month - 1].transportValue += parseInt(
                fullData[x].expense_amount
              );
              break;
            case "Housing":
              expenseData[month - 1].housingValue += parseInt(
                fullData[x].expense_amount
              );
              break;
            case "Healthcare":
              expenseData[month - 1].healthcareValue += parseInt(
                fullData[x].expense_amount
              );
              break;
            case "Utilities":
              expenseData[month - 1].utilitiesValue += parseInt(
                fullData[x].expense_amount
              );
              break;
            case "Personal":
              expenseData[month - 1].personalValue += parseInt(
                fullData[x].expense_amount
              );
              break;
            default:
              break;
          }
          if (month >= 1 && month <= 12) {
            expenseData[month - 1].fullValue += parseInt(
              fullData[x].expense_amount
            );
          }
        }
      }

      setFood(expenseData.map((item) => item.foodValue));
      setTransport(expenseData.map((item) => item.transportValue));
      setHousing(expenseData.map((item) => item.housingValue));
      setHealthcare(expenseData.map((item) => item.healthcareValue));
      setUtilities(expenseData.map((item) => item.utilitiesValue));
      setPersonal(expenseData.map((item) => item.personalValue));
      setAllexpesnse(expenseData.map((item) => item.fullValue));
      setLoadingVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getB = async () => {
    try {
      const res = await axios.get(
        `${config.BASE_URL}/api/v1/budget/all-budgets/${auth?.user}`
      );
      const fullData = res.data.data;
      const budgetData = Array.from({ length: 12 }, (_, index) => ({
        key: index + 1,
        budgetValue: 0,
      }));

      for (let x = 0; x < fullData.length; x++) {
        const date = new Date(fullData[x].createdAt);
        const month = date.getMonth() + 1;

        if (month >= 1 && month <= 12) {
          budgetData[month - 1].budgetValue += parseInt(
            fullData[x].budget_amount
          );
        }
      }

      setBudget(budgetData.map((item) => item.budgetValue));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getE();
    getB();
  }, []);

  return (
    <>
      {loadingVisible && <Loading />}
      <ScrollView style={{ backgroundColor: "white" }}>
        <View style={styles.view}>
          <View style={{ marginBottom: 20, marginTop: 10 }}>
            <Text style={styles.topic}>Total Budget Vs Total Expenses</Text>
            <Text style={{ marginBottom: 10, textAlign: "justify" }}>
              Use bellow radio buttons to switch between total budget chart and
              total expense chart
            </Text>
            <View style={styles.container}>
              {selectedChartType === "bar"
                ? data && (
                    <BarChart
                      data={data}
                      width={(Dimensions.get("window").width * 92) / 100}
                      height={200}
                      chartConfig={chartConfig}
                      style={styles.chart}
                    />
                  )
                : newdata && (
                    <BarChart
                      data={newdata}
                      width={(Dimensions.get("window").width * 92) / 100}
                      height={200}
                      chartConfig={chartConfig}
                      style={styles.chart}
                    />
                  )}

              {selectedChartType === "bar"
                ? !data && <Text>No data to display</Text>
                : !newdata && <Text>No data to display</Text>}
            </View>

            <View style={styles.container}>
              <RadioButton.Group
                onValueChange={(value) => setSelectedChartType(value)}
                value={selectedChartType}
              >
                <View style={styles.radioContainer}>
                  <RadioButton value="bar" />
                  <RadioButton value="line" />
                </View>
              </RadioButton.Group>
            </View>
          </View>

          <View
          // style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={styles.topic}>Category</Text>
            <Text style={{ marginBottom: 10, textAlign: "justify" }}>
              Use bellow picker to switch between categories
            </Text>
            <View
              style={{ borderWidth: 1, borderColor: "black", borderRadius: 5 }}
            >
              <Picker
                selectedValue={selectedCategory}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedCategory(itemValue)
                }
                height={10}
                style={{
                  color: "black",
                  borderRadius: 5,
                }}
              >
                <Picker.Item label="Food" value="food" />
                <Picker.Item label="Housing" value="housing" />
                <Picker.Item label="Utilities" value="utilities" />
                <Picker.Item label="Healthcare" value="healthcare" />
                <Picker.Item label="Personal" value="personal" />
                <Picker.Item label="Transportation" value="transport" />
              </Picker>
            </View>
          </View>

          <View style={styles.container}>
            {lineChartData.datasets[0].data.length != 0 ? (
              <LineChart
                data={lineChartData}
                width={(Dimensions.get("window").width * 92) / 100}
                height={200}
                chartConfig={chartConfig}
                style={styles.chart}
              />
            ) : null}
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    padding: 20,
  },

  topic: {
    fontSize: 17,
    fontWeight: "bold",
    color: "black",
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  chart: {
    marginVertical: 8,
    borderRadius: 10,
  },

  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
});

export default Chart;
