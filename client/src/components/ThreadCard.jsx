import React from "react";

const ThreadCard = ({ thread }) => (
  <div className="bg-white rounded-2xl shadow p-4 mb-4">
    <h2 className="text-xl font-bold mb-2">{thread.title}</h2>
    <p className="text-gray-600 mb-2">{thread.segments.slice(0, 2).join(" ")}</p>
    <div className="flex flex-wrap gap-2 mb-2">
      {thread.tags.map((tag, i) => (
        <span
          key={i}
          className="text-sm bg-gray-100 text-gray-800 px-2 py-1 rounded"
        >
          #{tag}
        </span>
      ))}
    </div>
    <p className="text-sm text-gray-500">Reactions: {thread.reactions.length}</p>
  </div>
);

export default ThreadCard;
