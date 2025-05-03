import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getMyThreads } from '../services/api'; // Add this API
import ThreadCard from '../components/ThreadCard'; // Adjust path as needed

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
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-2">Welcome!</h2>
        <p className="text-sm text-gray-600">
          Please <a href="/login" className="text-blue-500 hover:underline">log in</a> to view your profile.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Your Profile</h2>
        <button
          onClick={logout}
          className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold">
          {user.name?.charAt(0) || 'U'}
        </div>
        <div>
          <p className="font-medium">{user.name || 'Anonymous'}</p>
          <p className="text-sm text-gray-500">View your profile</p>
        </div>
      </div>

      <h3 className="text-md font-semibold mb-2">Your Threads:</h3>
      {myThreads.length === 0 ? (
        <p className="text-sm text-gray-500">You haven’t posted any threads yet.</p>
      ) : (
        myThreads.map((thread) => (
          <ThreadCard key={thread._id} thread={thread} isProfile />
        ))
      )}
    </div>
  );
};

export default MyProfile;
