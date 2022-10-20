import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import Plans from "../../components//Plans/Plans";
import Nav from "../../components/Nav/Nav";
import "./ProfileScreen.css";

const ProfileScreen = () => {
  const user = useSelector(selectUser);

  return (
    <div className="profile-screen">
      <Nav />
      <div className="profile-screen__body">
        <h1>Edit Profile</h1>
        <div className="profile-screen__info">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt="User avatar"
          />
          <div className="profile-screen__details">
            <h2>{user?.email}</h2>
            <div className="profile-screen__plans">
              <h3>Plans</h3>
              <Plans />

              <button
                className="profile-screen__sign-out"
                onClick={() => {
                  signOut(auth);
                }}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
