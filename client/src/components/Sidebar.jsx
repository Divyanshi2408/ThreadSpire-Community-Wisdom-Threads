import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  HomeIcon,
  PencilSquareIcon,
  BookmarkSquareIcon,
  UserCircleIcon,
  TagIcon,
  Bars3Icon,
  XMarkIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const navItems = [
    { to: '/', icon: <HomeIcon className="h-6 w-6 text-[#2C1D0E]" />, label: 'Home' },
    { to: '/create', icon: <PencilSquareIcon className="h-6 w-6 text-[#2C1D0E]" />, label: 'Create Thread' },
    { to: '/collections', icon: <BookmarkSquareIcon className="h-6 w-6 text-[#2C1D0E]" />, label: 'Collections' },
    { to: '/MyProfile', icon: <UserCircleIcon className="h-6 w-6 text-[#2C1D0E]" />, label: 'Profile' },
    { to: '/trending', icon: <ArrowTrendingUpIcon className="h-6 w-6 text-[#2C1D0E]" />, label: 'Trending' },
    { to: '/tag', icon: <TagIcon className="h-6 w-6 text-[#2C1D0E]" />, label: 'Tags' },
  ];

  return (
    <>
      {/* Toggle button visible on small screens */}
      <div className="md:hidden p-2 ">
        <button
          onClick={toggleSidebar}
          className="text-[#7F5539] focus:outline-none"
        >
          {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`${
          isOpen ? 'block' : 'hidden'
        } md:block w-20 md:w-64 h-full bg-[#FFFDF9] p-4 space-y-6 transition-all duration-300 rounded-xl shadow-md border border-[#E5C07B] mr-2`}
      >
        <nav className="flex flex-col gap-4 ">
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center md:justify-start justify-center gap-2 p-2 rounded hover:bg-[#E5C07B] transition-all duration-300 ${
                  isActive ? 'bg-[#d4a27c]' : ''
                }`
              }
              onClick={() => setIsOpen(false)} // Auto-close on mobile
            >
              {item.icon}
              <span className="hidden md:inline text-[#5E4B3C]">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
