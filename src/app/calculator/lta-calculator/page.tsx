'use client';
import { useState } from 'react';

export default function LTACalculator() {
  const [actualLTA, setActualLTA] = useState('');
  const [eligibleExpenses, setEligibleExpenses] = useState('');
  const [exemptLTA, setExemptLTA] = useState('');
  const [taxableLTA, setTaxableLTA] = useState('');

  const calculateLTA = () => {
    const ltaReceived = parseFloat(actualLTA) || 0;
    const expensesIncurred = parseFloat(eligibleExpenses) || 0;

    // Calculate exempt LTA
    const exemptAmount = Math.min(ltaReceived, expensesIncurred);
    setExemptLTA(`Exempt LTA: ₹${exemptAmount.toLocaleString()}`);

    // Calculate taxable LTA
    const taxableAmount = ltaReceived - exemptAmount;
    setTaxableLTA(`Taxable LTA: ₹${taxableAmount.toLocaleString()}`);
  };

  return (
    <div className="container">
      <h1 className="text-3xl font-bold text-gray-800">LTA Calculator</h1>
      <div className="columns">
        <div className="column">
          <h2 className="text-2xl font-semibold text-gray-800 subheading">Input Details</h2>

          <label htmlFor="actualLTA">Actual LTA Received (₹):</label>
          <input
            type="number"
            id="actualLTA"
            value={actualLTA}
            onChange={(e) => setActualLTA(e.target.value)}
            placeholder="Enter actual LTA received"
            min="0"
            required
          />

          <label htmlFor="eligibleExpenses">Eligible Travel Expenses Incurred (₹):</label>
          <input
            type="number"
            id="eligibleExpenses"
            value={eligibleExpenses}
            onChange={(e) => setEligibleExpenses(e.target.value)}
            placeholder="Enter eligible travel expenses"
            min="0"
            required
          />
        </div>
      </div>
      <button onClick={calculateLTA}>Calculate LTA</button>
      <div className="result">{exemptLTA}</div>
      <div className="result">{taxableLTA}</div>
      <style jsx>{`
        .container {
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            width: 90%;
            max-width: 1200px;
            overflow: hidden;
            margin: 0 auto;
        }
        h1 {
            font-size: 28px; /* Increased font size for visibility */
            color: #333;
            margin-bottom: 20px;
            text-align: center;
        }
        .subheading {
            font-size: 24px; /* Increased font size for visibility */
            color: #333;
            margin-top: 20px;
            margin-bottom: 10px;
        }
        .columns {
            display: flex;
            gap: 20px;
            margin-bottom: 20px;
        }
        .column {
            flex: 1;
            display: flex;
            flex-direction: column;
        }
        label {
            display: block;
            margin-bottom: 8px;
            font-weight: bold;
            color: #333;
        }
        input[type="number"] {
            width: 100%;
            padding: 8px;
            margin-bottom: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            color: #333;
        }
        button {
            width: 100%;
            padding: 10px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
        }
        button:hover {
            background-color: #0056b3;
        }
        .result {
            margin-top: 20px;
            font-size: 18px;
            color: #555;
            text-align: center;
        }
      `}</style>
    </div>
  );
}