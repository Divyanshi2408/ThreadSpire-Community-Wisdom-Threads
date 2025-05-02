import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import {
  getCollections,
  addThreadToCollection,
  reactToThread,
} from "../services/api";

const ThreadCard = ({ thread }) => {
  const [collections, setCollections] = useState([]);
  const [reactions, setReactions] = useState({});
  const [userReaction, setUserReaction] = useState(null);

  const emojis = [
    { type: "brain", icon: "🧠" },
    { type: "fire", icon: "🔥" },
    { type: "heart", icon: "❤️" },
    { type: "rocket", icon: "🚀" },
    { type: "clap", icon: "👏" },
  ];

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const res = await getCollections();
        setCollections(res.data);
      } catch (err) {
        console.error("Error fetching collections:", err);
      }
    };

    fetchCollections();
    setReactions(thread.reactions || {});
    setUserReaction(thread.userReaction || null);
  }, [thread]);

  const handleAddToCollection = async (collectionId) => {
    try {
      await addThreadToCollection(collectionId, thread._id);
      alert("Thread added to collection!");
    } catch (err) {
      console.error("Add to collection failed:", err);
      alert("Failed to add thread to collection.");
    }
  };

  const handleReaction = async (reactionType) => {
    try {
      
      const res = await reactToThread(thread._id, reactionType);
      
      setReactions(res.data.reactions);
      setUserReaction(res.data.userReaction);
    } catch (err) {
      console.error("Reaction failed", err.response?.data || err.message);
      alert("Reaction failed");
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow mb-6">
      <h2 className="text-xl font-bold mb-2 capitalize">{thread.title}</h2>

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center rounded-full font-semibold">
          {thread?.author?.name?.[0]?.toUpperCase() || "U"}
        </div>

        <div className="text-sm text-gray-600">
          <p className="font-medium text-black">
            {thread.author?.name || "Anonymous"}
          </p>
          <p className="text-xs text-gray-400">
            {moment(thread.createdAt).fromNow()} • Thread Author •{" "}
            {thread.segments?.length || 0} Segments
          </p>
        </div>
      </div>

      <blockquote className="border-l-4 border-blue-600 pl-4 text-gray-700 italic">
        {thread.segments?.[0]?.content || "No content available."}
      </blockquote>

      {/* Reaction Buttons */}
      <div className="mt-4 flex gap-3">
        {emojis.map((emoji) => (
          <button
            key={emoji.type}
            onClick={() => handleReaction(emoji.type)}
            className={`text-xl transition-transform hover:scale-125 ${
              userReaction === emoji.type ? "opacity-100" : "opacity-50"
            }`}
          >
            {emoji.icon} {reactions?.[emoji.type] || 0}
          </button>
          
        ))}
      </div>

      {/* Add to Collection Dropdown */}
      <div className="mt-4">
        <label className="text-sm font-medium">Add to Collection:</label>
        <select
          onChange={(e) => handleAddToCollection(e.target.value)}
          className="ml-2 border rounded px-2 py-1"
          defaultValue=""
        >
          <option value="" disabled>
            Select Collection
          </option>
          {collections.map((collection) => (
            <option key={collection._id} value={collection._id}>
              {collection.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ThreadCard;
