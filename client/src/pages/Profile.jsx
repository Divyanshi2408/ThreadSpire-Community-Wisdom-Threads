// import React from 'react';

// const Profile = () => {
//   return (
//     <div className="bg-white p-4 rounded-lg shadow">
//       <h2 className="text-lg font-semibold mb-2">Your Profile</h2>
//       <div className="flex items-center gap-4">
//         <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold">
//           U
//         </div>
//         <div>
//           <p className="font-medium">Anonymous</p>
//           <p className="text-sm text-gray-500">View your profile</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;

import React from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-2">Welcome!</h2>
        <p className="text-sm text-gray-600">Please <a href="/login" className="text-blue-500 hover:underline">log in</a> to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-2">Your Profile</h2>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold">
          {user.name?.charAt(0) || 'U'}
        </div>
        <div>
          <p className="font-medium">{user.name || 'Anonymous'}</p>
          <p className="text-sm text-gray-500">View your profile</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
