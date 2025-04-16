"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { UserCircle, Mail, Key, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface UserProfile {
  name: string;
  email: string;
}

export default function AccountPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile>({
    name: 'John Doe',
    email: 'john@example.com',
  });

  const handleDeleteAccount = () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      router.push('/');
    }
  };

  return (
    <div className="flex h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Link 
              href="/notes"
              className="p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 transition-colors"
            >
              <ChevronLeft size={20} />
            </Link>
            <h1 className="text-xl font-medium text-neutral-800 dark:text-white">
              Account Settings
            </h1>
          </div>

          {/* Profile Section */}
          <div className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-sm">
            <div className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center">
                  <UserCircle className="w-6 h-6 text-neutral-400 dark:text-neutral-500" />
                </div>
                <div>
                  <h2 className="text-base font-medium text-neutral-800 dark:text-white">
                    {profile.name}
                  </h2>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    {profile.email}
                  </p>
                </div>
              </div>

              {/* Profile Form */}
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="w-full px-3 py-1.5 text-sm rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                    <UserCircle className="absolute right-3 top-2 w-4 h-4 text-neutral-400 dark:text-neutral-500" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="w-full px-3 py-1.5 text-sm rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                    <Mail className="absolute right-3 top-2 w-4 h-4 text-neutral-400 dark:text-neutral-500" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-3 py-1.5 text-sm rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                    <Key className="absolute right-3 top-2 w-4 h-4 text-neutral-400 dark:text-neutral-500" />
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-5 flex gap-2">
                <button className="flex-1 px-4 py-1.5 text-sm bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors">
                  Save Changes
                </button>
                <button 
                  onClick={handleDeleteAccount}
                  className="px-4 py-1.5 text-sm border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 font-medium rounded-lg transition-colors"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 