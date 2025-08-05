import React from "react";
import DashboardCard from "../DashboardCard";
import "../../../Styles/Admin/AdminMainModules.css";
import { FaUserPlus, FaUserCheck, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const VendorManagement = () => {
  const navigate = useNavigate();
  const modules = [
    {
      title: "विक्रेता नोंदणी",
      description: "नवीन विक्रेता नोंदणी करा",
      icon: <FaUserPlus size={30} color="#2ecc71" />,
      path: "/Admin/Dashboard/Vendor/Register",
    },
    {
      title: "विक्रेता मंजुरी",
      description: "नोंदणीकृत विक्रेता तपासणी व मंजुरी करा",
      icon: <FaUserCheck size={30} color="#3498db" />,
      path: "/Admin/Dashboard/Vendor/Approval",
    },
    {
      title: "विक्रेता यादी",
      description: "सर्व विक्रेता यादी पहा",
      icon: <FaUsers size={30} color="#e67e22" />,
      path: "/Admin/Dashboard/Vendor/List",
    },
  ];

  return (
    <div className="admin-dashboard-container">
      <div className="location_header_row">
        <button className="location_back_button" onClick={() => navigate(-1)}>
          ⬅ Back
        </button>
        <div className="admin-dashboard-header">
          <h2 className="admin-dashboard-title">विक्रेता व्यवस्थापन</h2>
          <p className="admin-dashboard-subtitle">
            विक्रेता प्रक्रिया नियंत्रित करा
          </p>
        </div>
      </div>
      <div className="admin-dashboard-grid">
        {modules.map((mod, index) => (
          <DashboardCard
            key={index}
            title={mod.title}
            description={mod.description}
            icon={mod.icon}
            path={mod.path}
          />
        ))}
      </div>
    </div>
  );
};

export default VendorManagement;
