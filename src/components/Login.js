import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      await login(emailRef.current.value, passwordRef.current.value).then(
        () => console.log("succes")
      );
    } catch {}
  };
  return (
    <div className="card" style={{ width: "30rem" }}>
      <div className="card-body">
        <h2 className="text-center mb-4 text-danger">Login</h2>
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              ref={emailRef}
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
              ref={passwordRef}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
          <p className="text-primary text-center">
            <Link className="text-primary text-center" to="/signup">
              already user
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
