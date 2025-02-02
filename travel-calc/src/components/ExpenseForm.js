import React, { useState } from "react";

const ExpenseForm = ({ onAddExpense,onSetBudget}) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [budget, setBudget] = useState("");
  const [category, setCategory] = useState("Food");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if budget is set
    if (!budget || budget <= 0) {
      alert("⚠️ Please enter a valid budget before adding expenses.");
      return;
    }

    // Check if expense fields are filled
    if (!name || !amount || amount <= 0) {
      alert("⚠️ Please enter a valid expense title and amount.");
      return;
    }

    // Pass expense to parent component
    onAddExpense({ name, amount: parseFloat(amount) ,category,});

    // Clear input fields
    setName("");
    setAmount("");
  };

  const handleBudgetChange = (e) => {
    const newBudget = parseFloat(e.target.value) || 0;
    setBudget(newBudget);
    onSetBudget(newBudget);
  };
  return (
    <>
    <div className="budget-input">
    <label>Set Your Budget: </label>
    <input
      type="number"
      value={budget}
      onChange={handleBudgetChange}
      placeholder="Enter budget"
    />
  </div>
    <form onSubmit={handleSubmit} className="expense-form">
      <input
        type="text"
        placeholder="Expense Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Food">Food</option>
        <option value="Transport">Transport</option>
        <option value="Accommodation">Accommodation</option>
        <option value="Entertainment">Entertainment</option>
      </select>
      <button type="submit">Add Expense</button>
    </form>
    </>
  );
};

export default ExpenseForm;
