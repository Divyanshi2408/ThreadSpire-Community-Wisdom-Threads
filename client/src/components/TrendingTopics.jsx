import React from 'react';

const topics = ['#ReactJS', '#MERN', '#WebDev', '#OpenAI', '#JavaScript'];

const TrendingTopics = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-2">Trending Topics</h2>
      <ul className="space-y-2">
        {topics.map((topic, index) => (
          <li
            key={index}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            {topic}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrendingTopics;
