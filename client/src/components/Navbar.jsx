import React from "react";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { BsBell } from "react-icons/bs";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm px-6 py-3 flex items-center justify-between">
      {/* Left: Logo + Nav Links */}
      <div className="flex items-center gap-8">
        <Link to="/" className="text-2xl font-bold text-indigo-600 flex items-center gap-1">
          <span className="text-yellow-400">▯</span> ThreadSpire
        </Link>

        <div className="hidden md:flex items-center gap-6 text-gray-700 font-medium">
          <Link to="/trending" className="hover:text-indigo-600">Trending</Link>
          <Link to="/tags" className="hover:text-indigo-600">Tags</Link>
          <Link to="/collections" className="hover:text-indigo-600">Collections</Link>
        </div>
      </div>

      {/* Middle: Search Bar */}
      <div className="relative hidden md:block w-1/3">
        <input
          type="text"
          placeholder="Search..."
          className="w-full border rounded-full px-4 py-1.5 pl-10 focus:outline-none"
        />
        <FiSearch className="absolute top-2.5 left-3 text-gray-500" />
      </div>

      {/* Right: Icons + Button */}
      <div className="flex items-center gap-4">
        <BsBell className="text-xl text-gray-600 cursor-pointer" />
        <Link
          to="/create"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700"
        >
          New Thread
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
