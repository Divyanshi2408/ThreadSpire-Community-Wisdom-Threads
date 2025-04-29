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

function App() {
  return (
    <> 
    <div className="flex flex-col flex-1">
      <Navbar />
      <div className="flex min-h-screen">
      <Sidebar />
      <main className="p-4">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateThread />} />
        <Route path="/collections" element={<Collections/>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/tag" element={<Tags />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      </main>
      </div>
    </div>
    </>
  );
}

export default App;
