import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";

const SelectedCategoryCard = ({ category, categoryId, camount }) => {
  return (
    <View key={categoryId} style={styles.categoryCardList}>
      <View style={styles.categoryCardListItemLeft}>
        <Image
          style={styles.selectedCategoryIcon}
          source={{ uri: category.icon }}
        ></Image>
        <Text style={styles.selectedCategoryName}>{category.category_name}</Text>
      </View>
      <Text style={styles.selectedCategoryName}>Rs. {camount}.00</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryCardListItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  categoryCardList: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    marginRight: 10,
    backgroundColor: "#ffffff",
    marginLeft: 3,
    marginRight: 3,
    marginBottom: 10,
    elevation: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedCategoriesContainer: {
    flex: 2,
  },
  selectedCategoryName: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  selectedCategoryIcon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
});

export default SelectedCategoryCard;
