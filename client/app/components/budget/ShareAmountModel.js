import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
  Image,
  Alert,
} from "react-native";
import CheckBox from "expo-checkbox";
import * as Yup from "yup";
import { config } from "../../config/config";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { Picker } from "@react-native-picker/picker";
import { Formik } from "formik";

const windowHeight = Dimensions.get("window").height;

const close_image =
  "data:image/png;base64,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";

const ShareAmountModel = ({
  visible,
  onClose,
  customCategory,
  allCategories,
  data,
  custom_cat,
  setIsAmountShared,
  navigation,
}) => {
  const { auth } = useAuth();
  const [items, setItems] = useState([]);
  const [changeState, setChangeState] = useState(false);

  const validationSchema = Yup.object().shape({
    expense_category: Yup.string().required("Category is required"),
    expense_amount: Yup.number()
      .required("Amount is required")
      .min(0, "Amount must be a positive number")
      .lessThan(
        data?.remaining_amount,
        `Amount must be less than ${data?.remaining_amount}`
      ),
  });

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

  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalTitleContainer}>
            <Text style={styles.header}>Share amount with other category</Text>
            <TouchableOpacity onPress={onClose}>
              <Image source={{ uri: close_image }} style={styles.modalClose} />
            </TouchableOpacity>
          </View>
          <Text style={styles.content}>
            You can share some amount with another category. Enter the amount
            and select the category you want to share with.
          </Text>
          <Formik
            initialValues={{
              expense_category: "",
              expense_amount: "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { resetForm }) => {
              let payload = {
                category_share_to: values.expense_category,
                share_amount: Number(values.expense_amount),
                from_is_custom_category: custom_cat,
              };
              if (custom_cat) {
                payload = { ...payload, category_share_from: data?._id };
              } else {
                payload = {
                  ...payload,
                  category_share_from: data?.category_id?._id,
                };
              }

              try {
                const result = await axios.post(
                  `${config.BASE_URL}/api/v1/budget/amount-share/${auth?.user}`,
                  payload
                );

                if (result?.status == 200) {
                  Alert.alert(
                    "Budget Updated successfully!",
                    `${result?.data?.message}`,
                    [
                      {
                        text: "OK",
                        onPress: () => {
                          setIsAmountShared((prev) => !prev);
                          navigation.navigate("AllExpenseCategories");
                        },
                      },
                    ]
                  );
                  onClose();
                }
              } catch (error) {
                console.log(error);
                Alert.alert(
                  "Somthing went wrong",
                  `${error?.response?.data?.message}`,
                  [
                    {
                      text: "OK",
                      onPress: () => console.log(""),
                    },
                  ]
                );
                onClose();
              }

              setChangeState(!changeState);

              resetForm();
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
                <View style={styles.formContainer}>
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Category*</Text>

                    <Picker
                      selectedValue={values.expense_category}
                      onValueChange={(itemValue, itemIndex) =>
                        setFieldValue("expense_category", itemValue)
                      }
                      onBlur={handleBlur("expense_category")}
                    >
                      {items
                        ? items.map((item, index) => {
                            if (custom_cat && item.value != data?._id) {
                              return (
                                <Picker.Item
                                  key={index}
                                  label={item.label}
                                  value={item.value}
                                />
                              );
                            } else if (
                              !custom_cat &&
                              item.value != data?.category_id?._id
                            ) {
                              return (
                                <Picker.Item
                                  key={index}
                                  label={item.label}
                                  value={item.value}
                                />
                              );
                            }
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
                    <Text style={styles.label}>Amount*</Text>
                    <TextInput
                      style={styles.input}
                      onChangeText={handleChange("expense_amount")}
                      onBlur={handleBlur("expense_amount")}
                      value={values.expense_amount}
                      placeholder="Enter your expense amount"
                    />
                    {touched.expense_amount && errors.expense_amount && (
                      <Text style={{ color: "red" }}>
                        {errors.expense_amount}
                      </Text>
                    )}
                  </View>

                  <TouchableOpacity
                    style={styles.loginButton}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.loginButtonText}>Share</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: "100%",
    maxHeight: (windowHeight * 2) / 3, // Cover half of the screen
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 18,
  },
  content: {
    fontSize: 15,
    marginBottom: 10,
  },
  excessBudgetText: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 25,
    marginTop: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkboxLabel: {
    marginLeft: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "blue",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  modalClose: {
    height: 30,
    width: 30,
    objectFit: "contain",
    position: "absolute",
    top: -5,
    right: 0,
  },
  modalTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
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
});

export default ShareAmountModel;
