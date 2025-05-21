import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";
import { BsBell } from "react-icons/bs";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === "Enter" && query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setQuery("");
      setMenuOpen(false);
    }
  };

  return (
    <nav className="bg-[#FAF8F5] text-[#2C1D0E] border-b border-[#EDE7DD] shadow-sm px-4 md:px-6 py-3 flex items-center justify-between flex-wrap relative z-50">
  {/* Logo */}
  <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
    <Link to="/" className="text-xl sm:text-2xl font-bold text-[#7F5539] flex items-center gap-1">
      <span className="text-[#A7C957]">▯</span> ThreadSpire
    </Link>
  </div>

  {/* Desktop Nav (Visible ≥1024px) */}
  <div className="hidden lg:flex items-center gap-5 text-[#5E4B3C] font-medium flex-wrap">
    <Link to="/trending" className="hover:text-[#7F5539]">Trending</Link>
    <Link to="/tag" className="hover:text-[#7F5539]">Tags</Link>
    <Link to="/collections" className="hover:text-[#7F5539]">Collections</Link>
    <Link to="/MyProfile" className="hover:text-[#7F5539]">Profile</Link>
  </div>

  {/* Search Bar (Visible ≥1024px) */}
  <div className="relative hidden lg:block w-full max-w-sm xl:max-w-md mt-3 lg:mt-0">
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={handleSearch}
      placeholder="Search..."
      className="w-full border border-[#EDE7DD] rounded-full px-4 py-1.5 pl-10 focus:outline-none focus:ring-2 focus:ring-[#A7C957] bg-white text-[#2C1D0E]"
    />
    <FiSearch className="absolute top-2.5 left-3 text-[#5E4B3C]" />
  </div>

  {/* Right Icons & Button (Visible ≥1024px) */}
  <div className="hidden lg:flex items-center gap-4 mt-3 lg:mt-0">
    <BsBell className="text-xl text-[#5E4B3C] cursor-pointer" />
    <Link
      to="/create"
      className="flex items-center gap-2 bg-[#7F5539] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#6B422E] transition-all"
    >
      <PencilSquareIcon className="h-5 w-5" />
      New Thread
    </Link>
  </div>

  {/* Mobile Menu Icon (Visible <1024px) */}
  <div className="lg:hidden ml-auto">
    {menuOpen ? (
      <FiX className="text-2xl cursor-pointer" onClick={() => setMenuOpen(false)} />
    ) : (
      <FiMenu className="text-2xl cursor-pointer" onClick={() => setMenuOpen(true)} />
    )}
  </div>

  {/* Mobile Menu (Visible <1024px) */}
  {menuOpen && (
    <div className="w-full mt-4 bg-[#FAF8F5] border-t border-[#EDE7DD] px-4 py-4 flex flex-col gap-4 lg:hidden shadow-md">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleSearch}
        placeholder="Search..."
        className="w-full border border-[#EDE7DD] rounded-full px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-[#A7C957] bg-white text-[#2C1D0E]"
      />
      <div className="flex flex-col gap-2 text-[#5E4B3C] font-medium">
        <Link to="/trending" onClick={() => setMenuOpen(false)} className="hover:text-[#7F5539]">Trending</Link>
        <Link to="/tag" onClick={() => setMenuOpen(false)} className="hover:text-[#7F5539]">Tags</Link>
        <Link to="/collections" onClick={() => setMenuOpen(false)} className="hover:text-[#7F5539]">Collections</Link>
        <Link to="/MyProfile" onClick={() => setMenuOpen(false)} className="hover:text-[#7F5539]">Profile</Link>
      </div>
      <div className="flex justify-between items-center mt-4">
        <BsBell className="text-xl text-[#5E4B3C] cursor-pointer" />
        <Link
          to="/create"
          onClick={() => setMenuOpen(false)}
          className="flex items-center gap-2 bg-[#7F5539] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#6B422E] transition-all"
        >
          <PencilSquareIcon className="h-5 w-5" />
          New Thread
        </Link>
      </div>
    </div>
  )}
</nav>

  );
};

export default Navbar;
