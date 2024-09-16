"use client";

import { useState } from "react";

interface ChapterFormProps {
  onSubmit: (data: { title: string; description: string; videoUrl: string; notebookUrl: string }) => void;
}

export const ChapterForm = ({ onSubmit }: ChapterFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [notebookUrl, setNotebookUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description, videoUrl, notebookUrl });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white shadow-md rounded-md">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Video URL</label>
        <input
          type="url"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          placeholder="https://example.com/video"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Notebook URL</label>
        <input
          type="url"
          value={notebookUrl}
          onChange={(e) => setNotebookUrl(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          placeholder="https://example.com/notebook"
        />
      </div>

      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
        Add Chapter
      </button>
    </form>
  );
};
