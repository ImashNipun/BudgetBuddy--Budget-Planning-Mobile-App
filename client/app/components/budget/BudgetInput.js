import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
} from "react-native";
import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import secImg from "../../../assets/budget_input_sec_img.png";

const BudgetInput = ({ setTotalBudget, setBudgetRenewDate }) => {
  return (
    <View style={{ flex: 1 }}>
      <Formik
        initialValues={{ budget_amount: "", budget_renew_date: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          setTotalBudget(values.budget_amount);
          setBudgetRenewDate(values.budget_renew_date);
          console.log(values);
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
          <View style={styles.container}>
           

            <Image source={secImg} style={styles.relatedImage} />

            {/* Title and Welcome Message */}
            <View style={styles.headerContainer}>
              <Text style={styles.title}>Let’s create a budget</Text>
              <Text style={styles.welcomeMessage}>
                Give the budget amount and click continue to set expense
                categories.
              </Text>
            </View>

            {/* Form */}
            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Budget Amount</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  placeholder="Enter your budget amount"
                  onChangeText={handleChange("budget_amount")}
                  onBlur={handleBlur("budget_amount")}
                  value={values.budget_amount}
                />
                {touched.budget_amount && errors.budget_amount && (
                  <Text style={{ color: "red" }}>{errors.budget_amount}</Text>
                )}
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Budget Update Date</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  placeholder="Enter the monthly budget update date"
                  onChangeText={handleChange("budget_renew_date")}
                  onBlur={handleBlur("budget_renew_date")}
                  value={values.budget_renew_date}
                />
                {touched.budget_renew_date && errors.budget_renew_date && (
                  <Text style={{ color: "red" }}>
                    {errors.budget_renew_date}
                  </Text>
                )}
              </View>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleSubmit}
              >
                <Text style={styles.loginButtonText}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:"#fff"
  },
  headerContainer: {
    alignItems: "flex-start", // Align title and welcome message to the left
    alignSelf: "stretch", // Stretch the header container to the full width
    paddingLeft: 30,
    marginBottom: 20,
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "left", // Align title to the left
  },
  welcomeMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "left", // Align welcome message to the left
  },
  formContainer: {
    width: "85%",
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: "left", // Align labels to the left
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    textAlign: "left", // Align input text to the left
  },
  loginButton: {
    backgroundColor: "#8373C1",
    paddingVertical: 15,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  loginButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  relatedImage: {
    width: 300,
    height: 300,
    resizeMode: "contain",
    marginBottom: 50,
  },
});

const validationSchema = Yup.object().shape({
  budget_amount: Yup.number().min(0).required("required"),
  budget_renew_date: Yup.number()
    .typeError("Budget update day must be a number")
    .min(1, "Budget update day must be between 1 and 28")
    .max(28, "Budget update day must be between 1 and 28")
    .test({
      name: "is-valid-day",
      message: "Invalid day",
      test: function (value) {
        const currentDay = new Date().getDate();

        if (
          currentDay === 28 ||
          currentDay === 29 ||
          currentDay === 30 ||
          currentDay === 31
        ) {
          if (value === 28) {
            return true; // Allow 28
          }
          return this.createError({
            message: `Only 28 is allowed on the ${value}th day`,
          });
        } else if (value >= currentDay) {
          return true; // Allow values greater than or equal to the current day
        } else {
          return this.createError({
            message:
              "Update day must be greater than or equal to the current day",
          });
        }
      },
    }),
});

export default BudgetInput;
