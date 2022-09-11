import { render, screen, waitFor } from "@testing-library/react";
import AuthProvider, { useAuth } from "./AuthProvider";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import baseApi from "../BaseApi";
import React, { useEffect } from "react";
import { routePaths } from "../Router/Router";

jest.mock("../BaseApi");

describe("AuthProvider", () => {
  const username = "username";
  const password = "password";
  beforeEach(() => {
    baseApi.login = jest.fn().mockResolvedValue({});
  });
  const TestSignInComponent = ({ username, password }) => {
    const { authToken, login } = useAuth();
    useEffect(() => {
      login(username, password);
    }, []);
    return <div>authToken: {authToken}</div>;
  };

  describe("login", () => {
    it("should provide auth token when logged in", async () => {
      const token = window.btoa(`${username}:${password}`);
      render(
        <MemoryRouter>
          <AuthProvider>
            <TestSignInComponent username={username} password={password}></TestSignInComponent>
          </AuthProvider>
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText(`authToken: ${token}`)).toBeInTheDocument();
      });
    });

    it("should navigate to home page when logged in", async () => {
      render(
        <MemoryRouter initialEntries={[routePaths.SIGNIN]}>
          <AuthProvider>
            <Routes>
              <Route
                path={routePaths.SIGNIN}
                element={<TestSignInComponent username={username} password={password} />}
              />
              <Route path={routePaths.HOME} element={<div>Home</div>} />
            </Routes>
          </AuthProvider>
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText("Home")).toBeInTheDocument();
      });
    });
  });
});
