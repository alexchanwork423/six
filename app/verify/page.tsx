export default function page() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white w-[420px] rounded-xl shadow-xl p-8 text-center">
        
        {/* Check Icon */}
        <div className="flex justify-center mb-6">
          <img
            src="/pngtree-check-mark-icon-design-template-vector-isolated-png-image_711429.jpg"
            alt="Email verified"
            className="w-60 h-60 object-contain"
          />
        </div>

        {/* Title */}
        <h1 className="text-4xl font-semibold mb-4">
          Email Verified
        </h1>

        {/* Description */}
        <p className="text-gray-600 text-lg mb-8">
          Your email has been successfully verified.
        </p>

        {/* Button */}
        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xl py-4 rounded-lg transition"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}