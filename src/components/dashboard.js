import React, { useEffect, useState } from "react";
import QRCode from "qrcode";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";

export const Dashboard = () => {
  const [src, setSrc] = useState("");
  const [userData, setUserData] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { currentUser } = useAuth();

  useEffect(() => {
    if (userData != null) {
      QRCode.toDataURL(
        `
          Email: ${userData.email}
          Name: ${userData.fullName}
          National Id: ${userData.name}
          Gender: ${userData.gender}
        `
      ).then((data) => {
        setSrc(data);
      });
    }
  }, []);

  useEffect(() => {
    getUserData();
  }, []);

  async function getUserData() {
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
