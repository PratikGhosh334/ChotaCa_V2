'use client';
import { useState } from 'react';

export default function AdditionalTaxSavingDeductionsFY2024() {
  const [section80g, setSection80g] = useState(''); // Deduction for Donations to Charitable Institutions
  const [section80gga, setSection80gga] = useState(''); // Deduction for Donations to Scientific Research or Rural Development
  const [section80ggc, setSection80ggc] = useState(''); // Deduction for Contributions to Political Parties
  const [section10_14, setSection10_14] = useState(''); // Special Allowances
  const [section10_10d, setSection10_10d] = useState(''); // Life Insurance Payouts
  const [result, setResult] = useState('');

  const calculateDeductions = () => {
    // Parse input values
    const deductions = [
      parseFloat(section80g) || 0, // Donations to Charitable Institutions
      parseFloat(section80gga) || 0, // Donations to Scientific Research or Rural Development
      parseFloat(section80ggc) || 0, // Contributions to Political Parties
      parseFloat(section10_14) || 0, // Special Allowances
      parseFloat(section10_10d) || 0, // Life Insurance Payouts
    ];

    // Calculate total deductions
    const totalDeductions = deductions.reduce((acc, curr) => acc + curr, 0);

    // Display Result
    setResult(`Total Deductions: ₹${totalDeductions.toLocaleString()}`);
  };

  return (
    <div className="container">
      <h1 className="text-3xl font-bold text-gray-800">Additional Tax Saving Deductions for FY 2024</h1>
      <div className="columns">
        <div className="column">
          <h2 className="text-2xl font-semibold text-gray-800 subheading">Deductions</h2>
          
          <label htmlFor="section80g">Section 80G:</label>
          <span className="text-sm text-gray-600">Deduction for Donations to Charitable Institutions (subject to limits)</span>
          <input type="text" id="section80g" pattern="[0-9]*" value={section80g} onChange={(e) => setSection80g(e.target.value)} />

          <label htmlFor="section80gga">Section 80GGA:</label>
          <span className="text-sm text-gray-600">Deduction for Donations to Scientific Research or Rural Development</span>
          <input type="text" id="section80gga" pattern="[0-9]*" value={section80gga} onChange={(e) => setSection80gga(e.target.value)} />

          <label htmlFor="section80ggc">Section 80GGC:</label>
          <span className="text-sm text-gray-600">Deduction for Contributions to Political Parties</span>
          <input type="text" id="section80ggc" pattern="[0-9]*" value={section80ggc} onChange={(e) => setSection80ggc(e.target.value)} />

          <label htmlFor="section10_14">Section 10(14):</label>
          <span className="text-sm text-gray-600">Special Allowances: Exemptions for specific allowances (Children Education Allowance, Hostel Expenditure Allowance, Transport Allowance) only if used for official purposes (limited and conditions apply).</span>
          <input type="text" id="section10_14" pattern="[0-9]*" value={section10_14} onChange={(e) => setSection10_14(e.target.value)} />

          <label htmlFor="section10_10d">Section 10(10D):</label>
          <span className="text-sm text-gray-600">Life Insurance Payouts: Exemption on sums received under life insurance policies (including bonus), subject to conditions.</span>
          <input type="text" id="section10_10d" pattern="[0-9]*" value={section10_10d} onChange={(e) => setSection10_10d(e.target.value)} />
        </div>
      </div>
      <button onClick={calculateDeductions}>Calculate Deductions</button>
      <div className="result">{result}</div>
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
        input[type="text"] {
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