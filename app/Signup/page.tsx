'use client'
import axios from "axios";
import { useRouter } from "next/navigation";
export default function Signup() {
  const router = useRouter();
  const handleSignup = () => {
    axios.post('http://localhost:4000/Signup')
  .then(response => {
    if(response.data === true){
      router.push("/login")
    }
  })
  .catch(error => {
    console.error(error);
  });
  }
  return (
    <div className="bg-gray-200 min-h-screen flex justify-center items-center p-5">
      <div className="bg-white w-full max-w-[450px] rounded-[10px] px-7.5 py-5 shadow-[0_4px_15px_rgba(0,0,0,0.2)]">
        <div className="rounded-[8px]">
          <h1 className="mt-7 pt-[10%] text-[40px] text-center">Create Your Account</h1>
          <form className="rounded-[5px] p-5">
            <label htmlFor="name" className="block mt-2">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Name"
              className="w-full block mt-2 mb-2 p-3 border border-gray-300 rounded text-base box-border"/>
            <label htmlFor="email" className="block mt-2">Email</label>
            <input
              type="text"
              id="email"
              placeholder="Email"
              className="w-full block mt-2 mb-2 p-3 border border-gray-300 rounded text-base box-border"/>
            <label htmlFor="password" className="block mt-2">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="w-full block mt-2 mb-2 p-3 border border-gray-300 rounded text-base box-border"/>
            <input
              type="password"
              id="confirm"
              placeholder="Confirm Password"
              className="w-full block mt-2 mb-2 p-3 border border-gray-300 rounded text-base box-border"/>
            <div className="flex items-center mt-2 mb-2">
              <input type="checkbox" id="term" className="mr-2" />
              <label htmlFor="term" className="text-base">I agree to the Terms and Conditions.</label>
            </div>
            <button onClick={handleSignup}
              type="button"
              className="w-full py-3 text-lg text-white bg-blue-700 rounded hover:bg-green-600 mt-3 mb-2">
              Sign up
            </button>
            <button
              type="button"
              className="w-full mt-2 mb-2 text-lg text-center bg-none border-none cursor-pointer">
              Already have an account? Log in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}