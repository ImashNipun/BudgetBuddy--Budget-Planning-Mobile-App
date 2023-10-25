import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import CheckBox from "expo-checkbox";
import * as ImagePicker from "expo-image-picker";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { config } from "../../config/config";
import { FontAwesome5 } from "@expo/vector-icons";

import SelectOrTakeImageModel from "../../components/expense/SelectOrTakeImageModel";
import SelectDateAndTimeModel from "../../components/expense/SelectDateAndTimeModel";
import SelectedImageViewModal from "../../components/expense/SelectedImageViewModal";

const image =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAABQ0lEQVR4nO3bzUrDQBQF4OrCKvjeCoIUEeqqD+FCfCLdiIo/uDwS6E4wCdTcsfm+bWFyOSdMQqddLAAAAAAAAAAAAIARkiyTXCR5SvKRZJ3kRIjThX+Xn26muP6s/RJ+5616vjmH33mtnnHO4Xcuq+ecc/jd58vqWfdOkqMktz3h3yc5rp517wi/kPALCb+Q8AsJv5DwCwm/kPALCb+Q8AsJv5DwCwm//a+UGeclyfWgs/Ak5yMXZ7j+s/AkjyMWZJzPJId9BTyMXJQdF3A2YkHGWQ/ZgjyEd+85ydXgH6R5DW2AEhqghAYooQFKaIASGqCEBiihAUpogBIaoIQGKKEBSmiAEhrgL0r/p4RV9ZxzL+E9yUH1nHMu4av3bJQ/LWEj32lLWG23ne7O3yQ5ner6bHV7vn0fAAAAAAAAAAAWU/gGhKtHrQIgGN4AAAAASUVORK5CYII=";

