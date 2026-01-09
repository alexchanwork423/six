'use client';

import { useEffect, useRef, useState } from "react";
import UploadModal from "@/components/UploadModal";
import ImageDetailModal from "@/components/ImageDetailModal";
import ProtectedRoute from '@/components/ProtectedRoute';

interface ImageItem {
  id: number;
  title: string;
  description: string;
  tags: string;
  url: string;
}

export default function Album() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [showUpload, setShowUpload] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [hasMore, setHasMore] = useState(true); // flag to know if more pages exist


  const loader = useRef<HTMLDivElement | null>(null);
  const isLoading = useRef(false);
  const perPage = 24;

  // ===============================123
  // FETCH IMAGES BY PAGE
  // ===============================
  async function fetchImages(pageNum: number, append = false) {
    try {
      isLoading.current = true;
      const res = await fetch(`http://localhost:4000/images?page=${pageNum}&limit=${perPage}`);
      if (!res.ok) {
        console.error(await res.text());
        return;
      }

      const data: ImageItem[] = await res.json();

      if (append) {
        // Append next page
        setImages(prev => [...prev, ...data]);
      } else {
        // Initial load or search reset
        setImages(data);
      }

      // If we received less than perPage, there are no more pages
      setHasMore(data.length === perPage);
    } catch (err) {
      console.error(err);
    } finally {
      isLoading.current = false;
    }
  }

  // ===============================
  // INITIAL LOAD
  // ===============================
  useEffect(() => {
    fetchImages(1);
  }, []);

  // ===============================
  // SEARCH FUNCTIONALITY
  // ===============================
  useEffect(() => {
    const q = search.toLowerCase();

    // Filter the currently loaded images
    const filtered = images.filter(
      img =>
        img.title.toLowerCase().includes(q) ||
        img.description.toLowerCase().includes(q) ||
        img.tags.toLowerCase().includes(q)
    );

    setImages(filtered);
    setPage(1);
    setHasMore(false); // disable infinite scroll when searching
  }, [search]);

  // ===============================
  // INFINITE SCROLL OBSERVER
  // ===============================
  useEffect(() => {
    if (!loader.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];

        if (first.isIntersecting && hasMore && !isLoading.current) {
          setPage(prev => prev + 1);
        }
      },
      { rootMargin: "100px" }
    );

    observer.observe(loader.current);

    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, [hasMore]);

  // ===============================
  // FETCH NEXT PAGE WHEN PAGE CHANGES
  // ===============================
  useEffect(() => {
    if (page === 1) return; // initial load already fetched
    fetchImages(page, true);
  }, [page]);

  // ===============================
  // LOGOUT HANDLER
  // ===============================
  function handleLogout() {
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  return (
    <ProtectedRoute>
      <div className="bg-gray-100 min-h-screen p-5 flex justify-center">
        <div className="bg-white w-full max-w-[1200px] rounded shadow">

          {/* HEADER */}
          <header className="flex items-center justify-between h-16 px-5 border-b">
            <div className="font-semibold text-lg">Album</div>

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="hidden min-[600px]:block w-full max-w-[400px] px-3 py-2 border rounded"
            />

            <div className="flex gap-3 items-center">
              <button
                onClick={() => setShowUpload(true)}
                className="px-3 py-1.5 mx-10 border rounded hover:bg-gray-100"
              >
                Upload
              </button>

              <div className="relative">
                <img
                  src="/10256349.png"
                  className="w-8 h-8 rounded-full cursor-pointer"
                  onClick={() => setShowLogout(prev => !prev)}
                />

                {showLogout && (
                  <button
                    onClick={handleLogout}
                    className="absolute top-full mt-2 right-0 px-4 py-1 bg-white border rounded shadow text-sm hover:bg-gray-100 whitespace-nowrap"
                  >
                    Log out
                  </button>
                )}
              </div>
            </div>
          </header>

          {/* IMAGE GRID */}
          <div className="flex flex-wrap px-1">
            {Array.from({ length: 4 }).map((_, col) => (
              <div
                key={col}
                className="w-1/4 px-1 max-[800px]:w-1/2 max-[600px]:w-full"
              >
                {images
                  .filter((_, i) => i % 4 === col)
                  .map((img, idx) => (
                    <img
                      key={`${img.id}-${idx}`} // unique key
                      src={img.url}
                      className="mt-2 w-full rounded cursor-pointer hover:scale-105 transition-transform"
                      onClick={() => setSelectedImage(img)}
                    />
                  ))}
              </div>
            ))}
          </div>

          {/* LOADER */}
          <div ref={loader} className="py-5 text-center text-gray-500">
            {hasMore ? "Loading..." : "No more images"}
          </div>
        </div>

        {/* UPLOAD MODAL */}
        {showUpload && (
          <UploadModal
            onClose={() => setShowUpload(false)}
            onUploadSuccess={() => {
              setPage(1);
              fetchImages(1);
            }}
          />
        )}

        {/* IMAGE DETAIL MODAL */}
        {selectedImage && (
          <ImageDetailModal
            images={images}
            currentIndex={images.findIndex(img => img.id === selectedImage.id)}
            onClose={() => setSelectedImage(null)}
            onUpdated={() => {
              setPage(1);
              fetchImages(1);
            }}
          />
        )}
      </div>
    </ProtectedRoute>
  );
}
