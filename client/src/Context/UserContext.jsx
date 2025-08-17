import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const UserContext = createContext(undefined);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const isAuthenticated = !!user;

  const fetchCurrentUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }


    try {
      const res = await axios.get("http://localhost:3000/api/v1/users/me", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <UserContext.Provider value={{ user, isAuthenticated, setUser, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export function useUser() {
  return useContext(UserContext);
}
