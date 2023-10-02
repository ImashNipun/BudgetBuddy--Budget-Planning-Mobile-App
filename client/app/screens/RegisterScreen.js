import {
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
} from "react-native";
import React, { useState } from "react";
import logo from "../../assets/app_logo.png";
import { Formik } from "formik";
import * as Yup from "yup";
import useAuth from "../hooks/useAuth";

const RegisterScreen = ({ navigation }) => {
  //const [verifySend, setVerifySend] = useState(false);
  const { onRegister } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#8373C1" />
      {/* verifySend ? (
        <Formik
          initialValues={{ v_code: "" }}
          validationSchema={verifyCodeValidationSchema}
          onSubmit={(values) => {
            // Handle form submission here
            //navigation.navigate("BudgetAddIntro")
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
            <>
              
              <Image source={logo} style={styles.logo} />

              
              <View style={styles.headerContainer}>
                <Text style={styles.title}>Email Verification</Text>
                <Text style={styles.welcomeMessage}>
                  Please enter the verification code sent to your email.
                </Text>
              </View>

              
              <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Verification Code"
                    onChangeText={handleChange("v_code")}
                    onBlur={handleBlur("v_code")}
                    value={values.v_code}
                  />
                  {touched.v_code && errors.v_code && (
                    <Text style={{ color: "red" }}>
                      {errors.v_code}
                    </Text>
                  )}
                </View>

                <>
                  <Text style={styles.resendLink}>
                    Resend Verification Code
                  </Text>
                  <TouchableOpacity
                    style={styles.registerButton}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.registerButtonText}>Verify</Text>
                  </TouchableOpacity>
                </>
              </View>
            </>
          
        </Formik> */}

      <Formik
        initialValues={{ user_name: "", email: "", password: "" }}
        validationSchema={registerValidationSchema}
        onSubmit={async (values, { resetForm }) => {
          const { user_name, email, password } = values;
          try {
            const result = await onRegister(user_name, email, password);
            console.log(result.status);
            if (result?.status == 201) {
              Alert.alert(
                "Registered Successfully",
                "Your account has create successfuly! Press ok to login.",
                [
                  { text: "OK", onPress: () => navigation.navigate("Login") },
                ]
              );
            }
          } catch (error) {
            if (error?.response?.status == 400) {
              Alert.alert("Bad request", `${error?.response?.data?.message}`, [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel",
                },
                { text: "OK", onPress: () => resetForm() },
              ]);
            } else {
              Alert.alert("Error :", `${error}`, [
                { text: "OK", onPress: () => resetForm() },
              ]);
            }
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
          <>
            {/* Title */}
            <Image source={logo} style={styles.logo} />

            <View style={styles.headerContainer}>
              <Text style={styles.title}>Sign up</Text>
              <Text style={styles.welcomeMessage}>
                Hello, Welcome to Budget Buddy,
              </Text>
            </View>

            {/* Form */}
            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Username</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your username"
                  onChangeText={handleChange("user_name")}
                  onBlur={handleBlur("user_name")}
                  value={values.user_name}
                />
                {touched.user_name && errors.user_name && (
                  <Text style={{ color: "red" }}>{errors.user_name}</Text>
                )}
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                />
                {touched.email && errors.email && (
                  <Text style={{ color: "red" }}>{errors.email}</Text>
                )}
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  placeholder="Enter your password"
                  secureTextEntry={true}
                />
                {touched.password && errors.password && (
                  <Text style={{ color: "red" }}>{errors.password}</Text>
                )}
              </View>
              <TouchableOpacity
                style={styles.registerButton}
                onPress={handleSubmit}
              >
                <Text style={styles.registerButtonText}>Register</Text>
              </TouchableOpacity>
            </View>

            {/* Login Navigation Line */}
            <Text
              style={styles.signUpLinkText}
              onPress={() => navigation.navigate("Login")}
            >
              Already have an account?{" "}
              <Text style={styles.signUpLink}>Login</Text>
            </Text>
          </>
        )}
      </Formik>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", // Background color
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    marginBottom: 20,
  },
  headerContainer: {
    alignItems: "flex-start",
    alignSelf: "stretch",
    paddingLeft: 30,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "left",
  },
  welcomeMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "left",
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
    textAlign: "left",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    textAlign: "left",
  },
  signUpLink: {
    marginTop: 20,
    textAlign: "center",
    color: "#00FF99",
    textDecorationLine: "underline",
  },
  signUpLinkText: {
    marginTop: 20,
  },
  // Registration Screen Styles
  registerButton: {
    backgroundColor: "#8373C1", // Button background color for registration screen
    paddingVertical: 15,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  registerButtonText: {
    color: "white", // Button text color for registration screen
    fontSize: 18,
    fontWeight: "bold",
  },
  resendLink: {
    marginTop: 20,
    textAlign: "center",
    color: "blue",
    textDecorationLine: "underline",
  },
});

const verifyCodeValidationSchema = Yup.object().shape({
  v_code: Yup.string().required("Verification code require"),
});
const registerValidationSchema = Yup.object().shape({
  user_name: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default RegisterScreen;
