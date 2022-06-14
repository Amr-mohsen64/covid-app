import React, { useEffect, useState } from "react";
import QRCode from "qrcode";

export const Dashboard = () => {
  const [src, setSrc] = useState("");
  useEffect(() => {
    QRCode.toDataURL(
      `
      name : amr mohsen 
      age:24 ,
      id:55454554
    
    `
    ).then((data) => {
      setSrc(data);
    });
  }, []);

  return (
    <div style={{ width: "45rem" }}>
      <img src={src} alt="qrcode" className="m-auto" />
      <div className="card mt-3 fw-bold" style={{ width: "100%" }}>
        <h2 className="card-header text-secondary">Your Infomation</h2>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            Email :
            <span className="d-inline-block ms-2 text-primary">
              amrmohsen72@gmail.com
            </span>
          </li>
          <li className="list-group-item">
            Full Name :
            <span className="d-inline-block ms-2 text-primary">Amr Mohsen</span>
          </li>
          <li className="list-group-item">
            Gender :
            <span className="d-inline-block ms-2 text-primary">Male</span>
          </li>
          <li className="list-group-item">
            nationa lId :
            <span className="d-inline-block ms-2 text-primary">
              29807060103895
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};
