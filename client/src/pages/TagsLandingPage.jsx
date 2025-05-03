import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllTagsWithCounts } from "../services/api";

const TagsLandingPage = () => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await getAllTagsWithCounts();
        setTags(res.data);
      } catch (err) {
        console.error("Failed to fetch tags:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-6 px-4">
      <h1 className="text-2xl font-bold mb-4">All Tags</h1>
      {loading ? (
        <p>Loading tags...</p>
      ) : tags.length === 0 ? (
        <p>No tags found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {tags.map((tag) => (
            <Link
              to={`/tags/${tag.tag}`}
              key={tag.tag}
              className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium hover:bg-blue-200 transition"
            >
              #{tag.tag} ({tag.count})
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagsLandingPage;
