import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { createCollection, getCollections } from '../services/api';

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
      <div className="bg-white p-6 rounded-lg shadow-md mt-4">
        <h2 className="text-xl font-semibold mb-2">Collections</h2>
        <p className="text-sm text-gray-600">
          Please <a href="/login" className="text-blue-500 hover:underline">log in</a> to view your collections.
        </p>
      </div>
    );
  }

  if (loading) {
    return <div className="text-center mt-4 text-gray-500">Loading collections...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-4">
      <h2 className="text-xl font-semibold mb-4">Your Collections</h2>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Collection Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="border px-3 py-2 mr-2 rounded w-64"
        />
        <button
          onClick={handleCreateCollection}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Collection
        </button>
      </div>

      {collections.length === 0 ? (
        <p className="text-gray-500">No collections found.</p>
      ) : (
        <ul className="space-y-4">
          {collections.map((collection) => (
            <li key={collection._id} className="border p-4 rounded hover:bg-gray-50 transition">
              <h3 className="text-lg font-bold">{collection.name}</h3>
              <p className="text-sm text-gray-600">
                Threads: {collection.threads?.length || 0}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Created: {collection.createdAt ? new Date(collection.createdAt).toLocaleDateString() : 'N/A'}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Collections;
