import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateThread from "./pages/CreateThread";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Collections from "./pages/Collections";
import Profile from "./pages/Profile";
import Tags from "./pages/Tags";
import TrendingTopics from "./components/TrendingTopics";

function App() {
  return (
    <> 

  <div className="flex flex-1">
    <div className="flex flex-col flex-1">
      <Navbar />
      <div className="flex min-h-screen ">
      <Sidebar />
      <main className="flex flex-1 p-4 gap-4">
        {/* Main Content */}
        <div className="w-full md:w-2/3">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateThread />} />
        <Route path="/collections" element={<Collections/>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/tag" element={<Tags />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      </div>

        {/* Right Sidebar */}
        <div className="hidden lg:block w-1/3 space-y-6 bg-gray-100  p-2">
          <Profile />
          <TrendingTopics />
        </div>
      </main>
    </div>
    </div>
</div>
    </>
  );
}

export default App;
