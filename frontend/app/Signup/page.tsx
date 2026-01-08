'use client';

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsChecked, setTermsChecked] = useState(false);

  const handleSignup = async () => {
  if (!termsChecked) return alert('You must agree to terms');
  if (password !== confirmPassword) return alert('Passwords do not match');

  try {
    const res = await axios.post('http://localhost:4000/auth/signup', { name, email, password });
    alert(res.data.message); // "Check your email to verify your account"
    router.push('/verifying');
  } catch (err) {
  console.error(err);

  if (err instanceof Error) {
    alert(err.message); // ✅ Works safely
  } else {
    alert('Signup failed'); // fallback for unknown type
  }
}

};

  return (
    <div className="bg-gray-200 min-h-screen flex justify-center items-center p-5">
      <div className="bg-white w-full max-w-[450px] rounded-[10px] px-7.5 py-5 shadow-[0_4px_15px_rgba(0,0,0,0.2)]">
        <h1 className="mt-7 pt-[10%] text-[40px] text-center">Create Your Account</h1>

        {/* Form */}
        <form
          className="rounded-[5px] p-5"
          onSubmit={async (e) => {
            e.preventDefault(); // prevent infinite reload
            await handleSignup();
          }}
        >
          {/* Name */}
          <label htmlFor="name" className="block mt-2">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full block mt-2 mb-2 p-3 border border-gray-300 rounded text-base"
        
          />

          {/* Email */}
          <label htmlFor="email" className="block mt-2">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full block mt-2 mb-2 p-3 border border-gray-300 rounded text-base"
            required
          />

          {/* Password */}
          <label htmlFor="password" className="block mt-2">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full block mt-2 mb-2 p-3 border border-gray-300 rounded text-base"
            required
          />

          {/* Confirm Password */}
          <label htmlFor="confirm" className="block mt-2">Confirm Password</label>
          <input
            type="password"
            id="confirm"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full block mt-2 mb-2 p-3 border border-gray-300 rounded text-base"
            required
          />

          {/* Terms */}
          <div className="flex items-center mt-2 mb-2">
            <input
              type="checkbox"
              id="term"
              className="mr-2"
              checked={termsChecked}
              onChange={(e) => setTermsChecked(e.target.checked)}
            />
            <label htmlFor="term" className="text-base">
              I agree to the Terms and Conditions.
            </label>
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full py-3 text-lg text-white bg-blue-700 rounded hover:bg-green-600 mt-3 mb-2"
          >
            Sign up
          </button>

          {/* Login redirect */}
          <button
            type="button"
            onClick={() => router.push("/")}
            className="w-full mt-2 mb-2 text-lg text-blue-600 hover:underline"
          >
            Already have an account? Log in
          </button>
        </form>
      </div>
    </div>
  );
}
