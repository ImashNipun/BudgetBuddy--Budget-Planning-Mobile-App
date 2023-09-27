import {
  SafeAreaView,
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
import logo from "../../../assets/app_logo.png";
import { Formik } from "formik";
import * as Yup from "yup";

const LoginScreen = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_300Light,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          // Handle form submission here
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
            <StatusBar backgroundColor="#8373C1" />
            {/* Logo */}
            <Image source={logo} style={styles.logo} />

            {/* Title and Welcome Message */}
            <View style={styles.headerContainer}>
              <Text style={styles.title}>Login</Text>
              <Text style={styles.welcomeMessage}>
                Welcome back buddy, Let’s login.
              </Text>
            </View>

            {/* Form */}
            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
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
                style={styles.loginButton}
                onPress={handleSubmit}
              >
                <Text style={styles.loginButtonText}>Login</Text>
              </TouchableOpacity>
            </View>

            {/* Sign-up Navigation Line */}
            <Text
              style={styles.signUpLinkText}
              onPress={() => navigation.navigate("Register")}
            >
              Don't have an account?{" "}
              <Text style={styles.signUpLink}>Sign up</Text>
            </Text>
          </View>
        )}
      </Formik>
    </KeyboardAvoidingView>
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
    marginBottom: 40,
  },
  headerContainer: {
    alignItems: "flex-start", // Align title and welcome message to the left
    alignSelf: "stretch", // Stretch the header container to the full width
    paddingLeft: 30,
    marginBottom: 20,
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
  signUpLink: {
    marginTop: 20,
    textAlign: "center",
    color: "#00FF99",
    textDecorationLine: "underline",
  },
  signUpLinkText: {
    marginTop: 20,
  },
});

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default LoginScreen;
