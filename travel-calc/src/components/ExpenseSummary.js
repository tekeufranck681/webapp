import React from "react";

const ExpenseSummary = ({ expenses, budget }) => {
  const totalSpent = expenses.reduce((acc, expense) => acc + expense.amount, 0);
  const remainingBudget = budget - totalSpent;

  return (
    <div className="expense-summary">
      <h2 className="expense-title">Expense Summary</h2>
      <div className="summary-item">
        <span>Total Budget:</span> <strong>${budget || 0}</strong>
      </div>
      <div className="summary-item">
        <span>Total Spent:</span> <strong>${totalSpent}</strong>
      </div>
      <div className="summary-item">
        <span>Remaining Budget:</span>{" "}
        <strong style={{ color: remainingBudget < 0 ? "red" : "green" }}>
          ${remainingBudget}
        </strong>
      </div>
    </div>
  );
};

export default ExpenseSummary;
