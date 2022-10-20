import React, { useState } from "react";
import SignUp from "../../components/SignUp/SignUp";
import "./LoginScreen.css";

const LoginScreen = () => {
  const [signIn, setSignIn] = useState(false);

  return (
    <div className="login-screen">
      <div className="login-screen__background">
        <img
          className="login-screen__logo"
          src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
          alt="Netflix logo"
        />
        <button
          className="login-screen__button"
          onClick={() => setSignIn(true)}
        >
          Sign In
        </button>

        <div className="login-screen__gradient" />
      </div>

      <div className="login-screen__body">
        {signIn ? (
          <SignUp />
        ) : (
          <>
            <h1>Unlimited films, TV programmes and more.</h1>
            <h2>Watch anywhere. Cancel at any time.</h2>
            <h3>
              Ready to watch? Enter your email to create or restart your
              membership.
            </h3>

            <div className="login-screen__form-container">
              <form className="login-screen__form">
                <input type="email" placeholder="Email Address" />
                <button
                  className="login-screen__get-started"
                  onClick={() => setSignIn(true)}
                >
                  GET STARTED
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginScreen;
