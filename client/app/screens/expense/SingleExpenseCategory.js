import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import data from "../../data/data";
import { SingleExpenseCategoryCard } from "../../components/expense/SingleExpenseCategoryCard";
import ShareAmountModel from "../../components/budget/ShareAmountModel";
import ExpenseCard from "../../components/expense/ExpenseCard";
import useAuth from "../../hooks/useAuth";
import { useIsFocused } from "@react-navigation/native";
import { config } from "../../config/config";
import axios from "axios";
import SingleExpenseModal from "../../components/expense/SingleExpenseModal";
import Loading from "../../components/common/Loading";

const image =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAABQ0lEQVR4nO3bzUrDQBQF4OrCKvjeCoIUEeqqD+FCfCLdiIo/uDwS6E4wCdTcsfm+bWFyOSdMQqddLAAAAAAAAAAAAIARkiyTXCR5SvKRZJ3kRIjThX+Xn26muP6s/RJ+5616vjmH33mtnnHO4Xcuq+ecc/jd58vqWfdOkqMktz3h3yc5rp517wi/kPALCb+Q8AsJv5DwCwm/kPALCb+Q8AsJv5DwCwm//a+UGeclyfWgs/Ak5yMXZ7j+s/AkjyMWZJzPJId9BTyMXJQdF3A2YkHGWQ/ZgjyEd+85ydXgH6R5DW2AEhqghAYooQFKaIASGqCEBiihAUpogBIaoIQGKKEBSmiAEhrgL0r/p4RV9ZxzL+E9yUH1nHMu4av3bJQ/LWEj32lLWG23ne7O3yQ5ner6bHV7vn0fAAAAAAAAAAAWU/gGhKtHrQIgGN4AAAAASUVORK5CYII=";

const SingleExpenseCategory = ({ route, navigation }) => {
  const { auth } = useAuth();
  const { data, custom_cat, customCategory, allCategories } = route.params;
  const [shareAmountModelVisibel, setShareAmountModelVisibel] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [singleExpenseModalVisible, setSingleExpenseModalVisible] =
    useState(false);
  const [expenseModalData, setExpenseModalData] = useState(null);
  const [loadingVisible, setLoadingVisible] = useState(true);
  const [isAmountShared,setIsAmountShared] = useState(false);
  const handlePressNavigaion = () => {
    navigation.navigate("AllExpenseCategories");
  };

  const shareAmountModelClose = () => {
    setShareAmountModelVisibel(false);
  };

  const handleSingleExpenseModalClose = () => {
    setSingleExpenseModalVisible(false);
  };

  const handleSingleExpenseModalView = (data) => {
    setExpenseModalData(data);
    setSingleExpenseModalVisible(true);
  };

  useEffect(() => {
    const getAllExpenses = async () => {
      try {
        const result = await axios.get(
          `${config.BASE_URL}/api/v1/expense/single-category?uid=${
            auth?.user
          }&cid=${
            custom_cat ? data._id : data.category_id._id
          }&is_custom_category=${custom_cat}`
        );

        if (result?.status == 200) {
          console.log(result?.data?.data);
          setExpenses(result?.data?.data);
        }

        setLoadingVisible(false);
      } catch (error) {
        console.log(error);
      }
    };

    getAllExpenses();
  }, [isAmountShared]);
  return (
    <>
      {loadingVisible && <Loading />}
      <View style={styles.container}>
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={handlePressNavigaion}
        >
          <View
            style={{
              width: 40,
              height: 40,
              marginTop: 15,
              marginBottom: 20,
              backgroundColor: "black",
              borderRadius: 50,
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
        {/* {data
        ? data.map((items, index) => {
            if (itemId == items.id) {
              return <SingleExpenseCategoryCard key={index} items={items} />;
            }
          })
        : nul} */}
        <SingleExpenseCategoryCard
          data={data}
          custom_cat={custom_cat}
          navigation={navigation}
          customCategory={customCategory}
          allCategories={allCategories}
          setShareAmountModelVisibel={setShareAmountModelVisibel}
          isAmountShared={isAmountShared}
        />
        <Text style={styles.sectionTitle}>My Expenses</Text>
        <FlatList
          data={expenses}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <ExpenseCard
              item={item}
              key={item?.id}
              onVisible={handleSingleExpenseModalView}
            />
          )}
        />
        <ShareAmountModel
          data={data}
          visible={shareAmountModelVisibel}
          onClose={shareAmountModelClose}
          customCategory={customCategory}
          allCategories={allCategories}
          custom_cat={custom_cat}
          setIsAmountShared={setIsAmountShared}
          navigation={navigation}
        />

        <SingleExpenseModal
          data={expenseModalData}
          visible={singleExpenseModalVisible}
          onClose={handleSingleExpenseModalClose}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 16,
  },
  expenseItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    padding: 15,
    backgroundColor: "white",
    marginLeft: 3,
    marginRight: 3,
    borderRadius: 5,
    elevation: 3,
  },
});

export default SingleExpenseCategory;
