'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabaseClient';
import { User } from '@supabase/supabase-js';

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);

      // Listen for auth state changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
        setUser(session?.user || null);
      });

      return () => {
        subscription.unsubscribe();
      };
    };
    fetchSession();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/'); // Redirect to home after sign out
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div 
            className="font-extrabold bg-gradient-to-r from-blue-700 via-purple-500 to-yellow-400 bg-clip-text text-transparent cursor-pointer
                        text-2xl sm:text-2xl md:text-3xl lg:text-4xl whitespace-nowrap transition-all duration-200"
            onClick={() => router.push('/dashboard')}
          >
            Chota CA
          </div>
          {user ? (
            <button
              onClick={handleSignOut}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Sign Out
            </button>
          ) : (
            <button
              onClick={() => router.push('/auth/login')}
              className="bg-blue-600 text-white px-6 py-2 rounded-full shadow-lg text-lg font-medium hover:bg-blue-700 transition"
            >
              Sign In to Use
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}