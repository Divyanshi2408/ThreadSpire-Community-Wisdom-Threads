import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import {
  getCollections,
  addThreadToCollection,
  reactToThread,
   forkThread,
  addCommentToThread,
  getThreadComments 
} from "../services/api";

const TrendingThreadCard = ({ thread,currentUser, index }) => {
  const [collections, setCollections] = useState([]);
  const [reactions, setReactions] = useState({});
  const [userReaction, setUserReaction] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showAllSegments, setShowAllSegments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);
  const [comments, setComments] = useState([]);
  
  const [editedSegment, setEditedSegment] = useState(thread.segments?.[0]?.content || "");

  const isOwner = currentUser?._id === thread?.author?._id;

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

  const fetchComments = async () => {
    try {
      const res = await getThreadComments(thread._id);
      setComments(res.data);
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  };

  fetchCollections();
  fetchComments();
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
    const handleFork = async () => {
    try {
      const res = await forkThread(thread._id);
      alert("Thread forked successfully!");
      // You could optionally redirect to the new thread here
    } catch (err) {
      console.error("Fork failed:", err.response?.data || err.message);
      alert("Failed to fork thread.");
    }
  };

const handleAddComment = async () => {
  if (!commentText.trim()) return alert("Comment cannot be empty.");

  try {
    await addCommentToThread(thread._id, { content: commentText });
    alert("Comment added!");
    setCommentText("");
    setIsCommenting(false);

    const res = await getThreadComments(thread._id);
    setComments(res.data);
  } catch (err) {
    console.error("Failed to add comment:", err);
    alert("Failed to add comment.");
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
   {thread.segments && thread.segments.length > 0 ? (
            <>
              {(showAllSegments ? thread.segments : [thread.segments[0]]).map((segment, index) => (
                <blockquote
                  key={index}
                  className="border-l-4 border-[#A7C957] pl-4 text-[#5E4B3C] italic mb-2"
                >
                  {segment.content}
                </blockquote>
              ))}

              {thread.segments.length > 1 && (
                <button
                  onClick={() => setShowAllSegments(!showAllSegments)}
                  className="text-sm text-[#7F5539] underline hover:text-[#5E4B3C] transition"
                >
                  {showAllSegments ? "Show Less" : "Read More"}
                </button>
              )}
            </>
          ) : (
            <p className="text-sm text-[#5E4B3C] italic">No content available.</p>
          )}

           {thread.forkedFrom && (
          <div className="mt-2 text-sm text-[#5E4B3C] italic">
            Forked from:{" "}
            <Link to={`/threads/${thread.forkedFrom._id}`} className="underline text-[#7F5539]">
              {thread.forkedFrom.title || "Original Thread"}
            </Link>
          </div>
        )}

          {/* Reactions + Fork */}
      {!isEditing && (
        <div className="mt-4 flex flex-wrap gap-3 items-center">
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

          {/* Remix / Fork Button */}
          <button
            onClick={handleFork}
            className="ml-auto text-sm bg-[#7F5539] text-white px-3 py-1 rounded hover:bg-[#5E4B3C] transition"
          >
            Repost
          </button>
        </div>
      )}

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
      {!isEditing && (
  <div className="mt-6">
    {!isCommenting ? (
      <button
        onClick={() => setIsCommenting(true)}
        className="text-sm text-[#7F5539] underline hover:text-[#5E4B3C]"
      >
        Comments
      </button>
    ) : (
      <>
        {/* Comment input form */}
        <div className="flex flex-col gap-2 mb-4">
          <textarea
            rows={2}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write your comment..."
            className="w-full border border-[#EDE7DD] rounded px-3 py-2 text-sm text-[#2C1D0E]"
          />
          <div className="flex gap-2">
            <button
              onClick={handleAddComment}
              className="bg-[#7F5539] text-white px-3 py-1 text-sm rounded hover:bg-[#5E4B3C] transition"
            >
              Post
            </button>
            <button
              onClick={() => {
                setIsCommenting(false);
                setCommentText("");
              }}
              className="text-sm text-[#5E4B3C] hover:underline"
            >
              Cancel
            </button>
          </div>
        </div>

        {/* Comments list */}
        {comments.length > 0 && (
          <div className="border-t border-[#EDE7DD] pt-4">
            <h4 className="text-sm font-semibold text-[#2C1D0E] mb-2">Comments</h4>
            {comments.map((comment, index) => (
              <div key={index} className="mb-2">
                <p className="text-sm text-[#2C1D0E]">{comment.content}</p>
                <p className="text-xs text-[#5E4B3C] italic">
                  — {comment.author?.name || "Anonymous"}, {moment(comment.createdAt).fromNow()}
                </p>
                
              </div>
            ))}
          </div>
        )}
      </>
    )}
  </div>
)}
    </div>
  );
};

export default TrendingThreadCard;
