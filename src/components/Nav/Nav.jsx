import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Nav.css";

const Nav = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
    return () => window.removeEventListener("scroll", transitionNavBar);
  }, []);

  return (
    <div className={`nav ${show && "nav--black"}`}>
      <div className="nav__contents">
        <img
          onClick={() => navigate("/")}
          className="nav__logo"
          src="https://wszystkiesymbole.pl/wp-content/uploads/2021/09/Netflix-logo.png"
          alt="Netflix logo"
        />
        <img
          onClick={() => navigate("/profile")}
          className="nav__avatar"
          src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
          alt="User avatar"
        />
      </div>
    </div>
  );
};

export default Nav;
