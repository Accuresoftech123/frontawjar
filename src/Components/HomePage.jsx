import React, {useEffect,useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../Assets/logo.png";
import backgroundImg from "../Assets/Awjar_Home.jpg";
import "../Styles/HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [bgLoaded, setBgLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = backgroundImg;
    img.onload = () => setBgLoaded(true);
  }, []);

  return (
    <div
      className="homepage-container"
      style={{  backgroundImage: bgLoaded ? `url(${backgroundImg})` : "none", loading:"lazy" }}
    >
      {/* Header */}
      <header className="homepage-header">
        <div className="homepage-logo-container">
          <img src={logo} alt="Logo" className="homepage-logo" />
        </div>
        <nav className="homepage-nav-links">
          <Link to="/" className="homepage-nav-link active">होम</Link>
          <Link to="/Login/Admin" className="homepage-nav-link">ऍडमिन</Link>
          <Link to="/User" className="homepage-nav-link">वापरकर्ता</Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="homepage-main-content">
        <div className="homepage-content-box">
          <h1 className="homepage-heading">
            शेतीची ताकद, <span className="homepage-highlight">आता तुमच्या बोटांवर!</span>
          </h1>
          <p className="homepage-paragraph">
            ट्रॅक्टर, हार्वेस्टर, रोटावेटर आणि इतर उपकरणे भाड्याने मिळवा – ऑनलाईन!
          </p>
          <p className="homepage-paragraph">
            आधुनिक शेतीसाठी स्मार्ट सुविधा, वेळेवर सेवा आणि खर्च बचत – एका क्लिकवर उपलब्ध.
          </p>
          <div className="homepage-button-container">
            <button className="homepage-primary-button" onClick={() => navigate("/User")}>
              वापरकर्ता
            </button>
            <button className="homepage-outline-button" onClick={() => navigate("/Login/Admin")}>
              ऍडमिन लॉगिन
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
