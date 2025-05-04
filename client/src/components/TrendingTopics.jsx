import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllTagsWithCounts } from "../services/api";

const TrendingTopics = () => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await getAllTagsWithCounts();
        const topTags = res.data.slice(0, 5); // Top 5 only
        setTags(topTags);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchTags();
  }, []);

  return (
    <div className="bg-white p-4  rounded-2xl shadow border border-[#E5C07B] h-full">
      <h2 className="text-lg font-semibold mb-3 text-[#2C1D0E]">Trending Tags</h2>
      <ul className="space-y-2">
        {tags.map((tag, index) => (
          <li key={index}>
            <Link
              to={`/tags/${tag.tag}`}
              className="block px-3 py-2 rounded-full text-[#2C1D0E] bg-[#EDE7DD] hover:bg-[#7F5539] hover:text-white transition duration-200"
            >
              #{tag.tag} ({tag.count})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrendingTopics;
