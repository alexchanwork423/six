'use client'
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
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
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      
      {/* Card */}
      <div className="w-full max-w-md rounded-2xl bg-white p-10 text-center shadow-xl">
      <div className="mb-4 flex justify-center">
          <Image
            src="/pngtree-check-mark-icon-design-template-vector-isolated-png-image_711429.jpg"
            alt="Email verified"
            width={240}
            height={240}
          
          />
        </div>
      <div className="bg-white p-8  text-center">
        <h1 className="mb-4 text-4xl font-semibold text-gray-800">
          Email Verified
        </h1>
        <p className="mb-8 text-base text-gray-600">
          Your email has been successfully verified.
        </p>
        <button
          onClick={() => router.push('/')}
          className="mt-4 bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
        >
          Go to Login
        </button>
      </div>
    </div>
    </div>
  );
}
