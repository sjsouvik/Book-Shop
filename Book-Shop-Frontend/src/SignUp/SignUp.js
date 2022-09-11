import React, { Component } from "react";

class SignUp extends Component {
  render() {
    const { emailValue, passwordValue } = "";
    return (
      <div>
        <form>
          <div>
            <label htmlFor="email-text">Email</label>
            <input id="email-text" type="text" value={emailValue} placeholder="abc@xyz.com" />
          </div>
          <div>
            <label htmlFor="password-text">Password</label>
            <input
              id="password-text"
              type="password"
              value={passwordValue}
              placeholder="Password"
            />
          </div>
          <div>
            <button type="submit">Sign Up</button>
          </div>
        </form>
      </div>
    );
  }
}

SignUp.propTypes = {};

export default SignUp;
