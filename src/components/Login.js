import React, { useEffect, useRef, useState } from "react";
import { bg_img } from "../utils/Constants";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [errMsg, setErrMsg] = useState(null);
  const email = useRef(null);
  const password = useRef(null);
  const confirmPassword = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (errMsg) {
      const timer = setTimeout(() => {
        setErrMsg(null);
      }, 2000);

      return () => {
        clearTimeout(timer);
      };
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const enteredEmail = email.current.value;
    const enteredPassword = password.current.value;

    if (isSignIn) {
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCH_C1ChS7zJYSto2v6FWsW7lkJUBHs7TA",
          {
            method: "POST",
            body: JSON.stringify({
              email: enteredEmail,
              password: enteredPassword,
              returnSecureToken: true,
            }),
            "Content-type": "application/json",
          }
        );
        if (response.ok) {
          const data = await response.json();
          const idToken = data.idToken;
          dispatch(login({ tokenID: idToken, userID: enteredEmail }));
          navigate("/home");
        } else {
          const data = await response.json();
          console.log(data.error.message);
          setErrMsg(data.error.message);
        }
      } catch (error) {
        console.error("Error", error);
      }
    } else {
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCH_C1ChS7zJYSto2v6FWsW7lkJUBHs7TA",
          {
            method: "POST",
            body: JSON.stringify({
              email: enteredEmail,
              password: enteredPassword,
              returnSecureToken: true,
            }),
            "Content-type": "application/json",
          }
        );
        if (response.ok) {
          //
        } else {
          const data = await response.json();
          console.log(data.error.message);
        }
      } catch (error) {
        console.error("Error", error);
      }
    }
  };

  const toggleSignIn = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <div className="flex flex-col h-screen">
      <img
        src={bg_img}
        alt="bg"
        className="fixed object-cover w-full h-screen -z-20"
      />{" "}
      <img
        src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_dark_1x_r5.png"
        alt="logo"
        className="w-40 p-4 mx-auto md:ml-32"
      />
      <form
        className=" w-[90%] md:w-1/4 bg-black bg-opacity-70 space-y-5 text-center flex flex-col mx-auto mt-10 md:mt-32 md:mt-38  shadow-md p-10"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <p className="text-3xl font-semibold text-white m-2 p-2">
          {isSignIn ? "Login" : "Sign up"}
        </p>
        <p className="text-orange-500 font-semibold text-lg">{errMsg}</p>
        <input
          className="border border-gray-300 m-3 p-3"
          placeholder="Email"
          type="email"
          ref={email}
        />
        <input
          className="border border-gray-300 m-3 p-3"
          placeholder="Password"
          type="password"
          ref={password}
        />
        {!isSignIn && (
          <input
            className="border border-gray-300 m-3 p-3"
            placeholder="Confirm Password"
            type="password"
            ref={confirmPassword}
          />
        )}
        <button className="m-3 p-3 text-lg rounded-md shadow-md bg-orange-500 text-white font-semibold">
          {isSignIn ? "Login" : "Sign up"}
        </button>
        <h1 className="font-semibold p-3 text-white">Forgot password?</h1>
      </form>
      {isSignIn ? (
        <p className="font-semibold text-white mx-auto">
          New user?{" "}
          <button className="text-orange-500" onClick={toggleSignIn}>
            Sign up
          </button>
        </p>
      ) : (
        <p className="font-semibold text-white mx-auto">
          Alread registered?{" "}
          <button className="text-orange-500" onClick={toggleSignIn}>
            Login
          </button>
        </p>
      )}
    </div>
  );
};

export default Login;
