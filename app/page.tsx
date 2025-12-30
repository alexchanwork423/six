export default function Album() {
  return (

    <div className="bg-gray-100 min-h-screen flex justify-center items-start p-5">
      <div className="bg-white w-full max-w-[1200px] rounded-[10px] shadow-lg">
            <header className="flex items-center justify-between h-16 px-5 border-b border-gray-400">
            <div className="flex items-center gap-3">
            <div className="logo transition-transform max-[350px]:hover:scale-110 max-[350px]:active:scale-110" />
            <div className="font-semibold transition-transform max-[350px]:hover:scale-110 max-[350px]:active:scale-110">
              Album
            </div>
        </div>
  <div className="flex-1 max-w-[480px] mx-6 ">
    <div className="relative">
      <svg
      className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
    <input
      type="text"
      placeholder="Search"
      className="hidden min-[600px]:block
        pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg
      " />
  </div>
  </div>
  <div className="flex items-center gap-3">
    <button
      className="flex items-center gap-3 
        px-3.5 py-1.5 border border-gray-300 rounded-lg cursor-pointer
      ">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 12V4m0 0l-4 4m4-4l4 4"
    />
  </svg>
      <span className="hidden min-[600px]:inline">Upload</span>
    </button>
    <div
      className="flex  items-center gap-3" >
      <img
        src="/10256349.png"
        alt="user"
        className="w-8 h-8 rounded-full"
      />
      <span className="hidden min-[600px]:inline">You</span>
    </div>
  </div>
</header>
        <div className="flex flex-wrap px-1">
          <div className="w-1/4 px-1 max-[800px]:w-1/2 max-[600px]:w-full">
            {[
              "/download (1).jpeg",
              "/download (2).jpeg",
              "/download (3).jpeg",
              "/download (4).jpeg",
              "/download (5).jpeg",
              "/download (7).jpeg",
              "/download.svg",
            ].map((src, i) => (
              <img key={i} src={src} alt="" className="mt-2 w-full" />
            ))}
          </div>
          <div className="w-1/4 px-1 max-[800px]:w-1/2 max-[600px]:w-full">
            {[
              "/download.jpeg",
              "/images (2).jpeg",
              "/img_5terre.jpg",
              "/images.jpeg",
              "/images (3).jpeg",
            ].map((src, i) => (
              <img key={i} src={src} alt="" className="mt-2 w-full" />
            ))}
          </div>
          <div className="w-1/4 px-1 max-[800px]:w-1/2 max-[600px]:w-full">
            {[
              "/img_forest.jpg",
              "/download (6).jpeg",
              "/images.jpeg",
              "/img_lights.jpg",
              "/img_mountains.jpg",
            ].map((src, i) => (
              <img key={i} src={src} alt="" className="mt-2 w-full" />
            ))}
          </div>
          <div className="w-1/4 px-1 max-[800px]:w-1/2 max-[600px]:w-full">
            {[
              "/download (7).jpeg",
              "/img_5terre.jpg",
              "/download (2).jpeg",
              "/images.jpeg",
            ].map((src, i) => (
              <img key={i} src={src} alt="" className="mt-2 w-full" />
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}




