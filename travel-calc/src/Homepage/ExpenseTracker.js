import React, { useState, useEffect } from "react";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import ExpenseSummary from "../components/ExpenseSummary";
import ExpenseChart from "../components/ExpenseChart";
import "./Expense.css";


const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [budget, setBudget] = useState(0);

  useEffect(() => {
 
    const fetchExpenses = async () => {
      try {
        const response = await fetch("https://api.example.com/expenses");
        const data = await response.json();
        setExpenses(data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };
    fetchExpenses();
  }, []);

  // Add new expense
  const addExpense = (newExpense) => {
    setExpenses([...expenses, newExpense]);
  };

  // Delete expense
  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  return (
    <div className="expense-tracker">
      <span><h1>Expense Tracker</h1></span>
      <ExpenseForm onAddExpense={addExpense}  onSetBudget={setBudget}/>
      <ExpenseSummary expenses={expenses}  budget={budget}/>
      <ExpenseChart expenses={expenses} />
      <ExpenseList expenses={expenses} onDeleteExpense={deleteExpense} />
    </div>
  );
};

export default ExpenseTracker;