const AddExpenseWithCategory = ({ route, navigation }) => {
  const { allCategories, customCategory, cat_id } = route.params;
  const { auth, onLogout } = useAuth();
  const [items, setItems] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [isChecked, setIsChecked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [billImage, setBillImage] = useState(null);
  const [loadingButtonVisible, setLoadingButtonVisible] = useState(false);
  const [imageViewModal, setImageViewModal] = useState(false);
  //console.log(customCategory);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleSelectPicture = async () => {
    toggleModal();
    const result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
    });
    if (!result.canceled) {
      setBillImage(result?.assets[0]?.base64);
    }
  };

  const handleTakePicture = async () => {
    toggleModal();
    const result = await ImagePicker.launchCameraAsync({
      base64: true,
    });
    if (!result.canceled) {
      setBillImage(result?.assets[0]?.base64);
    }
  };

  const handlePressNavigaion = () => {
    navigation.navigate("AllExpenseCategories");
  };

  useEffect(() => {
    setItems([]);
    if (customCategory) {
      if (allCategories) {
        setItems((prev) => [
          ...prev,
          { label: "Select a category", value: "" },
        ]);
        const newItems = allCategories.map((allc) => ({
          label: allc?.category_id?.category_name,
          value: allc?.category_id?._id,
        }));
        newItems.push({
          label: customCategory?.category_name,
          value: customCategory?._id,
        });
        setItems((prevItems) => [...prevItems, ...newItems]);
      } else {
        setItems([]);
      }
    } else {
      if (allCategories) {
        setItems((prev) => [
          ...prev,
          { label: "Select a category", value: "" },
        ]);
        const newItems = allCategories.map((allc) => ({
          label: allc?.category_id?.category_name,
          value: allc?.category_id?._id,
        }));
        setItems((prevItems) => [...prevItems, ...newItems]);
      } else {
        setItems([]);
      }
    }
  }, []);

  const logExpense = async (payload) => {
    try {
      const result = await axios.post(
        `${config.BASE_URL}/api/v1/expense/`,
        payload
      );
      console.log(result);
      if (result.status == 201) {
        Alert.alert("Congratulations!", `${result.data.message}`, [
          {
            text: "OK",
            onPress: () => navigation.navigate("AllExpenseCategories"),
          },
        ]);
      }
    } catch (error) {
      Alert.alert("Somthing went wrong!", `${error?.response?.data?.message}`, [
        {
          text: "OK",
          onPress: () => navigation.navigate("AllExpenseCategories"),
        },
      ]);
      console.log(error);
    }
  };

  return (
    <ScrollView>
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
          expense_category: cat_id ? cat_id : "",
          expense_name: "",
          expense_amount: "",
          description: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          setLoadingButtonVisible(true);
          let expense_date = selectedDate.toLocaleDateString();
          let expense_time = selectedTime.toLocaleTimeString(undefined, {
            hour12: true,
          });
          let custom_category = false;
          let budget_extended = false;
          let press_ok = false;

          if (customCategory?._id == values.expense_category) {
            custom_category = true;
          }

          if (!isChecked) {
            const e_date = new Date();

            expense_date = e_date.toDateString();
            // expense_time = e_date.toTimeString(undefined, {
            //   hour12: true,
            // });
            const hours = e_date.getHours();
            const minutes = e_date.getMinutes();
            const seconds = e_date.getSeconds();

            // Determine whether it's AM or PM
            const period = hours < 12 ? "AM" : "PM";

            // Convert hours from 24-hour format to 12-hour format
            const formattedHours = hours % 12 || 12;

            expense_time = `${formattedHours}:${minutes}:${seconds} ${period}`;
          }

          const payload = {
            ...values,
            user_id: auth?.user,
            custom_category,
            bill_image: billImage,
            expense_date,
            expense_time,
            budget_extended,
          };

          if (customCategory?._id == values.expense_category) {
            if (
              customCategory.remaining_amount < Number(values.expense_amount)
            ) {
              Alert.alert(
                "Somthing went wrong!",
                `You don't have enough money to log the expense. However you want to log the expense.`,
                [
                  {
                    text: "No",
                    onPress: () => setLoadingButtonVisible(false),
                    style: "cancel",
                  },
                  {
                    text: "Yes",
                    onPress: () => {
                      budget_extended = !budget_extended;
                      press_ok = true;
                      logExpense(payload);
                    },
                  },
                ]
              );
            } else {
              press_ok = true;
              logExpense(payload);
            }
          } else {
            const foundObject = allCategories.find(
              (obj) => obj.category_id._id === values.expense_category
            );

            if (foundObject) {
              const remainingAmount = foundObject.remaining_amount;

              if (remainingAmount < Number(values.expense_amount)) {
                Alert.alert(
                  "Somthing went wrong!",
                  `You don't have enough money to log the expense. However you want to log the expense.`,
                  [
                    {
                      text: "No",
                      onPress: () => setLoadingButtonVisible(false),
                      style: "cancel",
                    },
                    {
                      text: "Yes",
                      onPress: () => {
                        budget_extended = !budget_extended;
                        press_ok = true;
                        logExpense(payload);
                      },
                    },
                  ]
                );
              } else {
                press_ok = true;
                logExpense(payload);
              }
            } else {
              Alert.alert("Somthing went wrong!", `hhh`, [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel",
                },
                { text: "OK", onPress: () => console.log("Cancel Pressed") },
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
          setFieldValue,
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

                <Picker
                  enabled={cat_id ? false : true}
                  selectedValue={values.expense_category}
                  onValueChange={(itemValue, itemIndex) =>
                    setFieldValue("expense_category", itemValue)
                  }
                  onBlur={handleBlur("expense_category")}
                >
                  {items
                    ? items.map((item, index) => {
                        return (
                          <Picker.Item
                            key={index}
                            label={item.label}
                            value={item.value}
                          />
                        );
                      })
                    : null}
                </Picker>
                {errors.expense_category && (
                  <Text style={{ color: "red" }}>
                    {errors.expense_category}
                  </Text>
                )}
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
                <Text style={styles.label}>Resipt Image</Text>
                {billImage ? (
                  <View style={styles.imageViewButton} onPress={() => {}}>
                    <TouchableOpacity
                      style={styles.imageViewButtonText}
                      onPress={() => setImageViewModal(true)}
                    >
                      <FontAwesome5 name="image" size={20} color="#000" />
                      <Text style={{ marginLeft: 10 }}>
                        Click to see the selected image
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setBillImage(null)}>
                      <FontAwesome5 name="trash" size={20} color="#000" />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity
                    style={styles.imageSelectButton}
                    onPress={() => setModalVisible(true)}
                  >
                    <Text>Select or take a picture</Text>
                  </TouchableOpacity>
                )}
              </View>

              {isChecked ? (
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Selected date and time</Text>
                  <View style={styles.imageViewButton} onPress={() => {}}>
                    <View style={styles.imageViewButtonText}>
                      <Text>Date: {selectedDate.toDateString()}</Text>
                      <Text style={{ marginLeft: 10 }}>
                        Time: {selectedTime.toLocaleTimeString()}
                      </Text>
                    </View>
                    <TouchableOpacity onPress={() => setIsChecked(false)}>
                      <FontAwesome5 name="trash" size={20} color="#000" />
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View style={styles.checkboxContainer}>
                  <CheckBox
                    value={isChecked}
                    onValueChange={(newValue) => setIsChecked(newValue)}
                  />
                  <Text style={styles.checkboxLabel}>
                    I need to add a custom date and time
                  </Text>
                </View>
              )}

              <SelectOrTakeImageModel
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onTakePicture={handleTakePicture}
                onSelectPicture={handleSelectPicture}
              />
              {isChecked && (
                <SelectDateAndTimeModel
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  selectedTime={selectedTime}
                  setSelectedTime={setSelectedTime}
                />
              )}

              {loadingButtonVisible ? (
                <TouchableOpacity style={styles.loginButton}>
                  <ActivityIndicator size="large" color="#fff" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.loginButton}
                  onPress={handleSubmit}
                >
                  <Text style={styles.loginButtonText}>Add</Text>
                </TouchableOpacity>
              )}

              <SelectedImageViewModal
                visible={imageViewModal}
                imageUri={billImage}
                onClose={() => setImageViewModal(false)}
              />
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
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
  imageViewButtonText: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageViewButton: {
    flexDirection: "row",
    paddingVertical: 15,
    borderRadius: 5,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: "#ccc",
  },
});

const validationSchema = Yup.object().shape({
  expense_category: Yup.string().required("Email is required"),
  expense_name: Yup.string().required("Name of the Expense is required"),
  expense_amount: Yup.number()
    .required("Amount is required")
    .min(0, "Amount must be a positive number"),
  description: Yup.string().required("Description is required"),
});

export default AddExpenseWithCategory;
