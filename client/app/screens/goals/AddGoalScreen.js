import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { config } from "../../config/config";

const image =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAABQ0lEQVR4nO3bzUrDQBQF4OrCKvjeCoIUEeqqD+FCfCLdiIo/uDwS6E4wCdTcsfm+bWFyOSdMQqddLAAAAAAAAAAAAIARkiyTXCR5SvKRZJ3kRIjThX+Xn26muP6s/RJ+5616vjmH33mtnnHO4Xcuq+ecc/jd58vqWfdOkqMktz3h3yc5rp517wi/kPALCb+Q8AsJv5DwCwm/kPALCb+Q8AsJv5DwCwm//a+UGeclyfWgs/Ak5yMXZ7j+s/AkjyMWZJzPJId9BTyMXJQdF3A2YkHGWQ/ZgjyEd+85ydXgH6R5DW2AEhqghAYooQFKaIASGqCEBiihAUpogBIaoIQGKKEBSmiAEhrgL0r/p4RV9ZxzL+E9yUH1nHMu4av3bJQ/LWEj32lLWG23ne7O3yQ5ner6bHV7vn0fAAAAAAAAAAAWU/gGhKtHrQIgGN4AAAAASUVORK5CYII=";

const AddGoalScreen = ({ navigation }) => {
  const { auth } = useAuth();
  function calculateDate(years, months, days) {
    const currentDate = new Date(); // Get the current date
    currentDate.setFullYear(currentDate.getFullYear() + years); // Add years
    currentDate.setMonth(currentDate.getMonth() + months); // Add months
    currentDate.setDate(currentDate.getDate() + days); // Add days
    return currentDate;
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 20,
          //marginLeft: 16,
        }}
        onPress={() => navigation.navigate("AllGoals")}
      >
        <View
          style={{
            width: 30,
            height: 30,
            //marginTop: 15,
            //marginBottom: 20,
            backgroundColor: "black",
            borderRadius: 50,
            flexDirection: "row",
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
      <Text style={styles.title}>Add a Goal</Text>
      <Formik
        initialValues={{ name: "", amount: "", year: "", month: "", day: "" }}
        validationSchema={Yup.object({
          name: Yup.string().required("Goal name is required"),
          amount: Yup.number().required("Target Amount is required"),
          year: Yup.number()
            .min(0)
            .required("Number of Year is required. Don't have one enter 0."),
          month: Yup.number()
            .min(0)
            .max(11)
            .required("Number of Month is required. Don't have one enter 0."),
          day: Yup.number()
            .min(0)
            .max(30)
            .required("Number of Day is required"),
        })}
        onSubmit={async (values, { resetForm }) => {
          console.log(values);

          const resultDate = calculateDate(
            values.year,
            values.month,
            values.day
          );

          const payload = {
            user_id: auth?.user,
            goal_name: values.name,
            target_amount: Number(values.amount),
            goal_end_date: resultDate,
          };

          try {
            const result = await axios.post(
              `${config.BASE_URL}/api/v1/goals/add-goal`,
              payload
            );

            if (result?.status == 201) {
              Alert.alert(
                "Goal created successfully!",
                `${result?.data?.message} Press ok to continue.`,
                [{ text: "OK", onPress: () => navigation.navigate("AllGoals") }]
              );
            }
          } catch (error) {
            console.log(error);
            Alert.alert(
              "Somthing went wrong!",
              `${error?.response?.data?.message} Press ok to continue.`,
              [{ text: "OK", onPress: resetForm }]
            );
          }
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View>
            <Text style={styles.label}>Goal Name</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              value={values.name}
              placeholder="Name of the Goal"
            />
            {touched.name && errors.name && (
              <Text style={styles.error}>{errors.name}</Text>
            )}
            <Text style={styles.label}>Target Amount</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange("amount")}
              onBlur={handleBlur("amount")}
              value={values.amount}
              placeholder="Target Amount"
              keyboardType="numeric"
            />
            {touched.amount && errors.amount && (
              <Text style={styles.error}>{errors.amount}</Text>
            )}
            <Text style={styles.durationTitle}>Duration</Text>
            <View style={styles.durationContainer}>
              <View style={styles.durationRow}>
                <View style={styles.durationInput}>
                  <Text style={styles.label}>Number of Year</Text>
                  <TextInput
                    style={[styles.input]}
                    onChangeText={handleChange("year")}
                    onBlur={handleBlur("year")}
                    value={values.year}
                    placeholder="Year"
                    keyboardType="numeric"
                  />
                  {touched.year && errors.year && (
                    <Text style={styles.error}>{errors.year}</Text>
                  )}
                </View>
                <View style={styles.durationInput}>
                  <Text style={styles.label}>Number of Month</Text>
                  <TextInput
                    style={[styles.input]}
                    onChangeText={handleChange("month")}
                    onBlur={handleBlur("month")}
                    value={values.month}
                    placeholder="Month"
                    keyboardType="numeric"
                  />
                  {touched.month && errors.month && (
                    <Text style={styles.error}>{errors.month}</Text>
                  )}
                </View>
              </View>
              <Text style={styles.label}>Number of Day</Text>
              <View style={styles.durationRow}>
                <TextInput
                  style={[styles.input, styles.durationInput]}
                  onChangeText={handleChange("day")}
                  onBlur={handleBlur("day")}
                  value={values.day}
                  placeholder="Day"
                  keyboardType="numeric"
                />
              </View>
              {touched.day && errors.day && (
                <Text style={styles.error}>{errors.day}</Text>
              )}
            </View>
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleSubmit}
              //onPress={onLogout}
            >
              <Text style={styles.buttonText}>Add Goal</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  durationContainer: {
    marginTop: 10,
  },
  durationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  durationInput: {
    flex: 1,
    marginRight: 10,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "#8373C1",
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  label: {
    marginBottom: 5,
    fontWeight: "bold",
  },
  durationTitle: {
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 5,
  },
});

export default AddGoalScreen;
