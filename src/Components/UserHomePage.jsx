import React from "react";
import { Link } from "react-router-dom";
import logo from "../Assets/logo.png";
import driver from "../Assets/driver.jpg";
import Stopwatch from "../Assets/Stopwatch.jpg";
import Vehicle from "../Assets/Vehicle.jpg";
import "../Styles/UserHomePage.css";
import { useEffect } from "react";
import { useState } from "react";

const UserHomePage = () => {
  const [imagesLoaded, setImagesLoaded] = useState({
    driver: false,
    stopwatch: false,
    vehicle: false,
  });
  useEffect(() => {
    const preloadImage = (src, key) => {
      const img = new Image();
      img.src = src;
      img.onload = () =>
        setImagesLoaded((prev) => ({ ...prev, [key]: true }));
    };

    preloadImage(driver, "driver");
    preloadImage(Stopwatch, "stopwatch");
    preloadImage(Vehicle, "vehicle");
  }, []);


  return (
    <div className="userhomepage-container">
      {/* Header */}
      <header className="userhomepage-header">
        <div className="userhomepage-logo-container">
          <img src={logo} alt="logo" />
        </div>
        <nav className="userhomepage-nav-links">
          <Link to="/" className="userhomepage-nav-link">
            होम
          </Link>
          <Link to="/User" className="userhomepage-nav-link active">
            वापरकर्ता
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="userhomepage-main-section">
        <h1>वापरकर्ता डॅशबोर्डवर आपले स्वागत आहे</h1>
        <p>खाली तुमचा लॉगिन प्रकार निवडा.</p>
        <div className="userhomepage-image-group">
           <img
            src={driver}
            alt="चालक"
            className={`userhomepage-illustration ${
              imagesLoaded.driver ? "loaded" : "loading"
            }`}
            loading="lazy"
          />
          <img
            src={Stopwatch}
            alt="स्टॉपवॉच"
            className={`userhomepage-illustration ${
              imagesLoaded.stopwatch ? "loaded" : "loading"
            }`}
            loading="lazy"
          />
          <img
            src={Vehicle}
            alt="वाहन"
            className={`userhomepage-illustration ${
              imagesLoaded.vehicle ? "loaded" : "loading"
            }`}
            loading="lazy"
          />
        </div>
        <div className="userhomepage-button-group">
          <Link to="/Login/Member" className="userhomepage-button">
            सभासद
          </Link>
          <Link to="/Login/Vendor" className="userhomepage-button">
            विक्रेता
          </Link>
          <Link to="/Login/Operator" className="userhomepage-button">
            ऑपरेटर
          </Link>
          <Link to="/Login/GatAdhikari" className="userhomepage-button">
            गट अधिकारी
          </Link>
        </div>
      </main>
    </div>
  );
};

export default UserHomePage;
