'use client';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f8fafc] to-[#e0e7ef]">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6 bg-white shadow-md">
        <div
          className="font-extrabold text-2xl sm:text-2xl md:text-3xl lg:text-4xl whitespace-nowrap transition-all duration-200 bg-gradient-to-r from-blue-700 via-purple-500 to-yellow-400 bg-clip-text text-transparent"
          style={{ fontFamily: "'Poppins', 'Montserrat', 'Inter', sans-serif" }}
        >
          Chota CA
        </div>
        <button
          onClick={() => router.push('/auth/login')}
          className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-6 py-2 rounded-full shadow-lg text-lg font-medium hover:from-blue-700 hover:to-blue-500 transition"
        >
          Sign In to Use
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <div
          className="text-6xl font-extrabold mb-6 drop-shadow-lg bg-gradient-to-r from-blue-700 via-purple-500 to-yellow-400 bg-clip-text text-transparent"
          style={{ fontFamily: "'Poppins', 'Montserrat', 'Inter', sans-serif" }}
        >
          Chota CA
        </div>
        <h1
          className="text-4xl font-extrabold text-gray-900 mb-4"
          style={{ fontFamily: "'Poppins', 'Montserrat', 'Inter', sans-serif" }}
        >
          Your Trusted Tax Assistant
        </h1>
        <p className="text-xl text-gray-700 mb-8 max-w-2xl">
          Calculate your taxes, maximize deductions, and plan your finances with confidence.<br />
          <span className="font-semibold text-blue-700">Chota CA</span> is simple, secure, and always free.
        </p>
        <ul className="mb-10 text-lg text-gray-800 max-w-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          <li className="bg-white rounded-xl shadow p-4 border-l-4 border-blue-500">✔️ FY 2024-25 & 2023-24 Tax Calculators</li>
          <li className="bg-white rounded-xl shadow p-4 border-l-4 border-yellow-500">✔️ Additional Tax Saving Deductions</li>
          <li className="bg-white rounded-xl shadow p-4 border-l-4 border-purple-500">✔️ HRA & LTA Exemption Calculators</li>
          <li className="bg-white rounded-xl shadow p-4 border-l-4 border-green-500">✔️ Secure, Private, and Always Free</li>
        </ul>
        <button
          onClick={() => router.push('/auth/login')}
          className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-10 py-4 rounded-full shadow-xl text-2xl font-semibold hover:from-blue-700 hover:to-blue-500 transition"
          style={{ fontFamily: "'Poppins', 'Montserrat', 'Inter', sans-serif" }}
        >
          Sign In for Free &rarr;
        </button>
        <p className="mt-4 text-gray-500 text-sm">No credit card required. Start using Chota CA instantly!</p>
      </main>

      {/* Footer */}
      <footer className="bg-white text-gray-500 text-center py-4 shadow-inner mt-8">
        &copy; {new Date().getFullYear()} Chota CA. All rights reserved.
      </footer>
    </div>
  );
}