'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabaseClient';

export default function FY2024Calculator() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/');
      }
    };
    checkAuth();
  }, [router]);

  const [salary, setSalary] = useState('');
  const [interest, setInterest] = useState('');
  const [rental, setRental] = useState('');
  const [digitalAssets, setDigitalAssets] = useState('');
  const [exemptAllowances, setExemptAllowances] = useState('');
  const [homeLoanSelfOccupied, setHomeLoanSelfOccupied] = useState('');
  const [homeLoanLetOut, setHomeLoanLetOut] = useState('');
  const [otherIncome, setOtherIncome] = useState('');
  const [section80c, setSection80c] = useState('');
  const [section80d, setSection80d] = useState('');
  const [section80e, setSection80e] = useState('');
  const [section80ccd, setSection80ccd] = useState('');
  const [section80tta, setSection80tta] = useState('');
  const [section80eea, setSection80eea] = useState('');
  const [additionalTaxSavingDeductions, setAdditionalTaxSavingDeductions] = useState(''); // New field
  const [standardDeduction, setStandardDeduction] = useState('50000'); // New field
  const [result, setResult] = useState('');

  const calculateTax = () => {
    // Income Details
    const salaryValue = parseFloat(salary) || 0;
    const interestValue = parseFloat(interest) || 0;
    const rentalValue = parseFloat(rental) || 0;
    const digitalAssetsValue = parseFloat(digitalAssets) || 0;
    const exemptAllowancesValue = parseFloat(exemptAllowances) || 0;
    const homeLoanSelfOccupiedValue = parseFloat(homeLoanSelfOccupied) || 0;
    const homeLoanLetOutValue = parseFloat(homeLoanLetOut) || 0;
    const otherIncomeValue = parseFloat(otherIncome) || 0;

    // Deductions
    const section80cValue = Math.min(parseFloat(section80c) || 0, 150000); // Max ₹1.5L
    const section80dValue = Math.min(parseFloat(section80d) || 0, 100000); // Max ₹1L
    const section80eValue = parseFloat(section80e) || 0; // No cap
    const section80ccdValue = Math.min(parseFloat(section80ccd) || 0, 50000); // Max ₹50K
    const section80ttaValue = Math.min(parseFloat(section80tta) || 0, 10000); // Max ₹10K
    const section80eeaValue = Math.min(parseFloat(section80eea) || 0, 75000); // Max ₹75K
    const additionalTaxSavingDeductionsValue = parseFloat(additionalTaxSavingDeductions) || 0; // New deduction
    const standardDeductionValue = parseFloat(standardDeduction) || 0; // Include standard deduction

    // Total Income Calculation
    const totalIncome =
      salaryValue +
      interestValue +
      rentalValue +
      digitalAssetsValue +
      otherIncomeValue -
      exemptAllowancesValue -
      homeLoanSelfOccupiedValue -
      homeLoanLetOutValue;

    // Total Deductions
    const totalDeductions =
      section80cValue +
      section80dValue +
      section80eValue +
      section80ccdValue +
      section80ttaValue +
      section80eeaValue +
      additionalTaxSavingDeductionsValue +
      standardDeductionValue; // Include standard deduction

    // Taxable Income
    let taxableIncome = totalIncome - totalDeductions;
    if (taxableIncome < 0) {
      taxableIncome = 0; // Ensure taxable income doesn't go negative
    }

    // Tax Calculation
    let tax = 0;
    if (taxableIncome <= 250000) {
      tax = 0;
    } else if (taxableIncome > 250000 && taxableIncome <= 500000) {
      tax = (taxableIncome - 250000) * 0.05;
    } else if (taxableIncome > 500000 && taxableIncome <= 1000000) {
      tax = 12500 + (taxableIncome - 500000) * 0.2;
    } else if (taxableIncome > 1000000) {
      tax = 112500 + (taxableIncome - 1000000) * 0.3;
    }

    // Cess is 4% of the calculated tax
    const cess = tax * 0.04;
    const finalTax = tax + cess;

    // Display Result
    setResult(`Your estimated tax is: ₹${finalTax.toLocaleString()}
                (Tax: ₹${tax.toLocaleString()}, Cess: ₹${cess.toLocaleString()})
                Total Income: ₹${totalIncome.toLocaleString()}
                Total Deductions: ₹${totalDeductions.toLocaleString()}
                Taxable Income: ₹${taxableIncome.toLocaleString()}`);
  };

  return (
    <div className="container">
      <h1>Income Tax Calculator for Age Group 0-60 (Old Regime - FY 2023-24)</h1>
      <div className="columns">
        {/* Income Details */}
        <div className="column">
          <h2 className="subheading">Income Details</h2>
          <label htmlFor="salary">Income from Salary (₹):</label>
          <input type="text" id="salary" pattern="[0-9]*" value={salary} onChange={(e) => setSalary(e.target.value)} />
          <label htmlFor="interest">Income from Interest (₹):</label>
          <input type="text" id="interest" pattern="[0-9]*" value={interest} onChange={(e) => setInterest(e.target.value)} />
          <label htmlFor="rental">Rental Income Received (₹):</label>
          <input type="text" id="rental" pattern="[0-9]*" value={rental} onChange={(e) => setRental(e.target.value)} />
          <label htmlFor="digitalAssets">Income from Digital Assets (₹):</label>
          <input type="text" id="digitalAssets" pattern="[0-9]*" value={digitalAssets} onChange={(e) => setDigitalAssets(e.target.value)} />
          <label htmlFor="exemptAllowances">Exempt Allowances (₹):</label>
          <input type="text" id="exemptAllowances" pattern="[0-9]*" value={exemptAllowances} onChange={(e) => setExemptAllowances(e.target.value)} />
          <label htmlFor="homeLoanSelfOccupied">Interest on Home Loan - Self Occupied (₹):</label>
          <input type="text" id="homeLoanSelfOccupied" pattern="[0-9]*" value={homeLoanSelfOccupied} onChange={(e) => setHomeLoanSelfOccupied(e.target.value)} />
          <label htmlFor="homeLoanLetOut">Interest on Home Loan - Let Out (₹):</label>
          <input type="text" id="homeLoanLetOut" pattern="[0-9]*" value={homeLoanLetOut} onChange={(e) => setHomeLoanLetOut(e.target.value)} />
          <label htmlFor="otherIncome">Other Income (₹):</label>
          <input type="text" id="otherIncome" pattern="[0-9]*" value={otherIncome} onChange={(e) => setOtherIncome(e.target.value)} />
        </div>

        {/* Deductions */}
        <div className="column">
          <h2 className="subheading">Deductions</h2>
          <label htmlFor="standardDeduction">Standard Deduction (₹50,000 for Salaried Individuals and Pensioners):</label>
          <input type="text" id="standardDeduction" pattern="[0-9]*" value={standardDeduction} onChange={(e) => setStandardDeduction(e.target.value)} />
          <label htmlFor="section80c">Basic Deductions - 80C (Max ₹1.5L):</label>
          <input type="text" id="section80c" pattern="[0-9]*" value={section80c} onChange={(e) => setSection80c(e.target.value)} />
          <label htmlFor="section80d">Medical Insurance - 80D (Max ₹1L):</label>
          <input type="text" id="section80d" pattern="[0-9]*" value={section80d} onChange={(e) => setSection80d(e.target.value)} />
          <label htmlFor="section80e">Interest on Educational Loan - 80E:</label>
          <input type="text" id="section80e" pattern="[0-9]*" value={section80e} onChange={(e) => setSection80e(e.target.value)} />
          <label htmlFor="section80ccd">Employee&apos;s Contribution to NPS - 80CCD (Max ₹50K):</label>
          <input type="text" id="section80ccd" pattern="[0-9]*" value={section80ccd} onChange={(e) => setSection80ccd(e.target.value)} />
          <label htmlFor="section80tta">Interest from Deposits - 80TTA (Max ₹10K):</label>
          <input type="text" id="section80tta" pattern="[0-9]*" value={section80tta} onChange={(e) => setSection80tta(e.target.value)} />
          <label htmlFor="section80eea">Interest on Housing Loan - 80EEA (Max ₹75K):</label>
          <input type="text" id="section80eea" pattern="[0-9]*" value={section80eea} onChange={(e) => setSection80eea(e.target.value)} />
          <label htmlFor="additionalTaxSavingDeductions">Additional Tax Saving Deductions (80G, 80GGA, 10(14)):</label>
          <input type="text" id="additionalTaxSavingDeductions" pattern="[0-9]*" value={additionalTaxSavingDeductions} onChange={(e) => setAdditionalTaxSavingDeductions(e.target.value)} />
          
        </div>
      </div>
      <button onClick={calculateTax}>Calculate Tax</button>
      <div className="result">{result}</div>
      <button
        style={{ marginTop: '10px', width: '100%' }}
        onClick={() => {
          // Prepare Income Details HTML
          const incomeDetails = `
            <h3>Income Details</h3>
            <ul>
              <li>Salary: ₹${salary || 0}</li>
              <li>Interest: ₹${interest || 0}</li>
              <li>Rental: ₹${rental || 0}</li>
              <li>Digital Assets: ₹${digitalAssets || 0}</li>
              <li>Exempt Allowances: ₹${exemptAllowances || 0}</li>
              <li>Home Loan (Self Occupied): ₹${homeLoanSelfOccupied || 0}</li>
              <li>Home Loan (Let Out): ₹${homeLoanLetOut || 0}</li>
              <li>Other Income: ₹${otherIncome || 0}</li>
            </ul>
          `;

          // Prepare Deductions HTML
          const deductions = `
            <h3>Deductions</h3>
            <ul>
              <li>Standard Deduction: ₹${standardDeduction || 0}</li>
              <li>Section 80C: ₹${section80c || 0}</li>
              <li>Section 80D: ₹${section80d || 0}</li>
              <li>Section 80E: ₹${section80e || 0}</li>
              <li>Section 80CCD: ₹${section80ccd || 0}</li>
              <li>Section 80TTA: ₹${section80tta || 0}</li>
              <li>Section 80EEA: ₹${section80eea || 0}</li>
              <li>Additional Tax Saving Deductions: ₹${additionalTaxSavingDeductions || 0}</li>
            </ul>
          `;

          // Prepare Word-compatible HTML
          const htmlContent = `
            <html xmlns:o="urn:schemas-microsoft-com:office:office"
                  xmlns:w="urn:schemas-microsoft-com:office:word"
                  xmlns="http://www.w3.org/TR/REC-html40">
            <head>
              <meta charset="utf-8">
              <title>Tax Summary</title>
            </head>
            <body>
              <h2>Tax Calculation Summary (FY 2023-24)</h2>
              ${incomeDetails}
              ${deductions}
              <h3>Summary</h3>
              <pre style="font-size:16px">${result}</pre>
            </body>
            </html>
          `;

          // Use TextEncoder for UTF-8 encoding
          const encoder = new TextEncoder();
          const encodedHtml = encoder.encode('\ufeff' + htmlContent);

          const blob = new Blob([encodedHtml], { type: 'application/msword' });
          const url = URL.createObjectURL(blob);

          const link = document.createElement('a');
          link.href = url;
          link.download = 'Tax_Summary_FY2023-24.doc';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          setTimeout(() => URL.revokeObjectURL(url), 1000);
        }}
        disabled={!result}
      >
        Download Summary (Word)
      </button>
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
            font-size: 24px;
            color: #333;
            margin-bottom: 20px;
            text-align: center;
        }
        .subheading {
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