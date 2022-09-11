import { createContext, useContext, useEffect, useState } from "react";
import baseApi from "../BaseApi";
import setupAuthHeaderForServiceCalls, { setupAuthExceptionHandler } from "./authUtils";
import { useNavigate } from "react-router-dom";
import { routePaths } from "../Router/Router";

const authContext = createContext();

const AuthProvider = ({ children }) => {
  const { token: userToken, email } = JSON.parse(localStorage.getItem("login")) || {};

  const [authToken, setAuthToken] = useState(userToken);
  const [userDetails, setUserDetails] = useState(email);
  const [loginError, setLoginError] = useState(null);

  const navigate = useNavigate();

  const login = async (username, password) => {
    const token = window.btoa(`${username}:${password}`);

    const { error, message } = await baseApi.login("/auth/login", username, password);

    if (error) {
      return setLoginError(message);
    }

    localStorage.setItem("login", JSON.stringify({ token, email: username }));

    setAuthToken(token);
    setUserDetails(username);

    setupAuthHeaderForServiceCalls(token);

    navigate(routePaths.HOME);
  };

  const logout = () => {
    localStorage.removeItem("login");
    setAuthToken("");
    setUserDetails("");
    setupAuthHeaderForServiceCalls("");
    navigate(routePaths.SIGNIN);
  };

  useEffect(() => {
    if (userToken) {
      setupAuthHeaderForServiceCalls(userToken);
    }

    setupAuthExceptionHandler(logout);
  }, []);

  return (
    <authContext.Provider
      value={{ login, logout, authToken, loginError, setLoginError, userDetails }}
    >
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => useContext(authContext);

export default AuthProvider;
