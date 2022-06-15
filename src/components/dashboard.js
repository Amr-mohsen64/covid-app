import React, { useCallback, useEffect, useState } from "react";
import QRCode from "qrcode";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";

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
      `
    ).then((data) => {
      setSrc(data);
    });
  }, [userData.email, userData.fullName, userData.gender, userData.nationalId]);

  const getUserData = useCallback(() => {
    var docRef = db.collection("users").doc(currentUser.uid);
    setIsLoading(true);
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          setUserData(doc.data());
          setIsLoading(false);
        } else {
          setUserData({});
          setIsLoading(false);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        alert(error);
      });
  }, [currentUser.uid]);

  useEffect(() => {
    getUserData();
    qr();
  }, [getUserData, qr]);

  function handleVacFormApperance() {
    setFormIsShown((prevState) => !prevState);
  }

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
                nationa lId :
                <span className="d-inline-block ms-2 text-primary">
                  {userData.nationalId}
                </span>
              </li>
              <li className="list-group-item">
                <button
                  className="btn btn-danger"
                  onClick={handleVacFormApperance}
                >
                  Set Vacination Date
                </button>
              </li>
              {formIsShowen && (
                <div className="card">
                  <div className="card-body">
                  <h2 className="text-danger">Vacine Info</h2>
                    <form>
                      <div className="mb-3">
                        <label htmlFor="Vaccine" className="form-label">
                          Vaccine
                        </label>
                        <select className="form-select">
                          <option>Pfizer</option>
                          <option>Sinopharm </option>
                          <option>Covaxin</option>
                        </select>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="firstDose" className="form-label">
                          First Dose
                        </label>
                        <input
                          type="date"
                          className="form-control invalid"
                          id="firstDose"
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="secondDose" className="form-label">
                          Second Dose
                        </label>
                        <input
                          type="date"
                          className="form-control invalid"
                          id="secondDose"
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="thirdDose" className="form-label">
                          Third Dose
                        </label>
                        <input
                          type="date"
                          className="form-control invalid"
                          id="thirdDose"
                        />
                      </div>
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
