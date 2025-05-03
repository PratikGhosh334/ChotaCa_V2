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

  // Income Details
  const [salary, setSalary] = useState('');
  const [interest, setInterest] = useState('');
  const [rental, setRental] = useState('');
  const [digitalAssets, setDigitalAssets] = useState('');
  const [homeLoanSelfOccupied, setHomeLoanSelfOccupied] = useState('');
  const [homeLoanLetOut, setHomeLoanLetOut] = useState('');
  const [otherIncome, setOtherIncome] = useState('');

  // Deductions
  const [standardDeduction, setStandardDeduction] = useState('75000'); // Default ₹75,000
  const [employerNPSContribution, setEmployerNPSContribution] = useState('');
  const [additionalEmployeeCost, setAdditionalEmployeeCost] = useState('');
  const [transportAllowance, setTransportAllowance] = useState('');
  const [agniveerCorpusFund, setAgniveerCorpusFund] = useState('');
  const [familyPensionDeduction, setFamilyPensionDeduction] = useState('');
  const [gratuityExemption, setGratuityExemption] = useState('');
  const [leaveEncashment, setLeaveEncashment] = useState('');
  const [additionalTaxSavingDeductions, setAdditionalTaxSavingDeductions] = useState('');

  const [result, setResult] = useState('');

  const calculateTax = () => {
    // Income Details
    const salaryValue = parseFloat(salary) || 0;
    const interestValue = parseFloat(interest) || 0;
    const rentalValue = parseFloat(rental) || 0;
    const digitalAssetsValue = parseFloat(digitalAssets) || 0;
    const homeLoanSelfOccupiedValue = parseFloat(homeLoanSelfOccupied) || 0;
    const homeLoanLetOutValue = parseFloat(homeLoanLetOut) || 0;
    const otherIncomeValue = parseFloat(otherIncome) || 0;

    // Deductions
    const standardDeductionValue = parseFloat(standardDeduction) || 0; // Standard Deduction: ₹75,000
    const employerNPSContributionValue = Math.min(parseFloat(employerNPSContribution) || 0, 75000); // Max ₹75,000
    const additionalEmployeeCostValue = parseFloat(additionalEmployeeCost) || 0; // Deduction for Additional Employee Cost
    const transportAllowanceValue = parseFloat(transportAllowance) || 0; // Transport Allowance for Differently-Abled
    const agniveerCorpusFundValue = parseFloat(agniveerCorpusFund) || 0; // Deduction for Agniveer Corpus Fund
    const familyPensionDeductionValue = parseFloat(familyPensionDeduction) || 0; // Family Pension Deduction
    const gratuityExemptionValue = parseFloat(gratuityExemption) || 0; // Gratuity Exemption
    const leaveEncashmentValue = parseFloat(leaveEncashment) || 0; // Leave Encashment Exemption
    const additionalTaxSavingDeductionsValue = parseFloat(additionalTaxSavingDeductions) || 0; // Additional Tax Saving Deductions

    // Total Income Calculation
    const totalIncome =
      salaryValue +
      interestValue +
      rentalValue +
      digitalAssetsValue +
      otherIncomeValue -
      homeLoanSelfOccupiedValue -
      homeLoanLetOutValue;

    // Total Deductions
    const totalDeductions =
      standardDeductionValue +
      employerNPSContributionValue +
      additionalEmployeeCostValue +
      transportAllowanceValue +
      agniveerCorpusFundValue +
      familyPensionDeductionValue +
      gratuityExemptionValue +
      leaveEncashmentValue +
      additionalTaxSavingDeductionsValue;

    // Taxable Income
    let taxableIncome = totalIncome - totalDeductions;
    if (taxableIncome < 0) {
      taxableIncome = 0; // Ensure taxable income doesn't go negative
    }

    // Tax Calculation (New Tax Regime Slabs)
    let tax = 0;
    if (taxableIncome <= 300000) {
      tax = 0;
    } else if (taxableIncome > 300000 && taxableIncome <= 600000) {
      tax = (taxableIncome - 300000) * 0.05;
    } else if (taxableIncome > 600000 && taxableIncome <= 900000) {
      tax = 15000 + (taxableIncome - 600000) * 0.1;
    } else if (taxableIncome > 900000 && taxableIncome <= 1200000) {
      tax = 45000 + (taxableIncome - 900000) * 0.15;
    } else if (taxableIncome > 1200000 && taxableIncome <= 1500000) {
      tax = 90000 + (taxableIncome - 1200000) * 0.2;
    } else if (taxableIncome > 1500000) {
      tax = 150000 + (taxableIncome - 1500000) * 0.3;
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
      <h1>Income Tax Calculator for Age Group 0-60 (New Regime - FY 2024-25)</h1>
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
          {/* Removed Exempt Allowances Field */}
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
          <label htmlFor="standardDeduction">Standard Deduction (₹75,000 for Salaried Individuals and Pensioners):</label>
          <input type="text" id="standardDeduction" pattern="[0-9]*" value={standardDeduction} onChange={(e) => setStandardDeduction(e.target.value)} />
          <label htmlFor="employerNPSContribution">Employer&apos;s Contribution to NPS (Section 80CCD(2)) (Max ₹75K):</label>
          <input type="text" id="employerNPSContribution" pattern="[0-9]*" value={employerNPSContribution} onChange={(e) => setEmployerNPSContribution(e.target.value)} />
          <label htmlFor="additionalEmployeeCost">Deduction for Additional Employee Cost (Section 80JJAA):</label>
          <input type="text" id="additionalEmployeeCost" pattern="[0-9]*" value={additionalEmployeeCost} onChange={(e) => setAdditionalEmployeeCost(e.target.value)} />
          <label htmlFor="transportAllowance">Transport Allowance for Differently-Abled Individuals:</label>
          <input type="text" id="transportAllowance" pattern="[0-9]*" value={transportAllowance} onChange={(e) => setTransportAllowance(e.target.value)} />
          <label htmlFor="agniveerCorpusFund">Deduction for Agniveer Corpus Fund (Section 80CCH(2)):</label>
          <input type="text" id="agniveerCorpusFund" pattern="[0-9]*" value={agniveerCorpusFund} onChange={(e) => setAgniveerCorpusFund(e.target.value)} />
          <label htmlFor="familyPensionDeduction">Family Pension Deduction:</label>
          <input type="text" id="familyPensionDeduction" pattern="[0-9]*" value={familyPensionDeduction} onChange={(e) => setFamilyPensionDeduction(e.target.value)} />
          <label htmlFor="gratuityExemption">Gratuity Exemption (Up to ₹20 Lakh for Private Sector, Fully Exempt for Government Employees):</label>
          <input type="text" id="gratuityExemption" pattern="[0-9]*" value={gratuityExemption} onChange={(e) => setGratuityExemption(e.target.value)} />
          <label htmlFor="leaveEncashment">Leave Encashment for Private Sector Retirees (Up to ₹25 Lakh):</label>
          <input type="text" id="leaveEncashment" pattern="[0-9]*" value={leaveEncashment} onChange={(e) => setLeaveEncashment(e.target.value)} />
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
              <li>Employer's NPS Contribution: ₹${employerNPSContribution || 0}</li>
              <li>Additional Employee Cost: ₹${additionalEmployeeCost || 0}</li>
              <li>Transport Allowance: ₹${transportAllowance || 0}</li>
              <li>Agniveer Corpus Fund: ₹${agniveerCorpusFund || 0}</li>
              <li>Family Pension Deduction: ₹${familyPensionDeduction || 0}</li>
              <li>Gratuity Exemption: ₹${gratuityExemption || 0}</li>
              <li>Leave Encashment: ₹${leaveEncashment || 0}</li>
              <li>Additional Tax Saving Deductions: ₹${additionalTaxSavingDeductions || 0}</li>
            </ul>
          `;

          // Prepare Word-compatible HTML
          const htmlContent = `
            <html xmlns:o="urn:schemas-microsoft-com:office:office"
                  xmlns:w="urn:schemas-microsoft-com:office:word"
                  xmlns="http://www.w3.org/TR/REC-html40">
            <head><meta charset="utf-8"></head><body>
              <h2>Tax Calculation Summary (FY 2023-24)</h2>
              ${incomeDetails}
              ${deductions}
              <h3>Summary</h3>
              <pre style="font-size:16px">${result}</pre>
            </body></html>
          `;
          const blob = new Blob(['\ufeff', htmlContent], {
            type: 'application/msword'
          });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'Tax_Summary_FY2024-25.doc';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
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