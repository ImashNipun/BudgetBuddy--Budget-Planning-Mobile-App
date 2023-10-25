import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  Image,
} from "react-native";
import axios from "axios";
import { FontAwesome5 } from "@expo/vector-icons";
import { config } from "../../config/config";
import useAuth from "../../hooks/useAuth";
import ExpenseCard from "../../components/expense/ExpenseCard";
import SingleExpenseModal from "../../components/expense/SingleExpenseModal";
import ExpenseFilterModal from "../../components/expense/ExpenseFilterModal";
import { TouchableOpacity } from "react-native-gesture-handler";
import Loading from "../../components/common/Loading";

const image =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAABQ0lEQVR4nO3bzUrDQBQF4OrCKvjeCoIUEeqqD+FCfCLdiIo/uDwS6E4wCdTcsfm+bWFyOSdMQqddLAAAAAAAAAAAAIARkiyTXCR5SvKRZJ3kRIjThX+Xn26muP6s/RJ+5616vjmH33mtnnHO4Xcuq+ecc/jd58vqWfdOkqMktz3h3yc5rp517wi/kPALCb+Q8AsJv5DwCwm/kPALCb+Q8AsJv5DwCwm//a+UGeclyfWgs/Ak5yMXZ7j+s/AkjyMWZJzPJId9BTyMXJQdF3A2YkHGWQ/ZgjyEd+85ydXgH6R5DW2AEhqghAYooQFKaIASGqCEBiihAUpogBIaoIQGKKEBSmiAEhrgL0r/p4RV9ZxzL+E9yUH1nHMu4av3bJQ/LWEj32lLWG23ne7O3yQ5ner6bHV7vn0fAAAAAAAAAAAWU/gGhKtHrQIgGN4AAAAASUVORK5CYII=";

const DisplayAllExpenses = ({ route, navigation }) => {
  const { auth } = useAuth();
  const { allCategories, customCategory } = route.params;
  const [categoryFilter, setCategoryFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState([]);
  const [years, setYears] = useState([]);
  const [allexpenses, setAllExpenses] = useState([]);
  const [singleExpenseModalVisible, setSingleExpenseModalVisible] =
    useState(false);
  const [expenseModalData, setExpenseModalData] = useState(null);
  const [filterModelVisible, setFilterModelVisible] = useState(false);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [categoryFilterName, setCategoryFilterName] = useState("");
  const [loadingVisible, setLoadingVisible] = useState(true);

  useEffect(() => {
    const filteredExpenses = allexpenses.filter((expense) => {
      let matchesCategory = true;
      let matchesYear = true;
      let matchesSearchQuery = true;

      if (categoryFilter !== "") {
        if (expense.custom_category) {
          matchesCategory = expense.custom_category_id._id === categoryFilter;
        } else {
          matchesCategory = expense.expense_category._id === categoryFilter;
        }
      }

      if (yearFilter !== "") {
        const the_yaer = new Date(expense.expense_date).getFullYear();
        matchesYear = parseInt(the_yaer) === parseInt(yearFilter);
      }

      if (searchQuery !== "") {
        const searchQueryLower = searchQuery.toLowerCase();
        matchesSearchQuery =
          expense.expense_name.toLowerCase().includes(searchQueryLower) || // Search in title
          expense.expense_amount.toString().includes(searchQueryLower); // Search in amount
      }

      return matchesCategory && matchesYear && matchesSearchQuery;
    });
    setFilteredExpenses(filteredExpenses);
  }, [categoryFilter, yearFilter, searchQuery, allexpenses]);

  useEffect(() => {
    const getLatestExpenses = async () => {
      try {
        const result = await axios.get(
          `${config.BASE_URL}/api/v1/expense/user/${auth?.user}`
        );

        let expense = result?.data?.data;
        setAllExpenses(expense);
        setLoadingVisible(false);
      } catch (error) {
        console.log(`Error:${error.message}`, error);
      }
    };
    getLatestExpenses();
  }, []);

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

  useEffect(() => {
    let years_list = [
      {
        label: "Select a year",
        value: "",
      },
    ];
    const years = Array.from({ length: 20 }, (_, i) => ({
      label: `${i + 2023}`,
      value: i + 2023,
    }));

    years_list.push(...years);
    setYears(years_list);
  }, []);

  const handleSingleExpenseModalClose = () => {
    setSingleExpenseModalVisible(false);
  };

  const handleSingleExpenseModalView = (data) => {
    setExpenseModalData(data);
    setSingleExpenseModalVisible(true);
  };

  return (
    <>
    {loadingVisible && <Loading />}
    <View style={styles.container}>
      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: "center",marginBottom: 20, }}
        onPress={() => navigation.navigate("AllExpenseCategories")}
      >
        <View
          style={{
            width: 40,
            height: 40,
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
      <Text style={styles.mainTitleText}>All Expenses</Text>
      <Text style={styles.subTitleText}>
        Enter name or amount to filter using search option. Click filter icon to
        access more filter options
      </Text>
      <View style={styles.filtersContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search expenses by name and amount"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity
          onPress={() => setFilterModelVisible(true)}
          style={{
            // flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 10,
            padding: 10,
          }}
        >
          <FontAwesome5 name="filter" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      {(yearFilter || (categoryFilter && categoryFilterName)) && (
        <View style={styles.filterItemContainer}>
          {categoryFilter && (
            <View style={styles.filterItem}>
              <Text>{categoryFilterName}</Text>
              <TouchableOpacity
                style={{ marginLeft: 15 }}
                onPress={() => {
                  setCategoryFilter("");
                }}
              >
                <FontAwesome5 name="times-circle" size={20} color="#000" />
              </TouchableOpacity>
            </View>
          )}
          {yearFilter && (
            <View style={styles.filterItem}>
              <Text>{yearFilter}</Text>
              <TouchableOpacity
                style={{ marginLeft: 15 }}
                onPress={() => {
                  setYearFilter("");
                }}
              >
                <FontAwesome5 name="times-circle" size={20} color="#000" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
      <Text style={styles.listTitleText}>Expenses List</Text>
      {filteredExpenses?.length != 0 ? (
        <FlatList
          data={filteredExpenses}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <ExpenseCard item={item} onVisible={handleSingleExpenseModalView} />
          )}
        />
      ) : (
        <Text style={{ marginBottom: "auto" }}>No expenses are available</Text>
      )}
      <SingleExpenseModal
        data={expenseModalData}
        visible={singleExpenseModalVisible}
        onClose={handleSingleExpenseModalClose}
      />
      <ExpenseFilterModal
        visible={filterModelVisible}
        onClose={() => setFilterModelVisible(false)}
        items={items}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        years={years}
        yearFilter={yearFilter}
        setYearFilter={setYearFilter}
        setCategoryFilterName={setCategoryFilterName}
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
  filtersContainer: {
    flexDirection: "row",
  },
  filterItemContainer: {
    flexDirection: "row",
    paddingBottom: 13,
  },
  filterItem: {
    flexDirection: "row",
    padding: 8,
    paddingLeft: 15,
    backgroundColor: "#ffea61",
    marginRight: 10,
    borderRadius: 23,
  },
  searchInput: {
    flex: 1.5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },

  mainTitleText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subTitleText: {
    fontSize: 15,
    marginBottom: 15,
  },
  listTitleText: {
    fontSize: 15,
    marginBottom: 10,
    fontWeight: "bold",
  },
});

export default DisplayAllExpenses;
