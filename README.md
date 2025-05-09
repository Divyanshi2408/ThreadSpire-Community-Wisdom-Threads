# 🧵 ThreadSpire – Community Wisdom Threads

**ThreadSpire** is a full-stack MERN (MongoDB, Express, React, Node.js) web application designed to empower users to share, remix, and interact with long-form ideas called **wisdom threads**. It offers a collaborative space for meaningful knowledge exchange and insight discovery.

## 🚀 Features

- 🔗 Create, edit, and delete long-form **wisdom threads**
- 💬 **React** (like, insightful, disagree, etc.) to threads
- 📌 **Bookmark** threads for later reference
- 🌀 **Remix** threads to build upon others' ideas
- 📁 Organize threads into **collections**
- 📈 View **trending threads** based on engagement scores
- 🔍 Search and filter threads by tags or keywords
- 👤 Follow/unfollow users to build a personalized feed
- 📊 User profile with thread stats and follower analytics
- 🔒 User authentication (JWT-based)

## 🧱 Tech Stack

### Frontend
- React JS + React Router DOM
- Redux Toolkit
- Tailwind CSS
- Axios

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JSON Web Tokens (JWT) for auth
- bcrypt for password hashing

## 📂 Folder Structure

```bash
threadspire/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.js
│   └── public/
├── server/                 # Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
└── README.md
```
