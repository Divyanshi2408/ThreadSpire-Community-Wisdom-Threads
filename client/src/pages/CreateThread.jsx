import React, { useState } from "react";
import { createThread, getThreads } from "../services/api";

const CreateThread = ({ setThreads }) => {
  const [title, setTitle] = useState("");
  const [segments, setSegments] = useState([""]);
  const [tags, setTags] = useState("");

  const addSegment = () => setSegments([...segments, ""]);

  const updateSegment = (i, val) => {
    const newSegs = [...segments];
    newSegs[i] = val;
    setSegments(newSegs);
  };

  const handleSubmit = async () => {
    await createThread({
      title,
      segments,
      tags: tags.split(",")
    });
    setTitle("");
    setTags("");
    setSegments([""]);
    const res = await getThreads();
    setThreads(res.data);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow mb-8">
      <h2 className="text-xl font-semibold mb-4">Create a Wisdom Thread</h2>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full border p-2 rounded mb-2"
      />
      {segments.map((seg, i) => (
        <textarea
          key={i}
          value={seg}
          onChange={(e) => updateSegment(i, e.target.value)}
          placeholder={`Segment ${i + 1}`}
          className="w-full border p-2 rounded mb-2"
        />
      ))}
      <button
        onClick={addSegment}
        className="text-sm text-blue-500 hover:underline mb-2"
      >
        + Add another segment
      </button>
      <input
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="Tags (comma separated)"
        className="w-full border p-2 rounded mb-4"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Publish Thread
      </button>
    </div>
  );
};

export default CreateThread;
