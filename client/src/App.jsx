import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateThread from "./pages/CreateThread";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Collections from "./pages/Collections";
import Profile from "./pages/Profile";
import MyProfile from "./pages/MyProfile";
import Tags from "./pages/Tags";
import TrendingTopics from "./components/TrendingTopics";

function App() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-gray-200 h-full overflow-hidden">
          <Sidebar />
        </div>

        {/* Main Content Scrollable */}
        <main className="flex-1 overflow-y-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateThread />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/myprofile" element={<MyProfile />} />
            <Route path="/tag" element={<Tags />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>

        {/* Right Sidebar (Fixed) */}
        <div className="hidden lg:block w-80 bg-gray-100 p-2 h-full overflow-hidden">
          <Profile />
          <br/>
          <TrendingTopics />
        </div>
      </div>
    </div>
  );
}


export default App;
