// import React, { useEffect, useState } from 'react';
// import { useAuth } from '../context/AuthContext';
// import { getMyThreads } from '../services/api';
// import ThreadCard from '../components/ThreadCard';

// const MyProfile = () => {
//   const { user, logout } = useAuth();
//   const [myThreads, setMyThreads] = useState([]);

//   useEffect(() => {
//     const fetchMyThreads = async () => {
//       try {
//         const res = await getMyThreads();
//         setMyThreads(res.data);
//       } catch (err) {
//         console.error("Failed to load user's threads", err);
//       }
//     };

//     if (user) fetchMyThreads();
//   }, [user]);

//   if (!user) {
//     return (
//       <div className="bg-white p-6 rounded-xl shadow border border-[#EDE7DD] text-[#2C1D0E]">
//         <h2 className="text-xl font-semibold mb-2">Welcome!</h2>
//         <p className="text-sm text-[#5E4B3C]">
//           Please{" "}
//           <a
//             href="/login"
//             className="text-[#7F5539] hover:underline font-medium"
//           >
//             log in
//           </a>{" "}
//           to view your profile.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white p-6 rounded-xl shadow border border-[#EDE7DD] text-[#2C1D0E]">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-xl font-semibold">Your Profile</h2>
//         <button
//           onClick={logout}
//           className="text-sm bg-[#A44A3F] hover:bg-[#91382E] text-white px-4 py-1.5 rounded-lg font-medium"
//         >
//           Logout
//         </button>
//       </div>

//       <div className="flex items-center gap-4 mb-6">
//         <div className="w-12 h-12 bg-[#7F5539] text-white rounded-full flex items-center justify-center text-xl font-bold">
//           {user.name?.charAt(0).toUpperCase() || 'U'}
//         </div>
//         <div>
//           <p className="font-medium">{user.name || 'Anonymous'}</p>
//           <p className="text-sm text-[#5E4B3C]">View your profile</p>
//         </div>
//       </div>

//       <h3 className="text-md font-semibold mb-3">Your Threads:</h3>
//       {myThreads.map((thread) => (
//         <ThreadCard
//           key={thread._id}
//           thread={thread}
//           currentUser={user}
//           onThreadUpdate={(deletedId, updatedThread) => {
//             if (deletedId) {
//               setMyThreads((prev) => prev.filter((t) => t._id !== deletedId));
//             } else if (updatedThread) {
//               setMyThreads((prev) =>
//                 prev.map((t) => (t._id === updatedThread._id ? updatedThread : t))
//               );
//             }
//           }}
//         />
// ))}

//     </div>
//   );
// };

// export default MyProfile;


import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  getMyThreads,
  getFollowers,
  getFollowing
} from '../services/api';
import ThreadCard from '../components/ThreadCard';

const MyProfile = () => {
  const { user, logout } = useAuth();
  const [myThreads, setMyThreads] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const [threadsRes, followersRes, followingRes] = await Promise.all([
          getMyThreads(),
          getFollowers(user._id),
          getFollowing(user._id)
        ]);
        setMyThreads(threadsRes.data);
        setFollowers(followersRes.data);
        setFollowing(followingRes.data);
      } catch (err) {
        console.error("Error loading profile data", err);
      }
    };

    if (user) fetchProfileData();
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

      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-[#7F5539] text-white rounded-full flex items-center justify-center text-xl font-bold">
          {user.name?.charAt(0).toUpperCase() || 'U'}
        </div>
        <div>
          <p className="font-medium">{user.name || 'Anonymous'}</p>
          <p className="text-sm text-[#5E4B3C]">
            <span className="font-semibold">{followers.length}</span> Followers •{" "}
            <span className="font-semibold">{following.length}</span> Following
          </p>
        </div>
      </div>

      <h3 className="text-md font-semibold mb-3">Your Threads:</h3>
      {myThreads.length > 0 ? (
        myThreads.map((thread) => (
          <ThreadCard
            key={thread._id}
            thread={thread}
            currentUser={user}
            onThreadUpdate={(deletedId, updatedThread) => {
              if (deletedId) {
                setMyThreads((prev) =>
                  prev.filter((t) => t._id !== deletedId)
                );
              } else if (updatedThread) {
                setMyThreads((prev) =>
                  prev.map((t) =>
                    t._id === updatedThread._id ? updatedThread : t
                  )
                );
              }
            }}
          />
        ))
      ) : (
        <p className="text-sm text-[#5E4B3C]">You haven't created any threads yet.</p>
      )}
    </div>
  );
};

export default MyProfile;
