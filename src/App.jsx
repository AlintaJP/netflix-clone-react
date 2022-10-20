import React, { useEffect } from "react";
import HomeScreen from "./pages/Home/HomeScreen";
import LoginScreen from "./pages/Login/LoginScreen";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { login, logout } from "./features/userSlice";
import ProfileScreen from "./pages/Profile/ProfileScreen";

function App() {
  const dispatch = useDispatch();

  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      dispatch(
        login({
          uid: user.uid,
          email: user.email,
        })
      );
    } else {
      dispatch(logout());
    }
  }, [dispatch, user]);

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
