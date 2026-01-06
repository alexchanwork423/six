'use client';

import { useEffect, useState } from "react";

interface ImageItem {
  id: number;
  title: string;
  description: string;
  tags: string;
  url: string;
}

interface Props {
  image: ImageItem;
  onClose: () => void;
  onUpdated: () => void;
}

export default function ImageDetailModal({
  image,
  onClose,
  onUpdated,
}: Props) {
  const [title, setTitle] = useState(image.title);
  const [description, setDescription] = useState(image.description);
  const [tags, setTags] = useState(image.tags);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // trigger slide animation
    setOpen(true);
  }, []);

  async function handleUpdate() {
    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:4000/images/${image.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, description, tags }),
        }
      );

      if (!res.ok) throw new Error("Update failed");

      onUpdated();
      handleClose();
    } catch (err) {
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!confirm("Delete this image?")) return;

    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:4000/images/${image.id}`,
        { method: "DELETE" }
      );

      if (!res.ok) throw new Error("Delete failed");

      onUpdated();
      handleClose();
    } catch (err) {
      alert("Delete failed");
    } finally {
      setLoading(false);
    }
  }
  function handleDownload() {
  const link = document.createElement("a");
  link.href = image.url;
  link.download = `${image.title || "image"}.jpg`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}


  function handleClose() {
    setOpen(false);
    setTimeout(onClose, 300); // wait for animation
  }

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/60"
        onClick={handleClose}
      />

      {/* slide panel */}
      <div
        className={`relative ml-auto h-full w-full max-w-4xl bg-black text-white
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* header */}
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <button
            onClick={handleClose}
            className="text-white text-xl"
          >
            ✕
          </button>
        </div>

        <div className="flex h-full">
          {/* image section */}
          <div className="flex-1 bg-black flex items-center justify-center">
            <img
              src={image.url}
              alt={image.title}
              className="max-h-full max-w-full object-contain"
            />
          </div>

          {/* detail section */}
          <div className="w-[380px] bg-zinc-900 p-4 overflow-y-auto">
            <h2 className="text-lg font-semibold mb-2">
              Image Details
            </h2>

            <label className="text-sm text-gray-400">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 p-2 rounded mb-3"
            />

            <label className="text-sm text-gray-400">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 p-2 rounded mb-3"
              rows={4}
            />

            <label className="text-sm text-gray-400">Tags</label>
            <input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 p-2 rounded mb-6"
            />

            <div className="flex justify-between">
              <button
                onClick={handleDelete}
                disabled={loading}
                className="bg-red-600 px-4 py-2 rounded text-white"
              >
                Delete
              </button>
              <button
                onClick={handleDownload}
                className="bg-zinc-700 hover:bg-zinc-600 px-4 py-2 rounded text-white"
              >
                Download
              </button>

              <button
                onClick={handleUpdate}
                disabled={loading}
                className="bg-blue-600 px-4 py-2 rounded text-white"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
