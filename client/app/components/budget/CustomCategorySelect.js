import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
} from "react-native";

import CheckBox from "expo-checkbox";

const windowHeight = Dimensions.get("window").height;

const CustomCategorySelect = ({ visible, onClose, navigation }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (selectedOption === "Create custom category") {
      // Handle the custom category creation here with categoryName and description
      console.log("Category Name:", categoryName);
      console.log("Description:", description);
    } else {
      // Handle the "Add excess for savings" option here
      console.log("Add excess for savings selected");
    }

    navigation.navigate("BudgetSetupSuccess");

    // Close the modal
    onClose();
  };

  return (
    <Modal transparent={true} visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.header}>Select an option:</Text>
          <View style={styles.checkboxContainer}>
            <CheckBox
              value={selectedOption === "Add excess for savings"}
              onValueChange={() => handleOptionChange("Add excess for savings")}
            />
            <Text style={styles.checkboxLabel}>Add excess for savings</Text>
          </View>
          <View style={styles.checkboxContainer}>
            <CheckBox
              value={selectedOption === "Create custom category"}
              onValueChange={() => handleOptionChange("Create custom category")}
            />
            <Text style={styles.checkboxLabel}>Create custom category</Text>
          </View>
          {selectedOption === "Create custom category" && (
            <View>
              <TextInput
                style={styles.input}
                placeholder="Category Name"
                value={categoryName}
                onChangeText={(text) => setCategoryName(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Description"
                value={description}
                onChangeText={(text) => setDescription(text)}
              />
            </View>
          )}
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
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
    maxHeight: windowHeight / 2, // Cover half of the screen
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
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
});

export default CustomCategorySelect;
