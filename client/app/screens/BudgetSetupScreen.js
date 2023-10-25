import React, { useState } from "react";
import { StatusBar } from "react-native";
import BudgetCategorySelect from "../components/budget/BudgetCategorySelect";
import BudgetInput from "../components/budget/BudgetInput";

const BudgetSetupScreen = ({ navigation }) => {
  const [totalBudget, setTotalBudget] = useState(0);
  const [budgetRenewDate, setBudgetRenewDate] = useState(0);
  return (
    <>
    <StatusBar backgroundColor="#fff" barStyle="dark-content"/>
      {totalBudget ? (
        <BudgetCategorySelect
          totalBudget={totalBudget}
          budgetRenewDate={budgetRenewDate}
          setTotalBudget={setTotalBudget}
          navigation={navigation}
        />
      ) : (
        <BudgetInput
          setTotalBudget={setTotalBudget}
          setBudgetRenewDate={setBudgetRenewDate}
        />
      )}
    </>
  );
};

export default BudgetSetupScreen;
