'use client'
export default function Page() {
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center">
      {/* Modal */}
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Upload Photo</h2>
          <button className="text-gray-400 hover:text-gray-600 text-xl">
            ×
          </button>
        </div>

        {/* Drag & Drop Area */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center text-gray-500 mb-4">
          Drag & drop files here or{" "}
          <span className="text-blue-500 cursor-pointer">
            click to upload
          </span>
        </div>

        {/* Form */}
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Title"
            className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="text"
            placeholder="Description"
            className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="text"
            placeholder="Tags"
            className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Progress */}
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-1">
            Uploading: 75%
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full w-3/4" />
          </div>
        </div>

        {/* Action */}
        <div className="mt-6 flex justify-end">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-sm">
            Upload
          </button>
        </div>

      </div>
    </main>
  )
}
