import React, { useEffect, useState } from "react";
import QRCode from "qrcode";

export const Dashboard = () => {
  const [src, setSrc] = useState("");
  useEffect(() => {
    QRCode.toDataURL(`
      name : amr mohsen 
      age:24 ,
      id:55454554
    
    `).then((data) => {
      setSrc(data);
    });
  }, []);
  return <img src={src} alt="" />;
};
