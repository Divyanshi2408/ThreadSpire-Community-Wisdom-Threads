import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import {
  getCollections,
  addThreadToCollection,
  reactToThread,
  deleteThread,
  updateThread,
  forkThread,
  addCommentToThread,
  getThreadComments 
} from "../services/api";

const ThreadCard = ({ thread, currentUser, onThreadUpdate }) => {
  const [collections, setCollections] = useState([]);
  const [reactions, setReactions] = useState({});
  const [userReaction, setUserReaction] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(thread.title);
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

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this thread?")) return;
    try {
      await deleteThread(thread._id);
      alert("Thread deleted!");
      if (onThreadUpdate) onThreadUpdate(thread._id); // Notify parent to remove
    } catch (err) {
      console.error("Failed to delete", err);
      alert("Failed to delete thread");
    }
  };

  const handleSave = async () => {
    try {
      const updatedData = {
        title: editedTitle,
        segments: [{ content: editedSegment }],
      };
      const res = await updateThread(thread._id, updatedData);
      alert("Thread updated!");
      setIsEditing(false);
      if (onThreadUpdate) onThreadUpdate(null, res.data); // Notify parent to update
    } catch (err) {
      console.error("Failed to update", err);
      alert("Failed to update thread");
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

    // Refresh comments
    const res = await getThreadComments(thread._id);
    setComments(res.data);
  } catch (err) {
    console.error("Failed to add comment:", err);
    alert("Failed to add comment.");
  }
};



  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-md border border-[#E5C07B] mb-6">

      {isEditing ? (
        <>
          
          <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="w-full mb-2 border border-[#A7C957] px-2 py-1 rounded bg-white text-[#2C1D0E] text-sm sm:text-base"
            />
            <textarea
              rows={3}
              value={editedSegment}
              onChange={(e) => setEditedSegment(e.target.value)}
              className="w-full border border-[#A7C957] px-2 py-1 rounded mb-3 bg-white text-[#2C1D0E] text-sm sm:text-base"
            />

          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="text-sm bg-[#7F5539] text-white px-3 py-1 rounded hover:opacity-90 transition"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="text-sm text-[#5E4B3C] hover:text-[#2C1D0E] transition"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-xl font-bold mb-2 capitalize text-[#2C1D0E]">
            {thread.title}
          </h2>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-2">

            <div className="w-10 h-10 bg-[#7F5539] text-white flex items-center justify-center rounded-full font-semibold">
              {thread?.author?.name?.[0]?.toUpperCase() || "U"}
            </div>
            <div className="text-sm text-[#5E4B3C]">
             
             <Link to={`/users/${thread.author?._id}`} className="font-medium hover:underline">
              {thread.author?.name || "Anonymous"}
            </Link>


              <p className="text-xs">
                {moment(thread.createdAt).fromNow()} • {thread.segments?.length || 0} Segments
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

        </>
      )}

      {/* Tags */}
      {thread.tags && thread.tags.length > 0 && (
        <div className="flex gap-2 mt-3 flex-wrap">
          {thread.tags.map((tag, index) => (
            <Link
              to={`/tags/${tag}`}
              key={index}
              className="bg-[#EDE7DD] text-[#7F5539] px-2 py-1 rounded-full text-sm hover:underline"
            >
              #{tag}
            </Link>
          ))}
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

      {/* Collection */}
      {!isEditing && (
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-2">
        <label className="text-sm font-medium text-[#2C1D0E]">Add to Collection:</label>
        <select
          onChange={(e) => handleAddToCollection(e.target.value)}
          className="border border-[#EDE7DD] rounded px-2 py-1 bg-white text-[#2C1D0E] text-sm"
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

      )}

      {/* Edit/Delete Buttons */}
      {isOwner && !isEditing && (
        <div className="mt-4 flex gap-4">
          <button
            onClick={() => setIsEditing(true)}
            className="text-sm text-[#5E4B3C] hover:text-[#7F5539] transition"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="text-sm text-[#A44A3F] hover:underline transition"
          >
            Delete
          </button>
        </div>
      )}
      {/* Add Comment Section */}
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

export default ThreadCard;
