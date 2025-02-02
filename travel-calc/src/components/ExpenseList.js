import React from "react";

const ExpenseList = ({ expenses, onDeleteExpense }) => {
  return (
    <div className="expense-list">
      <h2 className="expense-title">Expense List</h2>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id} className="expense-item">
            {expense.name} - ${expense.amount} ({expense.category})
            <button onClick={() => onDeleteExpense(expense.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
