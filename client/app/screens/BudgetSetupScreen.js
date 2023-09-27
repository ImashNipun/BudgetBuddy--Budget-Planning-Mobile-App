import React,{useState} from 'react'
import BudgetCategorySelect from '../components/budget/BudgetCategorySelect'
import BudgetInput from '../components/budget/BudgetInput'

const BudgetSetupScreen = ({navigation}) => {
  
  const [totalBudget, setTotalBudget] = useState(0);
  return (
    <>
      {totalBudget ? (
        <BudgetCategorySelect totalBudget={totalBudget} setTotalBudget={setTotalBudget} navigation={navigation}/>
      ) : (
        <BudgetInput setTotalBudget={setTotalBudget}/>
      )}
    </>
  );
}

export default BudgetSetupScreen