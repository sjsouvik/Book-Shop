import React, { useState } from "react";
import "./SignIn.css";
import Message from "../Message/Message";
import { useAuth } from "../AuthProvider/AuthProvider";
import { Navigate } from "react-router-dom";
import { routePaths } from "../Router/Router";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const { authToken, login, loginError, setLoginError } = useAuth();

  const submitHandler = (e) => {
    const signinErrors = {};

    e.preventDefault();

    if (loginError) {
      setLoginError(null);
    }

    if (email) {
      const validEmail = String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );

      if (!validEmail) {
        signinErrors.emailError =
          "Email format is wrong - it should follow the pattern abc@xyz.com";
      }
    } else {
      signinErrors.emailError = "Email can't be empty";
    }

    if (!password) {
      signinErrors.passwordError = "Password can't be empty";
    }

    setErrors(signinErrors);

    if (!Object.keys(signinErrors).length) {
      login(email, password);
    }
  };

  if (authToken) {
    return <Navigate replace to={routePaths.HOME} />;
  }

  return (
    <>
      <h1>Book Store</h1>
      <div className="signin-form">
        <h2>Log into your account</h2>
        <form onSubmit={submitHandler}>
          <div className="input-field">
            <label htmlFor="email-text">Email</label>
            <input
              id="email-text"
              type="text"
              value={email}
              placeholder="abc@xyz.com"
              className="br-5"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Message message={errors?.emailError} type="error" />
          </div>
          <div className="input-field">
            <label htmlFor="password-text">Password</label>
            <input
              id="password-text"
              type="password"
              value={password}
              placeholder="Password"
              className="br-5"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Message message={errors?.passwordError || loginError} type="error" />
          </div>
          <div>
            <button type="submit" className="br-5">
              Sign In
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignIn;
