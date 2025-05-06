import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  getMyThreads,
  getFollowers,
  getFollowing
} from '../services/api';
import ThreadCard from '../components/ThreadCard';

const MyProfile = () => {
  const { user, logout } = useAuth();
  const [myThreads, setMyThreads] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);


  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const [threadsRes, followersRes, followingRes] = await Promise.all([
          getMyThreads(),
          getFollowers(user._id),
          getFollowing(user._id)
        ]);
        setMyThreads(threadsRes.data);
        setFollowers(followersRes.data);
        setFollowing(followingRes.data);
      } catch (err) {
        console.error("Error loading profile data", err);
      }
    };

    if (user) fetchProfileData();
  }, [user]);

  if (!user) {
    return (
      <div className="bg-white p-6 rounded-xl shadow border border-[#EDE7DD] text-[#2C1D0E]">
        <h2 className="text-xl font-semibold mb-2">Welcome!</h2>
        <p className="text-sm text-[#5E4B3C]">
          Please{" "}
          <a
            href="/login"
            className="text-[#7F5539] hover:underline font-medium"
          >
            log in
          </a>{" "}
          to view your profile.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow border border-[#EDE7DD] text-[#2C1D0E]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Your Profile</h2>
        <button
          onClick={logout}
          className="text-sm bg-[#A44A3F] hover:bg-[#91382E] text-white px-4 py-1.5 rounded-lg font-medium"
        >
          Logout
        </button>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-[#7F5539] text-white rounded-full flex items-center justify-center text-xl font-bold">
          {user.name?.charAt(0).toUpperCase() || 'U'}
        </div>
        <div>
          <p className="font-medium">{user.name || 'Anonymous'}</p>
          <div className="flex gap-8 mt-4">
  {/* Followers section */}
  <div className="flex-1">
    <button
      onClick={() => setShowFollowers((prev) => !prev)}
      className="font-semibold text-sm text-[#5E4B3C] hover:underline mb-1"
    >
      {followers.length} Followers
    </button>
          {showFollowers && (
        <ul className="text-sm text-[#5E4B3C] list-disc ml-4 mt-2">
          {followers.map((follower) => (
            <li key={follower._id}>
              <Link
                to={`/users/${follower._id}`}
                className="text-[#7F5539] hover:underline"
              >
                {follower.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
  </div>

  {/* Following section */}
  <div className="flex-row">
    <button
      onClick={() => setShowFollowing((prev) => !prev)}
      className="font-semibold text-sm text-[#5E4B3C] hover:underline mb-1"
    >
      {following.length} Following
    </button>
          {showFollowing && (
        <ul className="text-sm text-[#5E4B3C] list-disc ml-4 mt-2">
          {following.map((followedUser) => (
            <li key={followedUser._id}>
              <Link
                to={`/users/${followedUser._id}`}
                className="text-[#7F5539] hover:underline"
              >
                {followedUser.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
  </div>
</div>


        </div>
      </div>

      <h3 className="text-md font-semibold mb-3">Your Threads:</h3>
      {myThreads.length > 0 ? (
        myThreads.map((thread) => (
          <ThreadCard
            key={thread._id}
            thread={thread}
            currentUser={user}
            onThreadUpdate={(deletedId, updatedThread) => {
              if (deletedId) {
                setMyThreads((prev) =>
                  prev.filter((t) => t._id !== deletedId)
                );
              } else if (updatedThread) {
                setMyThreads((prev) =>
                  prev.map((t) =>
                    t._id === updatedThread._id ? updatedThread : t
                  )
                );
              }
            }}
          />
        ))
      ) : (
        <p className="text-sm text-[#5E4B3C]">You haven't created any threads yet.</p>
      )}
    </div>
  );
};

export default MyProfile;
