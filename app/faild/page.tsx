export default function Page() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white w-[420px] rounded-xl shadow-xl p-8 text-center">
        
        {/* Icon */}
        <div className="flex justify-center pt-6 pb-4">
          <img
            src="/download.svg"
            alt="Verification failed"
            className="w-36 h-36 object-contain"
          />
        </div>

        {/* Title */}
        <h1 className="text-4xl font-semibold text-gray-800 mb-6">
          Verification Failed.
        </h1>

        {/* Message */}
        <p className="text-gray-600 text-xl mb-10">
          The link is invalid or has expired.
        </p>

        {/* Action Button */}
        <button
          className="w-full border border-gray-300 text-gray-800 text-xl py-3 rounded-lg hover:bg-gray-100 transition"
        >
          Resend Verification Email
        </button>
      </div>
    </div>
  );
}