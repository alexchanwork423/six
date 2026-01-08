'use client'

import React, { useState, DragEvent } from "react";

interface UploadModalProps {
  onClose: () => void;
  onUploadSuccess: (url: string) => void; // pass the new Wasabi URL to Album
}

export default function UploadModal({ onClose, onUploadSuccess }: UploadModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false); // for highlighting the drop area
  const [preview, setPreview] = useState<string | null>(null); // optional image preview

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      generatePreview(selectedFile);
    }
  };

  // Generate preview
  const generatePreview = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  // Drag events
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      setFile(droppedFile);
      generatePreview(droppedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file!");

    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tags", tags);

    try {
      const res = await fetch("http://localhost:4000/images/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      const url = data.url;
      console.log(url);
      onUploadSuccess(url); // update Album images
      setUploading(false);
      onClose();
    } catch (err) {
      console.error(err);
      alert("Upload failed!");
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Upload Photo</h2>
          <button className="text-gray-400 hover:text-gray-600 text-xl" onClick={onClose}>×</button>
        </div>

        {/* Drag & Drop or File Input */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-6 text-center text-gray-500 mb-4 cursor-pointer
            ${dragOver ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white"}`}
        >
          <label className="cursor-pointer">
            {file ? file.name : "Drag & drop files here or click to upload"}
            <input type="file" className="hidden" onChange={handleFileChange} />
          </label>

          {/* Preview */}
          {preview && (
            <img
              src={preview}
              alt="preview"
              className="mt-4 mx-auto max-h-40 object-contain"
            />
          )}
        </div>

        {/* Form */}
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Title"
            className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Description"
            className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="text"
            placeholder="Tags"
            className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        {/* Action */}
        <div className="mt-6 flex justify-end gap-2">
          <button className="px-3 py-1 border rounded" onClick={onClose}>Cancel</button>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md"
            onClick={handleUpload}
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>
    </div>
  );
}
