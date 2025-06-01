<h1 align="center">🧵 ThreadSpire – Community Wisdom Threads</h1>

**ThreadSpire** is a full-stack MERN (MongoDB, Express, React, Node.js) web application designed to empower users to share, remix, and interact with long-form ideas called **wisdom threads**. It offers a collaborative space for meaningful knowledge exchange and insight discovery.

### Preview

Here are some screenshots of the ThreadSpire:

![Image](https://github.com/user-attachments/assets/bcbf6298-55c9-41e4-88d1-183a84d9c2bb)

![Image](https://github.com/user-attachments/assets/543bfdcd-24bc-4ac3-89d4-459c371f1f16)

![Image](https://github.com/user-attachments/assets/b96e169c-d01e-4e81-a1b8-fea4dc2b28f1)

## Features

- Create, edit, and delete long-form **wisdom threads**
- **React** (like, insightful, disagree, etc.) to threads
- **Bookmark** threads for later reference
- **Remix** threads to build upon others' ideas
- Organize threads into **collections**
- View **trending threads** based on engagement scores
- Search and filter threads by tags or keywords
- Follow/unfollow users to build a personalized feed
- User profile with thread stats and follower analytics
- User authentication (JWT-based)

## Tech Stack

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
## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Divyanshi2408/ThreadSpire-Community-Wisdom-Threads.git
cd lms-project
```
### 2. Install Server Dependencies
```
cd server
npm install
node server.js
```

### 3. Install Client Dependencies
```
cd ../client
npm install
npm run dev
```

## 💬 Contact
📧 [divyanshipal2808@gmail.com]
