import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import {
  getCollections,
  addThreadToCollection,
  reactToThread,
} from "../services/api";

const TrendingThreadCard = ({ thread, index }) => {
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
    <div className="bg-[#FFFDF9] border border-[#E5C07B] rounded-2xl p-6 shadow-sm mb-6">
      <div className="text-sm text-[#D97706] font-semibold mb-2">
        🔥 Trending #{index + 1}
      </div>

      <h2 className="text-xl font-bold text-[#2C1D0E] mb-2 capitalize">
        {thread.title}
      </h2>

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-[#7F5539] text-white flex items-center justify-center rounded-full font-semibold">
          {thread?.author?.name?.[0]?.toUpperCase() || "U"}
        </div>

        <div className="text-sm text-[#5E4B3C]">
          <p className="font-medium text-[#2C1D0E]">
            {thread.author?.name || "Anonymous"}
          </p>
          <p className="text-xs text-[#A68A6D]">
            {moment(thread.createdAt).fromNow()} • Thread Author •{" "}
            {thread.segments?.length || 0} Segments
          </p>
        </div>
      </div>

      <blockquote className="border-l-4 border-[#D97706] pl-4 text-[#5E4B3C] italic">
        {thread.segments?.[0]?.content || "No content available."}
      </blockquote>

      <div className="mt-2">
        {thread.tags && thread.tags.length > 0 && (
          <div className="flex gap-2 mt-2 flex-wrap">
            {thread.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-[#EEE4D0] text-[#8B5E3C] px-2 py-1 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

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

      <div className="mt-4">
        <label className="text-sm font-medium text-[#2C1D0E]">
          Add to Collection:
        </label>
        <select
          onChange={(e) => handleAddToCollection(e.target.value)}
          className="ml-2 border border-[#E5C07B] rounded px-2 py-1 text-sm bg-white"
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

export default TrendingThreadCard;
