"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabaseClient';
import { useRouter } from 'next/navigation';
import TaxCard from '@/components/TaxCard';
import { User } from '@supabase/supabase-js';
import Navbar from '@/components/Navbar';

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);

      // Subscribe to auth state changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
        setUser(session?.user || null);
      });

      return () => {
        subscription.unsubscribe();
      };
    };

    fetchSession();
  }, []);

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
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
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
    </>
  );
}