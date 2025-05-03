import React, { useEffect, useState } from "react";
import { getTrendingThreads } from "../services/api"; // Adjust path as needed
import TrendingThreadCard from "../components/TrendingThreadCard"; // Adjust path

const TrendingThreadsPage = () => {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await getTrendingThreads();
        console.log("Fetched trending threads:", res.data);
        setThreads(res.data);
      } catch (err) {
        console.error("Failed to fetch trending threads", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">🔥 Trending Threads</h1>

      {loading ? (
        <p>Loading...</p>
      ) : threads.length === 0 ? (
        <p>No trending threads found.</p>
      ) : (
        threads.map((thread, index) => (
          <TrendingThreadCard key={thread._id} thread={thread} index={index} />
        ))
      )}
    </div>
  );
};

export default TrendingThreadsPage;
