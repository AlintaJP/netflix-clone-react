import React, { useRef } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase";
import "./SignUp.css";

const SignUpScreen = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const register = async (e) => {
    e.preventDefault();

    try {
      if (
        emailRef.current.value.trim().length &&
        passwordRef.current.value.trim().length
      ) {
        await createUserWithEmailAndPassword(
          auth,
          emailRef.current.value,
          passwordRef.current.value
        );
      }
    } catch (e) {
      alert(e.message);
    }
  };

  const signIn = async (e) => {
    e.preventDefault();

    try {
      if (
        emailRef.current.value.trim().length &&
        passwordRef.current.value.trim().length
      ) {
        await signInWithEmailAndPassword(
          auth,
          emailRef.current.value,
          passwordRef.current.value
        );
      }
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div className="signup-screen">
      <form>
        <h1>Sign In</h1>
        <input ref={emailRef} type="email" placeholder="Email" />
        <input ref={passwordRef} type="password" placeholder="Password" />
        <button type="submit" onClick={signIn}>
          Sign In
        </button>
        <h4>
          <span className="signup-screen--gray">New to Netflix? </span>
          <span className="signup-screen__link" onClick={register}>
            Sign Up now.
          </span>
        </h4>
      </form>
    </div>
  );
};

export default SignUpScreen;
