import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { createCollection, getCollections } from '../services/api';
import { Link } from 'react-router-dom';

const Collections = () => {
  const { user } = useAuth();
  const [collections, setCollections] = useState([]);
  const [newName, setNewName] = useState('');
  const [loading, setLoading] = useState(true);

  const handleCreateCollection = async () => {
    try {
      const res = await createCollection({
        name: newName,
        threads: [],
        isPrivate: false,
      });
      setCollections((prev) => [...prev, res.data]);
      setNewName('');
    } catch (err) {
      console.error('Error creating collection:', err);
    }
  };

  useEffect(() => {
    if (user) {
      getCollections()
        .then((res) => setCollections(res.data))
        .catch((err) => console.error('Error fetching collections:', err))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user]);

  if (!user) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow mt-4">
        <h2 className="text-xl font-semibold mb-2 text-[#2C1D0E]">Collections</h2>
        <p className="text-sm text-[#5E4B3C]">
          Please{' '}
          <a href="/login" className="text-[#7F5539] hover:underline">log in</a> to view your collections.
        </p>
      </div>
    );
  }

  if (loading) {
    return <div className="text-center mt-4 text-[#5E4B3C]">Loading collections...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow mt-4">
      <h2 className="text-xl font-semibold mb-4 text-[#2C1D0E]">Your Collections</h2>

      <div className="mb-6 flex flex-wrap gap-2">
        <input
          type="text"
          placeholder="Collection Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="border border-[#E0DBD3] px-3 py-2 rounded w-64 text-[#2C1D0E] bg-[#FAF8F5]"
        />
        <button
          onClick={handleCreateCollection}
          className="bg-[#7F5539] text-white px-4 py-2 rounded hover:bg-[#5E4B3C] transition"
        >
          Create Collection
        </button>
      </div>

      {collections.length === 0 ? (
        <p className="text-[#5E4B3C]">No collections found.</p>
      ) : (
        <ul className="space-y-6">
          {collections.map((collection) => (
            <li
              key={collection._id}
              className="border border-[#E0DBD3] p-4 rounded bg-[#FAF8F5] hover:bg-[#EDE7DD] transition"
            >
              <h3 className="text-lg font-bold text-[#2C1D0E]">{collection.name}</h3>
              <p className="text-sm text-[#5E4B3C]">
                Threads: {collection.threads?.length || 0}
              </p>
              {/* <p className="text-xs text-[#A58D74] mt-1">
                Created: {collection.createdAt ? new Date(collection.createdAt).toLocaleDateString() : 'N/A'}
              </p> */}

              {/* Show Threads Inside Collection */}
              {collection.threads?.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {collection.threads.map((thread) => (
                    <li key={thread._id}>
                      <Link
                        to={`/threads/${thread._id}`}
                        className="text-[#7F5539] hover:underline text-sm"
                      >
                        {thread.title || thread.content?.slice(0, 50) || 'Untitled Thread'}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Collections;
