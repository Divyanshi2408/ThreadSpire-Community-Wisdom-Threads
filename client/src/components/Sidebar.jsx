// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import {
//     HomeIcon,
//     PencilSquareIcon,     
//     BookmarkSquareIcon,   
//     UserCircleIcon,       
//     TagIcon              
//   } from '@heroicons/react/24/outline';

// const Sidebar = () => {
//   return (
//     <div className="w-64  flex flex-col p-4 space-y-6 h-full bg-gray-100">
//       <nav className="flex flex-col gap-4">
//         <NavLink
//           to="/"
//           className={({ isActive }) =>
//             `flex items-center gap-2 p-2 rounded hover:bg-blue-200 ${
//               isActive ? 'bg-blue-200' : ''
//             }`
//           }
//         >
//           <HomeIcon className="h-5 w-5" />
//           Home
//         </NavLink>
//         <NavLink
//           to="/about"
//           className={({ isActive }) =>
//             `flex items-center gap-2 p-2 rounded hover:bg-blue-200 ${
//               isActive ? 'bg-blue-200' : ''
//             }`
//           }
//         >
//           <PencilSquareIcon className="h-5 w-5" />
//           CreateThread
//         </NavLink>
//         <NavLink
//           to="/collections"
//           className={({ isActive }) =>
//             `flex items-center gap-2 p-2 rounded hover:bg-blue-200 ${
//               isActive ? 'bg-blue-200' : ''
//             }`
//           }
//         >
//           <BookmarkSquareIcon className="h-5 w-5" />
//           Collections
//         </NavLink>
//         <NavLink
//           to="/MyProfile"
//           className={({ isActive }) =>
//             `flex items-center gap-2 p-2 rounded hover:bg-blue-200 ${
//               isActive ? 'bg-blue-200' : ''
//             }`
//           }
//         >
//           <UserCircleIcon className="h-5 w-5" />
//           Profile
//         </NavLink>
//         <NavLink
//           to="/tag"
//           className={({ isActive }) =>
//             `flex items-center gap-2 p-2 rounded hover:bg-blue-200 ${
//               isActive ? 'bg-blue-200' : ''
//             }`
//           }
//         >
//          <TagIcon className="h-5 w-5" />
//           Tags
//         </NavLink>
        
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  HomeIcon,
  PencilSquareIcon,
  BookmarkSquareIcon,
  UserCircleIcon,
  TagIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const navItems = [
    { to: '/', icon: <HomeIcon className="h-6 w-6" />, label: 'Home' },
    { to: '/about', icon: <PencilSquareIcon className="h-6 w-6" />, label: 'CreateThread' },
    { to: '/collections', icon: <BookmarkSquareIcon className="h-6 w-6" />, label: 'Collections' },
    { to: '/MyProfile', icon: <UserCircleIcon className="h-6 w-6" />, label: 'Profile' },
    { to: '/tag', icon: <TagIcon className="h-6 w-6" />, label: 'Tags' },
  ];

  return (
    <>
      {/* Toggle button visible on small screens */}
      <div className="md:hidden p-2">
        <button
          onClick={toggleSidebar}
          className="text-gray-700 focus:outline-none"
        >
          {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`${
          isOpen ? 'block' : 'hidden'
        } md:block w-20 md:w-64 h-full bg-gray-100 p-4 space-y-6 transition-all duration-300`}
      >
        <nav className="flex flex-col gap-4">
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center md:justify-start justify-center gap-2 p-2 rounded hover:bg-blue-200 transition-all duration-300 ${
                  isActive ? 'bg-blue-200' : ''
                }`
              }
              onClick={() => setIsOpen(false)} // Auto-close on mobile
            >
              {item.icon}
              <span className="hidden md:inline">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;

