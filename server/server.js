const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const threadRoutes = require("./routes/threadRoutes");
const collectionRoutes = require("./routes/collectionRoutes");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/threads", threadRoutes);
app.use("/api/collections", collectionRoutes);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("✅ Connected to MongoDB"); // Add this line
    app.listen(process.env.PORT || 5000, () => {
      console.log("🚀 Server running on port 5000");
    });
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
