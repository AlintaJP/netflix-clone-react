import React, { useContext, useEffect } from "react";
import HomeScreen from "./pages/Home/HomeScreen";
import LoginScreen from "./pages/Login/LoginScreen";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { UserContext } from "./context/userContext";
import ProfileScreen from "./pages/Profile/ProfileScreen";

function App() {
  const [user] = useAuthState(auth);
  const { login, logout } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      login({
        uid: user.uid,
        email: user.email,
      });
    } else {
      logout();
      navigate("/");
    }
  }, [login, logout, navigate, user]);

  return (
    <div className="app">
      {!user ? (
        <LoginScreen />
      ) : (
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="profile" element={<ProfileScreen />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
