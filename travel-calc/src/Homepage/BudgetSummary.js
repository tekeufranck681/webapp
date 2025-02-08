import React, { useState } from 'react';
import './BudgetSummary.css';

const BudgetSummary = ({ budget, categories, totalDuration }) => {
  // Simulated currency data (no API call)
  const [currency, setCurrency] = useState('USD');
  const conversionRates = { USD: 1, EUR: 0.92, GBP: 0.78, XAF: 600 };

  // Convert amount based on selected currency
  const getConvertedAmount = (amount) => (amount * conversionRates[currency]).toFixed(2);

  // Handle button clicks
  const handleExport = () => alert('Export feature coming soon!');
  const handleShare = () => alert('Sharing feature coming soon!');

  return (
    <div className="budget-summary">
      <h1>Travel Budget Summary</h1>

      {/* Total Budget Overview */}
      <section className="overview">
        <h2>Total Budget</h2>
        <p>
          <strong>{currency} {getConvertedAmount(budget.total)}</strong> 
          <span> (Original: USD {budget.total.toFixed(2)})</span>
        </p>
        <div className="progress-container">
          <div className="progress" style={{ width: `${(budget.spent / budget.total) * 100}%` }}></div>
        </div>
        <p>{Math.round((budget.spent / budget.total) * 100)}% spent</p>
      </section>

      {/* Categories Breakdown */}
      <section className="category-breakdown">
        <h2>Expense Breakdown</h2>
        {categories.map((category) => (
          <div className="category" key={category.name}>
            <h3>{category.name}</h3>
            <p>Estimated Cost: {currency} {getConvertedAmount(category.estimated)}</p>
            <p>Percentage of Total: {Math.round((category.estimated / budget.total) * 100)}%</p>
          </div>
        ))}
      </section>

      {/* Currency Selection */}
      <section className="currency-selection">
        <h2>Select Currency</h2>
        <select onChange={(e) => setCurrency(e.target.value)} value={currency}>
          <option value="USD">USD - US Dollar</option>
          <option value="EUR">EUR - Euro</option>
          <option value="GBP">GBP - British Pound</option>
          <option value="XAF">XAF - CFA Franc</option>
        </select>
      </section>

      {/* Daily Budget */}
      <section className="daily-budget">
        <h2>Daily Budget</h2>
        <p>Estimated Daily Budget: {currency} {(budget.total / totalDuration).toFixed(2)}</p>
      </section>

      {/* Save and Share Options */}
      <section className="export-options">
        <button onClick={handleExport}>Export Budget</button>
        <button onClick={handleShare}>Share Plan</button>
      </section>
    </div>
  );
};

export default BudgetSummary;

