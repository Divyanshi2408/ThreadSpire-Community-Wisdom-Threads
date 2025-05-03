// import React, { useState } from "react";
// import { createThread, getThreads } from "../services/api";
// import { useNavigate } from "react-router-dom";

// const CreateThread = ({ setThreads }) => {
//   const [title, setTitle] = useState("");
//   const [segments, setSegments] = useState([""]);
//   const [tags, setTags] = useState("");
//   const navigate = useNavigate();

//   const addSegment = () => setSegments([...segments, ""]);

//   const updateSegment = (i, val) => {
//     const newSegs = [...segments];
//     newSegs[i] = val;
//     setSegments(newSegs);
//   };

//   if (typeof setThreads === "function") {
//     setThreads(res.data);
//   }

  
//   // const handleSubmit = async () => {
//   //   try {
//   //     const formattedSegments = segments.map((s) => ({ content: s }));
//   //     await createThread({
//   //       title,
//   //       segments: formattedSegments,
//   //       tags: tags.split(",").map((t) => t.trim()),
//   //     });

//   //     setTitle("");
//   //     setTags("");
//   //     setSegments([""]);
//   //     const res = await getThreads();
//   //     setThreads(res.data);
//   //     navigate("/");
//   //   } catch (error) {
//   //     console.error("Failed to create thread:", error);
//   //     alert("Error creating thread. Please check console.");
//   //   }
//   // };
  
//   const handleSubmit = async () => {
//     try {
//       const formattedSegments = segments.map((s) => ({ content: s }));
//       await createThread({
//         title,
//         segments: formattedSegments,
//         tags: tags.split(",").map((t) => t.trim()),
//       });
  
//       setTitle("");
//       setTags("");
//       setSegments([""]);
  
//       const res = await getThreads();
      
//       // Only call setThreads if it exists
//       if (typeof setThreads === "function") {
//         setThreads(res.data);
//       }
  
//       navigate("/");
//     } catch (error) {
//       console.error("Failed to create thread:", error);
//       alert("Error creating thread. Please check console.");
//     }
//   };
  

//   const token = localStorage.getItem("token");
//   if (!token) {
//     return (
//       <div className="text-center mt-10 text-red-500">
//         Please{" "}
//         <a href="/login" className="text-blue-600 underline">
//           login
//         </a>{" "}
//         to create a thread.
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white rounded-2xl p-6 shadow mb-8">
//       <h2 className="text-xl font-semibold mb-4">Create a Wisdom Thread</h2>
//       <input
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         placeholder="Title"
//         className="w-full border p-2 rounded mb-2"
//       />
//       {segments.map((seg, i) => (
//         <textarea
//           key={i}
//           value={seg}
//           onChange={(e) => updateSegment(i, e.target.value)}
//           placeholder={`Segment ${i + 1}`}
//           className="w-full border p-2 rounded mb-2"
//         />
//       ))}
//       <button
//         onClick={addSegment}
//         className="text-sm text-blue-500 hover:underline mb-2"
//       >
//         + Add another segment
//       </button>
//       <input
//         value={tags}
//         onChange={(e) => setTags(e.target.value)}
//         placeholder="Tags (comma separated)"
//         className="w-full border p-2 rounded mb-4"
//       />
//       <button
//         onClick={handleSubmit}
//         className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//       >
//         Publish Thread
//       </button>
//     </div>
//   );
// };

// export default CreateThread;


import React, { useState } from "react";
import { createThread, getThreads } from "../services/api";
import { useNavigate } from "react-router-dom";

const CreateThread = ({ setThreads }) => {
  const [title, setTitle] = useState("");
  const [segments, setSegments] = useState([""]);
  const [tags, setTags] = useState("");
  const navigate = useNavigate();

  const addSegment = () => setSegments([...segments, ""]);

  const updateSegment = (i, val) => {
    const newSegs = [...segments];
    newSegs[i] = val;
    setSegments(newSegs);
  };

  const handleSubmit = async () => {
    try {
      const formattedSegments = segments.map((s) => ({ content: s }));
      await createThread({
        title,
        segments: formattedSegments,
        tags: tags.split(",").map((t) => t.trim()),
      });

      setTitle("");
      setTags("");
      setSegments([""]);

      const res = await getThreads();

      // Only call setThreads if it exists
      if (typeof setThreads === "function") {
        setThreads(res.data);
      }

      navigate("/");
    } catch (error) {
      console.error("Failed to create thread:", error);
      alert("Error creating thread. Please check console.");
    }
  };

  const token = localStorage.getItem("token");
  if (!token) {
    return (
      <div className="text-center mt-10 text-red-500">
        Please{" "}
        <a href="/login" className="text-blue-600 underline">
          login
        </a>{" "}
        to create a thread.
      </div>
    );
  }

  return (
    <div className="bg-[#FAF8F5] rounded-2xl p-6 shadow mb-8">
      <h2 className="text-[#2C1D0E] font-semibold mb-4">Create a Wisdom Thread</h2>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full border-[#A7C957] border p-2 rounded mb-2 text-[#2C1D0E]"
      />
      {segments.map((seg, i) => (
        <textarea
          key={i}
          value={seg}
          onChange={(e) => updateSegment(i, e.target.value)}
          placeholder={`Segment ${i + 1}`}
          className="w-full border-[#A7C957] border p-2 rounded mb-2 text-[#2C1D0E]"
        />
      ))}
      <button
        onClick={addSegment}
        className="text-sm text-[#7F5539] hover:underline mb-2"
      >
        + Add another segment
      </button>
      <input
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="Tags (comma separated)"
        className="w-full border-[#A7C957] border p-2 rounded mb-4 text-[#2C1D0E]"
      />
      <button
        onClick={handleSubmit}
        className="bg-[#7F5539] text-white px-4 py-2 rounded hover:bg-[#6E442E]"
      >
        Publish Thread
      </button>
    </div>
  );
};

export default CreateThread;
