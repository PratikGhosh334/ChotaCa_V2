'use client';
import { useRouter } from 'next/navigation';

interface TaxCardProps {
  title: string;
  description: string;
  path: string;
  color: string;
}

export default function TaxCard({ title, description, path, color }: TaxCardProps) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(path)}
      className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transform transition duration-200 hover:scale-105"
    >
      <div className={`${color} h-2`} />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <p className="mt-2 text-gray-600">{description}</p>
        <div className="mt-4 flex items-center text-blue-600">
          <span>Calculate Now</span>
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
}