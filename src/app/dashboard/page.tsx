"use client";

import { useRouter } from 'next/navigation';
import TaxCard from '@/components/TaxCard';

export default function Dashboard() {
  const router = useRouter();

  const taxCalculators = [
    {
      title: 'FY 2024-25 Tax Calculator',
      description: 'Age Group: 0-60 years | New Tax Regime',
      path: '/calculator/fy2024',
      color: 'bg-emerald-500',
    },
    {
      title: 'FY 2023-24 Tax Calculator',
      description: 'Age Group: 0-60 years | Old Tax Regime',
      path: '/calculator/fy2023',
      color: 'bg-blue-500',
    },
  ];

  const additionalTaxSavingCalculators = [
    {
      title: 'Additional Tax Saving Deductions (80G, 80GGA, 10(14)) for FY 2024-25',
      description: 'Explore additional tax-saving options for FY 2024.',
      path: '/calculator/additional-tax-saving-deductions-fy2024',
      color: 'bg-yellow-500',
    },
    {
      title: 'Additional Tax Saving Deductions (80G, 80GGA, 10(14)) for FY 2023-24',
      description: 'Explore additional tax-saving options for FY 2023.',
      path: '/calculator/additional-tax-saving-deductions-fy2023',
      color: 'bg-orange-500',
    },
  ];

  // New Exemptions Allowances Section with HRA and LTA Calculators
  const exemptionsAllowances = [
    {
      title: 'HRA Calculator',
      description: 'Calculate your House Rent Allowance (HRA) exemptions.',
      path: '/calculator/hra-calculator',
      color: 'bg-purple-500',
    },
    {
      title: 'LTA Calculator',
      description: 'Calculate your Leave Travel Allowance (LTA) exemptions.',
      path: '/calculator/lta-calculator',
      color: 'bg-teal-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-2xl font-bold text-gray-800 cursor-pointer" onClick={() => router.push('/dashboard')}>
              Chota CA
            </h1>
            <div className="space-x-4">
              <button
                onClick={() => router.push('/auth/login')}
                className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition duration-200"
              >
                Login
              </button>
              <button
                onClick={() => router.push('/auth/register')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* First Section: Existing Tax Calculators */}
        <h2 className="text-xl font-bold text-gray-800 mb-4">Tax Calculators</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {taxCalculators.map((calculator, index) => (
            <TaxCard key={index} title={calculator.title} description={calculator.description} path={calculator.path} color={calculator.color} />
          ))}
        </div>

        {/* Divider */}
        <hr className="my-8 border-gray-300" />

        {/* Second Section: Additional Tax Saving Deductions */}
        <h2 className="text-xl font-bold text-gray-800 mb-4">Additional Tax Saving Deductions</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {additionalTaxSavingCalculators.map((calculator, index) => (
            <TaxCard key={index} title={calculator.title} description={calculator.description} path={calculator.path} color={calculator.color} />
          ))}
        </div>

        {/* Divider */}
        <hr className="my-8 border-gray-300" />

        {/* New Section: Exemptions Allowances */}
        <h2 className="text-xl font-bold text-gray-800 mb-4">Exemptions Allowances for FY 2023-24, Old Tax Regime!</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {exemptionsAllowances.map((calculator, index) => (
            <TaxCard key={index} title={calculator.title} description={calculator.description} path={calculator.path} color={calculator.color} />
          ))}
        </div>
      </main>
    </div>
  );
}