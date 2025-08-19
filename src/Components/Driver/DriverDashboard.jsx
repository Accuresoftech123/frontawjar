import React from "react";
import DashboardCard from "../Admin/DashboardCard";
import "../../Styles/Admin/AdminMainModules.css";

// React Icons imports
import {
  FaMapMarkedAlt,
  FaTractor,
} from "react-icons/fa";

const DriverDashboard = () => {
  const modules = [
    {
      title: "लॉग व्यवस्थापन",
      description: "बुकिंग लॉग, सक्रिय लॉग आणि पूर्ण लॉग यांचे व्यवस्थापन",
      icon: <FaMapMarkedAlt size={30} color="#2ecc71" aria-hidden="true" />,
      path: "/Operator/logs", 
    },
    {
      title: "तक्रार व्यवस्थापन",
      description: "तक्रारी पाहा आणि त्यांचे निराकरण करा",
      icon: <FaTractor size={30} color="#f39c12" aria-hidden="true" />,
      path: "/Operator/Dashboard/complaint",
    },
  ];

  return (
    <div className="admin-dashboard-container">
      <div className="admin-dashboard-header">
        <h2 className="admin-dashboard-title">व्यवस्थापन</h2>
        <p className="admin-dashboard-subtitle">
          प्रशासकीय विभागासाठी मॉड्यूल्स
        </p>
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

export default DriverDashboard;
