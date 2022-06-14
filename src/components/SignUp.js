import React from "react";
import { Link } from "react-router-dom";
import useInput from "../hooks/use-input"

const isEmail = value => value.includes("@");

const SignUp = () => {
  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    InputBlurHandler: emailBLurHandler,
    reset: restEmail
  } = useInput(isEmail)

  console.log(emailValue);
  return (
    <div className="card" style={{ width: "30rem" }}>
      <div className="card-body">
        <h2 className="text-center mb-4 text-danger">sign up</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              onChange={emailChangeHandler}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
          <p className="text-primary text-center">
            <Link className="text-primary text-center" to="/login">
              have account ?
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
