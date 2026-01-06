'use client'
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [message, setMessage] = useState('Verifying...');

  useEffect(() => {
    if (!token) return setMessage('No token provided');
    axios.get(`http://localhost:4000/auth/verify-email?token=${token}`)
      .then(res => setMessage(res.data.message))
      .catch(err => setMessage(err.response?.data?.message || 'Verification failed'));
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-xl text-center">
        <h1 className="text-2xl font-semibold mb-4">{message}</h1>
        <button
          onClick={() => router.push('/login')}
          className="mt-4 bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
}
