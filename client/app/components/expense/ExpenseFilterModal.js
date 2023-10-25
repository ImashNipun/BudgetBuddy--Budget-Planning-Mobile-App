import React from "react";
import {
  View,
  Modal,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { FontAwesome5 } from "@expo/vector-icons";

const windowHeight = Dimensions.get("window").height;

const ExpenseFilterModal = ({
  visible,
  onClose,
  items,
  categoryFilter,
  setCategoryFilter,
  years,
  yearFilter,
  setYearFilter,
  setCategoryFilterName,
}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.filtertTitle}>Filter Options</Text>
            <TouchableOpacity
              onPress={() => {
                onClose();
              }}
              style={{
                // flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 10,
                paddingTop: 7,
                paddingBottom: 7,
                paddingLeft: 10,
                paddingRight: 10,
                backgroundColor: "#000",
                borderRadius: 50,
              }}
            >
              <FontAwesome5 name="times" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          <View style={styles.filterContainer}>
            <View>
              <Text style={styles.filterLabel}>Category:</Text>
              <Picker
                selectedValue={categoryFilter}
                onValueChange={(itemValue, itemIndex) => {
                  setCategoryFilter(itemValue);
                  setCategoryFilterName(items[itemIndex].label);
                  onClose();
                }}
                style={{ backgroundColor: "#eee", color: "#000" }}
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
            </View>
          </View>
          <View style={styles.filterContainer}>
            <View>
              <Text style={styles.filterLabel}>Year:</Text>
              <Picker
                selectedValue={yearFilter}
                onValueChange={(itemValue, itemIndex) => {
                  setYearFilter(itemValue);
                  onClose();
                }}
                style={{ backgroundColor: "#eee", color: "#000" }}
              >
                {years
                  ? years.map((item, index) => {
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
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  mainContainer: {
    flexDirection: "column",
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: "100%",
    gap: 10,
    maxHeight: (windowHeight * 7) / 8, // Cover half of the screen
  },
  filterContainer: {
    justifyContent: "space-between",
  },
  filterLabel: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 4,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  filtertTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
});

export default ExpenseFilterModal;
