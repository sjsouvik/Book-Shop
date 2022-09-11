import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import SignIn from "./SignIn";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider/AuthProvider";

jest.mock("../AuthProvider/AuthProvider");
jest.mock("react-router-dom");

describe("SignIn", function () {
  const navigate = jest.fn();

  beforeEach(() => {
    useAuth.mockReturnValue({
      login: jest.fn(),
      loginError: null,
    });

    useNavigate.mockReturnValue(navigate);
  });

  test("should show email input", function () {
    const { getByText, getByLabelText } = render(<SignIn />);

    expect(getByText("Email")).toBeInTheDocument();
    expect(getByLabelText("Email")).toBeInTheDocument();
  });

  test("should show password input", function () {
    const { getByText, getByLabelText } = render(<SignIn />);

    expect(getByText("Password")).toBeInTheDocument();
    expect(getByLabelText("Password")).toBeInTheDocument();
  });

  test("should take email and password as input", () => {
    render(<SignIn />);

    const emailInput = screen.getByPlaceholderText("abc@xyz.com");
    const passwordInput = screen.getByPlaceholderText(/password/i);

    fireEvent.change(emailInput, { target: { value: "abc@xyz.com" } });
    fireEvent.change(passwordInput, { target: { value: "abc123" } });

    expect(emailInput.value).toBe("abc@xyz.com");
    expect(passwordInput.value).toBe("abc123");
  });

  test("should validate email and password as mandatory fields", () => {
    render(<SignIn />);

    const signinBtn = screen.getByText(/sign in/i);

    fireEvent.click(signinBtn);
    expect(screen.getByText(/email can't be empty/i)).toBeInTheDocument();
    expect(screen.getByText(/password can't be empty/i)).toBeInTheDocument();
  });

  test("should validate the email format", () => {
    render(<SignIn />);

    const emailInput = screen.getByPlaceholderText("abc@xyz.com");
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const signinBtn = screen.getByText(/sign in/i);

    fireEvent.change(emailInput, { target: { value: "abc@x" } });
    fireEvent.change(passwordInput, { target: { value: "abc123" } });

    fireEvent.click(signinBtn);
    expect(screen.getByText(/email format is wrong/i)).toBeInTheDocument();
  });
});
