import { Routes, Route } from "react-router-dom";
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
import TrendingThreadsPage from "./pages/TrendingThreadsPage";
import TagsLandingPage from "./pages/TagsLandingPage";
import ThreadDetails from "./pages/ThreadDetails";
import UserProfile from "./pages/UserProfile";

function App() {
  return (
    <div className="flex flex-col h-screen bg-[#F5F1EC] text-[#2C1D0E]">
      <Navbar />

      <div className="flex flex-1 overflow-hidden ">
      <div className="mb-2 bg-white p-4 rounded-xl shadow-sm m-4">
      <Sidebar />
          </div>
       

        <main className="flex-1 overflow-y-auto p-6 bg-white shadow-inner rounded-tl-3xl border-l border-[#EDE7DD] m-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateThread />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/myprofile" element={<MyProfile />} />
            <Route path="/trending" element={<TrendingThreadsPage />} />
            <Route path="/tags/:tagName" element={<Tags />} />
            <Route path="/threads/:id" element={<ThreadDetails />} />
            <Route path="/tag" element={<TagsLandingPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/users/:id" element={<UserProfile />} />

          </Routes>
        </main>

        <div className="hidden lg:block w-80 bg-[#F5F1EC] p-4 h-full overflow-hidden border-l border-[#EDE7DD]">
          <div className="mb-4 bg-white p-4 rounded-xl shadow-sm">
            <Profile />
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <TrendingTopics />
          </div>
        </div>
      </div>
    </div>
  );
}


export default App;
