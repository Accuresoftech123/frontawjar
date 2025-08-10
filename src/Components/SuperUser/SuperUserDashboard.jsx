import React from "react";
import DashboardCard from "../Admin/DashboardCard";
import "../../Styles/Admin/AdminMainModules.css";

// React Icons imports
import {
  FaUsers,
} from "react-icons/fa";

const SuperUserDashboard = () => {
  const modules = [
    {
      title: "ऍडमिन नोंदणी",
      description: "ऍडमिन नोंदणी",
      icon: <FaUsers size={30} color="#3498db" />,
      path: "/SuperUserHome/Dashboard/Admin-Registration",
    },
  ];

  return (
    <div className="admin-dashboard-container">
      <div className="admin-dashboard-header">
        <h2 className="admin-dashboard-title">व्यवस्थापन</h2>
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

export default SuperUserDashboard;
