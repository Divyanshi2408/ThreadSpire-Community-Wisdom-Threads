import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getThreadsByTag } from "../services/api";
import ThreadCard from "../components/ThreadCard";

const Tags = () => {
  const { tagName } = useParams();
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const res = await getThreadsByTag(tagName);
        setThreads(res.data);
      } catch (error) {
        console.error("Error fetching tag threads:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchThreads();
  }, [tagName]);

  return (
    <div className="max-w-3xl mx-auto mt-6">
      <h1 className="text-2xl font-bold mb-4">#{tagName}</h1>
      {loading ? (
        <p>Loading threads...</p>
      ) : threads.length === 0 ? (
        <p>No threads found for this tag.</p>
      ) : (
        threads.map((thread) => <ThreadCard key={thread._id} thread={thread} />)
      )}
    </div>
  );
};

export default Tags;
