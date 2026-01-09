// app/components/ProtectedRoute.js
'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token'); // check login
    console.log(token)
    if (!token) {
      router.replace('/'); // redirect if not logged in
    } else {
      setIsAllowed(true); // allow rendering
    }
  }, [router]);

  if (!isAllowed) return <p>Loading...</p>; // optional loading state

  return children;
}
