import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    console.log("🟢 [AuthProvider] Local user:", storedUser);
  }, []);
  

  useEffect(() => {
    console.log("🔁 [AuthProvider] Updating localStorage with user:", user);
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);
  

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user'); // Optional since effect already handles it
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
