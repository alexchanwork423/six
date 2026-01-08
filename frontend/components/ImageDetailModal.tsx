'use client';

import { useEffect, useState } from "react";

export interface ImageItem {
  id: number;
  title: string;
  description: string;
  tags: string;
  url: string;
}

interface Props {
  images: ImageItem[];
  currentIndex: number;
  onClose: () => void;
  onUpdated?: () => void;
}

export default function ImageDetailModal({
  images,
  currentIndex,
  onClose,
  onUpdated,
}: Props) {
  if (!images || images.length === 0 || currentIndex < 0 || currentIndex >= images.length) {
    return null;
  }

  const [index, setIndex] = useState(currentIndex);
  const [image, setImage] = useState<ImageItem>(images[currentIndex]);

  const [title, setTitle] = useState(image.title);
  const [description, setDescription] = useState(image.description);
  const [tags, setTags] = useState(image.tags);

  const [original, setOriginal] = useState({
    title: image.title,
    description: image.description,
    tags: image.tags,
  });

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(true), []);

  useEffect(() => {
    const img = images[index];
    setImage(img);

    setTitle(img.title);
    setDescription(img.description);
    setTags(img.tags);

    setOriginal({
      title: img.title,
      description: img.description,
      tags: img.tags,
    });
  }, [index, images]);

  const handleClose = () => {
    setOpen(false);
    setTimeout(onClose, 200);
  };

  const prevImage = () => setIndex(i => (i === 0 ? images.length - 1 : i - 1));
  const nextImage = () => setIndex(i => (i === images.length - 1 ? 0 : i + 1));

  const isChanged =
    title !== original.title ||
    description !== original.description ||
    tags !== original.tags;

  const handleUpdate = async () => {
    if (!isChanged) return;

    try {
      setLoading(true);
      const res = await fetch(`http://localhost:4000/images/${image.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, tags }),
      });

      if (!res.ok) throw new Error("Update failed");

      onUpdated?.();
      alert("Updated successfully!");
    } catch {
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this image?")) return;

    try {
      setLoading(true);
      const res = await fetch(`http://localhost:4000/images/${image.id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      onUpdated?.();
      handleClose();
    } catch {
      alert("Delete failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ FORCE DOWNLOAD (browser default Downloads folder)
  const handleDownload = async () => {
    try {
      const response = await fetch(image.url);
      const blob = await response.blob();

      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = blobUrl;
      link.download = `${image.title || "image"}.jpg`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(blobUrl);
    } catch {
      alert("Download failed");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70" onClick={handleClose} />

      <div
        className={`relative bg-black text-white flex transition-transform duration-300
        ${open ? "scale-100" : "scale-95"} w-[95%] max-w-7xl h-[90%] rounded-xl overflow-hidden`}
      >
        <button
          className="absolute top-4 right-4 text-white text-2xl z-10"
          onClick={handleClose}
        >
          ✕
        </button>

        <button
          className="absolute left-2 top-1/2 -translate-y-1/2 text-white text-3xl px-2 py-1 z-10 hover:bg-black/50 rounded"
          onClick={prevImage}
        >
          ‹
        </button>

        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-3xl px-2 py-1 z-10 hover:bg-black/50 rounded"
          onClick={nextImage}
        >
          ›
        </button>

        <div className="flex-1 flex items-center justify-center bg-black p-2">
          <img
            src={image.url}
            alt={image.title}
            className="h-full w-full object-contain rounded"
          />
        </div>

        <div className="w-[280px] bg-zinc-900 p-4 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-3">Image Details</h2>

            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 p-2 rounded mb-2"
            />

            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 p-2 rounded mb-2"
              rows={3}
            />

            <input
              value={tags}
              onChange={e => setTags(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 p-2 rounded"
            />
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <button
              onClick={handleUpdate}
              disabled={loading || !isChanged}
              className={`px-4 py-2 rounded text-white
              ${isChanged ? "bg-blue-600 hover:bg-blue-700" : "bg-zinc-600 cursor-not-allowed"}`}
            >
              Update
            </button>

            <button
              onClick={handleDelete}
              disabled={loading}
              className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
            >
              Delete
            </button>

            <button
              onClick={handleDownload}
              className="bg-zinc-700 px-4 py-2 rounded hover:bg-zinc-600"
            >
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
