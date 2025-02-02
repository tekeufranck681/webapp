import React from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";


const ExpenseChart = ({ expenses }) => {
  if (!expenses.length) return null; // Hide chart if no expenses

  const data = {
    labels: expenses.map((expense) => expense.category),
    datasets: [
      {
        data: expenses.map((expense) => expense.amount),
        backgroundColor: ["#008000", "#ffcc00", "#ff6600", "#ff0000"],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="expense-chart">
    <h2 className="expense-title">Expense Breakdown</h2>
   <span><Pie data={data} /></span> 
  </div>
  );
};

export default ExpenseChart;

