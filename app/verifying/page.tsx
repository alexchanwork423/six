export default function Page() {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="w-[350px] h-[200px] bg-white rounded-lg shadow-xl flex flex-col items-center justify-center">
        {/* Loader */}
        <div className="w-12 h-12 rounded-full border-4 border-gray-300 border-t-blue-500 animate-spin mb-5"></div>

        {/* Text */}
        <p className="text-gray-600 text-base">
          Verifying your email...
        </p>
      </div>
    </div>
  );
}