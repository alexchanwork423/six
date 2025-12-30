export default function Album() {
  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-start p-5">
      <div className="bg-white w-full max-w-[1200px] rounded-[10px] shadow-lg">
        <header className="flex items-center justify-between h-16 px-5 border-b border-gray-400">
          <div className="flex items-center gap-[60px]">
            <div className="logo" />
            <div className="font-semibold">Album</div>
          </div>
          <div className="flex-1 max-w-[480px] mx-6">
            <input
              type="text"
              placeholder="Search"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="flex items-center gap-[80px]">
            <button className="px-3.5 py-1.5 border border-gray-300 rounded-lg cursor-pointer">
              Upload
            </button>
            <div className="flex items-center gap-2">
              <img
                src="/10256349.png"
                alt="user"
                className="w-8 h-8 rounded-full"
              />
              <span>You</span>
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

