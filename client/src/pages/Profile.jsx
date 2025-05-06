import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from "react-router-dom";

const Profile = () => {
  const { user, logout } = useAuth();

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
// [#EDE7DD]
  return (
    <div className="bg-white p-6 rounded-xl shadow border border-[#E5C07B] text-[#2C1D0E]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">My Profile</h2>
        <button
          onClick={logout}
          className="text-sm bg-[#A44A3F] hover:bg-[#91382E] text-white px-4 py-1.5 rounded-lg font-medium"
        >
          Logout
        </button>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-[#7F5539] text-white rounded-full flex items-center justify-center text-xl font-bold">
          {user.name?.charAt(0).toUpperCase() || 'U'}
        </div>
        <div>
          <p className="font-medium">{user.name || 'Anonymous'}</p>
          <Link to="/myprofile" className="text-sm text-[#5E4B3C]">View your profile</Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
