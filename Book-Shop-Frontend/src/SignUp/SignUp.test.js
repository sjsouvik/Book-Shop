import React from "react";
import { render } from "@testing-library/react";
import SignUp from "./SignUp";

describe("SignUp", function () {
  it("should show email input", function () {
    const { getByText, getByLabelText } = render(<SignUp />);

    expect(getByText("Email")).toBeInTheDocument();
    expect(getByLabelText("Email")).toBeInTheDocument();
  });

  it("should show password input", function () {
    const { getByText, getByLabelText } = render(<SignUp />);

    expect(getByText("Password")).toBeInTheDocument();
    expect(getByLabelText("Password")).toBeInTheDocument();
  });
});
