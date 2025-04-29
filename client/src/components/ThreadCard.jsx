// import React from "react";

// const ThreadCard = ({ thread }) => (
//   <div className="bg-white rounded-2xl shadow p-4 mb-4">
//     <h2 className="text-xl font-bold mb-2">{thread.title}</h2>
//     <p className="text-gray-600 mb-2">{thread.segments.slice(0, 2).join(" ")}</p>
//     <div className="flex flex-wrap gap-2 mb-2">
//       {thread.tags.map((tag, i) => (
//         <span
//           key={i}
//           className="text-sm bg-gray-100 text-gray-800 px-2 py-1 rounded"
//         >
//           #{tag}
//         </span>
//       ))}
//     </div>
//     <p className="text-sm text-gray-500">Reactions: {thread.reactions.length}</p>
//   </div>
// );

// export default ThreadCard;

import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const ThreadCard = ({ thread }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow mb-6">
      <h2 className="text-xl font-bold mb-2 capitalize">{thread.title}</h2>

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center rounded-full font-semibold">
          {thread?.author?.name?.[0]?.toUpperCase() || "U"}
        </div>

        <div className="text-sm text-gray-600">
          <p className="font-medium text-black">{thread.author?.name || "Anonymous"}</p>
          <p className="text-xs text-gray-400">
            {moment(thread.createdAt).fromNow()} • Thread Author • {thread.segments?.length || 0} Segments
          </p>
        </div>
      </div>

      <blockquote className="border-l-4 border-blue-600 pl-4 text-gray-700 italic">
        {thread.segments?.[0]?.content || "No content available."}
      </blockquote>
    </div>
  );
};

export default ThreadCard;
