'use client';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabaseClient';

export default function Login() {
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });
    if (error) {
      console.error('Error signing in with Google:', error.message);
    } else {
      console.log('Google sign-in initiated!');
      // Handle post sign-in logic if needed
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Login to Chota CA</h1>
          <p className="text-gray-600 mt-2">Welcome back!</p>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={handleGoogleSignIn}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Sign In with Google
          </button>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => router.push('/dashboard')}
            className="text-blue-600 hover:text-blue-800"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}