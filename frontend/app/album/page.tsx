'use client';

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import UploadModal from "@/components/UploadModal";
import ImageDetailModal from "@/components/ImageDetailModal";

interface ImageItem {
  id: number;
  title: string;
  description: string;
  tags: string;
  url: string;
}

export default function Album() {
  const [allImages, setAllImages] = useState<ImageItem[]>([]);
  const [filteredImages, setFilteredImages] = useState<ImageItem[]>([]);
  const [images, setImages] = useState<ImageItem[]>([]);
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [showUpload, setShowUpload] = useState(false);

  const loader = useRef<HTMLDivElement | null>(null);
  const isLoading = useRef(false);
  const perPage = 24;

  async function fetchImages(pageMultiplier = 1) {
    const res = await fetch("http://localhost:4000/images");

    if (!res.ok) {
      console.error(await res.text());
      return;
    }

    const data: ImageItem[] = await res.json();
    setAllImages(data);
    setFilteredImages(data);
    setImages(data.slice(0, pageMultiplier * perPage));
  }

  useEffect(() => {
    fetchImages().catch(console.error);
  }, []);

  // SEARCH
  useEffect(() => {
    const q = search.toLowerCase();
    const result = allImages.filter((img) =>
      img.title.toLowerCase().includes(q) ||
      img.description.toLowerCase().includes(q) ||
      img.tags.toLowerCase().includes(q)
    );

    setFilteredImages(result);
    setPage(1);
    setImages(result.slice(0, perPage));
  }, [search, allImages]);

  // PAGINATION
  useEffect(() => {
    setImages(filteredImages.slice(0, page * perPage));
    isLoading.current = false;
  }, [page, filteredImages]);

  // INFINITE SCROLL
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          images.length < filteredImages.length &&
          !isLoading.current
        ) {
          isLoading.current = true;
          setPage((p) => p + 1);
        }
      },
      { rootMargin: "100px" }
    );

    if (loader.current) observer.observe(loader.current);
    return () => observer.disconnect();
  }, [images, filteredImages]);

  return (
    <div className="bg-gray-100 min-h-screen p-5 flex justify-center">
      <div className="bg-white w-full max-w-[1200px] rounded shadow">

        {/* HEADER */}
        <header className="flex items-center justify-between h-16 px-5 border-b">
          <div className="font-semibold">Album</div>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="hidden min-[600px]:block w-full max-w-[400px] px-3 py-2 border rounded"
          />

          <div className="flex gap-3">
            <button
              onClick={() => setShowUpload(true)}
              className="px-3 py-1.5 border rounded"
            >
              Upload
            </button>
          
              <img src="/10256349.png" className="w-8 h-8 rounded-full" />
    
          </div>
        </header>

        {/* GRID */}
        <div className="flex flex-wrap px-1">
          {Array.from({ length: 4 }).map((_, col) => (
            <div
              key={col}
              className="w-1/4 px-1 max-[800px]:w-1/2 max-[600px]:w-full"
            >
              {images
                .filter((_, i) => i % 4 === col)
                .map((img) => (
                  <img
                    key={img.id}
                    src={img.url}
                    className="mt-2 w-full rounded cursor-pointer"
                    onClick={() => setSelectedImage(img)}
                  />
                ))}
            </div>
          ))}
        </div>

        <div ref={loader} className="py-5 text-center text-gray-500">
          {images.length < filteredImages.length
            ? "Loading more..."
            : "No more images"}
        </div>
      </div>

      {showUpload && (
        <UploadModal
          onClose={() => setShowUpload(false)}
          onUploadSuccess={() => fetchImages(page)}
        />
      )}

      {selectedImage && (
        <ImageDetailModal
          images={images}                              // full array of images
          currentIndex={images.findIndex(img => img.id === selectedImage.id)} // index of selected
          onClose={() => setSelectedImage(null)}
          onUpdated={() => fetchImages(page)}
        />
      )}
    </div>
  );
}
