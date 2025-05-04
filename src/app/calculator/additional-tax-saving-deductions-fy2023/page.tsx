'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabaseClient';

export default function AdditionalTaxSavingDeductionsFY2024() {
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

  const [section80ccc, setSection80ccc] = useState('');
  const [section80ccd1, setSection80ccd1] = useState('');
  const [section80ccd1b, setSection80ccd1b] = useState('');
  const [section80ccd2, setSection80ccd2] = useState('');
  const [section80dd, setSection80dd] = useState('');
  const [section80ddb, setSection80ddb] = useState('');
  const [section80eeb, setSection80eeb] = useState('');
  const [section80gg, setSection80gg] = useState('');
  const [section80gga, setSection80gga] = useState('');
  const [section80ggc, setSection80ggc] = useState('');
  const [section80ttb, setSection80ttb] = useState('');
  const [section80u, setSection80u] = useState('');
  const [section24b, setSection24b] = useState('');
  const [section80rrb, setSection80rrb] = useState('');
  const [section80qqb, setSection80qqb] = useState('');
  const [section80gb, setSection80gb] = useState('');
  const [section80la, setSection80la] = useState('');
  const [section80pa, setSection80pa] = useState('');
  const [section80iba, setSection80iba] = useState('');
  const [section10_14, setSection10_14] = useState('');
  const [section10_10d, setSection10_10d] = useState('');
  const [section80g, setSection80g] = useState(''); // New state for Section 80G
  const [result, setResult] = useState('');

  const calculateDeductions = () => {
    // Parse input values
    const deductions = [
      parseFloat(section80ccc) || 0,
      parseFloat(section80ccd1) || 0,
      parseFloat(section80ccd1b) || 0,
      parseFloat(section80ccd2) || 0,
      parseFloat(section80dd) || 0,
      parseFloat(section80ddb) || 0,
      parseFloat(section80eeb) || 0,
      parseFloat(section80gg) || 0,
      parseFloat(section80gga) || 0,
      parseFloat(section80ggc) || 0,
      parseFloat(section80ttb) || 0,
      parseFloat(section80u) || 0,
      parseFloat(section24b) || 0,
      parseFloat(section80rrb) || 0,
      parseFloat(section80qqb) || 0,
      parseFloat(section80gb) || 0,
      parseFloat(section80la) || 0,
      parseFloat(section80pa) || 0,
      parseFloat(section80iba) || 0,
      parseFloat(section10_14) || 0,
      parseFloat(section10_10d) || 0,
      parseFloat(section80g) || 0, // Include Section 80G in deductions
    ];

    // Calculate total deductions
    const totalDeductions = deductions.reduce((acc, curr) => acc + curr, 0);

    // Display Result
    setResult(`Total Deductions: ₹${totalDeductions.toLocaleString()}`);
  };

  const downloadWordFile = () => {
    // Download Word file logic (5)
    const htmlContent = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office"
            xmlns:w="urn:schemas-microsoft-com:office:word"
            xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta charset="utf-8">
        <title>Tax Summary</title>
      </head>
      <body>
        ...your content...
      </body>
      </html>
    `;
    const encoder5 = new TextEncoder();
    const encodedHtml5 = encoder5.encode('\ufeff' + htmlContent);
    const blob5 = new Blob([encodedHtml5], { type: 'application/msword' });
    const url5 = URL.createObjectURL(blob5);
    const link5 = document.createElement('a');
    link5.href = url5;
    link5.download = 'Tax_Summary_FY2024-25.doc';
    document.body.appendChild(link5);
    link5.click();
    document.body.removeChild(link5);
    setTimeout(() => URL.revokeObjectURL(url5), 1000);
  };

  return (
    <div className="container">
      <h1 className="text-3xl font-bold text-gray-800">Additional Tax Saving Deductions for FY 2024</h1>
      <div className="columns">
        <div className="column">
          <h2 className="text-2xl font-semibold text-gray-800 subheading">Deductions</h2>
          
          <label htmlFor="section80ccc">Section 80CCC:</label>
          <span className="text-sm text-gray-600">Deduction for Contributions to Pension Funds</span>
          <input type="text" id="section80ccc" pattern="[0-9]*" value={section80ccc} onChange={(e) => setSection80ccc(e.target.value)} />
          

          <label htmlFor="section80ccd1">80CCD(1):</label>
          <span className="text-sm text-gray-600">Deduction for Individual NPS Contributions</span>
          <input type="text" id="section80ccd1" pattern="[0-9]*" value={section80ccd1} onChange={(e) => setSection80ccd1(e.target.value)} />
         

          <label htmlFor="section80ccd1b">80CCD(1B):</label>
          <span className="text-sm text-gray-600">Additional Deduction for NPS Contributions</span>
          <input type="text" id="section80ccd1b" pattern="[0-9]*" value={section80ccd1b} onChange={(e) => setSection80ccd1b(e.target.value)} />
          

          <label htmlFor="section80ccd2">80CCD(2):</label>
          <span className="text-sm text-gray-600">Deduction for Employer NPS Contributions</span>
          <input type="text" id="section80ccd2" pattern="[0-9]*" value={section80ccd2} onChange={(e) => setSection80ccd2(e.target.value)} />
          

          <label htmlFor="section80dd">Section 80DD:</label>
          <span className="text-sm text-gray-600">Deduction for Medical Treatment of Dependent with Disability</span>
          <input type="text" id="section80dd" pattern="[0-9]*" value={section80dd} onChange={(e) => setSection80dd(e.target.value)} />
          

          <label htmlFor="section80ddb">Section 80DDB:</label>
          <span className="text-sm text-gray-600">Deduction for Medical Expenses for Specified Diseases</span>
          <input type="text" id="section80ddb" pattern="[0-9]*" value={section80ddb} onChange={(e) => setSection80ddb(e.target.value)} />
          

          <label htmlFor="section80eeb">Section 80EEB:</label>
          <span className="text-sm text-gray-600">Deduction for Electric Vehicle Loan Interest</span>
          <input type="text" id="section80eeb" pattern="[0-9]*" value={section80eeb} onChange={(e) => setSection80eeb(e.target.value)} />
          

          <label htmlFor="section80gg">Section 80GG:</label>
          <span className="text-sm text-gray-600">Deduction for House Rent Paid (Without HRA)</span>
          <input type="text" id="section80gg" pattern="[0-9]*" value={section80gg} onChange={(e) => setSection80gg(e.target.value)} />
          

          <label htmlFor="section80gga">Section 80GGA:</label>
          <span className="text-sm text-gray-600">Deduction for Donations to Scientific Research or Rural Development</span>
          <input type="text" id="section80gga" pattern="[0-9]*" value={section80gga} onChange={(e) => setSection80gga(e.target.value)} />
          

          <label htmlFor="section80g">Section 80G:</label> {/* New input for Section 80G */}
          <span className="text-sm text-gray-600">Donations to charity</span> {/* Inline explanation */}
          <input type="text" id="section80g" pattern="[0-9]*" value={section80g} onChange={(e) => setSection80g(e.target.value)} />
         

          <label htmlFor="section80ggc">Section 80GGC:</label>
          <span className="text-sm text-gray-600">Deduction for Contributions to Political Parties</span>
          <input type="text" id="section80ggc" pattern="[0-9]*" value={section80ggc} onChange={(e) => setSection80ggc(e.target.value)} />
          

          <label htmlFor="section80ttb">Section 80TTB:</label>
          <span className="text-sm text-gray-600">Deduction for Interest Income for Senior Citizens</span>
          <input type="text" id="section80ttb" pattern="[0-9]*" value={section80ttb} onChange={(e) => setSection80ttb(e.target.value)} />
          

          <label htmlFor="section80u">Section 80U:</label>
          <span className="text-sm text-gray-600">Deduction for Individuals with Disabilities</span>
          <input type="text" id="section80u" pattern="[0-9]*" value={section80u} onChange={(e) => setSection80u(e.target.value)} />
          

          <label htmlFor="section24b">Section 24(b):</label>
          <span className="text-sm text-gray-600">Deduction for Interest on Home Loans for Self-Occupied Properties</span>
          <input type="text" id="section24b" pattern="[0-9]*" value={section24b} onChange={(e) => setSection24b(e.target.value)} />
          

          <label htmlFor="section80rrb">Section 80RRB:</label>
          <span className="text-sm text-gray-600">Deduction up to ₹3 lakh for income from royalty on patents registered under the Patents Act, 1970</span>
          <input type="text" id="section80rrb" pattern="[0-9]*" value={section80rrb} onChange={(e) => setSection80rrb(e.target.value)} />
         

          <label htmlFor="section80qqb">Section 80QQB:</label>
          <span className="text-sm text-gray-600">Deduction up to ₹3 lakh for authors&apos; royalty income (excluding textbooks)</span>
          <input type="text" id="section80qqb" pattern="[0-9]*" value={section80qqb} onChange={(e) => setSection80qqb(e.target.value)} />
          

          <label htmlFor="section80gb">Section 80GGB:</label>
          <span className="text-sm text-gray-600">Deductions for contributions to political parties (80GGB for companies)</span>
          <input type="text" id="section80gb" pattern="[0-9]*" value={section80gb} onChange={(e) => setSection80gb(e.target.value)} />
          

          <label htmlFor="section80la">Section 80LA:</label>
          <span className="text-sm text-gray-600">Deduction for entities operating in Special Economic Zones (SEZs), subject to conditions</span>
          <input type="text" id="section80la" pattern="[0-9]*" value={section80la} onChange={(e) => setSection80la(e.target.value)} />
          

          <label htmlFor="section80pa">Section 80PA:</label>
          <span className="text-sm text-gray-600">Deduction for Producer Companies with turnover less than ₹100 crore, subject to conditions</span>
          <input type="text" id="section80pa" pattern="[0-9]*" value={section80pa} onChange={(e) => setSection80pa(e.target.value)} />
          

          <label htmlFor="section80iba">Section 80IBA:</label>
          <span className="text-sm text-gray-600">Deduction for profits from developing and building affordable housing projects</span>
          <input type="text" id="section80iba" pattern="[0-9]*" value={section80iba} onChange={(e) => setSection80iba(e.target.value)} />
          

          <label htmlFor="section10_14">Section 10(14):</label>
          <span className="text-sm text-gray-600">Special Allowances (Children Education Allowance, Hostel Expenditure Allowance, Transport Allowance)</span>
          <input type="text" id="section10_14" pattern="[0-9]*" value={section10_14} onChange={(e) => setSection10_14(e.target.value)} />
          

          <label htmlFor="section10_10d">Section 10(10D):</label>
          <span className="text-sm text-gray-600">Life Insurance Payouts Exemption</span>
          <input type="text" id="section10_10d" pattern="[0-9]*" value={section10_10d} onChange={(e) => setSection10_10d(e.target.value)} />
          
        </div>
      </div>
      <button onClick={calculateDeductions}>Calculate Deductions</button>
      <div className="result">{result}</div>
      <button onClick={downloadWordFile}>Download Word File</button>
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