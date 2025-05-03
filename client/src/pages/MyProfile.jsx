import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getMyThreads } from '../services/api';
import ThreadCard from '../components/ThreadCard';

const MyProfile = () => {
  const { user, logout } = useAuth();
  const [myThreads, setMyThreads] = useState([]);

  useEffect(() => {
    const fetchMyThreads = async () => {
      try {
        const res = await getMyThreads();
        setMyThreads(res.data);
      } catch (err) {
        console.error("Failed to load user's threads", err);
      }
    };

    if (user) fetchMyThreads();
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

      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-[#7F5539] text-white rounded-full flex items-center justify-center text-xl font-bold">
          {user.name?.charAt(0).toUpperCase() || 'U'}
        </div>
        <div>
          <p className="font-medium">{user.name || 'Anonymous'}</p>
          <p className="text-sm text-[#5E4B3C]">View your profile</p>
        </div>
      </div>

      <h3 className="text-md font-semibold mb-3">Your Threads:</h3>
      {myThreads.length === 0 ? (
        <p className="text-sm text-[#5E4B3C]">
          You haven’t posted any threads yet.
        </p>
      ) : (
        myThreads.map((thread) => (
          <ThreadCard key={thread._id} thread={thread} isProfile />
        ))
      )}
    </div>
  );
};

export default MyProfile;
