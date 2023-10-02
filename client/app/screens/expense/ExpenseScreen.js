// MainScreen.js
import React from "react";
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity,StyleSheet,FlatList } from "react-native";
import { ExpenseCategoryListCard } from "../../components/expense/ExpenseCategoryListCard";
import data from "../../data/data";

const ExpenseScreen = ({navigation}) => {
  
    const addExpenseCategory = () =>{
        navigation.navigate("AddExpensesWithCategory");
    }

  return (
    <SafeAreaView >
      <View style={styles.TitleContainer}>
        <Text style={styles.mainTitleText}>My Expense Categories</Text>
        <Text style={styles.mainSubTitleText}>Click one category to see your expenses or share some amount with other category</Text>
        <TouchableOpacity style={styles.mainButton} onPress={addExpenseCategory}><Text style={styles.mainButtonText}>My Expense Categories</Text></TouchableOpacity>
      </View>
      <ScrollView style={styles.ScrollViewContainer}>
        {data ? data.map((data, index) => {
          return <ExpenseCategoryListCard key={index} data={data} navigation={navigation} />;
        }):null}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    TitleContainer:{
        margin:15
    },
    mainTitleText:{
        fontSize:20,
        fontWeight:"bold",
        marginBottom:5
    },
    mainSubTitleText:{
        fontSize:16,
        fontWeight:"normal",
        marginBottom:15
    },
    ScrollViewContainer:{
        height:580
    },
    mainButton:{
        backgroundColor:"#8274BC",
        padding:10,
        borderRadius:5
    },
    mainButtonText:{
        textAlign:"center",
        fontSize:15,
        color:"white"
    }

})

export default ExpenseScreen;
