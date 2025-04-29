import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateThread from "./pages/CreateThread";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

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
