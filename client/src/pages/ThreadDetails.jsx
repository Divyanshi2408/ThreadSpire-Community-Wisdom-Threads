import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getThreadById } from "../services/api";
import ThreadCard from "../components/ThreadCard"; // Adjust path accordingly

const ThreadDetails = () => {
  const { id } = useParams();
  const [thread, setThread] = useState(null);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState({}); // Assuming you fetch this data somehow

  useEffect(() => {
    const fetchThread = async () => {
      try {
        const res = await getThreadById(id);
        setThread(res.data);
      } catch (err) {
        console.error("Error fetching thread", err);
        setError("Failed to load thread.");
      }
    };
    fetchThread();
  }, [id]);

  if (error) return <div>{error}</div>;
  if (!thread) return <div>Loading thread...</div>;

  return (
    <div className="p-4">
      {/* You can directly use the ThreadCard here */}
      <ThreadCard thread={thread} currentUser={currentUser} onThreadUpdate={(updatedThread) => setThread(updatedThread)} />
    </div>
  );
};

export default ThreadDetails;
