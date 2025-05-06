import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  getFollowers,
  followUser,
  unfollowUser,
  getFollowing,
  getUserById,
  getUserThreads,
} from "../services/api";
import ThreadCard from "../components/ThreadCard";

const UserProfile = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [followers, setFollowers] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [profileUser, setProfileUser] = useState(null);
  const [userThreads, setUserThreads] = useState([]);
  const [following, setFollowing] = useState([]);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  const loadFollowers = async () => {
    try {
      const res = await getFollowers(id);
      setFollowers(res.data);
      setIsFollowing(res.data.some((f) => f._id === user._id));
    } catch (err) {
      console.error("Error loading followers", err);
    }
  };

  const loadFollowing = async () => {
    try {
      const res = await getFollowing(id);
      setFollowing(res.data);
    } catch (err) {
      console.error("Error loading following", err);
    }
  };

  const loadProfileData = async () => {
    try {
      const [userRes, threadsRes] = await Promise.all([
        getUserById(id),
        getUserThreads(id),
      ]);
      setProfileUser(userRes.data);
      setUserThreads(threadsRes.data);
    } catch (err) {
      console.error("Error loading profile data", err);
    }
  };

  useEffect(() => {
    if (user && id) {
      loadFollowers();
      loadFollowing();
      loadProfileData();
    }
  }, [user, id]);

  const handleFollow = async () => {
    try {
      await followUser(id);
      loadFollowers();
    } catch (err) {
      console.error("Follow error", err);
    }
  };

  const handleUnfollow = async () => {
    try {
      await unfollowUser(id);
      loadFollowers();
    } catch (err) {
      console.error("Unfollow error", err);
    }
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-[#EDE7DD] text-[#2C1D0E] max-w-4xl mx-auto mt-6 w-full">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-[#7F5539] text-white rounded-full flex items-center justify-center text-2xl font-bold">
            {profileUser?.name?.charAt(0).toUpperCase() || "U"}
          </div>
          <h2 className="text-2xl font-semibold">
            {profileUser?.name || "User Profile"}
          </h2>
        </div>

        {user && user._id !== id && (
          <button
            onClick={isFollowing ? handleUnfollow : handleFollow}
            className={`text-sm px-5 py-2 rounded-xl font-medium transition duration-200 ${
              isFollowing
                ? "bg-[#A44A3F] text-white hover:bg-[#91382E]"
                : "bg-[#7F5539] text-white hover:bg-[#65402A]"
            }`}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </button>
        )}
      </div>

      {/* Followers & Following */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Followers */}
        <div>
          <button
            onClick={() => setShowFollowers((prev) => !prev)}
            className="font-semibold text-[#7F5539] hover:underline text-lg"
          >
            Followers ({followers.length})
          </button>
          {showFollowers && (
            <ul className="mt-2 text-sm text-[#5E4B3C] list-disc ml-5 space-y-1">
              {followers.map((follower) => (
                <li key={follower._id}>
                  <Link to={`/users/${follower._id}`} className="hover:underline">
                    {follower.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Following */}
        <div>
          <button
            onClick={() => setShowFollowing((prev) => !prev)}
            className="font-semibold text-[#7F5539] hover:underline text-lg"
          >
            Following ({following.length})
          </button>
          {showFollowing && (
            <ul className="mt-2 text-sm text-[#5E4B3C] list-disc ml-5 space-y-1">
              {following.map((followedUser) => (
                <li key={followedUser._id}>
                  <Link to={`/users/${followedUser._id}`} className="hover:underline">
                    {followedUser.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Threads Section */}
      <div className="mt-6">
        <h3 className="font-semibold mb-3 text-lg text-[#3E2C1C]">Threads</h3>
        {userThreads.length === 0 ? (
          <p className="text-sm text-[#5E4B3C]">No threads yet.</p>
        ) : (
          userThreads.map((thread) => (
            <ThreadCard
              key={thread._id}
              thread={thread}
              currentUser={user}
              onThreadUpdate={() => {}}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default UserProfile;
