// import React from "react";
// import { Link } from "react-router-dom";
// import { FiSearch } from "react-icons/fi";
// import { BsBell } from "react-icons/bs";
// import { PencilSquareIcon } from "@heroicons/react/24/outline";

// const Navbar = () => {
//   return (
//     <nav className="bg-[#FAF8F5] text-[#2C1D0E] border-b border-[#EDE7DD] shadow-sm px-6 py-3 flex items-center justify-between">
//       {/* Left: Logo + Nav Links */}
//       <div className="flex items-center gap-8">
//         <Link to="/" className="text-2xl font-bold text-[#7F5539] flex items-center gap-1">
//           <span className="text-[#A7C957]">▯</span> ThreadSpire
//         </Link>

//         <div className="hidden md:flex items-center gap-6 text-[#5E4B3C] font-medium">
//           <Link to="/trending" className="hover:text-[#7F5539]">Trending</Link>
//           <Link to="/tags" className="hover:text-[#7F5539]">Tags</Link>
//           <Link to="/collections" className="hover:text-[#7F5539]">Collections</Link>
//         </div>
//       </div>

//       {/* Middle: Search Bar */}
//       <div className="relative hidden md:block w-1/3">
//         <input
//           type="text"
//           placeholder="Search..."
//           className="w-full border border-[#EDE7DD] rounded-full px-4 py-1.5 pl-10 focus:outline-none focus:ring-2 focus:ring-[#A7C957] bg-white text-[#2C1D0E]"
//         />
//         <FiSearch className="absolute top-2.5 left-3 text-[#5E4B3C]" />
//       </div>

//       {/* Right: Icons + Button */}
//       <div className="flex items-center gap-4">
//         <BsBell className="text-xl text-[#5E4B3C] cursor-pointer" />
//         <Link
//           to="/create"
//           className="flex items-center gap-2 bg-[#7F5539] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#6B422E] transition-all"
//         >
//           <PencilSquareIcon className="h-5 w-5" />
//           New Thread
//         </Link>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { BsBell } from "react-icons/bs";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === "Enter" && query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setQuery("");
    }
  };

  return (
    <nav className="bg-[#FAF8F5] text-[#2C1D0E] border-b border-[#EDE7DD] shadow-sm px-6 py-3 flex items-center justify-between">
      {/* Left: Logo + Nav Links */}
      <div className="flex items-center gap-8">
        <Link to="/" className="text-2xl font-bold text-[#7F5539] flex items-center gap-1">
          <span className="text-[#A7C957]">▯</span> ThreadSpire
        </Link>
        <div className="hidden md:flex items-center gap-6 text-[#5E4B3C] font-medium">
          <Link to="/trending" className="hover:text-[#7F5539]">Trending</Link>
          <Link to="/tags" className="hover:text-[#7F5539]">Tags</Link>
          <Link to="/collections" className="hover:text-[#7F5539]">Collections</Link>
        </div>
      </div>

      {/* Middle: Search Bar */}
      <div className="relative hidden md:block w-1/3">
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

      {/* Right: Icons + Button */}
      <div className="flex items-center gap-4">
        <BsBell className="text-xl text-[#5E4B3C] cursor-pointer" />
        <Link
          to="/create"
          className="flex items-center gap-2 bg-[#7F5539] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#6B422E] transition-all"
        >
          <PencilSquareIcon className="h-5 w-5" />
          New Thread
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
