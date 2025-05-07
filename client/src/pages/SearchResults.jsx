import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { searchQuery } from "../services/api";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [threads, setThreads] = useState([]);
  const [users, setUsers] = useState([]);
  const query = searchParams.get("q");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await searchQuery(query);
        setThreads(res.threads || []);
        setUsers(res.users || []);
      } catch (error) {
        console.error("Error fetching search results", error);
      }
    };
    if (query) fetchResults();
  }, [query]);

  return (
    <div className="max-w-3xl mx-auto mt-8 text-[#2C1D0E]">
      <h1 className="text-2xl font-bold mb-4">Search Results for: "{query}"</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Users</h2>
        {users.length === 0 ? (
          <p className="text-sm text-[#5E4B3C]">No users found.</p>
        ) : (
          <ul className="list-disc ml-5">
            {users.map((user) => (
              <li key={user._id}>
                <Link to={`/users/${user._id}`} className="text-[#7F5539] hover:underline">
                  {user.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Threads</h2>
        {threads.length === 0 ? (
          <p className="text-sm text-[#5E4B3C]">No threads found.</p>
        ) : (
          <ul className="list-disc ml-5">
            {threads.map((thread) => (
              <li key={thread._id}>
                <Link to={`/threads/${thread._id}`} className="text-[#7F5539] hover:underline">
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

export default SearchResults;
