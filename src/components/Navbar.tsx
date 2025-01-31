'use client';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div 
            className="text-2xl font-bold text-gray-800 cursor-pointer"
            onClick={() => router.push('/dashboard')}
          >
            Chota CA
          </div>
          <button
            onClick={() => router.push('/')}
            className="text-gray-600 hover:text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}