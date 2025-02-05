import React, { useState, useEffect } from 'react';
import './BudgetSummary.css';

// Example of API placeholders for currency conversion and fetching budget data
const API_BASE = "https://api.example.com"; // Replace with your real API endpoint

const BudgetSummary = ({ budget, categories, totalDuration }) => {
  const [currencyData, setCurrencyData] = useState({
    selectedCurrency: 'USD',
    localCurrency: 'USD',
    currencies: [],
    conversionRates: {},
  });
  const [loading, setLoading] = useState(true);

  // Fetch currency conversion rates and data
  useEffect(() => {
    async function fetchCurrencyData() {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/currency-rates`);
        const data = await res.json();
        setCurrencyData({
          selectedCurrency: 'USD',  // Default, can be dynamically selected
          localCurrency: 'USD',     // Can change depending on the destination
          currencies: data.currencies,
          conversionRates: data.rates, // Assume the API returns conversion rates
        });
      } catch (error) {
        console.error('Error fetching currency data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchCurrencyData();
  }, []);

  // Calculate converted total in the selected currency
  const getConvertedAmount = (amount) => {
    return amount * currencyData.conversionRates[currencyData.selectedCurrency] || amount;
  };

  return (
    <div className="budget-summary">
      <h1>Travel Budget Summary</h1>

      {/* Loading Indicator */}
      {loading && <div className="loading">Loading...</div>}

      {/* Total Budget Overview */}
      <section className="overview">
        <h2>Total Budget</h2>
        <p>
          <strong>{currencyData.selectedCurrency} {getConvertedAmount(budget.total).toFixed(2)}</strong> 
          <span>(Converted: {currencyData.localCurrency} {budget.total.toFixed(2)})</span>
        </p>
        <div className="progress-bar">
          <span>{Math.round((budget.spent / budget.total) * 100)}% spent</span>
          <div className="progress" style={{ width: `${(budget.spent / budget.total) * 100}%` }}></div>
        </div>
      </section>

      {/* Categories Breakdown */}
      <section className="category-breakdown">
        <h2>Expense Breakdown</h2>
        {categories.map((category) => (
          <div className="category" key={category.name}>
            <h3>{category.name}</h3>
            <p>Estimated Cost: {currencyData.selectedCurrency} {getConvertedAmount(category.estimated).toFixed(2)}</p>
            <p>Percentage of Total: {Math.round((category.estimated / budget.total) * 100)}%</p>
          </div>
        ))}
      </section>

      {/* Currency Conversion */}
      <section className="currency-conversion">
        <h2>Currency Conversion</h2>
        <table>
          <thead>
            <tr>
              <th>Currency</th>
              <th>Converted Amount</th>
              <th>Rate</th>
            </tr>
          </thead>
          <tbody>
            {currencyData.currencies.map((currency) => (
              <tr key={currency.code}>
                <td>{currency.name}</td>
                <td>{currency.code} {getConvertedAmount(budget.total).toFixed(2)}</td>
                <td>{currencyData.conversionRates[currency.code] || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Daily Budget */}
      <section className="daily-budget">
        <h2>Daily Budget</h2>
        <p>Estimated Daily Budget: {currencyData.selectedCurrency} {(budget.total / totalDuration).toFixed(2)}</p>
      </section>

      {/* Save and Share Options */}
      <section className="export-options">
        <button onClick={() => console.log('Export PDF/Excel feature coming soon!')}>Export Budget</button>
        <button onClick={() => console.log('Sharing feature coming soon!')}>Share Plan</button>
      </section>
    </div>
  );
};

export default BudgetSummary;
