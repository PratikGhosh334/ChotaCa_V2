'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabaseClient';

export default function HRACalculator() {
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

  const [basicSalary, setBasicSalary] = useState('');
  const [hraReceived, setHraReceived] = useState('');
  const [rentPaid, setRentPaid] = useState('');
  const [cityType, setCityType] = useState('metro'); // Default to metro
  const [result, setResult] = useState('');
  const [taxableHRA, setTaxableHRA] = useState('');

  const calculateHRA = () => {
    const basic = parseFloat(basicSalary) || 0;
    const hra = parseFloat(hraReceived) || 0;
    const rent = parseFloat(rentPaid) || 0;

    // HRA exemption calculation
    const hraExempt = Math.min(
      hra,
      rent - (0.10 * basic), // Rent paid minus 10% of basic salary
      (cityType === 'metro' ? 0.50 : 0.40) * basic // 50% for metro cities, 40% for non-metro
    );

    // HRA chargeable to tax
    const chargeableHRA = hra - hraExempt;

    // Display Result
    setResult(`HRA Exempt: ₹${hraExempt.toLocaleString()}`);
    setTaxableHRA(`HRA Chargeable to Tax: ₹${chargeableHRA.toLocaleString()}`);
  };

  const downloadWordFile = () => {
    // Download Word file logic (2)
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
    const encoder2 = new TextEncoder();
    const encodedHtml2 = encoder2.encode('\ufeff' + htmlContent);
    const blob2 = new Blob([encodedHtml2], { type: 'application/msword' });
    const url2 = URL.createObjectURL(blob2);
    const link2 = document.createElement('a');
    link2.href = url2;
    link2.download = 'Tax_Summary_FY2024-25.doc';
    document.body.appendChild(link2);
    link2.click();
    document.body.removeChild(link2);
    setTimeout(() => URL.revokeObjectURL(url2), 1000);
  };

  return (
    <div className="container">
      <h1 className="text-3xl font-bold text-gray-800">HRA Calculator</h1>
      <div className="columns">
        <div className="column">
          <h2 className="text-2xl font-semibold text-gray-800 subheading">Input Details</h2>

          <label htmlFor="basicSalary">Basic Salary (₹):</label>
          <input type="text" id="basicSalary" pattern="[0-9]*" value={basicSalary} onChange={(e) => setBasicSalary(e.target.value)} />

          <label htmlFor="hraReceived">HRA Received (₹):</label>
          <input type="text" id="hraReceived" pattern="[0-9]*" value={hraReceived} onChange={(e) => setHraReceived(e.target.value)} />

          <label htmlFor="rentPaid">Rent Paid (₹):</label>
          <input type="text" id="rentPaid" pattern="[0-9]*" value={rentPaid} onChange={(e) => setRentPaid(e.target.value)} />

          <label htmlFor="cityType">City Type:</label>
          <select id="cityType" value={cityType} onChange={(e) => setCityType(e.target.value)}>
            <option value="metro">Metro</option>
            <option value="non-metro">Non-Metro</option>
          </select>
        </div>
      </div>
      <button onClick={calculateHRA}>Calculate HRA</button>
      <div className="result">{result}</div>
      <div className="result">{taxableHRA}</div>
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
        input[type="text"], select {
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