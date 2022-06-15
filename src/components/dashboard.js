import React, { useCallback, useEffect, useState } from "react";
import QRCode from "qrcode";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import useInput from "../hooks/use-input";

export const Dashboard = () => {
  const [src, setSrc] = useState("");
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [formIsShowen, setFormIsShown] = useState(false);

  const { currentUser } = useAuth();
  const qr = useCallback(() => {
    QRCode.toDataURL(
      `
        Email: ${userData.email}
        Name: ${userData.fullName}
        National Id: ${userData.nationalId}
        Gender: ${userData.gender}
        Vacine : ${userData.vacine}
        First Dose  : ${userData.firstDose}
        Second Dose  : ${userData.secondDose}
        Third Dose  : ${userData.thirdDose}
      `
    ).then((data) => {
      setSrc(data);
    });
  }, [
    userData.email,
    userData.firstDose,
    userData.fullName,
    userData.gender,
    userData.nationalId,
    userData.secondDose,
    userData.thirdDose,
    userData.vacine,
  ]);

  const getUserData = useCallback(() => {
    var docRef = db.collection("users").doc(currentUser.uid);
    setIsLoading(true);
    docRef.onSnapshot((doc) => {
      if (doc.exists) {
        setUserData(doc.data());
        setIsLoading(false);
      } else {
        setUserData({});
        setIsLoading(false);
      }
    });
  }, [currentUser.uid]);

  useEffect(() => {
    getUserData();
    qr();
  }, [getUserData, qr]);

  function handleVacFormApperance() {
    setFormIsShown((prevState) => !prevState);
  }

  const isNotEmpty = (value) => value.trim() !== "";

  const {
    value: vacineValue,
    isValid: vacineIsValid,
    hasError: vacineHasError,
    valueChangeHandler: vacineChangeHandler,
    InputBlurHandler: vacineBLurHandler,
    reset: restVacine,
  } = useInput(isNotEmpty);

  const {
    value: firstDoseValue,
    isValid: firstDoseIsValid,
    hasError: firstDoseHasError,
    valueChangeHandler: firstDoseChangeHandler,
    InputBlurHandler: firstDoseBLurHandler,
    reset: restFirstDose,
  } = useInput(isNotEmpty);

  const {
    value: secondDoseValue,
    isValid: secondDoseIsValid,
    hasError: secondDoseHasError,
    valueChangeHandler: secondDoseChangeHandler,
    InputBlurHandler: secondDoseBLurHandler,
    reset: restSecondDose,
  } = useInput(isNotEmpty);

  const {
    value: thirdDoseValue,
    isValid: thirdDoseIsValid,
    hasError: thirdDoseHasError,
    valueChangeHandler: thirdDoseChangeHandler,
    InputBlurHandler: thirdDoseBLurHandler,
    reset: restThirdDose,
  } = useInput(isNotEmpty);

  let formIsValid = false;
  if (
    vacineIsValid &&
    firstDoseIsValid &&
    secondDoseIsValid &&
    thirdDoseIsValid
  ) {
    formIsValid = true;
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    console.log(vacineValue, firstDoseValue, secondDoseValue, thirdDoseValue);

    db.collection("users")
      .doc(currentUser.uid)
      .set(
        {
          vacine: vacineValue,
          firstDose: firstDoseValue,
          secondDose: secondDoseValue,
          thirdDose: thirdDoseValue,
          isReserved: true,
        },
        { merge: true }
      )
      .then((d) => console.log(d));
  };

  // console.log(userData);
  return (
    <>
      {!isLoading && (
        <div style={{ width: "45rem" }}>
          <div className="w-50 m-auto">
            <img src={src} alt="qrcode" className="w-100 " />
          </div>
          <div className="card mt-3 fw-bold" style={{ width: "100%" }}>
            <h2 className="card-header text-secondary">Your Infomation</h2>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                Email :
                <span className="d-inline-block ms-2 text-primary">
                  {userData.email}
                </span>
              </li>
              <li className="list-group-item">
                Full Name :
                <span className="d-inline-block ms-2 text-primary">
                  {userData.fullName}
                </span>
              </li>
              <li className="list-group-item">
                Gender :
                <span className="d-inline-block ms-2 text-primary">
                  {userData.gender}
                </span>
              </li>
              <li className="list-group-item">
                vacine :
                <span className="d-inline-block ms-2 text-primary">
                  {userData.vacine}
                </span>
              </li>

              <li className="list-group-item">
                first Dose :
                <span className="d-inline-block ms-2 text-primary">
                  {userData.firstDose}
                </span>
              </li>
              <li className="list-group-item">
                nationa lId :
                <span className="d-inline-block ms-2 text-primary">
                  {userData.nationalId}
                </span>
              </li>
              <li className="list-group-item">
                second Dose:
                <span className="d-inline-block ms-2 text-primary">
                  {userData.secondDose}
                </span>
              </li>
              <li className="list-group-item">
                third Dose :
                <span className="d-inline-block ms-2 text-primary">
                  {userData.thirdDose}
                </span>
              </li>
              {!userData.isReserved && (
                <li className="list-group-item">
                  <button
                    className="btn btn-danger"
                    onClick={handleVacFormApperance}
                  >
                    Set Vacination Date
                  </button>
                </li>
              )}
              {!userData.isReserved && formIsShowen && (
                <div className="card">
                  <div className="card-body">
                    <h2 className="text-danger">Vacine Info</h2>
                    <form onSubmit={submitHandler}>
                      <div className="mb-3">
                        <label htmlFor="Vaccine" className="form-label">
                          Vaccine
                        </label>
                        <select
                          className="form-select"
                          onChange={vacineChangeHandler}
                          onBlur={vacineBLurHandler}
                        >
                          <option>Pfizer</option>
                          <option>Sinopharm </option>
                          <option>Covaxin</option>
                        </select>
                        {vacineHasError && (
                          <div className="form-text fw-bold text-danger">
                            Please select vacine
                          </div>
                        )}
                      </div>

                      <div className="mb-3">
                        <label htmlFor="firstDose" className="form-label">
                          First Dose
                        </label>
                        <input
                          type="date"
                          className="form-control invalid"
                          id="firstDose"
                          onChange={firstDoseChangeHandler}
                          onBlur={firstDoseBLurHandler}
                        />
                        {firstDoseHasError && (
                          <div className="form-text fw-bold text-danger">
                            Please select First Dose Date
                          </div>
                        )}
                      </div>
                      <div className="mb-3">
                        <label htmlFor="secondDose" className="form-label">
                          Second Dose
                        </label>
                        <input
                          type="date"
                          className="form-control invalid"
                          id="secondDose"
                          onChange={secondDoseChangeHandler}
                          onBlur={secondDoseBLurHandler}
                        />
                        {secondDoseHasError && (
                          <div className="form-text fw-bold text-danger">
                            Please select second Dose Date
                          </div>
                        )}
                      </div>
                      <div className="mb-3">
                        <label htmlFor="thirdDose" className="form-label">
                          Third Dose
                        </label>
                        <input
                          type="date"
                          className="form-control invalid"
                          id="thirdDose"
                          onChange={thirdDoseChangeHandler}
                          onBlur={thirdDoseBLurHandler}
                        />
                        {thirdDoseHasError && (
                          <div className="form-text fw-bold text-danger">
                            Please select third Dose Date
                          </div>
                        )}
                      </div>
                      <button
                        className="btn btn-primary"
                        disabled={!formIsValid}
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </ul>
          </div>
        </div>
      )}
      {isLoading && (
        <div
          className="spinner-grow text-light d-flex justify-content-center"
          role="status"
          style={{ width: "218px", height: "218px" }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
    </>
  );
};
