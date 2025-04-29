import React, { useEffect, useState } from "react";
import { getThreads } from "../services/api";
import ThreadCard from "../components/ThreadCard";
import CreateThread from "./CreateThread";

const Home = () => {
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    getThreads().then((res) => setThreads(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* <h1 className="text-3xl font-bold mb-6 text-center">ThreadSpire</h1> */}
        {/* <CreateThread setThreads={setThreads} /> */}
        <h2 className="text-2xl font-bold mb-4 ">Explore Threads</h2>
        {threads.map((thread) => (
          <ThreadCard key={thread._id} thread={thread} />
        ))}
      </div>
    </div>
  );
};

export default Home;

