import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import useInput from "../hooks/use-input";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";

const isEmail = (value) => value.includes("@");
const isNotEmpty = (value) => value.trim() !== "";
const moreThanSevenChar = (value) => value.length === 14;

const SignUp = () => {
  const alert = useAlert();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signup, currentUser } = useAuth();

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    InputBlurHandler: emailBLurHandler,
    reset: restEmail,
  } = useInput(isEmail);

  const {
    value: passowrdValue,
    isValid: passowrdIsValid,
    hasError: passowrdHasError,
    valueChangeHandler: passowrdChangeHandler,
    InputBlurHandler: passowrdBLurHandler,
    reset: restPassowrd,
  } = useInput(isNotEmpty);

  const {
    value: fullNameValue,
    isValid: fullNameIsValid,
    hasError: fullNameHasError,
    valueChangeHandler: fullNameChangeHandler,
    InputBlurHandler: fullNameBLurHandler,
    reset: restFullName,
  } = useInput(isNotEmpty);

  const {
    value: genderValue,
    isValid: genderIsValid,
    hasError: genderHasError,
    valueChangeHandler: genderChangeHandler,
    InputBlurHandler: genderBLurHandler,
    reset: restGender,
  } = useInput(isNotEmpty);

  const {
    value: nationalIdValue,
    isValid: nationalIdIsValid,
    hasError: nationalIdHasError,
    valueChangeHandler: nationalIdChangeHandler,
    InputBlurHandler: nationalIdBLurHandler,
    reset: restnationalId,
  } = useInput(isNotEmpty && moreThanSevenChar);

  const {
    value: birthDateValue,
    isValid: birthDateIsValid,
    hasError: birthDateHasError,
    valueChangeHandler: birthDateChangeHandler,
    InputBlurHandler: birthDateBLurHandler,
    reset: restbirthDate,
  } = useInput(isNotEmpty);

  let formIsValid = false;

  if (
    emailIsValid &&
    passowrdIsValid & fullNameIsValid &&
    fullNameIsValid &&
    genderIsValid &&
    nationalIdIsValid &&
    birthDateIsValid
  ) {
    formIsValid = true;
  }

  const submitHandler = async (event) => {
    event.preventDefault();

    const userExtraData = {
      fullName: fullNameValue,
      gender: genderValue,
      nationalId: nationalIdValue,
      birthDate: birthDateValue,
    };

    // console.log(userExtraData);
    try {
      await signup(emailValue, passowrdValue, userExtraData).then(() => {
        navigate("/login");
        alert.show("signup succesufly!", {
          type: "success",
        });
      });
    } catch (err) {
      setError(err.message);
      alert.show(err.message, {
        type: "error",
      });
    }
  };

  return (
    <div className="card" style={{ width: "30rem" }}>
      <div className="card-body">
        <h2 className="text-center mb-4 text-danger">Sign Up</h2>
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control invalid"
              id="email"
              value={emailValue}
              onChange={emailChangeHandler}
              onBlur={emailBLurHandler}
              autoComplete="off"
            />
            {emailHasError && (
              <div id="emailHelp" className="form-text fw-bold text-danger">
                Please enter Valid Email(must inclue @)
              </div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              autoComplete="off"
              value={passowrdValue}
              onChange={passowrdChangeHandler}
              onBlur={passowrdBLurHandler}
            />
            {passowrdHasError && (
              <div id="passwordHelp" className="form-text fw-bold text-danger">
                Password Cannot be empty
              </div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="fullName" className="form-label">
              FullName
            </label>
            <input
              type="text"
              className="form-control"
              id="fullName"
              autoComplete="off"
              value={fullNameValue}
              onChange={fullNameChangeHandler}
              onBlur={fullNameBLurHandler}
            />
            {fullNameHasError && (
              <div id="passwordHelp" className="form-text fw-bold text-danger">
                full Name Cannot be empty
              </div>
            )}
          </div>
          <div className="mb-1">
            <p>Gender</p>
            <input
              type="radio"
              className="form-check-input"
              id="male"
              value="male"
              onChange={genderChangeHandler}
              onBlur={genderBLurHandler}
              name="gender"
            />
            <label htmlFor="male" className="form-label ms-2">
              Male
            </label>
            {genderHasError && (
              <div id="passwordHelp" className="form-text fw-bold text-danger">
                full Name Cannot be empty
              </div>
            )}
          </div>
          <div className="mb-3">
            <input
              type="radio"
              className="form-check-input"
              id="gender"
              value="female"
              onChange={genderChangeHandler}
              onBlur={genderBLurHandler}
              name="gender"
            />
            <label htmlFor="gender" className="form-label ms-2">
              Female
            </label>
            {genderHasError && (
              <div id="passwordHelp" className="form-text fw-bold text-danger">
                full Name Cannot be empty
              </div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="nationalId" className="form-label">
              nationalId
            </label>
            <input
              type="text"
              className="form-control"
              id="nationalId"
              autoComplete="off"
              value={nationalIdValue}
              onChange={nationalIdChangeHandler}
              onBlur={nationalIdBLurHandler}
            />
            {nationalIdHasError && (
              <div className="form-text fw-bold text-danger">
                enter valid national id (must be equals 14 char)
              </div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="nationalId" className="form-label">
              birth Date
            </label>
            <input
              type="date"
              className="form-control"
              id=" birthDate"
              autoComplete="off"
              value={birthDateValue}
              onChange={birthDateChangeHandler}
              onBlur={birthDateBLurHandler}
            />
            {birthDateHasError && (
              <div className="form-text fw-bold text-danger">
                birthdata must not be empty
              </div>
            )}
          </div>

          {error && (
            <div className="form-text fw-bold text-danger mb-1">{error}</div>
          )}
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!formIsValid}
          >
            Sign Up
          </button>
          <p className="text-primary text-center">
            <Link className="text-primary text-center" to="/login">
              Already User ?
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
