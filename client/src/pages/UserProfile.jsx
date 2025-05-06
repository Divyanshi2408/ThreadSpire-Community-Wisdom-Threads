// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import {
//   getFollowers,
//   followUser,
//   unfollowUser,
//   getFollowing
// } from "../services/api";

// const UserProfile = () => {
//   const { id } = useParams(); // target user id from URL
//   const { user } = useAuth(); // current logged-in user

//   const [followers, setFollowers] = useState([]);
//   const [isFollowing, setIsFollowing] = useState(false);

//   const loadFollowers = async () => {
//     try {
//       const res = await getFollowers(id);
//       setFollowers(res.data);
//       setIsFollowing(res.data.some((f) => f._id === user._id));
//     } catch (err) {
//       console.error("Error loading followers", err);
//     }
//   };

//   useEffect(() => {
//     if (user && id) {
//       loadFollowers();
//     }
//   }, [user, id]);

//   const handleFollow = async () => {
//     try {
//       await followUser(id);
//       loadFollowers();
//     } catch (err) {
//       console.error("Follow error", err);
//     }
//   };

//   const handleUnfollow = async () => {
//     try {
//       await unfollowUser(id);
//       loadFollowers();
//     } catch (err) {
//       console.error("Unfollow error", err);
//     }
//   };

//   return (
//     <div className="bg-white p-6 rounded-xl shadow border border-[#EDE7DD] text-[#2C1D0E]">
//       <h2 className="text-xl font-semibold mb-4">User Profile</h2>
//       <p className="text-[#5E4B3C] mb-4">User ID: {id}</p>

//       <button
//         onClick={isFollowing ? handleUnfollow : handleFollow}
//         className={`text-sm px-4 py-2 rounded-lg font-medium ${
//           isFollowing
//             ? "bg-[#A44A3F] text-white hover:bg-[#91382E]"
//             : "bg-[#7F5539] text-white hover:bg-[#65402A]"
//         }`}
//       >
//         {isFollowing ? "Unfollow" : "Follow"}
//       </button>

//       <div className="mt-6">
//         <h3 className="font-semibold mb-2">Followers ({followers.length})</h3>
//         <ul className="text-sm text-[#5E4B3C] list-disc ml-4">
//           {followers.map((follower) => (
//             <li key={follower._id}>{follower.name}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;


import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  getFollowers,
  followUser,
  unfollowUser,
  getFollowing,
  getUserById,
  getUserThreads,
} from "../services/api";

const UserProfile = () => {
  const { id } = useParams(); // target user id from URL
  const { user } = useAuth(); // current logged-in user

  const [followers, setFollowers] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [profileUser, setProfileUser] = useState(null);
  const [userThreads, setUserThreads] = useState([]);
  const [following, setFollowing] = useState([]);
  const [showFollowers, setShowFollowers] = useState(false);
const [showFollowing, setShowFollowing] = useState(false);



  const loadFollowers = async () => {
    try {
      const res = await getFollowers(id);
      setFollowers(res.data);
      setIsFollowing(res.data.some((f) => f._id === user._id));
    } catch (err) {
      console.error("Error loading followers", err);
    }
  };

  const loadFollowing = async () => {
    try {
      const res = await getFollowing(id);
      setFollowing(res.data);
    } catch (err) {
      console.error("Error loading following", err);
    }
  };

  
  const loadProfileData = async () => {
    try {
      const [userRes, threadsRes] = await Promise.all([
        getUserById(id),
        getUserThreads(id),
      ]);
      setProfileUser(userRes.data);
      setUserThreads(threadsRes.data);
    } catch (err) {
      console.error("Error loading profile data", err);
    }
  };

  useEffect(() => {
    if (user && id) {
      loadFollowers();
      loadFollowing();
      loadProfileData();
    }
  }, [user, id]);

  const handleFollow = async () => {
    try {
      await followUser(id);
      loadFollowers();
    } catch (err) {
      console.error("Follow error", err);
    }
  };

  const handleUnfollow = async () => {
    try {
      await unfollowUser(id);
      loadFollowers();
    } catch (err) {
      console.error("Unfollow error", err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow border border-[#EDE7DD] text-[#2C1D0E]">
      <h2 className="text-xl font-semibold mb-2">
        {profileUser?.name || "User Profile"}
      </h2>

      <button
        onClick={isFollowing ? handleUnfollow : handleFollow}
        className={`text-sm px-4 py-2 rounded-lg font-medium ${
          isFollowing
            ? "bg-[#A44A3F] text-white hover:bg-[#91382E]"
            : "bg-[#7F5539] text-white hover:bg-[#65402A]"
        }`}
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </button>
      <div className="mt-6 flex flex-col md:flex-row gap-8">
            {/* Followers Section */}
            <div className="flex-1">
                <button
                onClick={() => setShowFollowers((prev) => !prev)}
                className="font-semibold mb-2 text-[#7F5539] hover:underline"
                >
                Followers ({followers.length})
                </button>
                {showFollowers && (
                <ul className="text-sm text-[#5E4B3C] list-disc ml-4 mt-2">
                    {followers.map((follower) => (
                    <li key={follower._id}>
                        <Link to={`/users/${follower._id}`} className="hover:underline">
                        {follower.name}
                        </Link>
                    </li>
                    ))}
                </ul>
                )}
            </div>

            {/* Following Section */}
            <div className="flex-1">
                <button
                onClick={() => setShowFollowing((prev) => !prev)}
                className="font-semibold mb-2 text-[#7F5539] hover:underline"
                >
                Following ({following.length})
                </button>
                {showFollowing && (
                <ul className="text-sm text-[#5E4B3C] list-disc ml-4 mt-2">
                    {following.map((followedUser) => (
                    <li key={followedUser._id}>
                        <Link to={`/users/${followedUser._id}`} className="hover:underline">
                        {followedUser.name}
                        </Link>
                    </li>
                    ))}
                </ul>
                )}
            </div>
            </div>


      <div className="mt-6">
        <h3 className="font-semibold mb-2">Threads by {profileUser?.name}</h3>
        {userThreads.length === 0 ? (
          <p className="text-sm text-[#5E4B3C]">No threads yet.</p>
        ) : (
          <ul className="text-sm text-[#5E4B3C] list-disc ml-4">
            {userThreads.map((thread) => (
              <li key={thread._id}>
                <Link
                  to={`/threads/${thread._id}`}
                  className="text-[#7F5539] hover:underline"
                >
                  {thread.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
