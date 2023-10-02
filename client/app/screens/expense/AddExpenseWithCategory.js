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
  Button,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import DropDownPicker from "react-native-dropdown-picker";
import CheckBox from "expo-checkbox";
import * as ImagePicker from "expo-image-picker";
import DatePicker from "expo-datepicker";
import SelectOrTakeImageModel from "../../components/expense/SelectOrTakeImageModel";
import SelectDateAndTimeModel from "../../components/expense/SelectDateAndTimeModel";

const image =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAABQ0lEQVR4nO3bzUrDQBQF4OrCKvjeCoIUEeqqD+FCfCLdiIo/uDwS6E4wCdTcsfm+bWFyOSdMQqddLAAAAAAAAAAAAIARkiyTXCR5SvKRZJ3kRIjThX+Xn26muP6s/RJ+5616vjmH33mtnnHO4Xcuq+ecc/jd58vqWfdOkqMktz3h3yc5rp517wi/kPALCb+Q8AsJv5DwCwm/kPALCb+Q8AsJv5DwCwm//a+UGeclyfWgs/Ak5yMXZ7j+s/AkjyMWZJzPJId9BTyMXJQdF3A2YkHGWQ/ZgjyEd+85ydXgH6R5DW2AEhqghAYooQFKaIASGqCEBiihAUpogBIaoIQGKKEBSmiAEhrgL0r/p4RV9ZxzL+E9yUH1nHMu4av3bJQ/LWEj32lLWG23ne7O3yQ5ner6bHV7vn0fAAAAAAAAAAAWU/gGhKtHrQIgGN4AAAAASUVORK5CYII=";

const AddExpenseWithCategory = ({ navigation }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
  ]);

  const [isPickerVisible, setPickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const [isChecked, setIsChecked] = useState(false);

  const showPicker = () => {
    setPickerVisible(true);
  };

  const hidePicker = () => {
    setPickerVisible(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    hidePicker();
  };
  // const [type, setType] = useState(CameraType.back);
  // const [permission, requestPermission] = Camera.useCameraPermissions();

  // // if (!permission) ...

  // // if (!permission.granted) ...

  // function toggleCameraType() {
  //   setType((current) =>
  //     current === CameraType.back ? CameraType.front : CameraType.back
  //   );
  // }

  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleSelectPicture = async () => {
    toggleModal();
    const result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
    });
    if (!result.canceled) {
      // Handle the selected image here
      console.log(result.assets[0].base64);
    }
  };

  const handleTakePicture = async () => {
    toggleModal();
    const result = await ImagePicker.launchCameraAsync({
      base64: true,
    });
    if (!result.canceled) {
      // Handle the taken picture here
      console.log(result.assets[0].base64);
    }
  };

  const handlePressNavigaion = () => {
    navigation.navigate("AllExpenseCategories");
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 15,
          marginLeft: 16,
        }}
        onPress={handlePressNavigaion}
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
      <Formik
        initialValues={{
          expense_name: "",
          expense_amount: "",
          description: "",
        }}
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

            {/* Title and Welcome Message */}
            <View style={styles.headerContainer}>
              <Text style={styles.title}>Add an Expense</Text>
            </View>

            {/* Form */}
            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Category*</Text>
                <DropDownPicker
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Name of the Expense*</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange("expense_name")}
                  onBlur={handleBlur("expense_name")}
                  value={values.expense_name}
                  placeholder="Give a name for your expense"
                />
                {touched.expense_name && errors.expense_name && (
                  <Text style={{ color: "red" }}>{errors.expense_name}</Text>
                )}
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Amount*</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange("expense_amount")}
                  onBlur={handleBlur("expense_amount")}
                  value={values.expense_amount}
                  placeholder="Enter your expense amount"
                />
                {touched.expense_amount && errors.expense_amount && (
                  <Text style={{ color: "red" }}>{errors.expense_amount}</Text>
                )}
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Description*</Text>
                <TextInput
                  multiline={true}
                  numberOfLines={5}
                  maxLength={100}
                  textAlignVertical="top"
                  style={styles.descriptionInput}
                  onChangeText={handleChange("description")}
                  onBlur={handleBlur("description")}
                  value={values.description}
                  placeholder="Describe your expense shortly"
                />
                {touched.description && errors.description && (
                  <Text style={{ color: "red" }}>{errors.description}</Text>
                )}
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Resipt Image*</Text>
                <TouchableOpacity
                  style={styles.imageSelectButton}
                  onPress={() => setModalVisible(true)}
                >
                  <Text style={styles.imageSelectButtonText}>
                    Select or take a picture
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.checkboxContainer}>
                <CheckBox
                  value={isChecked}
                  onValueChange={(newValue) => setIsChecked(newValue)}
                />
                <Text style={styles.checkboxLabel}>
                  I need to add a custom date and time
                </Text>
              </View>
              
              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleSubmit}
              >
                <Text style={styles.loginButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
      <SelectOrTakeImageModel
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onTakePicture={handleTakePicture}
        onSelectPicture={handleSelectPicture}
      />
      {isChecked && <SelectDateAndTimeModel />}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: "center",
    alignItems: "center",
    //backgroundColor: "#fff", // Background color
    padding: 16,
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
    //paddingLeft: 30,
    marginBottom: 5,
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
    width: "100%",
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
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    textAlign: "left", // Align input text to the left
  },
  descriptionInput: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    textAlign: "left", // Align input text to the left
    paddingTop: 10,
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
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkboxLabel: {
    marginLeft: 10,
  },
  imageSelectButton: {
    paddingVertical: 15,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "dashed",
    marginBottom: 15,
  },
  imageSelectButtonText: {},
});

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default AddExpenseWithCategory;
