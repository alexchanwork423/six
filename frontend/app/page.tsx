'use client'
import { useState, useEffect } from 'react'
import axios from "axios";
import { useRouter } from "next/navigation";


export default function Login() {
  
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
  try {
    const res = await axios.post('http://localhost:4000/auth/login', { email, password });

    if (res.data.success) {
      // Only store token or user info if login was successful
      localStorage.setItem('token', JSON.stringify(res.data.token));
      alert('Authenticated ✅');
      router.push('/album');
    } else {
      alert(`Authentication failed ❌\n${res.data.message}`);
    }

  } catch (error) {
    console.error(error);
    alert('Server error ❌');
  }
};


  return (
    <div className="bg-gray-200 min-h-screen flex justify-center items-center p-4">
      <div className="bg-white w-full max-w-md rounded-lg p-8 shadow-lg">
        <h1 className="text-4xl font-bold text-center text-gray-800">
          Welcome Back
        </h1>

        <p className="mt-2 text-center text-gray-600 text-base">
          Log in to your account.
        </p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mt-6 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mt-4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={handleLogin}
          className="w-full mt-6 py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition"
        >
          Log in
        </button>

        <div className="relative my-6 flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-2 text-gray-500">Or continue with</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <button
          className="w-full py-3 border border-gray-400 rounded-md hover:bg-gray-100 transition"
          onClick={() =>
            window.location.href = 'http://localhost:4000/auth/google'
          }
        >
          Continue with Google
        </button>

        <p className="mt-6 text-center text-gray-600 text-sm">
          Don&apos;t have an account?{" "}
          <button
            onClick={() => router.push("/Signup")}
            className="text-blue-600 hover:underline"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}
