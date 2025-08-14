import React from "react";
import DashboardCard from "../DashboardCard";
import "../../../Styles/Admin/AdminMainModules.css";
import { FaUserCheck, FaUsers, FaUserPlus, FaClipboardCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const GatAdhikariManagement = () => {
  const navigate = useNavigate();

  const modules = [
    {
      title: "गट अधिकारी नेमणूक",
      description: "नोंदणीकृत सभासद तपासणी व गट अधिकारी नेमणूक",
      icon: <FaUserCheck size={30} color="#3498db" />,
      path: "/Admin/Dashboard/gat_adhikari/Selection",
    },
    {
      title: "गट अधिकारी यादी",
      description: "सर्व गट अधिकारी यादी पहा",
      icon: <FaUsers size={30} color="#e67e22" />,
      path: "/Admin/Dashboard/gat_adhikari/gat_adhikariList",
    },
    // {
    //   title: "गट अधिकारीने नोंदणीकृत सदस्य",
    //   description: "गट अधिकारीने नोंदणीकृत सदस्यांची यादी",
    //   icon: <FaUserPlus size={30} color="#2ecc71" />,
    //   path: "/Admin/Dashboard/GatAdhikari/UserListByReg",
    // },
    // {
    //   title: "गट अधिकारीने मंजूर सदस्य",
    //   description: "गट अधिकारीने मंजूर केलेल्या सदस्यांची यादी",
    //   icon: <FaClipboardCheck size={30} color="#9b59b6" />,
    //   path: "/Admin/Dashboard/GatAdhikari/UserListByApproval",
    // },
  ];

  return (
    <div className="admin-dashboard-container">
      <div className="location_header_row">
        <button className="location_back_button" onClick={() => navigate(-1)}>
          ⬅ Back
        </button>
        <div className="admin-dashboard-header">
          <h2 className="admin-dashboard-title">गट अधिकारी व्यवस्थापन</h2>
          <p className="admin-dashboard-subtitle">
            गट अधिकारी प्रक्रिया नियंत्रित करा
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

export default GatAdhikariManagement;
