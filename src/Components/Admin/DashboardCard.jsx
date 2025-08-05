import React from "react";
import { useNavigate } from "react-router-dom";
import "../../Styles/Admin/DashboardCard.css";

const DashboardCard = ({ title, description, icon, path }) => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-card" onClick={() => navigate(path)}>
      <div className="dashboard-card-icon">{icon}</div>
      <div className="dashboard-card-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default DashboardCard;
