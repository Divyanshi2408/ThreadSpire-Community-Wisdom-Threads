import React from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

const Sidebar = () => {
  return (
    <div className="w-64  flex flex-col p-4 space-y-6 bg-gray-100">
      <nav className="flex flex-col gap-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-2 p-2 rounded hover:bg-blue-200 ${
              isActive ? 'bg-blue-200' : ''
            }`
          }
        >
          <HomeIcon className="h-5 w-5" />
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `flex items-center gap-2 p-2 rounded hover:bg-blue-200 ${
              isActive ? 'bg-blue-200' : ''
            }`
          }
        >
          <InformationCircleIcon className="h-5 w-5" />
          CreateThread
        </NavLink>
        
      </nav>
    </div>
  );
};

export default Sidebar;
